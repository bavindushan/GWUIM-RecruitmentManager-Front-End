<template>
    <!-- Admin Navbar -->
    <AdminNavbar />

    <!-- Main Content -->
    <div class="container mt-5 pt-5">
        <!-- Page Title -->
        <h2 class="text-center mb-4">Post Job Vacancy</h2>

        <!-- Job Form -->
        <div>
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Job Title</label>
                    <input type="text" class="form-control" v-model="job.title" placeholder="Enter Job Title" />
                </div>

                <div class="col-md-6">
                    <label class="form-label">Department</label>
                    <select class="form-select" v-model="job.department">
                        <option value="">-- Select Department --</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Computer Science">Computer Science</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Level</label>
                    <select class="form-select" v-model="job.level">
                        <option value="">-- Select Level --</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Job Type</label>
                    <select class="form-select" v-model="job.type">
                        <option value="">-- Select Type --</option>
                        <option value="Academic">Academic</option>
                        <option value="Non_Academic">Non-Academic</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Template</label>
                    <select class="form-select" v-model.number="job.templateID">
                        <option value="">-- Select Template --</option>
                        <option value="2">Academic</option>
                        <option value="1">Non-Academic</option>
                    </select>
                </div>

                <div class="col-12">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="4" v-model="job.description"
                        placeholder="Enter Job Description"></textarea>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Expiry Date</label>
                    <input type="date" class="form-control" v-model="job.expiryDate" />
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
import AdminNavbar from "@/components/NavbarAdmin.vue";
import router from "@/router";

// Default job data
const job = ref({
    title: "",
    description: "",
    type: "",
    department: "",
    level: "",
    expiryDate: "",
    status: "Open",       // default status
    templateID: 0,
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
        // Validation
        if (
            !job.value.title ||
            !job.value.description ||
            !job.value.type ||
            !job.value.department ||
            !job.value.level ||
            !job.value.expiryDate ||
            !job.value.templateID
        ) {
            Swal.fire("Error", "Please fill all required fields.", "warning");
            return;
        }

        if (!job.value.PostedBy) {
            const admin = JSON.parse(localStorage.getItem("admin"));
            if (admin?.id) job.value.PostedBy = admin.id;
        }

        // Send request
        const res = await api.post("/api/admin/job-vacancies", job.value);

        if (res.data.status === "success") {
            Swal.fire("Success", res.data.message || "Job posted successfully!", "success");
            router.push("/admin/dashboard");
        } else {
            Swal.fire("Error", res.data.message || "Something went wrong.", "error");
        }

    } catch (err) {
        console.error("Job Post Error:", err.response?.data || err);
        Swal.fire("Error", err.response?.data?.message || "Failed to post job.", "error");
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
