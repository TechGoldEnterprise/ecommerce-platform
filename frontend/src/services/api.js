// frontend/src/services/api.js
import axios from 'axios';

// Use environment variable with fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('nexusCurrentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export API methods
export const productAPI = {
  getAll: () => api.get('/api/products'),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data),
  update: (id, data) => api.put(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`),
};

export const userAPI = {
  login: (data) => api.post('/api/users/login', data),
  register: (data) => api.post('/api/users/register', data),
  getProfile: () => api.get('/api/users/me'),
  updateProfile: (data) => api.put('/api/users/profile', data),
};

export const cartAPI = {
  getCart: () => api.get('/api/cart'),
  addToCart: (data) => api.post('/api/cart', data),
  updateCart: (id, data) => api.put(`/api/cart/${id}`, data),
  removeFromCart: (id) => api.delete(`/api/cart/${id}`),
  clearCart: () => api.delete('/api/cart'),
};

export const orderAPI = {
  createOrder: (data) => api.post('/api/orders', data),
  getOrders: () => api.get('/api/orders'),
  getOrderById: (id) => api.get(`/api/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
};

export const paymentAPI = {
  createPaymentIntent: (data) => api.post('/api/payments/create-payment-intent', data),
  verifyPayment: (paymentId) => api.get(`/api/payments/verify/${paymentId}`),
};

export const adminAPI = {
  getStats: () => api.get('/api/admin/stats'),
  getRecentOrders: () => api.get('/api/admin/orders/recent'),
  getSalesData: () => api.get('/api/admin/sales-data'),
  getAllUsers: () => api.get('/api/admin/users'),
  updateUserRole: (userId, role) => api.put(`/api/admin/users/${userId}/role`, { role }),
  deleteUser: (userId) => api.delete(`/api/admin/users/${userId}`),
};

export default api;