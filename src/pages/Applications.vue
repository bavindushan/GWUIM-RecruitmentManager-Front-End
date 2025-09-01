<template>
    <!-- Navbar -->
        <NavbarUser @navigate="handleNavigation" @logout="logout" />

    <div class="container mt-5 pt-5">
        <h2 class="mb-5 text-center">My Applications</h2>

        <!-- Filter by Date -->
        <div class="row mb-3">
            <div class="col-md-4">
                <input type="date" v-model="filterDate" class="form-control" placeholder="Filter by Date" />
            </div>
            <div class="col-md-2">
                <button class="btn btn-primary w-100" @click="filterApplications">
                    <i class="bi bi-funnel me-2"></i>Filter
                </button>
            </div>
            <div class="col-md-2">
                <button class="btn btn-secondary w-100" @click="resetFilter">
                    <i class="bi bi-arrow-counterclockwise me-2"></i>Reset
                </button>
            </div>
        </div>

        <!-- Modern Applications Table -->
        <div class="table-responsive shadow-sm rounded">
            <table class="table table-hover align-middle">
                <thead class="table-dark text-center">
                    <tr>
                        <th>Job Title</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="app in filteredApplications" :key="app.ApplicationID">
                        <td>{{ app.jobvacancy.Title }}</td>
                        <td>{{ formatDate(app.SubmissionDate) }}</td>
                        <td>
                            <span class="badge px-3 py-2" :class="statusClass(app.Status)">
                                {{ app.Status }}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm me-1" @click="deleteApplication(app)">
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="filteredApplications.length === 0">
                        <td colspan="4" class="text-center py-3">No applications found.</td>
                    </tr>
                </tbody>
            </table>
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
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api";
import router from "@/router";
import NavbarUser from "@/components/NavbarUser.vue";

const applications = ref([]);
const filterDate = ref("");

// Get userId from local storage
const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.id : null;

// Fetch user applications
const fetchApplications = async () => {
    if (!userId) {
        Swal.fire("Error", "User not found. Please login.", "error");
        router.push("/login");
        return;
    }
    try {
        const res = await api.get(`/api/jobs/user-applications/${userId}`);
        applications.value = res.data.data;
    } catch (err) {
        Swal.fire("Error", "Failed to load applications", "error");
    }
};

onMounted(fetchApplications);

// Format date
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

// Status badge classes
const statusClass = (status) => {
    switch (status.toLowerCase()) {
        case "new":
            return "bg-success text-light";
        case "in review":
            return "bg-info text-dark";
        case "hired":
            return "bg-warning text-dark";
        case "rejected":
            return "bg-danger text-light";
        default:
            return "bg-secondary text-light";
    }
};

// Filter applications by date
const filteredApplications = computed(() => {
    if (!filterDate.value) return applications.value;
    return applications.value.filter(app => {
        const appDate = new Date(app.SubmissionDate).toISOString().split("T")[0];
        return appDate === filterDate.value;
    });
});

const filterApplications = () => {
    // Filtering handled by computed property
};

const resetFilter = () => {
    filterDate.value = "";
};

// Delete application
const deleteApplication = async (app) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
        try {
            if (app.Type === "Non-Academic") {
                await api.delete(`/api/applications/delete-all-na/${app.ApplicationID}`);
            } else {
                await api.delete(`/api/applications/delete-all-ac/${app.ApplicationID}`);
            }
            applications.value = applications.value.filter(a => a.ApplicationID !== app.ApplicationID);
            Swal.fire("Deleted!", "Application has been deleted.", "success");
        } catch (err) {
            Swal.fire("Error", "Failed to delete application", "error");
        }
    }
};

// Navigation
function goToDashboard() { router.push("/dashboard"); }
function goToApplications() { router.push("/applications"); }
function goToSettings() { router.push("/settings"); }
function logout() { localStorage.removeItem("token"); router.push("/login"); }

// Handle navbar navigation events
function handleNavigation(page) {
    if (page === "dashboard") router.push("/dashboard");
    if (page === "applications") router.push("/applications");
    if (page === "applicant-settings") router.push("/applicant-settings");
}
</script>

<style scoped>
.table-responsive {
    overflow-x: auto;
}

.table-hover tbody tr:hover {
    background-color: rgba(102, 11, 5, 0.1);
    cursor: pointer;
}

.badge {
    padding: 0.5em 0.9em;
    border-radius: 0.5rem;
    font-size: 0.9rem;
}
</style>
