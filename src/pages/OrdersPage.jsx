import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../services/orderService.js';
import { getDrivers } from '../services/driverService.js';
import { useAuth } from '../context/authContext.jsx';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    customerName: '',
    address: '',
    value: '',
    estimatedTime: '',
    assignedDriver: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      const data = Array.isArray(res.data) ? res.data : res.data.orders || [];
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setOrders([]);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      const data = Array.isArray(res.data) ? res.data : res.data.drivers || [];
      setDrivers(data);
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
      setDrivers([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      value: Number(form.value),
      estimatedTime: Number(form.estimatedTime),
      assignedDriver: form.assignedDriver || undefined
    };

    try {
      if (editingId) {
        await updateOrder(editingId, payload);
      } else {
        await createOrder(payload);
      }
      setForm({ customerName: '', address: '', value: '', estimatedTime: '', assignedDriver: '' });
      setEditingId(null);
      fetchOrders();
    } catch (err) {
      console.error('Failed to save order:', err.response?.data || err.message);
    }
  };

  const handleEdit = (order) => {
    setForm({
      customerName: order.customerName || '',
      address: order.address || '',
      value: order.value || '',
      estimatedTime: order.estimatedTime || '',
      assignedDriver: order.assignedDriver?._id || ''
    });
    setEditingId(order._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>

        {isAdmin && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-2">
            <input
              placeholder="Customer Name"
              value={form.customerName}
              onChange={e => setForm({ ...form, customerName: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Address"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Value"
              type="number"
              value={form.value}
              onChange={e => setForm({ ...form, value: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Estimated Time"
              type="number"
              value={form.estimatedTime}
              onChange={e => setForm({ ...form, estimatedTime: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={form.assignedDriver}
              onChange={e => setForm({ ...form, assignedDriver: e.target.value })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Driver</option>
              {drivers.length > 0 ? (
                drivers.map(d => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))
              ) : (
                <option disabled>No drivers available</option>
              )}
            </select>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
              {editingId ? 'Update' : 'Add'} Order
            </button>
          </form>
        )}

        <table className="w-full border-collapse border bg-white">
          <thead>
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Driver</th>
              {isAdmin && <th className="border p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(o => (
                <tr key={o._id}>
                  <td className="border p-2">{o.customerName}</td>
                  <td className="border p-2">{o.address}</td>
                  <td className="border p-2">{o.value}</td>
                  <td className="border p-2">{o.estimatedTime}</td>
                  <td className="border p-2">{o.assignedDriver?.name || 'Unassigned'}</td>
                  {isAdmin && (
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(o)}
                        className="bg-yellow-500 text-white px-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(o._id)}
                        className="bg-red-600 text-white px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="text-center p-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
