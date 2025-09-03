// src/services/api.js
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        // Check all three roles
        const userToken = localStorage.getItem("token");
        const adminToken = localStorage.getItem("adminToken");
        const superAdminToken = localStorage.getItem("superAdminToken");

        // Attach whichever is available, priority: superAdmin > admin > user
        if (superAdminToken) {
            config.headers["Authorization"] = `Bearer ${superAdminToken}`;
        } else if (adminToken) {
            config.headers["Authorization"] = `Bearer ${adminToken}`;
        } else if (userToken) {
            config.headers["Authorization"] = `Bearer ${userToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 401:
                    Swal.fire("Unauthorized", "Please login to continue.", "warning");
                    localStorage.removeItem("token");
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("superAdminToken");
                    router.push("/");
                    break;
                case 403:
                    Swal.fire("Forbidden", "You do not have permission.", "error");
                    router.push("/");
                    break;
                case 404:
                    Swal.fire("Not Found", "Requested resource not found.", "error");
                    router.push("/");
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
