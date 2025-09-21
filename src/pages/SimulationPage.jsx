import React, { useEffect, useState } from 'react';
import { runSimulation, getSimulationHistory } from '../services/simulationService.js';
import { getDrivers } from '../services/driverService.js';
import { useAuth } from '../context/authContext.jsx';
import Navbar from '../components/Navbar.jsx';

const SimulationPage = () => {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      setDrivers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch drivers:", err);
      setDrivers([]);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await getSimulationHistory();
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchHistory();
  }, []);

  const handleRunSimulation = async () => {
    if (!selectedDrivers.length) return alert("Select at least one driver");
    try {
      await runSimulation(selectedDrivers);
      setSelectedDrivers([]);
      fetchHistory();
    } catch (err) {
      console.error("Simulation failed:", err.response?.data || err.message);
      alert("Simulation failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Simulation</h1>

        {user?.role !== "driver" && (
          <div className="mb-6">
            <h2 className="font-bold mb-2">Select Drivers</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {drivers.length > 0 ? (
                drivers.map(d => (
                  <label key={d._id} className="border p-2 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      value={d._id}
                      checked={selectedDrivers.includes(d._id)}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedDrivers(prev =>
                          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                        );
                      }}
                      className="mr-1"
                    />
                    {d.name}
                  </label>
                ))
              ) : (
                <p className="text-gray-500">No drivers available</p>
              )}
            </div>
            <button onClick={handleRunSimulation} className="bg-green-600 text-white py-2 px-4 rounded">
              Run Simulation
            </button>
          </div>
        )}

        <h2 className="font-bold mb-2">Simulation History</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Profit</th>
              <th className="border p-2">Efficiency</th>
              <th className="border p-2">Fuel Cost</th>
              <th className="border p-2">Total Deliveries</th>
              <th className="border p-2">On-Time</th>
              <th className="border p-2">Drivers</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? history.map(h => (
              <tr key={h._id}>
                <td className="border p-2">{new Date(h.date).toLocaleString()}</td>
                <td className="border p-2">{h.totalProfit}</td>
                <td className="border p-2">{h.efficiencyScore}%</td>
                <td className="border p-2">{h.fuelCost}</td>
                <td className="border p-2">{h.totalDeliveries}</td>
                <td className="border p-2">{h.onTimeDeliveries}</td>
                <td className="border p-2">
                  {h.drivers && h.drivers.length > 0 ? h.drivers.map(d => d.name).join(", ") : "N/A"}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No simulation history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimulationPage;
