import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DriversPage from './pages/DriversPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import RoutesPage from './pages/RoutesPage.jsx';
import SimulationPage from './pages/SimulationPage.jsx';
import { useAuth } from './context/authContext.jsx';
import Homepage from './pages/Home.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path='/'  element={<Homepage/>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
    <Route path="/drivers" element={<PrivateRoute><DriversPage /></PrivateRoute>} />
    <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
    <Route path="/routes" element={<PrivateRoute><RoutesPage /></PrivateRoute>} />
    <Route path="/simulation" element={<PrivateRoute><SimulationPage /></PrivateRoute>} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
