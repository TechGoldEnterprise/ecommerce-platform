const express = require('express');
const router = express.Router();

// In-memory orders for testing
let orders = [];

// Get all orders
router.get('/', (req, res) => {
    res.json(orders);
});

// Create order
router.post('/', (req, res) => {
    const order = {
        id: Date.now().toString(),
        ...req.body,
        status: 'pending',
        createdAt: new Date(),
        orderId: `ORD${Date.now()}`
    };
    
    orders.push(order);
    res.status(201).json(order);
});

// Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

// Update order status
router.put('/:id/status', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = req.body.status;
    order.updatedAt = new Date();
    
    res.json(order);
});

module.exports = router;