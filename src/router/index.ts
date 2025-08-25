// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";

// Static imports for common pages
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Applications from "../pages/Applications.vue";
import RegisterPage from "../pages/RegisterPage.vue";

const routes = [
    { path: "/", component: Home, meta: { guest: true } },
    { path: "/login", component: Login, meta: { guest: true } },
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/applications", component: Applications, meta: { requiresAuth: true } },
    { path: "/register", name: "Register", component: RegisterPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
