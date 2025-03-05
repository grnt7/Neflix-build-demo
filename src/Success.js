import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firestore instance
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function SuccessPage() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
        const updateSubscription = async () => {
            if (user) {
                try {
                    await updateDoc(doc(db, "customers", user.uid), {
                        subscriptionStatus: "active", // Or whatever status you want
                    });
                } catch (error) {
                    console.error("Error updating subscription:", error);
                }
            }
        };

        updateSubscription();

        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate, user]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase.</p>
            <p>You will be redirected shortly...</p>
        </div>
    );
}

export default SuccessPage;