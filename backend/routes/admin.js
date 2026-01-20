const express = require('express');
const router = express.Router();

// Mock data for testing
const mockStats = {
    totalSales: 12450.75,
    totalOrders: 89,
    totalProducts: 45,
    lowStockItems: 7
};

const mockRecentOrders = [
    {
        _id: '1',
        orderId: 'ORD001',
        customerName: 'John Doe',
        date: new Date('2024-01-15'),
        amount: 299.99,
        status: 'completed'
    },
    {
        _id: '2',
        orderId: 'ORD002',
        customerName: 'Jane Smith',
        date: new Date('2024-01-14'),
        amount: 149.99,
        status: 'processing'
    },
    {
        _id: '3',
        orderId: 'ORD003',
        customerName: 'Bob Johnson',
        date: new Date('2024-01-13'),
        amount: 89.99,
        status: 'pending'
    }
];

const mockSalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1900, 1500, 2200, 1800, 2500]
};

// Get admin stats
router.get('/stats', (req, res) => {
    res.json(mockStats);
});

// Get recent orders
router.get('/orders/recent', (req, res) => {
    res.json(mockRecentOrders);
});

// Get sales data
router.get('/sales-data', (req, res) => {
    res.json(mockSalesData);
});

// Get all products (admin view)
router.get('/products', (req, res) => {
    // This would query the database in real app
    res.json({ message: 'Admin products endpoint works' });
});

module.exports = router;