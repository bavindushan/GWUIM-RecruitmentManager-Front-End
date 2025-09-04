<template>
    <!-- Navbar -->
        <NavbarDashboard />
    <section class="register-section py-5 mt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow-lg p-4 rounded-3">
                        <h2 class="text-center mb-4">Create an Account</h2>

                        <!-- Register Form -->
                        <form @submit.prevent="handleRegister">
                            <!-- Full Name -->
                            <div class="mb-3">
                                <label for="fullName" class="form-label bi bi-pen"> Full Name</label>
                                <input type="text" v-model="form.FullName" class="form-control" id="fullName"
                                    placeholder="Enter your full name" required />
                            </div>

                            <!-- Email -->
                            <div class="mb-3">
                                <label for="email" class="form-label bi bi-envelope-at"> Email Address</label>
                                <input type="email" v-model="form.Email" class="form-control" id="email"
                                    placeholder="Enter your email" required />
                            </div>

                            <!-- Password -->
                            <div class="mb-3">
                                <label for="password" class="form-label bi bi-shield-lock"> Password</label>
                                <input type="password" v-model="form.Password" class="form-control" id="password"
                                    placeholder="Enter your password" required />
                            </div>

                            <!-- Confirm Password -->
                            <div class="mb-3">
                                <label for="confirm_password" class="form-label bi bi-shield-lock"> Confirm Password</label>
                                <input type="password" v-model="form.ConfirmPassword" class="form-control" id="confirm_password"
                                    placeholder="Confirm your password" required />
                            </div>

                            <!-- NIC -->
                            <div class="mb-3">
                                <label for="nic" class="form-label bi bi-person-vcard-fill"> NIC</label>
                                <input type="text" v-model="form.NIC" class="form-control" id="nic"
                                    placeholder="Enter your NIC" required />
                            </div>

                            <!-- Phone Number -->
                            <div class="mb-3">
                                <label for="phone" class="form-label bi bi-telephone-plus"> Phone Number</label>
                                <input type="text" v-model="form.PhoneNumber" class="form-control" id="phone"
                                    placeholder="Enter your phone number" required />
                            </div>

                            <!-- Address -->
                            <div class="mb-3">
                                <label for="address" class="form-label bi bi-signpost"> Address</label>
                                <input type="text" v-model="form.Address" class="form-control" id="address"
                                    placeholder="Enter your address" required />
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="btn btn-primary w-100">Register</button>
                        </form>

                        <!-- Link to Login -->
                        <p class="mt-3 text-center">
                            Already have an account?
                            <router-link to="/login">Login here</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Footer -->
    <FooterComponent />
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import NavbarDashboard from "@/components/NavbarDashboard.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
    name: "RegisterPage",
    data() {
        return {
            form: {
                FullName: "",
                Email: "",
                Password: "",
                ConfirmPassword: "",
                NIC: "",
                PhoneNumber: "",
                Address: "",
            },
        };
    },
    methods: {
        async handleRegister() {
            // Check if password & confirm password match
            if (this.form.Password !== this.form.ConfirmPassword) {
                Swal.fire({
                    icon: "error",
                    title: "Password Mismatch",
                    text: "Password and Confirm Password must be the same!",
                });
                return;
            }

            // Show Terms & Conditions checkbox
            const { value: accept } = await Swal.fire({
                title: "Terms and Conditions",
                input: "checkbox",
                inputValue: 0,
                inputPlaceholder: "I agree with the terms and conditions",
                confirmButtonText: "Continue",
                inputValidator: (result) => {
                    return !result && "You need to agree with T&C";
                },
            });

            if (!accept) return; // Stop if not accepted

            try {
                // Call API
                const response = await axios.post(
                    "http://localhost:5000/api/user/register",
                    {
                        FullName: this.form.FullName,
                        Email: this.form.Email,
                        Password: this.form.Password,
                        NIC: this.form.NIC,
                        PhoneNumber: this.form.PhoneNumber,
                        Address: this.form.Address,
                    }
                );

                if (response.status === 201 || response.status === 200) {
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

                    // Reset Form
                    this.form = {
                        FullName: "",
                        Email: "",
                        Password: "",
                        ConfirmPassword: "",
                        NIC: "",
                        PhoneNumber: "",
                        Address: "",
                    };
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response?.data?.message || "Something went wrong!",
                });
            }
        },
    },
    components: {
        FooterComponent,
        NavbarDashboard,
    },
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
