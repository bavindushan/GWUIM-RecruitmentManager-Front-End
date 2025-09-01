<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark shadow-sm">
        <div class="container">
            <!-- Logo + Brand -->
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="@/assets/logo_s.png" alt="Logo" height="40" class="me-2 shadow-sm" />
                <span class="fw-bold text-white">GWUIM Recruitment System</span>
            </a>

            <!-- Toggler -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Links -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-lg-center">
                    <li class="nav-item me-2">
                        <router-link class="nav-link btn-login" to="/login">
                            <i class="bi bi-box-arrow-in-right me-1"></i> Login
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link btn-register" to="/register">
                            <i class="bi bi-person-plus-fill me-1"></i> Register
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
    background-color: #660B05;
    z-index: 1000;
}
</style>
