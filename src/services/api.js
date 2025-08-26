// src/services/api.js
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router"; // Import Vue Router instance

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
            const status = error.response.status;

            switch (status) {
                case 401:
                    Swal.fire("Unauthorized", "Please login to continue.", "warning");
                    localStorage.removeItem("token");
                    router.push("/login"); // Navigate using Vue Router
                    break;
                case 403:
                    Swal.fire("Forbidden", "You do not have permission.", "error");
                    break;
                case 404:
                    Swal.fire("Not Found", "Requested resource not found.", "error");
                    break;
                default:
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
