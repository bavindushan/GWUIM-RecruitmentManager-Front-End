<template>
    <!-- Navbar -->
        <NavbarUser @navigate="handleNavigation" @logout="logout" />

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
                                We will send OTP to the number linked with this Email used to register.
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
                                placeholder="Enter new password" @input="checkStrength" />
                            <div class="progress mt-2" style="height: 6px;">
                                <div class="progress-bar" :class="strengthClass" role="progressbar"
                                    :style="{ width: strengthPercent + '%' }"></div>
                            </div>
                            <small class="text-muted">Strength: {{ strengthLabel }}</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Confirm New Password</label>
                            <input v-model="confirmPassword" type="password" class="form-control"
                                placeholder="Confirm new password" />
                        </div>
                        <button class="btn btn-success w-100" @click="changePassword"
                            :disabled="!newPassword || !confirmPassword || strengthLabel==='Weak'">
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
import NavbarUser from "@/components/NavbarUser.vue";

const email = ref("");
const otp = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const otpSent = ref(false);
const otpVerified = ref(false);
const otpTimer = ref(60);

const strengthPercent = ref(0);
const strengthLabel = ref("Weak");
const strengthClass = ref("bg-danger");

let timerInterval = null;

// Step 1: Send OTP
const sendOtp = async () => {
    try {
        await api.post("/api/otp/generate-otp", { purpose: "password_reset" });

        otpSent.value = true;
        otpTimer.value = 60;

        timerInterval = setInterval(() => {
            if (otpTimer.value > 0) otpTimer.value--;
            else clearInterval(timerInterval);
        }, 1000);

        Swal.fire(
            "OTP Sent",
            "A verification code has been sent to your registered phone number.",
            "info"
        );
    } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to send OTP", "error");
    }
};

// Step 2: Verify OTP
const verifyOtp = async () => {
    if (!otp.value) return Swal.fire("Error", "Please enter the OTP", "warning");

    try {
        await api.post("/api/otp/verify-otp", {
            otpCode: otp.value,
            purpose: "password_reset"
        });

        otpVerified.value = true;
        clearInterval(timerInterval);
        Swal.fire("OTP Verified", "You can now set your new password.", "success");
    } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Invalid OTP", "error");
    }
};

// Step 3: Change Password
const changePassword = async () => {
    if (!otpVerified.value) {
        return Swal.fire("Error", "Please verify OTP first", "warning");
    }

    if (newPassword.value !== confirmPassword.value) {
        return Swal.fire("Error", "Passwords do not match", "warning");
    }

    try {
        await api.post("/api/user/reset-password", {
            newPassword: newPassword.value,
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

// Password Strength Checker
const checkStrength = () => {
    const pass = newPassword.value;
    let score = 0;

    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[a-z]/.test(pass)) score += 20;
    if (/[0-9]/.test(pass)) score += 20;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;

    strengthPercent.value = score;

    if (score < 40) {
        strengthLabel.value = "Weak";
        strengthClass.value = "bg-danger";
    } else if (score < 70) {
        strengthLabel.value = "Medium";
        strengthClass.value = "bg-warning";
    } else {
        strengthLabel.value = "Strong";
        strengthClass.value = "bg-success";
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
.card {
    max-width: 500px;
    margin: auto;
    background-color: #fff;
    border-radius: 15px;
}

.progress {
    height: 6px;
}

.text-muted {
    font-size: 0.9rem;
}
</style>
