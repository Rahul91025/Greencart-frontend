import API from './api.js';

export const getDrivers = () => API.get('/drivers');
export const createDriver = (data) => API.post('/drivers', data);
export const updateDriver = (id, data) => API.put(`/drivers/${id}`, data);
export const deleteDriver = (id) => API.delete(`/drivers/${id}`);
