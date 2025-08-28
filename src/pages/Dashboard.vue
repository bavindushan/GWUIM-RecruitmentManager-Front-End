<template>
    <div>
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
        <div class="container mt-5 pt-5 p-4 rounded" :style="{ backgroundColor: 'white' }">
            <h2 class="text-right" :style="{ color: '#800000' }">Welcome back, {{ username }}</h2>
            <p class="text-muted text-right">Here you can view our job vacancies and apply within minutes.</p>

            <!-- Filter Section -->
            <div class="row g-3 mt-2">
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

            <div class="text-end mt-3">
                <button class="btn btn-primary me-2" @click="applyFilters">
                    <i class="bi bi-funnel me-2"></i> Apply Filters
                </button>
                <button class="btn btn-primary me-2y" @click="resetFilters">
                    <i class="bi bi-arrow-counterclockwise me-2"></i> Reset
                </button>
            </div>


            <!-- Job Table -->
            <div class="table-responsive mt-4">
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
                                <div style="background-color: #e8fae6; border-radius: 5px; padding: 8px;">
                                    <small>{{ job.Title }}</small>
                                </div>
                            </td>
                            <td>
                                <div style="background-color: #e8fae6; border-radius: 5px; padding: 8px;">
                                    <small>{{ job.Level }}</small>
                                </div>
                            </td>
                            <td class="text-center">
                                <div style="background-color: #e8fae6; border-radius: 5px; padding: 8px;">
                                    <small>{{ formatDate(job.PostedDate) }}</small>
                                </div>
                            </td>
                            <td class="text-center">
                                <div style="background-color: #e8fae6; border-radius: 5px; padding: 8px;">
                                    <small>{{ formatDate(job.ExpiryDate) }}</small>
                                </div>
                            </td>
                            <td class="text-center">
                                <div style="background-color: #e8fae6; border-radius: 5px; padding: 8px;">
                                    <small>{{ job.Type }} | {{ job.Department }}</small>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

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
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import api from "@/services/api"; // use the Axios instance

const router = useRouter();
const username = ref("User");
const jobs = ref([]);
const currentPage = ref(1);
const pageSize = 5;

// Filters
const selectedDepartment = ref("");
const selectedLevel = ref("");
const selectedType = ref("");
const selectedDate = ref("");

// Fetch jobs on page load
onMounted(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.FullName) username.value = userData.FullName;
    fetchJobs();
});

// Fetch all jobs (initial load)
async function fetchJobs() {
    try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/jobs/");
        jobs.value = res.data.data.jobs || [];
    } catch (err) {
        console.error(err);
        // Swal.fire("Error", "Failed to load jobs.", "error");
        // console.log("methana thama place eka");
        // goToLoginPage();
    }
}

// Fetch filtered jobs
async function fetchFilteredJobs(filters) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const res = await api.get(`/api/jobs/filter?${queryParams}`);
        jobs.value = res.data.data.jobs || [];
        currentPage.value = 1; // reset pagination after filtering
    } catch (err) {
        console.error("Error fetching filtered jobs:", err);
        // Swal.fire("Error", "Failed to fetch filtered jobs.", "error");
    }
}

// Apply filters when button is clicked
function applyFilters() {
    const filters = {
        department: selectedDepartment.value,
        level: selectedLevel.value,
        type: selectedType.value,
        closingDate: selectedDate.value
    };

    // Remove empty filters before sending
    Object.keys(filters).forEach((key) => {
        if (!filters[key]) delete filters[key];
    });

    fetchFilteredJobs(filters);
}

// Pagination
function changePage(page) {
    currentPage.value = page;
}

const paginatedJobs = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return jobs.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(jobs.value.length / pageSize));

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

// Navigation
function goToDashboard() { router.push("/dashboard"); }
function goToApplications() { router.push("/applications"); }
function goToSettings() { router.push("/settings"); }
function goToJobDetails(jobId) { router.push(`/job/${jobId}`); }
function goToLoginPage() { router.push("/login"); }

function logout() {
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
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/login");
            Swal.fire("Logged Out!", "You have been logged out.", "success");
        }
    });
}
</script>


<style>
.navbar-nav .nav-link {
    cursor: pointer;
    transition: color 0.3s;
}

.navbar-nav .nav-link:hover {
    color: #f8d7da !important;
}

body {
    background-color: #f8f9fa;
}

.page-item.active .page-link {
    background-color: #660B05;
    border-color: #660B05;
    color: white;
}

.page-link {
    color: #660B05;
}
</style>
