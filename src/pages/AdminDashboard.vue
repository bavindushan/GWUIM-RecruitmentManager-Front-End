<template>
    <div>
        <!-- Admin Navbar -->
        <AdminNavbar />

        <!-- Admin Cards -->
        <div class="container mt-5 pt-5">
            <h2 class="text-center mb-4">Welcome, {{ adminName }}</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card p-4 shadow-lg rounded-4 text-center" @click="goToPostJob">
                        <i class="bi bi-file-earmark-plus fs-1 mb-3"></i>
                        <h5>Post Job Vacancy</h5>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-4 shadow-lg rounded-4 text-center" @click="goToApplicants">
                        <i class="bi bi-people fs-1 mb-3"></i>
                        <h5>Manage Applicants</h5>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-4 shadow-lg rounded-4 text-center" @click="goToManageStatus">
                        <i class="bi bi-gear fs-1 mb-3"></i>
                        <h5>Manage Application Statuses</h5>
                    </div>
                </div>
            </div>
            <h3 class="text-center mb-3 mt-5">Job vacancies</h3>
        </div>

        <!-- Filter Section -->
        <div class="row g-3 mt-4 px-4">
            <div class="col-md-3">
                <select class="form-select" v-model="selectedType">
                    <option value="">Select Type</option>
                    <option value="Academic">Academic</option>
                    <option value="Non_Academic">Non-Academic</option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="form-select" v-model="selectedDepartment">
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Computer Science">Computer Science</option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="form-select" v-model="selectedLevel">
                    <option value="">Select Level</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                </select>
            </div>
            <div class="col-md-3">
                <input type="date" class="form-control" v-model="selectedDate" />
            </div>
        </div>

        <div class="text-end mt-3 px-4">
            <button class="btn btn-primary me-2" @click="applyFilters">
                <i class="bi bi-funnel me-2"></i> Apply Filters
            </button>
            <button class="btn btn-primary me-2" @click="resetFilters">
                <i class="bi bi-arrow-counterclockwise me-2"></i> Reset
            </button>
        </div>

        <!-- Job Table -->
        <div class="table-responsive mt-4 px-4">
            <table class="table align-middle">
                <thead style="background-color: #660B05; color: white;">
                    <tr>
                        <th>Title</th>
                        <th>Level</th>
                        <th class="text-center">Posted Date</th>
                        <th class="text-center">Expiry Date</th>
                        <th class="text-center">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(job, index) in paginatedJobs" :key="job.JobID"
                        :style="{ backgroundColor: index % 2 === 0 ? '#fffafa' : '#f8f0f0', cursor: 'pointer' }"
                        @click="goToJobDetails(job.JobID)">
                        <td>
                            <div class="table-cell">{{ job.Title }}</div>
                        </td>
                        <td>
                            <div class="table-cell">{{ job.Level }}</div>
                        </td>
                        <td class="text-center">
                            <div class="table-cell">{{ formatDate(job.PostedDate) }}</div>
                        </td>
                        <td class="text-center">
                            <div class="table-cell">{{ formatDate(job.ExpiryDate) }}</div>
                        </td>
                        <td class="text-center">
                            <div class="table-cell">{{ job.Type }} | {{ job.Department }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <nav v-if="totalPages > 1">
                <ul class="pagination justify-content-center mt-3">
                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- Footer Section -->
        <footer class="footer bg-dark text-white py-4 mt-5">
            <div class="container text-center">
                <p class="mb-0">© 2025 GWUIM Recruitment System. All rights reserved.</p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import router from "@/router";
import Swal from "sweetalert2";
import api from "@/services/api";
import AdminNavbar from "@/components/NavbarAdmin.vue";

const adminName = ref("Admin");

// Fetch admin info from localStorage
onMounted(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData?.fullName) adminName.value = adminData.fullName;
});

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

// Jobs & Filters
const jobs = ref([]);
const currentPage = ref(1);
const pageSize = 5;

const selectedDepartment = ref("");
const selectedLevel = ref("");
const selectedType = ref("");
const selectedDate = ref("");

// Navigation functions
const goToDashboard = () => router.push("/admin/dashboard");
const goToPostJob = () => router.push("/admin/post-job");
const goToApplicants = () => router.push("/admin/manage-applicants");
const goToManageStatus = () => router.push("/admin/manage-status");
const goToJobDetails = (id) => router.push(`/admin/job/${id}`);

// Fetch all jobs
const fetchJobs = async () => {
    try {
        const res = await api.get("/api/jobs/");
        jobs.value = res.data.data.jobs || [];
    } catch (err) {
        console.error(err);
    }
};

// Fetch filtered jobs
const fetchFilteredJobs = async (filters) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const res = await api.get(`/api/jobs/filter?${queryParams}`);
        jobs.value = res.data.data.jobs || [];
        currentPage.value = 1;
    } catch (err) {
        console.error(err);
    }
};

const applyFilters = () => {
    const filters = {
        department: selectedDepartment.value,
        level: selectedLevel.value,
        type: selectedType.value,
        closingDate: selectedDate.value
    };
    Object.keys(filters).forEach((key) => !filters[key] && delete filters[key]);
    fetchFilteredJobs(filters);
};

const resetFilters = () => {
    selectedDepartment.value = "";
    selectedLevel.value = "";
    selectedType.value = "";
    selectedDate.value = "";
    fetchJobs();
};

// Pagination
const changePage = (page) => currentPage.value = page;
const paginatedJobs = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return jobs.value.slice(start, start + pageSize);
});
const totalPages = computed(() => Math.ceil(jobs.value.length / pageSize));

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

// Fetch jobs on mounted
onMounted(() => {
    fetchJobs();
});
</script>

<style scoped>
.navbar {
    z-index: 1000;
}

.container {
    margin-top: 100px;
}

.card {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border-color: #660B05;
    box-shadow: #660B0533 0px 4px 12px;
}

.card i {
    color: #660B05;
    transition: color 0.3s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: #660B05;
    color: white;
}

.card:hover i {
    color: white;
}

h5 {
    margin-top: 10px;
}

.table-cell {
    background-color: #e8fae6;
    border-radius: 5px;
    padding: 8px;
}
</style>
