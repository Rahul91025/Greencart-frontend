import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { getDrivers, createDriver, updateDriver, deleteDriver } from '../services/driverService.js';
import { useAuth } from '../context/authContext.jsx';

const DriversPage = () => {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', isActive: true });
  const [editingId, setEditingId] = useState(null);

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      setDrivers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name) return alert("Name is required");
      if (editingId) {
        await updateDriver(editingId, form);
      } else {
        await createDriver(form);
      }
      setForm({ name: '', email: '', phone: '', isActive: true });
      setEditingId(null);
      fetchDrivers();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      console.error('Error saving driver:', err);
    }
  };

  const handleEdit = (driver) => {
    setForm({
      name: driver.name || '',
      email: driver.email || '',
      phone: driver.phone || '',
      isActive: driver.isActive ?? true
    });
    setEditingId(driver._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await deleteDriver(id);
      fetchDrivers();
    } catch (err) {
      console.error('Failed to delete driver:', err);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Drivers</h1>

        {isAdmin && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-2">
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
              />
              <span>Active</span>
            </label>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
              {editingId ? 'Update' : 'Add'} Driver
            </button>
          </form>
        )}

        <ul className="space-y-2">
          {drivers.map(d => (
            <li key={d._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <span>{d.name} ({d.email || 'N/A'}) – {d.phone || 'N/A'} – {d.isActive ? '✅ Active' : '❌ Inactive'}</span>
              {isAdmin && (
                <div className="space-x-2">
                  <button onClick={() => handleEdit(d)} className="bg-yellow-500 text-white px-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(d._id)} className="bg-red-600 text-white px-2 rounded">Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DriversPage;
