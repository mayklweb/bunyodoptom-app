import axios from "axios";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";

const BASE_URL = import.meta.env.VITE_API_URL || "https://api.bunyodoptom.uz/api/v1";
const isNative = Capacitor.isNativePlatform();

// ========================================
// 🌐 WEB: Use Axios (existing behavior)
// ========================================
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to axios requests
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 errors for axios
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ========================================
// 📱 MOBILE: Use Capacitor HTTP
// ========================================
const capacitorHttp = {
  async request(method, url, data = null, config = {}) {
    // Get token
    const token = localStorage.getItem("token");
    
    // Build headers
    const headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Build full URL
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

    try {
      const response = await CapacitorHttp.request({
        method: method.toUpperCase(),
        url: fullUrl,
        headers,
        data,
      });

      // Handle 401 errors
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Unauthorized");
      }

      // Return axios-like response format
      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      // Convert to axios-like error format
      throw {
        response: {
          data: error.data || {},
          status: error.status || 500,
          headers: error.headers || {},
        },
        message: error.message || "Network error",
      };
    }
  },

  get(url, config) {
    return this.request("GET", url, null, config);
  },

  post(url, data, config) {
    return this.request("POST", url, data, config);
  },

  put(url, data, config) {
    return this.request("PUT", url, data, config);
  },

  delete(url, config) {
    return this.request("DELETE", url, null, config);
  },

  patch(url, data, config) {
    return this.request("PATCH", url, data, config);
  },
};

// ========================================
// 🎯 EXPORT: Auto-detect platform
// ========================================
export const api = isNative ? capacitorHttp : axiosInstance;