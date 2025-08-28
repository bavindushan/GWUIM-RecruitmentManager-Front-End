<template>
    <!-- Navbar (Fixed) -->
    <nav class="navbar navbar-expand-lg fixed-top" :style="{ backgroundColor: '#660B05' }">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="@/assets/logo_s.png" alt="Logo" height="40" class="me-3" />
                <span class="text-white fw-bold">GWUIM Recruitment System</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-white d-flex align-items-center" @click="goToDashboard">
                            <i class="bi bi-house-door me-2"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white d-flex align-items-center" @click="goToApplications">
                            <i class="bi bi-file-earmark-text me-2"></i> My Applications
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white d-flex align-items-center" @click="goToSettings">
                            <i class="bi bi-gear me-2"></i> Settings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-warning fw-bold d-flex align-items-center" @click="logout">
                            <i class="bi bi-box-arrow-right me-2"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mt-5 pt-5">
        <h2 class="mb-5 text-center">Change Password</h2>

        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card p-4 shadow-lg rounded-4">
                    <h5 class="mb-3">Password Reset</h5>

                    <!-- Step 1: Enter email and send OTP -->
                    <div v-if="!otpSent">
                        <div class="mb-3">
                            <label class="form-label">Registered Email</label>
                            <input v-model="email" type="email" class="form-control" placeholder="Enter your email" />
                            <div class="alert alert-success mt-2" role="alert">
                                we will send OTP for your number related this Email you used to register
                            </div>
                        </div>
                        <button class="btn btn-primary w-100" @click="sendOtp" :disabled="!email">
                            Send OTP
                        </button>
                    </div>

                    <!-- Step 2: Enter OTP -->
                    <div v-else-if="!otpVerified">
                        <div class="mb-3">
                            <label class="form-label">Enter OTP</label>
                            <input v-model="otp" type="text" class="form-control" placeholder="Enter OTP" />
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-success w-100" @click="verifyOtp" :disabled="!otp">Verify
                                OTP</button>
                            <button class="btn btn-secondary w-50" @click="resendOtp">Resend OTP</button>
                        </div>
                        <p class="text-muted mt-2">OTP expires in {{ otpTimer }} seconds</p>
                    </div>

                    <!-- Step 3: Enter new password -->
                    <div v-else>
                        <div class="mb-3">
                            <label class="form-label">New Password</label>
                            <input v-model="newPassword" type="password" class="form-control"
                                placeholder="Enter new password" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Confirm New Password</label>
                            <input v-model="confirmPassword" type="password" class="form-control"
                                placeholder="Confirm new password" />
                        </div>
                        <button class="btn btn-success w-100" @click="changePassword"
                            :disabled="!newPassword || !confirmPassword">
                            Change Password
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- Footer Section -->
    <footer class="footer bg-dark text-white py-4 mt-5">
        <div class="container text-center">
            <p class="mb-0">© 2025 GWUIM Recruitment System. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api";
import router from "@/router";

const email = ref("");
const otp = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const otpSent = ref(false);
const otpVerified = ref(false);
const otpTimer = ref(60);
let timerInterval = null;

// Step 1: Send OTP
const sendOtp = async () => {
    if (!email.value) return;

    try {
        await api.post("/api/users/send-otp", { email: email.value });
        otpSent.value = true;
        otpTimer.value = 60;

        timerInterval = setInterval(() => {
            if (otpTimer.value > 0) otpTimer.value--;
            else clearInterval(timerInterval);
        }, 1000);

        Swal.fire("OTP Sent", "A verification code has been sent to your registered email.", "info");
    } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to send OTP", "error");
    }
};

// Step 2: Verify OTP
const verifyOtp = async () => {
    if (!otp.value) return;

    try {
        await api.post("/api/users/verify-otp", { email: email.value, otp: otp.value });
        otpVerified.value = true;
        clearInterval(timerInterval);
        Swal.fire("OTP Verified", "You can now set your new password.", "success");
    } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Invalid OTP", "error");
    }
};

// Step 3: Change Password
const changePassword = async () => {
    if (!newPassword.value || !confirmPassword.value) return;

    if (newPassword.value !== confirmPassword.value) {
        return Swal.fire("Error", "Passwords do not match", "warning");
    }

    try {
        await api.post("/api/users/change-password", {
            email: email.value,
            newPassword: newPassword.value,
            otp: otp.value
        });

        Swal.fire("Success", "Password changed successfully!", "success").then(() => {
            router.push("/dashboard");
        });
    } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to change password", "error");
    }
};

// Resend OTP
const resendOtp = async () => {
    otpSent.value = false;
    otpVerified.value = false;
    otp.value = "";
    await sendOtp();
};
</script>

<style scoped>
.card {
    max-width: 500px;
    margin: auto;
    background-color: #fff;
    border-radius: 15px;
}

.btn {
    min-width: 120px;
}

.text-muted {
    font-size: 0.9rem;
}
</style>
