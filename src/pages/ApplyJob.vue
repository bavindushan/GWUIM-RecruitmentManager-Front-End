<template>
    <!-- Navbar -->
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
                    <li class="nav-item"><a class="nav-link text-white" @click="goToDashboard"><i
                                class="bi bi-house-door me-2"></i> Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link text-white" @click="goToApplications"><i
                                class="bi bi-file-earmark-text me-2"></i> My Applications</a></li>
                    <li class="nav-item"><a class="nav-link text-white" @click="goToSettings"><i
                                class="bi bi-gear me-2"></i> Settings</a></li>
                    <li class="nav-item"><a class="nav-link text-warning fw-bold" @click="logout"><i
                                class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container py-5 mt-5">
        <h2 class="fw-bold mb-3 text-center">Apply for {{ job.Title || "Job" }}</h2>
        <div class="text-center mb-4">
            <span class="badge" :class="job.Status === 'Open' ? 'text-bg-success' : 'text-bg-secondary'">
                {{ job.Status }}
            </span>
        </div>

        <!-- Load correct form -->
        <div v-if="job.Type === 'Academic'">
            <AcademicForm ref="formRef" />
        </div>
        <div v-else-if="job.Type === 'Non_Academic'">
            <NonAcademicForm ref="formRef" />
        </div>

        <!-- Submit Button -->
        <div class="text-center mt-4">
            <button @click="handleSubmit" class="btn btn-success btn-lg">Submit Application</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

// Import centralized Axios instance
import api from "../services/api";

// Child form components
import AcademicForm from "../components/AcademicForm.vue";
import NonAcademicForm from "../components/NonAcademicForm.vue";

const route = useRoute();
const router = useRouter();
const jobId = route.params.jobId;
const job = ref({});
const formRef = ref(null);

// Navbar navigation
function goToDashboard() { router.push("/dashboard"); }
function goToApplications() { router.push("/applications"); }
function goToSettings() { router.push("/settings"); }
function logout() {
    localStorage.removeItem("token");
    router.push("/login");
}

// Fetch job details using api.js
async function fetchJobDetails() {
    try {
        const res = await api.get(`/api/jobs/${jobId}`);
        job.value = res.data.data;
    } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load job details.", "error");
    }
}

// Submit application
async function handleSubmit() {
    if (!formRef.value || typeof formRef.value.submitForm !== "function") {
        Swal.fire("Error", "Form component not ready.", "error");
        return;
    }

    try {
        await formRef.value.submitForm(jobId); // Form handles API calls via api.js
        Swal.fire("Success", "Application submitted successfully!", "success").then(() => {
            router.push("/applications");
        });
    } catch (err) {
        Swal.fire("Error", "Submission failed. All changes rolled back.", "error");
    }
}

onMounted(fetchJobDetails);
</script>

<style scoped>
.btn-lg {
    border-radius: 50px;
    padding: 10px 25px;
    font-weight: bold;
}

.badge {
    font-size: 1rem;
    padding: 0.5rem 1rem;
}
</style>
