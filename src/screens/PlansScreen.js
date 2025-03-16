import React, { useState, useEffect, useRef } from "react";
import { collection, doc, getDocs, addDoc, onSnapshot, where } from 'firebase/firestore';
import { db } from "../firebase";
import "../screens/PlansScreen.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const [subscribedPlans, setSubscribedPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(selectUser);
    const stripePromise = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = where("active", "===", true);
                const querySnapshot = await getDocs(collection(db, "products"), q);
                const productsData = {};
                for (const productDoc of querySnapshot.docs) {
                    productsData[productDoc.id] = productDoc.data();
                    const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                    priceSnap.forEach(price => {
                        productsData[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        };
                    });
                }
                setProducts(Object.values(productsData));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const subscribeToSubscriptions = () => {
            if (user && user.uid) {
                const unsubscribe = onSnapshot(collection(doc(collection(db, "customers"), user.uid), "subscriptions"), (snapshot) => {
                    setSubscribedPlans(snapshot.docs.map(doc => ({
                        priceId: doc.data().price.priceId,
                        subscriptionData: doc.data()
                    })));
                    setLoading(false);
                }, (error) => {
                    console.error("Error subscribing to subscriptions:", error);
                    setLoading(false);
                });

                return unsubscribe;
            } else {
                setLoading(false);
                return () => {};
            }
        };

        fetchProducts();
        const unsubscribeSubscriptions = subscribeToSubscriptions();

        return () => {
            unsubscribeSubscriptions();
        };
    }, [user, user?.uid]);


    const loadCheckout = async (priceId) => {
        try {
            const docRef = await addDoc(collection(doc(collection(db, "customers"), user.uid), "checkout_sessions"), {
                mode: "subscription",
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

            if (!stripePromise.current) {
                stripePromise.current = await loadStripe("pk_test_51QxlitQEYfnE7cdIACDb5aWfg9FNmX80vm8VDxLknkeiCGDSV0nvJ8A3iNvFh8xBVabHa9fztmyvAV7nCU4UHhTH0015uCfdQy");
            }

            onSnapshot(docRef, async (snap) => {
                const { error, sessionId } = snap.data();

                if (error) {
                    alert(`An error occurred: ${error.message}`);
                }
                if (sessionId) {
                    await stripePromise.current.redirectToCheckout({ sessionId });
                }
            });
        } catch (error) {
            console.error("Error loading checkout:", error);
        }
    };

    const isSubscribed = (priceId) => {
        return subscribedPlans.some(plan => plan.priceId === priceId && plan.subscriptionData.status === 'active');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="PlansScreen">
            {products.map(product => (
                <div key={product.id} className="plansScreen-plan">
                    <div className="planscreen-info">
                        <h5>{product.name}</h5>
                        <div>
                            <h6>{product.description}</h6>
                        </div>
                    </div>
                    {isSubscribed(product.prices.priceId) ? (
                        <button disabled>Subscribed</button>
                    ) : (
                        <button onClick={() => loadCheckout(product.prices.priceId)}>Subscribe</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PlansScreen;



















/*
functioning code version1

import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, addDoc, onSnapshot, where } from 'firebase/firestore';
import { db } from "../firebase";
import "../screens/PlansScreen.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const [subscribedPlans, setSubscribedPlans] = useState([]); // Store subscribed plan IDs
    const user = useSelector(selectUser);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = where("active", "===", true);
                const querySnapshot = await getDocs(collection(db, "products"), q);
                const productsData = {};
                for (const productDoc of querySnapshot.docs) {
                    productsData[productDoc.id] = productDoc.data();
                    const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                    priceSnap.forEach(price => {
                        productsData[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        };
                    });
                }
                setProducts(Object.values(productsData));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchSubscriptions = async () => {
            if (user && user.uid) {
                try {
                    const subscriptionsSnapshot = await getDocs(collection(doc(collection(db, "customers"), user.uid), "subscriptions"));
                    const subscribedPlanIds = subscriptionsSnapshot.docs.map(doc => doc.data().price.priceId);
                    setSubscribedPlans(subscribedPlanIds);
                   
                } catch (error) {
                    console.error("Error fetching subscriptions:", error);
                }
            }
        };

        fetchProducts();
        fetchSubscriptions();
    }, [user, user?.uid]);
  

    const loadCheckout = async (priceId) => {
        try {
            const docRef = await addDoc(collection(doc(collection(db, "customers"), user.uid), "checkout_sessions"), {
                mode: "subscription",
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

            onSnapshot(docRef, async (snap) => {
                const { error, sessionId } = snap.data();

                if (error) {
                    alert(`An error occurred: ${error.message}`);
                }
                if (sessionId) {
                    const stripe = await loadStripe("pk_test_51QxlitQEYfnE7cdIACDb5aWfg9FNmX80vm8VDxLknkeiCGDSV0nvJ8A3iNvFh8xBVabHa9fztmyvAV7nCU4UHhTH0015uCfdQy");
                    stripe.redirectToCheckout({ sessionId });
                }
            });
        } catch (error) {
            console.error("Error loading checkout:", error);
        }
    };

    const isSubscribed = (priceId) => {
        return subscribedPlans.includes(priceId);
    };

    return (
        <div className="PlansScreen">
            {products.map(product => (
                <div key={product.id} className="plansScreen-plan">
                    <div className="planscreen-info">
                        <h5>{product.name}</h5>
                        <div>
                            <h6>{product.description}</h6>
                        </div>
                    </div>
                    {isSubscribed(product.prices.priceId) ? (
                        <button disabled>Subscribed</button>
                    ) : (
                        <button onClick={() => loadCheckout(product.prices.priceId)}>Subscribe</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PlansScreen;



*/



