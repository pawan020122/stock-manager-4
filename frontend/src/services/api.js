// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://stock-manager-4.onrender.com/api", // deployed backend link
  withCredentials: true, // only if you are using cookies/session
});



// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🟢 Stocks API
export const getProducts = () => api.get("/products");
export const createProduct = (data) => api.post("/products/create", data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const getTotalSales = () => api.get("/sales/total");

export default api;
