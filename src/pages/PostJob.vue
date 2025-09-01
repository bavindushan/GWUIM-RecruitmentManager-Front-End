<template>
    <!-- Admin Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top" :style="{ backgroundColor: '#660B05' }">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="@/assets/logo_s.png" alt="Logo" height="40" class="me-3" />
                <span class="text-white fw-bold">GWUIM Recruitment Admin</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="adminNavbar">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="goToDashboard">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="goToPostJob">Post Job</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="goToApplicants">Applicants</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-warning fw-bold" @click="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Main Content -->
    <div class="container mt-5 pt-5">
        <!-- Page Title -->
        <h2 class="text-center mb-4">Post Job Vacancy</h2>

        <!-- Job Form -->
        <div>
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Job Title</label>
                    <input type="text" class="form-control" v-model="job.Title" placeholder="Enter Job Title" />
                </div>
                <div class="col-md-6">
                    <label class="form-label">Department</label>
                    <select class="form-select" v-model="job.Department">
                        <option value="">-- Select Department --</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Computer Science">Computer Science</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Level</label>
                    <select class="form-select" v-model="job.Level">
                        <option value="">-- Select Level --</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Job Type</label>
                    <select class="form-select" v-model="job.Type">
                        <option value="">-- Select Type --</option>
                        <option value="Academic">Academic</option>
                        <option value="Non_Academic">Non-Academic</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Template</label>
                    <select class="form-select" v-model="job.TemplateID">
                        <option value="">-- Select Template --</option>
                        <option value="2">Academic</option>
                        <option value="4">Non-Academic</option>
                    </select>
                </div>
                <div class="col-12">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="4" v-model="job.Description"
                        placeholder="Enter Job Description"></textarea>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Posted Date</label>
                    <input type="date" class="form-control" v-model="job.PostedDate" />
                </div>
                <div class="col-md-6">
                    <label class="form-label">Expiry Date</label>
                    <input type="date" class="form-control" v-model="job.ExpiryDate" />
                </div>
            </div>

            <!-- Publish Button -->
            <div class="text-center mt-4">
                <button class="btn btn-primary px-5" @click="publishJob">
                    <i class="bi bi-upload me-2"></i> Publish
                </button>
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
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api";
import router from "@/router";

// Default job data
const job = ref({
    Title: "",
    Description: "",
    Type: "",
    Department: "",
    Level: "",
    PostedBy: null,
    PostedDate: new Date().toISOString().split("T")[0], // today's date
    ExpiryDate: "",
    Status: "",
    TemplateID: null,
});

// Templates
const templates = ref([]);

onMounted(async () => {

    // Set admin ID from local storage
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin?.id) job.value.PostedBy = admin.id;
});

// Publish job
const publishJob = async () => {
    try {
        if (!job.value.Title || !job.value.Description || !job.value.Type || !job.value.Department ||
            !job.value.Level || !job.value.PostedDate || !job.value.ExpiryDate || !job.value.TemplateID) {
            Swal.fire("Error", "Please fill all required fields.", "warning");
            return;
        }

        const res = await api.post("/api/admin/job-vacancies", job.value);
        if (res.data.success) {
            Swal.fire("Success", "Job posted successfully!", "success");
            router.push("/admin/dashboard");
        }
    } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to post job.", "error");
    }
};

// Navigation functions
const goToDashboard = () => router.push("/admin/dashboard");
const goToPostJob = () => router.push("/admin/post-job");
const goToApplicants = () => router.push("/admin/applicants");
const goToManageStatus = () => router.push("/admin/manage-status");
const goToJobDetails = (id) => router.push(`/admin/job/${id}`);

// Logout
const logout = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, logout!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("admin");
            router.push("/admin/login");
            Swal.fire("Logged Out!", "You have been logged out.", "success");
        }
    });
};
</script>

<style scoped>
.container {
    margin-top: 100px;
}

.btn-primary {
    background-color: #660B05;
    border: none;
}

.btn-primary:hover {
    background-color: #9c1f1f;
}

.col:hover {
    box-shadow: #660B05 0px 4px 15px;
    transition: box-shadow 0.3s ease-in-out;
}
</style>
