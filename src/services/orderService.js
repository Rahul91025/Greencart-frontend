import API from './api.js';

// Get all orders
export const getOrders = () => API.get('/orders');

// Create order
export const createOrder = (orderData) => API.post('/orders', orderData);

// Update order
export const updateOrder = (id, orderData) => API.put(`/orders/${id}`, orderData);

// Delete order
export const deleteOrder = (id) => API.delete(`/orders/${id}`);
