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
                        <option value="Department of Ayurveda Basic Principles">Department of Ayurveda Basic Principles</option>
                        <option value="Department of Cikitsa">Department of Cikitsa</option>
                        <option value="Department of Drvyaguna vignatha">Department of Drvyaguna vignatha</option>
                        <option value="Department of Kaumarabhruthya and Streeroga">Department of Kaumarabhruthya and Streeroga</option>
                        <option value="Department of Shalyashalakya">Department of Shalyashalakya</option>
                        <option value="Department of Languages">Department of Languages</option>
                        <option value="Department of Rogavijnana">Department of Rogavijnana</option>
                        <option value="Department of Desheeya Cikitsa">Department of Desheeya Cikitsa</option>
                        <option value="Department of Indigenous Helth Sciences">Department of Indigenous Helth Sciences</option>
                        <option value="Department of Technology">Department of Technology</option>
                        <option value="Department of Indigenous Medical Resources">Department of Indigenous Medical Resources</option>
                        <option value="Department of Indigenous Social Sciences">Department of Indigenous Social Sciences</option>
                        <option value="Department of Management Studies">Department of Management Studies</option>
                        <option value="Department of Information Technology">Department of Information Technology</option>
                        <option value="Department of DV/K&SR/SS/RV/DC/C">Department of DV/K&SR/SS/RV/DC/C</option>
                        <option value="Other">Other</option>
                        <option value="Admin">Admin</option>
                     </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Level</label>
                    <select class="form-select" v-model="job.level">
                        <option value="">-- Select Level --</option>
                        <option value="Grade (i)">Grade (i)</option>
                        <option value="Grade (ii)">Grade (ii)</option>
                        <option value="Grade (iii)">Grade (iii)</option>
                        <option value="Other">Other</option>
                        <option value="N/A">N/A</option>
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
                    <label class="form-label">Description/Subjects (*this will add as SUBJECT feald in Interview Summary Table!*)</label>
                    <textarea class="form-control" rows="4" v-model="job.description"
                        placeholder="Enter Job Description/Subject"></textarea>
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

             <!-- Delete Job Section -->
            <h2 class="text-center mb-4 mt-5">Delete Job Vacancy</h2>

            <div class="col-md-6">
                <label class="form-label">Select Job to Delete</label>
                <select class="form-select" v-model="selectedJob">
                    <option value="">-- Select Job --</option>
                    <option v-for="job in jobs" :key="job.JobID" :value="job.JobID">
                        {{ job.Title }}
                    </option>
                </select>
            </div>

            <!-- Delete Button -->
            <div class="text-center mt-4">
                <button class="btn btn-danger px-5" @click="deleteJob">
                    <i class="bi bi-trash me-2"></i> Delete Job
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
// List of jobs
const jobs = ref([]);  // Initialize jobs as a ref

// Selected job for deletion
const selectedJob = ref('');

// Load jobs on mount
onMounted(async () => {
    // Set admin ID from local storage
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin?.id) job.value.PostedBy = admin.id;

    // Fetch jobs
    loadJobs();
});

const loadJobs = async () => {
    try {
        const res = await api.get("/api/admin/jobs-all");
        jobs.value = res.data.data || [];  // Use jobs.value to update the jobs list
    } catch (err) {
        Swal.fire("Error", "Failed to load jobs", "error");
    }
};


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

// Delete job
const deleteJob = async () => {
    if (!selectedJob.value) {
        Swal.fire("Error", "Please select a job to delete.", "warning");
        return;
    }

    try {
        const res = await api.delete(`/api/admin/job-vacancy/${selectedJob.value}`);
        if (res.data.status === "success") {
            Swal.fire("Success", res.data.message || "Job deleted successfully!", "success");
            // Refresh the jobs list after deletion
            loadJobs();
        } else {
            Swal.fire("Error", res.data.message || "Failed to delete job.", "error");
        }
    } catch (err) {
        console.error("Error deleting job:", err);
        Swal.fire("Error", err.response?.data?.message || "Failed to delete job.", "error");
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
/* Change text color of select dropdown */
.form-select {
    color: black; /* Set text color to black */
}

/* Ensure option text inside the select dropdown is also black */
.form-select option {
    color: black; /* Set option text color to black */
}

</style>
