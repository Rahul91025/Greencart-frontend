import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });


const setAuthHeader = () => {
  const token = localStorage.getItem("token"); 
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getRoutes = () => API.get("/routes", setAuthHeader());
export const createRoute = (data) => API.post("/routes", data, setAuthHeader());
export const updateRoute = (id, data) => API.put(`/routes/${id}`, data, setAuthHeader());
export const deleteRoute = (id) => API.delete(`/routes/${id}`, setAuthHeader());
