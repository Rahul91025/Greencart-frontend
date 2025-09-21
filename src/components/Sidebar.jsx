import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
        <li><Link to="/simulation" className="hover:text-blue-500">Simulation</Link></li>
        <li><Link to="/drivers" className="hover:text-blue-500">Drivers</Link></li>
        <li><Link to="/orders" className="hover:text-blue-500">Orders</Link></li>
        <li><Link to="/routes" className="hover:text-blue-500">Routes</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
