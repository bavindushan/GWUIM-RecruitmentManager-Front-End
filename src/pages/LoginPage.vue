<template>
    <section class="register-section py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow-lg p-4 rounded-3">
                        <h2 class="text-center mb-4">Login</h2>

                        <!-- Login Form -->
                        <form @submit.prevent="handleLogin">
                            <!-- Email -->
                            <div class="mb-3">
                                <label for="email" class="form-label">Email Address</label>
                                <input type="email" v-model="email" class="form-control" id="email"
                                    placeholder="Enter your email" required />
                            </div>

                            <!-- Password -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password"
                                    placeholder="Enter your password" required />
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>

                        <!-- Link to Register -->
                        <p class="mt-3 text-center">
                            Don't have an account?
                            <router-link to="/register">Register here</router-link>
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
import axios from "axios";

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
        const response = await axios.post("http://localhost:5000/api/user/sign-in", {
            email: email.value,
            password: password.value,
        });

        console.log("Login response:", response.data);

        // Store JWT token and user info separately
        //const tokenData = response.data.token;
        // Access safely
        const tokenData = response.data.token;
        const jwtToken = tokenData?.token; // optional chaining to avoid undefined
        const userInfo = tokenData?.user;

        if (!jwtToken) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Token not received from backend",
            });
            return;
        }


        localStorage.setItem("token", tokenData.token); // Save as string
        localStorage.setItem("user", JSON.stringify(tokenData.user)); // Save user info

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
            title: "Signed in successfully",
        });

        // Redirect to Dashboard after setting token
        window.location.href = "/dashboard";
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.response?.data?.message || "Something went wrong!",
        });
    }
};
</script>

<style scoped>
.register-section {
    background: #f9f9f9;
    min-height: 100vh;
}

.card {
    border: none;
    background: #ffffff;
}

button {
    background-color: #800000;
    border: none;
}

button:hover {
    background-color: #a00000;
}
</style>
