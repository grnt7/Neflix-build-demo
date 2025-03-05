import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import "../screens/PlansScreen.css";
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const querySnapshot = await getDocs(productsCollection);

                const productsData = await Promise.all(
                    querySnapshot.docs.map(async productDoc => {
                        const product = {
                            id: productDoc.id,
                            data: productDoc.data(),
                            prices: [],
                        };

                        const pricesCollection = collection(doc(db, "products", productDoc.id), "prices");
                        const priceSnap = await getDocs(pricesCollection);
                        priceSnap.docs.forEach(price => {
                            product.prices.push({
                                priceId: price.id,
                                priceData: price.data(),
                            });
                        });
                        return product;
                    })
                );
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const loadCheckout = async (priceId) => {
        try {
            const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');
            const result = await createCheckoutSession({ priceId });
            const { sessionId } = result.data;

            const stripe = await loadStripe("pk_live_51QxliiG3WGgJ1OJmT4P4UyTg832PCU1CrYHPevArQQTAi4NOm8hTnh0WCI5TvDzdWmfP1V98HeBA0pTg6XQcqmQr00kg0O2NlP");//perishable key
            if (stripe) {
                stripe.redirectToCheckout({ sessionId });
            } else {
                alert("Failed to load Stripe.");
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("Failed to create checkout session.");
        }
    };

    return (
        <div className="PlansScreen">
            {products.map(product => (
                <div key={product.id} className="plansScreen-plan">
                    <div className="planscreen-info">
                        <h5>{product.data.name}</h5>
                        <div>
                            <h6>{product.data.description}</h6>
                        </div>
                    </div>
                    <button onClick={() => loadCheckout(product.prices[0].priceId)}>Subscribe</button>
                </div>
            ))}
        </div>
    );
}

export default PlansScreen;















/*
original papa code

 "pk_live_51QxliiG3WGgJ1OJmT4P4UyTg832PCU1CrYHPevArQQTAi4NOm8hTnh0WCI5TvDzdWmfP1V98HeBA0pTg6XQcqmQr00kg0O2NlP"

import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, getDocs, doc } from 'firebase/firestore'; // Import modular functions
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe} from "@stripe/stripe-js";
import "../screens/PlansScreen.css";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const querySnapshot = await getDocs(productsCollection);

                const productsData = await Promise.all(
                    querySnapshot.docs.map(async productDoc => {
                        const product = {
                            id: productDoc.id,
                            data: productDoc.data(),
                            prices: [],
                        };

                        const pricesCollection = collection(doc(db, "products", productDoc.id), "prices");
                        const priceSnap = await getDocs(pricesCollection);
                        priceSnap.docs.forEach(price => {
                            product.prices.push({
                                priceId: price.id,
                                priceData: price.data(),
                            });
                        });
                        return product;
                    })
                );
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const loadCheckout = async (priceId) => {
      const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout-sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      docRef.onSnapshot(async(snap) => {
        const {error, sessionId } = snap.data();

        if (error) {
          //Show an error to your customer and
          //inspect your Cloud function logs in the firebase console.
          alert(`An error occured: ${error.message}`);
        }

        if (sessionId) {
          //we have a session, lets redirect to Chectout
          //Init Stripe

          const stripe = await loadStripe(
           {/*public key }
          );
          stripe.redirectToCheckout({sessionId});
        }
      })
      
    };

    return (
        <div className="PlansScreen">
            {products.map(product => (
                <div key={product.id} className="plansScreen-plan">
                    <div className="planscreen-info">
                        <h5>{product.data.name}</h5>
                        <h6>{product.data.description}</h6>
                    </div>
                    <button onclick={() => loadCheckout(product.prices[0].priceId)}>Subscribe</button>
                </div>
            ))}
        </div>
    );
}

export default PlansScreen;






   
*/

