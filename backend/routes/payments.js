const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd' } = req.body;

        // For testing, use mock payment intent
        // In production, uncomment this:
        /*
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,
            metadata: {
                orderId: req.body.orderId
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
        */

        // Mock response for testing
        res.json({
            clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
            paymentIntentId: `pi_${Date.now()}`,
            amount: amount,
            currency: currency
        });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    // For testing, just acknowledge receipt
    console.log('Webhook received:', req.body);
    res.json({ received: true });
});

module.exports = router;