// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import LoginPage from "../pages/LoginPage.vue";
import Dashboard from "../pages/Dashboard.vue";
import Applications from "../pages/Applications.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";


// Define your routes
const routes = [
    { path: "/", component: Home, meta: { guest: true } },
    { path: "/login", component: LoginPage, meta: { guest: true } },
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/applications", component: Applications, meta: { requiresAuth: true } },
    { path: "/register", component: RegisterPage, meta: { guest: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route Guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth) {
        if (!token) {
            // No token, redirect to login
            Swal.fire({
                icon: "warning",
                title: "Authentication required",
                text: "Please login to access this page.",
            });
            return next("/login");
        }
        // We no longer decode JWT here; backend will validate it in API calls
    }

    // Redirect logged-in users away from login/register
    if ((to.path === "/login" || to.path === "/register") && token) {
        return next("/dashboard");
    }

    next();
});

export default router;
