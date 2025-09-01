<template>
    <div>
        <!-- Navbar -->
        <NavbarDashboard />

        <!-- Hero Section -->
        <section class="hero text-center d-flex flex-column justify-content-center">
            <div class="container">
                <img src="../assets/logo.png" alt="GWUIM Logo" class="logo-img mb-3" />
                <h1 class="display-5 fw-bold text-white mb-3">Welcome to GWUIM Recruitment System</h1>
                <p class="lead text-light mb-4">
                    Apply for jobs, track your applications, and monitor progress all in one platform.
                </p>
                <div>
                    <router-link to="/login" class="btn btn-outline-light btn-lg me-2">Login</router-link>
                    <router-link to="/register" class="btn btn-light btn-lg text-primary">Register</router-link>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="features py-5 bg-light">
            <div class="container">
                <div class="row text-center">
                    <div class="col-md-4 mb-4" v-for="feature in features" :key="feature.title">
                        <div class="card h-100 shadow-lg rounded-4 hover-card p-4">
                            <div class="card-body">
                                <div class="mb-3">
                                    <i :class="feature.icon + ' fs-1 text-primary'"></i>
                                </div>
                                <h5 class="card-title fw-bold">{{ feature.title }}</h5>
                                <p class="card-text">{{ feature.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call-to-Action Section -->
        <section class="cta text-center py-5">
            <div class="container">
                <h2 class="display-7 fw-bold mb-3 text-white">Ready to start your application?</h2>
                <router-link to="/register" class="btn btn-gradient btn-lg">Register Now</router-link>
            </div>
        </section>


    </div>
</template>

<script setup>
import NavbarDashboard from "@/components/NavbarDashboard.vue";

const features = [
    { title: "Easy Job Applications", description: "Submit applications online using our step-by-step form process.", icon: "bi bi-file-earmark-text" },
    { title: "Track Your Progress", description: "View all submitted applications and their statuses in one dashboard.", icon: "bi bi-bar-chart-line" },
    { title: "Admin Oversight", description: "Admins can upload templates, manage applications, and monitor activity.", icon: "bi bi-people" },
];
</script>

<style scoped>
/* Navbar */
.navbar {
    background-color: #660B05;
}

.navbar .nav-link {
    color: #fff;
    font-weight: bold;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
}

.navbar .nav-link i {
    font-size: 1rem;
}

.navbar .nav-link.btn-login:hover {
    color: #ffc107;
    transform: translateY(-2px);
}

.navbar .nav-link.btn-register:hover {
    color: #0d6efd;
    transform: translateY(-2px);
}

/* Hero */
.hero {
    min-height: 90vh;
    background: linear-gradient(135deg, #660B05, #9c1f1f);
    display: flex;
    align-items: center;
    text-align: center;
}

.logo-img {
    height: 180px;
    width: auto;
}

.hero .btn {
    border-radius: 40px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
}

.hero .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* Features Cards */
.hover-card {
    transition: all 0.3s ease-in-out;
}

.hover-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* CTA Section */
.cta {
    background: linear-gradient(90deg, #660B05, #9c1f1f);
    padding: 5rem 0;
}

.btn-gradient {
    background: linear-gradient(45deg, #ffc107, #ff6f61);
    border: none;
    color: #fff;
    font-weight: bold;
    border-radius: 50px;
    padding: 12px 35px;
}

.btn-gradient:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* Footer */
.footer {
    background-color: #1a1a1a;
    color: #fff;
}
</style>
