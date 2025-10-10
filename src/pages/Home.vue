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

        <!-- Stats Section -->
        <!-- <section class="stats-section py-5 bg-white">
            <div class="container">
                <div class="row text-center">
                    <div class="col-md-4 mb-4" v-for="stat in stats" :key="stat.label">
                        <div class="stat-card">
                            <div class="stat-number">{{ stat.number }}</div>
                            <div class="stat-label">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Features Section -->
        <!-- <section class="features py-6 bg-gradient-light">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="section-title mb-3">Why Choose GWUIM?</h2>
                    <p class="section-subtitle">Discover the features that make our recruitment platform exceptional</p>
                </div>
                
                <div class="row g-4">
                    <div class="col-lg-4 col-md-6" v-for="(feature, index) in features" :key="feature.title">
                        <div class="feature-card h-100" :class="'animate-slide-up-' + (index + 1)">
                            <div class="feature-icon-wrapper">
                                <i :class="feature.icon"></i>
                            </div>
                            <div class="feature-content">
                                <h5 class="feature-title">{{ feature.title }}</h5>
                                <p class="feature-description">{{ feature.description }}</p>
                                <a href="#" class="feature-link">
                                    Learn more <i class="bi bi-arrow-right ms-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Process Section -->
        <section class="process-section py-6 bg-white">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="section-title mb-3">How It Works</h2>
                    <p class="section-subtitle">Get started in just three simple steps</p>
                </div>
                
                <div class="row">
                    <div class="col-md-4 text-center mb-4" v-for="(step, index) in processSteps" :key="step.title">
                        <div class="process-step">
                            <div class="step-number">{{ index + 1 }}</div>
                            <div class="step-icon">
                                <i :class="step.icon"></i>
                            </div>
                            <h5 class="step-title">{{ step.title }}</h5>
                            <p class="step-description">{{ step.description }}</p>
                        </div>
                        <div v-if="index < processSteps.length - 1" class="step-connector d-none d-md-block"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonial Section -->
        <section class="testimonial-section py-6 bg-gradient-light">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="testimonial-content">
                            <div class="quote-icon">
                                <i class="bi bi-quote"></i>
                            </div>
                            <blockquote class="testimonial-text">
                                "The GWUIM recruitment system transformed our hiring process. 
                                It's intuitive, efficient, and has significantly improved our candidate experience."
                            </blockquote>
                            <div class="testimonial-author">
                                <div class="author-info">
                                    <h6 class="author-name">Sarah Johnson</h6>
                                    <p class="author-title">HR Director, TechCorp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="testimonial-image">
                            <div class="image-placeholder">
                                <i class="bi bi-person-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call-to-Action Section -->
        <section class="cta-section text-center py-6 position-relative overflow-hidden">
            <div class="cta-background"></div>
            <div class="container position-relative">
                <div class="cta-content">
                    <h2 class="cta-title mb-4">Ready to Transform Your Career Journey?</h2>
                    <p class="cta-subtitle mb-5">Join thousands of professionals who trust GWUIM for their recruitment needs</p>
                    <div class="cta-buttons p-2" :style="{ backgroundColor: '#660B05' }">
                        <router-link to="/register" class="btn btn-outline-light btn-lg" >
                            <i class="bi bi-rocket-takeoff me-2 "></i>Start Your Journey
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- Footer -->
    <FooterComponent />
</template>

<script setup>
import NavbarDashboard from "@/components/NavbarDashboard.vue";
import FooterComponent from "@/components/FooterComponent.vue";

const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Companies" },
    { number: "95%", label: "Success Rate" }
];

const features = [
    { 
        title: "Smart Application System", 
        description: "Streamlined application process with intelligent form validation and document management.", 
        icon: "bi bi-file-earmark-check" 
    },
    { 
        title: "Real-time Progress Tracking", 
        description: "Monitor your application status with live updates and detailed progress indicators.", 
        icon: "bi bi-graph-up-arrow" 
    },
    { 
        title: "Advanced Analytics", 
        description: "Gain insights into your application performance with comprehensive analytics dashboard.", 
        icon: "bi bi-bar-chart-line" 
    },
    { 
        title: "Secure & Reliable", 
        description: "Enterprise-grade security ensuring your data is protected with industry standards.", 
        icon: "bi bi-shield-check" 
    },
    { 
        title: "Mobile Optimized", 
        description: "Access your applications anywhere with our fully responsive mobile interface.", 
        icon: "bi bi-phone" 
    },
    { 
        title: "24/7 Support", 
        description: "Get help whenever you need it with our dedicated customer support team.", 
        icon: "bi bi-headset" 
    }
];

const processSteps = [
    {
        title: "Create Profile",
        description: "Sign up and build your comprehensive professional profile",
        icon: "bi bi-person-plus"
    },
    {
        title: "Apply for Jobs",
        description: "Browse opportunities and submit applications with ease",
        icon: "bi bi-briefcase"
    },
    {
        title: "Track Progress",
        description: "Monitor your applications and receive real-time updates",
        icon: "bi bi-graph-up"
    }
];
</script>

