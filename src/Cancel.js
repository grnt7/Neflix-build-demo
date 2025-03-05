import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function CancelPage() {
    return (
        <div>
            <h1>Payment Canceled</h1>
            <p>Your payment was canceled.</p>
            <p>You can try again or return to the home page.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
}

export default CancelPage;