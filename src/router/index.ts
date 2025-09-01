// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import LoginPage from "../pages/LoginPage.vue";
import Dashboard from "../pages/Dashboard.vue";
import Applications from "../pages/Applications.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import JobDetails from "../pages/JobDetails.vue";
import ApplyJob from "../pages/ApplyJob.vue";
import ApplicantSettings from "../pages/ApplicantSettings.vue";
import AdminLogin from "../pages/AdminLogin.vue";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";

// Define your routes
const routes = [
    { path: "/", component: Home, meta: { guest: true } },
    { path: "/login", component: LoginPage, meta: { guest: true } },
    { path: "/admin/login", component: AdminLogin, meta: { guest: true } },
    { path: "/register", component: RegisterPage, meta: { guest: true } },
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/applications", component: Applications, meta: { requiresAuth: true } },
    { path: "/job/:jobId", component: JobDetails, meta: { requiresAuth: true } }, // Job details page
    { path: "/apply/:jobId", component: ApplyJob, meta: { requiresAuth: true } },   // Apply for job page
    { path: "/applicant-settings", component: ApplicantSettings, meta: { requiresAuth: true } },
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
            Swal.fire({
                icon: "warning",
                title: "Authentication required",
                text: "Please login to access this page.",
            });
            return next("/login");
        }
    }

    // Redirect logged-in users away from login/register
    if ((to.path === "/login" || to.path === "/register") && token) {
        return next("/dashboard");
    }

    next();
});

export default router;
