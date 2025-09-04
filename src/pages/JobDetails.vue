<template>
    <!-- Navbar -->
        <NavbarUser @navigate="handleNavigation" @logout="logout" />

    <!-- Job Details Content -->
    <div class="container py-5 mt-5">
        <div class="card shadow-lg p-5 rounded-4 position-relative" v-if="job">
            <!-- Status Badge -->
            <span class="badge position-absolute top-0 end-0 m-3"
                :class="job.Status === 'Open' ? 'text-bg-success' : 'text-bg-secondary'">
                {{ job.Status }}
            </span>

            <h2 class="fw-bold mb-4">{{ job.Title }}</h2>
            <div class="mb-3"><strong>Department:</strong> {{ job.Department }}</div>
            <div class="mb-3"><strong>Level:</strong> {{ job.Level }}</div>
            <div class="mb-3"><strong>Type:</strong> {{ job.Type }}</div>
            <div class="mb-3"><strong>Posted Date:</strong> {{ formatDate(job.PostedDate) }}</div>
            <div class="mb-3"><strong>Expiry Date:</strong> {{ formatDate(job.ExpiryDate) }}</div>
            <div class="mb-4"><strong>Description:</strong> {{ job.Description || "No description provided." }}</div>

            <div class="text-end">
                <button class="btn btn-primary btn-lg shadow-lg" @click="applyForJob" :disabled="alreadyApplied">
                    {{ alreadyApplied ? "Already Applied" : "Apply for Job" }}
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
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarUser from "@/components/NavbarUser.vue";

const route = useRoute();
const router = useRouter();
const job = ref(null);
const jobId = route.params.jobId;
let templateId = null;
let templateType = null;
const alreadyApplied = ref(false);
const token = localStorage.getItem("token"); // token accessible globally

async function fetchJobDetails() {
    try {
        // Fetch job details
        const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        job.value = res.data.data;
        templateId = res.data.data.TemplateID;
        templateType = res.data.data.Type;

        // Check if user has already applied
        const checkRes = await axios.get(
            `http://localhost:5000/api/applications/check-applied?jobId=${jobId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        alreadyApplied.value = checkRes.data.applied; // true/false
        alreadyApplied.value = false;
    } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load job details.", "error");
    }
}

function applyForJob() {
    if (alreadyApplied.value) {
        Swal.fire("Info", "You have already applied for this job.", "info");
        return; // stop navigation
    }

    router.push({ path: `/apply/${jobId}`, query: { templateId, templateType } });
}

function formatDate(dateString) {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
}

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

onMounted(fetchJobDetails);
</script>

<style scoped>
/* Card adjustments */
.card {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;
    padding: 2.5rem 2rem;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

/* Buttons */
.btn-primary {
    border-radius: 50px;
    padding: 12px 30px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary:hover:enabled {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* Disabled button */
button:disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

/* Badge */
.badge {
    font-size: 0.9rem;
    padding: 0.5em 0.8em;
}

/* Text adjustments */
h2 {
    font-size: 2rem;
}

.mb-3 {
    margin-bottom: 1rem !important;
}

.mb-4 {
    margin-bottom: 1.5rem !important;
}
</style>
