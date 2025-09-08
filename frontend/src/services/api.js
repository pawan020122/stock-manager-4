import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🟢 Stocks API
export const getProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/products/create", data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const getTotalSales = () => API.get("/sales/total");

export default API;
