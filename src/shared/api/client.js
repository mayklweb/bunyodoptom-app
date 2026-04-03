import axios from "axios";
import { useAuthStore } from "../../features/auth/model/useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.bunyodoptom.uz/api/v1",
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});