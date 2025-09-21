import API from './api.js';

export const register = async (name, email, password, role = 'manager') => {
  return API.post('/auth/register', { username: name, email, password, role });
};

export const login = async (email, password) => {
  return API.post('/auth/login', { email, password });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
