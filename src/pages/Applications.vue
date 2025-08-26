<template>
    <div class="container mt-5">
        <h2 class="mb-4 text-center">My Applications</h2>

        <!-- Filter by Date -->
        <div class="row mb-3">
            <div class="col-md-4">
                <input type="date" v-model="filterDate" class="form-control" placeholder="Filter by Date" />
            </div>
            <div class="col-md-2">
                <button class="btn btn-primary" @click="filterApplications">Filter</button>
            </div>
            <div class="col-md-2">
                <button class="btn btn-secondary" @click="resetFilter">Reset</button>
            </div>
        </div>

        <!-- Applications Table -->
        <table class="table table-striped table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Job Title</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="app in filteredApplications" :key="app.ApplicationID">
                    <td>{{ app.jobvacancy.Title }}</td>
                    <td>{{ formatDate(app.SubmissionDate) }}</td>
                    <td>
                        <span class="badge" :class="statusClass(app.Status)">
                            {{ app.Status }}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" @click="deleteApplication(app.ApplicationID)">
                            Delete
                        </button>
                    </td>
                </tr>
                <tr v-if="filteredApplications.length === 0">
                    <td colspan="4" class="text-center">No applications found.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api";
import router from "@/router"; // Added router for navigation if needed

const applications = ref([]);
const filterDate = ref("");

// Get userId from local storage
const user = JSON.parse(localStorage.getItem("user")); // parse the JSON string
const userId = user ? user.id : null; // safely get the id


// Fetch user applications
const fetchApplications = async () => {
    if (!userId) {
        Swal.fire("Error", "User not found. Please login.", "error");
        router.push("/login");
        return;
    }
    try {
        const res = await api.get(`/api/jobs/user-applications/${userId}`);
        applications.value = res.data.data; // Use nested `data` array
    } catch (err) {
        Swal.fire("Error", "Failed to load applications", "error");
    }
};

onMounted(fetchApplications);

// Format date to readable format
const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
};

// Status badge colors
const statusClass = (status) => {
    switch (status.toLowerCase()) {
        case "new":
            return "bg-success text-light"; // light green
        case "in review":
            return "bg-info text-dark"; // sky blue
        case "hired":
            return "bg-warning text-dark"; // orange
        case "rejected":
            return "bg-danger text-light"; // light red
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
    // Computed property handles filtering
};

const resetFilter = () => {
    filterDate.value = "";
};

// Delete application
const deleteApplication = async (id) => {
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
            await api.delete(`/api/applications/${id}`);
            applications.value = applications.value.filter(app => app.ApplicationID !== id);
            Swal.fire("Deleted!", "Application has been deleted.", "success");
        } catch (err) {
            Swal.fire("Error", "Failed to delete application", "error");
        }
    }
};
</script>

<style scoped>
.badge {
    padding: 0.5em 0.8em;
    font-size: 0.9rem;
    border-radius: 0.4rem;
}
</style>
