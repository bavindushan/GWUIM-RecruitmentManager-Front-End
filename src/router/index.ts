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
import AdminDashboard from "../pages/AdminDashboard.vue";
import PostJob from "../pages/PostJob.vue";
import ApplicationStatusManagement from "../pages/ApplicationStatusManage.vue";
import ManageApplicants from "../pages/ManageApplicants.vue";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";

const routes = [
    { path: "/", component: Home, meta: { guest: true } },
    { path: "/login", component: LoginPage, meta: { guest: true } },
    { path: "/admin/login", component: AdminLogin, meta: { guest: true } },
    { path: "/register", component: RegisterPage, meta: { guest: true } },
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true, role: "user" } },
    { path: "/admin/dashboard", component: AdminDashboard, meta: { requiresAuth: true, role: "admin" } },
    { path: "/applications", component: Applications, meta: { requiresAuth: true, role: "user" } },
    { path: "/job/:jobId", component: JobDetails, meta: { requiresAuth: true, role: "user" } },
    { path: "/apply/:jobId", component: ApplyJob, meta: { requiresAuth: true, role: "user" } },
    { path: "/applicant-settings", component: ApplicantSettings, meta: { requiresAuth: true, role: "user" } },
    { path: "/admin/post-job", component: PostJob, meta: { requiresAuth: true, role: "admin" } },
    { path: "/admin/manage-status", component: ApplicationStatusManagement, meta: { requiresAuth: true, role: "admin" } },
    { path: "/admin/manage-applicants", component: ManageApplicants, meta: { requiresAuth: true, role: "admin" } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route Guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (to.meta.requiresAuth) {
        if (to.meta.role === "admin") {
            if (!adminToken) {
                return Swal.fire({
                    icon: "warning",
                    title: "Admin Authentication Required",
                    text: "Please login as admin to access this page.",
                }).then(() => next("/admin/login"));
            }
        } else if (to.meta.role === "user") {
            if (!token) {
                return Swal.fire({
                    icon: "warning",
                    title: "Authentication Required",
                    text: "Please login to access this page.",
                }).then(() => next("/login"));
            }
        }
    }

    // Prevent logged-in users from seeing login pages
    if (to.path === "/login" && token) return next("/dashboard");
    if (to.path === "/admin/login" && adminToken) return next("/admin/dashboard");

    next();
});


export default router;
