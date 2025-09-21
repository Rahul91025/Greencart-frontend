import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api.js';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`; // attach token to all API requests
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, ...userData } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      API.defaults.headers.common['Authorization'] = `Bearer ${token}`; // attach token after login

      return true;
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      return false;
    }
  };

  const register = async (username, email, password, role = 'admin') => {
    try {
      const res = await API.post('/auth/register', { username, email, password, role });
      const { token, ...userData } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      API.defaults.headers.common['Authorization'] = `Bearer ${token}`; // attach token after register

      return true;
    } catch (err) {
      console.error('Register failed:', err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete API.defaults.headers.common['Authorization']; // remove token from API
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
