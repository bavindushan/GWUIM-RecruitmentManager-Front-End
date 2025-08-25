// src/axiosSetup.ts
import axios from "axios";
import Swal from "sweetalert2";

// Create axios instance
const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Request interceptor to attach token
api.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to catch expired/invalid tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {
    if (
        error.response &&
        error.response.status === 403 &&
        error.response.data?.message === "Invalid or expired token"
    ) {
        // Remove token and notify user
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
// src/axiosSetup.ts