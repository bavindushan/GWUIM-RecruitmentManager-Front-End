// src/axiosSetup.ts
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

// Helper function to check expiry
function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // invalid token
  }
}

// Create axios instance
const api = axios.create({
  baseURL: "http://172.17.141.3:5000/api", // ✅ use LAN backend URL
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "warning",
          title: "Session expired",
          text: "Your session has expired. Please log in again.",
        }).then(() => {
          window.location.href = "/login";
        });
        throw new axios.Cancel("Token expired — request cancelled");
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("token");
      Swal.fire({
        icon: "warning",
        title: "Session expired",
        text: "Please login again.",
      }).then(() => {
        window.location.href = "/login";
      });
    }
    return Promise.reject(error);
  }
);

export default api;
