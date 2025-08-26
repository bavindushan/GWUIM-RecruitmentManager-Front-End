// src/services/api.js
import axios from "axios";
import Swal from "sweetalert2";

// Create Axios instance
const api = axios.create({
    baseURL: "http://localhost:5000", // Your backend base URL
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor: automatically attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle known error responses
            const status = error.response.status;
            if (status === 401) {
                Swal.fire("Unauthorized", "Please login to continue.", "warning");
                localStorage.removeItem("token");
                window.location.href = "/login"; // Redirect to login
            } else if (status === 403) {
                Swal.fire("Forbidden", "You do not have permission.", "error");
            } else if (status === 404) {
                Swal.fire("Not Found", "Requested resource not found.", "error");
            } else {
                Swal.fire(
                    "Error",
                    error.response.data.message || "Something went wrong.",
                    "error"
                );
            }
        } else {
            Swal.fire("Error", "Network error or server not reachable.", "error");
        }

        return Promise.reject(error);
    }
);

export default api;
