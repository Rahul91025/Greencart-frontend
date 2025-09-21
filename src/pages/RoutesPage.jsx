import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { getRoutes, createRoute, updateRoute, deleteRoute } from "../services/routeService.js";
import { useAuth } from "../context/authContext.jsx";

const RoutesPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ route_id: "", distance_km: "", traffic_level: "", base_time_min: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchRoutes = async () => {
    try {
      const res = await getRoutes();
      setRoutes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch routes:", err);
      setRoutes([]);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      route_id: Number(form.route_id),
      distance_km: Number(form.distance_km),
      base_time_min: Number(form.base_time_min),
    };

    try {
      if (editingId) {
        await updateRoute(editingId, payload);
      } else {
        await createRoute(payload);
      }
      setForm({ route_id: "", distance_km: "", traffic_level: "", base_time_min: "" });
      setEditingId(null);
      fetchRoutes();
    } catch (err) {
      console.error("Failed to save route:", err.response?.data || err.message);
    }
  };

  const handleEdit = (route) => {
    setForm({
      route_id: route.route_id || "",
      distance_km: route.distance_km || "",
      traffic_level: route.traffic_level || "",
      base_time_min: route.base_time_min || "",
    });
    setEditingId(route._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoute(id);
      fetchRoutes();
    } catch (err) {
      console.error("Failed to delete route:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar /> 

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Routes</h1>

        {isAdmin && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-2">
            <input
              placeholder="Route ID"
              type="number"
              value={form.route_id}
              onChange={e => setForm({ ...form, route_id: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Distance (km)"
              type="number"
              value={form.distance_km}
              onChange={e => setForm({ ...form, distance_km: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Traffic Level"
              value={form.traffic_level}
              onChange={e => setForm({ ...form, traffic_level: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Base Time (min)"
              type="number"
              value={form.base_time_min}
              onChange={e => setForm({ ...form, base_time_min: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
              {editingId ? "Update" : "Add"} Route
            </button>
          </form>
        )}

        <table className="w-full border-collapse border bg-white rounded">
          <thead>
            <tr>
              <th className="border p-2">Route ID</th>
              <th className="border p-2">Distance (km)</th>
              <th className="border p-2">Traffic Level</th>
              <th className="border p-2">Base Time (min)</th>
              {isAdmin && <th className="border p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {routes.length > 0 ? routes.map(r => (
              <tr key={r._id}>
                <td className="border p-2">{r.route_id}</td>
                <td className="border p-2">{r.distance_km}</td>
                <td className="border p-2">{r.traffic_level}</td>
                <td className="border p-2">{r.base_time_min}</td>
                {isAdmin && (
                  <td className="border p-2 space-x-2">
                    <button onClick={() => handleEdit(r)} className="bg-yellow-500 text-white px-2 rounded">Edit</button>
                    <button onClick={() => handleDelete(r._id)} className="bg-red-600 text-white px-2 rounded">Delete</button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="text-center p-4">No routes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutesPage;