<style scoped>
/* Global Styles */
:root {
    --primary-color: #660B05;
    --primary-light: #9c1f1f;
    --secondary-color: #ffc107;
    --accent-color: #ff6f61;
    --text-dark: #2c3e50;
    --text-light: #6c757d;
    --bg-light: #f8f9fa;
    --white: #ffffff;
    --shadow-light: 0 2px 20px rgba(0,0,0,0.1);
    --shadow-medium: 0 5px 30px rgba(0,0,0,0.15);
    --shadow-heavy: 0 10px 40px rgba(0,0,0,0.2);
    --border-radius: 16px;
    --border-radius-lg: 24px;
    --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.py-6 {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
}

/* Animations */
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

.animate-fade-up {
    animation: fadeUp 1s ease-out;
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

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    z-index: 1;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(102, 11, 5, 0.9), rgba(156, 31, 31, 0.8));
    z-index: 2;
}

.hero-content {
    position: relative;
    z-index: 3;
}

.logo-img {
    height: 120px;
    width: auto;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    color: var(--white);
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.text-gradient {
    background: linear-gradient(45deg, var(--secondary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

.hero-buttons {
    margin-top: 2rem;
}

/* Floating Shapes */
.floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
}

.shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;
}

.shape-1 {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 120px;
    height: 120px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
}

.shape-3 {
    width: 60px;
    height: 60px;
    top: 30%;
    right: 25%;
    animation-delay: 4s;
}

/* Custom Buttons */
.btn-primary-custom {
    background: linear-gradient(45deg, var(--secondary-color), var(--accent-color));
    border: none;
    color: var(--white);
    font-weight: 600;
    border-radius: var(--border-radius);
    padding: 16px 32px;
    box-shadow: var(--shadow-medium);
    transition: var(--transition);
}

.btn-primary-custom:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
    color: var(--white);
}

.btn-secondary-custom {
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: var(--white);
    font-weight: 600;
    border-radius: var(--border-radius);
    padding: 14px 30px;
    backdrop-filter: blur(10px);
    transition: var(--transition);
}

.btn-secondary-custom:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    color: var(--white);
}

/* Stats Section */
.stats-section {
    margin-top: -50px;
    position: relative;
    z-index: 10;
}

.stat-card {
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-light);
    transition: var(--transition);
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
}

.stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-color);
    line-height: 1;
}

.stat-label {
    font-size: 1rem;
    color: var(--text-light);
    font-weight: 500;
    margin-top: 0.5rem;
}

/* Section Styles */
.section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--text-dark);
    position: relative;
}

.section-subtitle {
    font-size: 1.1rem;
    color: var(--text-light);
    max-width: 600px;
    margin: 0 auto;
}

.bg-gradient-light {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

/* Feature Cards */
.feature-card {
    background: var(--white);
    border-radius: var(--border-radius-lg);
    padding: 2.5rem;
    box-shadow: var(--shadow-light);
    transition: var(--transition);
    border: 1px solid rgba(0,0,0,0.05);
}

.feature-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-heavy);
}

.feature-icon-wrapper {
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.feature-icon-wrapper i {
    font-size: 2rem;
    color: var(--white);
}

.feature-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.feature-description {
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.feature-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
}

.feature-link:hover {
    color: var(--primary-light);
}

/* Process Section */
.process-step {
    position: relative;
    padding: 2rem;
}

.step-number {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-weight: 800;
    font-size: 1.2rem;
    box-shadow: var(--shadow-medium);
}

.step-icon {
    width: 100px;
    height: 100px;
    background: var(--bg-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    box-shadow: var(--shadow-light);
}

.step-icon i {
    font-size: 2.5rem;
    color: var(--primary-color);
}

.step-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.step-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* Testimonial Section */
.testimonial-content {
    padding: 2rem;
}

.quote-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
}

.quote-icon i {
    font-size: 2rem;
    color: var(--white);
}

.testimonial-text {
    font-size: 1.25rem;
    font-style: italic;
    color: var(--text-dark);
    line-height: 1.6;
    margin-bottom: 2rem;
    position: relative;
}

.author-name {
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 0.25rem;
}

.author-title {
    color: var(--text-light);
    margin: 0;
}

.testimonial-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-placeholder {
    width: 200px;
    height: 200px;
    background: var(--bg-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-medium);
}

.image-placeholder i {
    font-size: 6rem;
    color: var(--text-light);
}

/* CTA Section */
.cta-section {
    position: relative;
    overflow: hidden;
}

.cta-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    z-index: 1;
}

.cta-content {
    position: relative;
    z-index: 3;
}

.cta-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--white);
    margin-bottom: 1rem;
}

.cta-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin: 0 auto;
}

.btn-cta {
    background: linear-gradient(45deg, var(--secondary-color), var(--accent-color));
    border: none;
    color: var(--white);
    font-weight: 600;
    border-radius: var(--border-radius);
    padding: 16px 32px;
    box-shadow: var(--shadow-medium);
    transition: var(--transition);
}

.btn-cta:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
    color: var(--white);
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    .feature-card,
    .testimonial-content {
        padding: 1.5rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .cta-title {
        font-size: 2rem;
    }
}

@media (max-width: 576px) {
    .hero-buttons .btn {
        display: block;
        margin: 0.5rem 0;
    }
    
    .cta-buttons .btn {
        display: block;
        margin: 0.5rem 0;
    }
}
</style>