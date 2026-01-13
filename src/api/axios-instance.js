import axios from "axios";

export const api = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
