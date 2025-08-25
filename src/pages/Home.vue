    <template>
        <div>
            <!-- Hero Section -->
            <section class="hero text-center py-5">
                <div class="container">
                    <!-- Only Logo -->
                    <div class="logo-header mb-3">
                        <img src="../assets/logo.png" alt="GWUIM Logo" class="logo-img" />
                    </div>
                </div>
            </section>

            <section class="hero bg-light text-center py-5">
                <div class="container">
                    <h1 class="display-4">Welcome to GWUIM Recruitment System</h1>
                    <p class="lead mt-3">
                        Find jobs, submit applications, and track your progress all in one
                        place.
                    </p>
                    <div class="mt-4">
                        <router-link to="/login" class="btn btn-primary me-2">Login</router-link>
                        <router-link to="/register" class="btn btn-success">Register</router-link>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="features py-5">
                <div class="container">
                    <div class="row text-center">
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">Easy Job Applications</h5>
                                    <p class="card-text">
                                        Submit applications online using our step-by-step form
                                        process.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">Track Your Progress</h5>
                                    <p class="card-text">
                                        View all submitted applications and their statuses in one
                                        dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">Admin Oversight</h5>
                                    <p class="card-text">
                                        Admins can upload templates, manage applications, and monitor
                                        activity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Call-to-Action Section -->
            <section class="cta bg-light text-white text-center py-5">
                <div class="container">
                    <h2 class="display-6 text-black">Ready to start your application?</h2>
                    <router-link to="/register" class="btn btn-primary mt-3">Register Now</router-link>
                </div>
            </section>
        </div>
    </template>

<script setup></script>

<style scoped>
.hero {
    background-color: #660B05;
}

.logo-header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-img {
    height: 200px;
    width: auto;
}

.features .card {
    transition: transform 0.2s;
}

.features .card:hover {
    transform: translateY(-5px);
}

.cta {
    background: #0d6efd;
}
</style>