/*
google gemini corrected code with stripe
import React, { useState, useEffect } from 'react';
import { db } from "../firebase";

import { collection, getDocs, doc, addDoc } from 'firebase/firestore'; // Import addDoc  // Import modular functions

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe} from "@stripe/stripe-js";
import "../screens/PlansScreen.css";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const querySnapshot = await getDocs(productsCollection);

                const productsData = await Promise.all(
                    querySnapshot.docs.map(async productDoc => {
                        const product = {
                            id: productDoc.id,
                            data: productDoc.data(),
                            prices: [],
                        };

                        const pricesCollection = collection(doc(db, "products", productDoc.id), "prices");
                        const priceSnap = await getDocs(pricesCollection);
                        priceSnap.docs.forEach(price => {
                            product.prices.push({
                                priceId: price.id,
                                priceData: price.data(),
                            });
                        });
                        return product;
                    })
                );
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
//gemini correction
const loadCheckout = async (priceId) => {
  try {
      const checkoutSessionsCollection = collection(doc(db, "customers", user.uid), "checkout-sessions");

      const docRef = await addDoc(checkoutSessionsCollection, {
          price: priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
      });

      const unsubscribe = docRef.onSnapshot(async (snap) => {
          const { error, sessionId } = snap.data();

          if (error) {
              alert(`An error occurred: ${error.message}`);
              unsubscribe();
          }

          if (sessionId) {
              const stripe = await loadStripe("yourkey"); // Replace with your key
              if (stripe) {
                  stripe.redirectToCheckout({ sessionId });
              } else {
                  alert("Failed to load Stripe.");
              }
              unsubscribe();
          }
      });
  } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session.");
  }
};
    

    return (
        <div className="PlansScreen">
            {products.map(product => (
                <div key={product.id} className="plansScreen-plan">
                    <div className="planscreen-info">
                        <h5>{product.data.name}</h5>
                        <div>
                        <h6>{product.data.description}</h6>
                        </div>
                    </div>
                    <button onClick={() => loadCheckout(product.prices[0].priceId)}>Subscribe</button>
                </div>
            ))}
        </div>
    );
}












import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, getDocs, doc, addDoc } from 'firebase/firestore'; // Import addDoc
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";
import "../screens/PlansScreen.css";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // ... (your fetchProducts logic) ...
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const loadCheckout = async (priceId) => {
        try {
            const docRef = await addDoc(collection(doc(db, "customers", user.uid), "checkout-sessions"), {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

            const unsubscribe = docRef.onSnapshot(async (snap) => {
                const { error, sessionId } = snap.data();

                if (error) {
                    alert(`An error occurred: ${error.message}`);
                    unsubscribe(); // Unsubscribe from snapshot listener
                }

                if (sessionId) {
                    const stripe = await loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY"); // Replace with your key
                    if (stripe) {
                        stripe.redirectToCheckout({ sessionId });
                    } else {
                        alert("Failed to load Stripe.");
                    }
                    unsubscribe(); // Unsubscribe after redirection
                }
            });
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("Failed to create checkout session.");
        }
    };

    return (
        <div className="PlansScreen">
            {products.map(product => (
                <div key={product.id} className="plansScreen-plan">
                    <div className="planscreen-info">
                        <h5>{product.data.name}</h5>
                        <h6>{product.data.description}</h6>
                    </div>
                    <button onClick={() => loadCheckout(product.prices[0].priceId)}>Subscribe</button>
                </div>
            ))}
        </div>
    );
}

export default PlansScreen;

3325 gemini output to handle error not defined

import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import "../screens/PlansScreen.css";

function PlansScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await db.collection("products")
                    .where("active", "==", true)
                    .get();

                const productsData = await Promise.all(
                    querySnapshot.docs.map(async (productDoc) => {
                        const product = {
                            id: productDoc.id,
                            data: productDoc.data(),
                            prices: [],
                        };

                        const priceSnap = await productDoc.ref.collection("prices").get();
                        priceSnap.docs.forEach((price) => {
                            product.prices.push({
                                priceId: price.id,
                                priceData: price.data(),
                            });
                        });

                        return product;
                    })
                );

                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    console.log(products);

    return (
        <div className="plansScreen">
            {products.map((product) => (
                <div key={product.id} className="plansScreen-plan">
                    <div className="planscreen-info">
                        <h5>{product.data.name}</h5>
                        <h6>{product.data.description}</h6>
                    </div>
                    <button>Subscribe</button>
                </div>
            ))}
        </div>
    );
}

export default PlansScreen;





<div className ="planscreen-info">
                  <h5>{productData.name}</h5>
                  <h6>{productData.description}</h6>
                </div>
                <button>Subscribe</button>
              </div>













*/


