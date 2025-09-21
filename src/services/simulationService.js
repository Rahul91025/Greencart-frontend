import API from './api.js';

export const runSimulation = (driverIds) => API.post('/simulations', { driverIds });
export const getSimulationHistory = () => API.get('/simulations');
