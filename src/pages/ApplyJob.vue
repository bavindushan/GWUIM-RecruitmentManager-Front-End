<template>
    <!-- Navbar -->
        <NavbarUser @navigate="handleNavigation" @logout="logout" />

    <!-- Page -->
    <div class="container py-5 mt-5 bg-gradient-light">
        <!-- Job header -->
        <div class="card shadow-sm border-0 rounded-4 overflow-hidden mb-4" v-if="job">
            <div class="card-body p-4 p-md-5">
                <div class="d-flex align-items-start justify-content-between">
                    <div>
                        <h2 class="fw-bold mb-1">{{ job.Title }}</h2>
                        <div class="text-muted small">
                            <i class="bi bi-building me-1"></i> {{ job.Department }} ·
                            <i class="bi bi-layers me-1 ms-2"></i> {{ job.Level }} ·
                            <i class="bi bi-diagram-3 me-1 ms-2"></i> {{ displayType }}
                        </div>
                        <div class="mt-2 small text-secondary">
                            <i class="bi bi-calendar-event me-1"></i> Posted: {{ formatDate(job.PostedDate) }}
                            <span class="mx-2">•</span>
                            <i class="bi bi-hourglass-split me-1"></i> Expires: {{ formatDate(job.ExpiryDate) }}
                        </div>
                    </div>
                    <span class="badge fs-6 px-3 py-2"
                        :class="job.Status === 'Open' ? 'text-bg-success' : 'text-bg-secondary'">
                        {{ job.Status }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Stepper -->
        <div class="d-flex align-items-center gap-3 mb-3 bg-gradient-light">
            <div class="d-flex align-items-center">
                <div class="step-circle" :class="{ active: currentStep === 1, done: currentStep > 1 }">1</div>
                <div class="ms-2 fw-semibold" :class="{ 'text-muted': currentStep !== 1 }">General Details</div>
            </div>
            <div class="flex-fill border-top" style="opacity: 0.2;"></div>
            <div class="d-flex align-items-center">
                <div class="step-circle" :class="{ active: currentStep === 2 }">2</div>
                <div class="ms-2 fw-semibold" :class="{ 'text-muted': currentStep !== 2 }">
                    {{ displayType }} Form
                </div>
            </div>
        </div>

        <!-- Step 1: General Details -->
        <div v-if="currentStep === 1" class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4">
                    <i class="bi bi-person-vcard me-2"></i>
                    General Details
                </h5>

                <form @submit.prevent="saveGeneralDetails" class="row g-3">
                    <!-- Post Applied (Read-only) -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-briefcase me-1"></i> Post Applied</label>
                        <input type="text" class="form-control form-control-lg" :value="job?.Title" readonly />
                    </div>

                    <!-- Full Name -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-card-text me-1"></i> Full Name</label>
                        <input type="text" class="form-control form-control-lg"
                            placeholder="Full Name" />
                    </div>

                    <!-- Name with Initials -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-person-lines-fill me-1"></i> Name with
                            Initials</label>
                        <input type="text"
                            class="form-control form-control-lg" placeholder="Name with Initials" />
                    </div>

                    <!-- NIC -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-passport me-1"></i> NIC</label>
                        <input type="text" class="form-control form-control-lg"
                            placeholder="NIC Number" />
                    </div>

                    <!-- DOB -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-cake2 me-1"></i> Date of Birth</label>
                        <input type="date" class="form-control form-control-lg" />
                    </div>

                    <!-- Gender -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-gender-ambiguous me-1"></i> Gender</label>
                        <select class="form-select form-select-lg">
                            <option value="" disabled>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <!-- Phone -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-telephone me-1"></i> Phone Number</label>
                        <input type="tel" class="form-control form-control-lg"
                            placeholder="07XXXXXXXX" />
                    </div>

                    <!-- Email -->
                    <div class="col-md-6">
                        <label class="form-label"><i class="bi bi-envelope me-1"></i> Email</label>
                        <input type="email" class="form-control form-control-lg"
                            placeholder="name@example.com" />
                    </div>

                    <!-- Present Address -->
                    <div class="col-12">
                        <label class="form-label"><i class="bi bi-geo-alt me-1"></i> Present Address</label>
                        <input type="text" class="form-control form-control-lg"
                            placeholder="Present Address" />
                    </div>

                    <!-- Permanent Address -->
                    <div class="col-12">
                        <label class="form-label"><i class="bi bi-pin-map me-1"></i> Permanent Address</label>
                        <input type="text"
                            class="form-control form-control-lg" placeholder="Permanent Address" />
                    </div>

                    <!-- Civil Status / Citizenship -->
                    <div class="col-md-4">
                        <label class="form-label"><i class="bi bi-people me-1"></i> Civil Status</label>
                        <select class="form-select form-select-lg">
                            <option value="" disabled>Select</option>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label"><i class="bi bi-flag me-1"></i> Citizenship Type</label>
                        <input type="text" class="form-control form-control-lg"
                            placeholder="e.g., Descent" />
                    </div>

                    <div class="col-md-4">
                        <label class="form-label"><i class="bi bi-card-list me-1"></i> Citizenship Details</label>
                        <input type="text"
                            class="form-control form-control-lg" placeholder="Details" />
                    </div>

                    <!-- Ethnicity/Religion -->
                    <div class="col-12">
                        <label class="form-label"><i class="bi bi-moon-stars me-1"></i> Ethnicity/Religion</label>
                        <input type="text"
                            class="form-control form-control-lg" placeholder="Ethnicity / Religion" />
                    </div>

                    <!-- Action -->
                    <div class="col-12 d-flex justify-content-end mt-2">
                        <button type="submit" class="btn btn-success btn-lg px-4">
                            <i class="bi bi-save me-2"></i> Save & Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Step 2: Render the correct template form (Academic / Non-Academic) -->
        <div v-else-if="currentStep === 2">
            <AcademicForm v-if="displayType === 'Academic'" :job-id="jobId" :application-id="applicationId" />
            <NonAcademicForm v-else :job-id="jobId" :application-id="applicationId" />
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer bg-dark text-white py-4 mt-5">
        <div class="container text-center">
            <p class="mb-0">© 2025 GWUIM Recruitment System. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import api from "@/services/api";

// Child forms (already created by you)
import AcademicForm from "@/components/AcademicForm.vue";
import NonAcademicForm from "@/components/NonAcademicForm.vue";
import NavbarUser from "@/components/NavbarUser.vue";

const route = useRoute();
const router = useRouter();

const job = ref(null);
const jobId = route.params.jobId;
const applicationId = ref(null);
const currentStep = ref(1);

// Prefer query.templateType if present, otherwise fall back to the job.Type
const templateTypeQuery = route.query.templateType || null;
const displayType = computed(() => templateTypeQuery || job.value?.Type || "Academic");

// General details model
const generalDetails = ref({
    PostApplied: "",
    FullName: "",
    NameWithInitials: "",
    NIC: "",
    DOB: "",
    Gender: "",
    PhoneNumber: "",
    Email: "",
    PresentAddress: "",
    PermanentAddress: "",
    CivilStatus: "",
    CitizenshipType: "",
    CitizenshipDetails: "",
    EthnicityOrReligion: "",
});

// Fetch job
async function fetchJob() {
    try {
        const res = await api.get(`/api/jobs/${jobId}`);
        job.value = res.data.data;
    } catch (err) {
        // handled by interceptor if 401/403/404 etc.
    }
}

// When job loads, set PostApplied
watch(
    () => job.value,
    (j) => {
        if (j?.Title) generalDetails.value.PostApplied = j.Title;
    }
);

// Save & Continue (General Details)
async function saveGeneralDetails() {
    try {
        const payload = {
            jobId: Number(jobId),
            generalDetails: { ...generalDetails.value },
        };

        // const res = await api.post("/api/applications/general-details", payload);
        // // Expecting { applicationId: number, ... }
        // applicationId.value = res.data.applicationId;

        Swal.fire("Saved", "General details saved successfully.", "success");
        currentStep.value = 2; // move to the correct form
    } catch (err) {
        // error handled globally
    }
}

// Nav helpers
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

// Date formatting
function formatDate(d) {
    return d ? new Date(d).toLocaleDateString() : "N/A";
}

onMounted(async () => {
    await fetchJob();
    prefillFromUser();
});
</script>

<style scoped>
.step-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #e0e0e0;
    display: grid;
    place-items: center;
    font-weight: 700;
    transition: all .2s ease;
}

.step-circle.active {
    background: #198754;
    color: #fff;
    border-color: #198754;
}

.step-circle.done {
    background: #28a745;
    color: #fff;
    border-color: #28a745;
}

.card .form-label {
    font-weight: 600;
}


</style>
