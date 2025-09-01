<template>
    <!-- Navbar -->
    <NavbarUser @navigate="handleNavigation" @logout="logout" />

    <section class="admin-login-section py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow-lg p-4 rounded-3">
                        <h2 class="text-center mb-4" style="color: #660B05;">Admin Login</h2>

                        <!-- Login Form -->
                        <form @submit.prevent="handleLogin">
                            <!-- Email -->
                            <div class="mb-3">
                                <label for="email" class="form-label">Email Address</label>
                                <input type="email" v-model="email" class="form-control" id="email"
                                    placeholder="Enter admin email" required />
                            </div>

                            <!-- Password -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password"
                                    placeholder="Enter password" required />
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="btn btn-primary w-100">
                                <i class="bi bi-box-arrow-in-right me-2"></i> Login
                            </button>
                        </form>

                        <!-- Link to Home -->
                        <p class="mt-3 text-center">
                            Back to
                            <router-link to="/">Home</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api";
import router from "@/router";
import NavbarUser from "@/components/NavbarUser.vue";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
    try {
        // Terms & Conditions popup
        const { value: accept } = await Swal.fire({
            title: "Terms and Conditions",
            input: "checkbox",
            inputValue: 1,
            inputPlaceholder: "I agree with the terms and conditions",
            confirmButtonText: "Continue",
            inputValidator: (result) => {
                return !result && "You need to agree with T&C";
            },
        });

        if (!accept) return;

        // Send login request
        const response = await api.post("/api/admin/sign-in", {
            email: email.value,
            password: password.value,
        });

        const tokenData = response.data.token;
        const adminInfo = response.data.admin;

        if (!tokenData) {
            return Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Token not received from backend",
            });
        }

        localStorage.setItem("adminToken", tokenData);
        localStorage.setItem("admin", JSON.stringify(adminInfo));

        // Success Toast
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            icon: "success",
            title: "Admin signed in successfully",
        });

        // Redirect to Admin Dashboard
        router.push("/admin/dashboard");
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.response?.data?.message || "Something went wrong!",
        });
    }
};

// Handle navbar navigation events
function handleNavigation(page) {
    if (page === "dashboard") router.push("/dashboard");
    if (page === "applications") router.push("/applications");
    if (page === "applicant-settings") router.push("/applicant-settings");
}
</script>

<style scoped>
.admin-login-section {
    background: #f9f9f9;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.card {
    border: none;
    background: #ffffff;
}

button.btn-primary {
    background-color: #660B05;
    border: none;
}

button.btn-primary:hover {
    background-color: #9c1f1f;
}
</style>
