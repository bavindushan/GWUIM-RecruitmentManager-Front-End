<template>
    <div class="container mt-5">
        <h2 class="mb-4 text-center fw-bold">Manage Applications</h2>

        <!-- Applications Table -->
        <div class="table-responsive shadow rounded">
            <table class="table table-hover table-bordered align-middle text-center">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="app in applications" :key="app.ApplicationID">
                        <td>{{ app.ApplicationID }}</td>
                        <td>{{ app.FullName }}</td>
                        <td>{{ app.Email }}</td>
                        <td>
                            <span :class="statusBadge(app.Status)">
                                {{ app.Status }}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-primary" @click="openModal(app)">
                                <i class="bi bi-eye"></i> View
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Bootstrap Modal with Tabs -->
        <div class="modal fade" id="appModal" tabindex="-1" aria-labelledby="appModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="appModalLabel">Application Details</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedApp">
                        <!-- Tabs Navigation -->
                        <ul class="nav nav-tabs mb-3" id="appTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="general-tab" data-bs-toggle="tab"
                                    data-bs-target="#general" type="button" role="tab">
                                    General Info
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="education-tab" data-bs-toggle="tab"
                                    data-bs-target="#education" type="button" role="tab">
                                    Education
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="qualifications-tab" data-bs-toggle="tab"
                                    data-bs-target="#qualifications" type="button" role="tab">
                                    Qualifications
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="references-tab" data-bs-toggle="tab"
                                    data-bs-target="#references" type="button" role="tab">
                                    References
                                </button>
                            </li>
                        </ul>

                        <!-- Tabs Content -->
                        <div class="tab-content">
                            <!-- General Info -->
                            <div class="tab-pane fade show active" id="general" role="tabpanel">
                                <p><strong>Full Name:</strong> {{ selectedApp.FullName }}</p>
                                <p><strong>Email:</strong> {{ selectedApp.Email }}</p>
                                <p>
                                    <strong>Status:</strong>
                                    <span :class="statusBadge(selectedApp.Status)">
                                        {{ selectedApp.Status }}
                                    </span>
                                </p>
                                <!-- Status Dropdown -->
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Change Status</label>
                                    <select v-model="newStatus" class="form-select">
                                        <option disabled value="">-- Select Status --</option>
                                        <option value="New">New</option>
                                        <option value="In_Reviewing">In Reviewing</option>
                                        <option value="Called_for_Interview">Called for Interview</option>
                                        <option value="Hired">Hired</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Education Tab -->
                            <div class="tab-pane fade" id="education" role="tabpanel">
                                <p v-if="!selectedApp.Education">No education details available.</p>
                                <ul v-else>
                                    <li v-for="edu in selectedApp.Education" :key="edu.id">
                                        {{ edu.Qualification }} - {{ edu.Institution }}
                                    </li>
                                </ul>
                            </div>

                            <!-- Qualifications Tab -->
                            <div class="tab-pane fade" id="qualifications" role="tabpanel">
                                <p v-if="!selectedApp.Qualifications">No qualifications details available.</p>
                                <ul v-else>
                                    <li v-for="q in selectedApp.Qualifications" :key="q.id">
                                        {{ q.Name }} - {{ q.Description }}
                                    </li>
                                </ul>
                            </div>

                            <!-- References Tab -->
                            <div class="tab-pane fade" id="references" role="tabpanel">
                                <p v-if="!selectedApp.References">No references available.</p>
                                <ul v-else>
                                    <li v-for="ref in selectedApp.References" :key="ref.id">
                                        {{ ref.Name }} - {{ ref.Designation }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="changeStatus">
                            <i class="bi bi-check-circle"></i> Update Status
                        </button>
                        <button class="btn btn-warning" @click="downloadApplication">
                            <i class="bi bi-download"></i> Download Application
                        </button>
                        <button class="btn btn-info text-white" @click="downloadCV">
                            <i class="bi bi-file-earmark-arrow-down"></i> Download CV
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import { Modal } from "bootstrap"; // ✅ Import Bootstrap Modal

export default {
    data() {
        return {
            applications: [],
            selectedApp: null,
            newStatus: "",
            modalInstance: null, // ✅ Store modal instance
        };
    },
    methods: {
        async loadApplications() {
            try {
                const res = await api.get("/api/applications/applications-all");
                this.applications = res.data.data || res.data;
            } catch (err) {
                Swal.fire("Error", "Failed to load applications", "error");
            }
        },
        openModal(app) {
            this.selectedApp = app;
            this.newStatus = app.Status;

            // ✅ Show modal AFTER data is set
            this.$nextTick(() => {
                if (!this.modalInstance) {
                    this.modalInstance = new Modal(document.getElementById("appModal"));
                }
                this.modalInstance.show();
            });
        },
        statusBadge(status) {
            switch (status) {
                case "New": return "badge bg-primary";
                case "In_Reviewing": return "badge bg-warning text-dark";
                case "Called_for_Interview": return "badge bg-info text-dark";
                case "Hired": return "badge bg-success";
                case "Rejected": return "badge bg-danger";
                default: return "badge bg-secondary";
            }
        },
        async changeStatus() {
            if (!this.newStatus) {
                Swal.fire("Warning", "Please select a status", "warning");
                return;
            }
            try {
                await api.post(
                    `/api/applications/change-application-status/${this.selectedApp.ApplicationID}`,
                    { status: this.newStatus, Remarks: "Updated by Admin" }
                );
                Swal.fire("Success", "Status updated successfully", "success");
                this.selectedApp.Status = this.newStatus;
                this.loadApplications();
            } catch (err) {
                Swal.fire("Error", "Failed to update status", "error");
            }
        },
        async downloadApplication() {
            window.open(`http://localhost:5000/api/applications-print/download/${this.selectedApp.ApplicationID}`, "_blank");
        },
        async downloadCV() {
            window.open(`http://localhost:5000/api/applications/download-cv/${this.selectedApp.ApplicationID}`, "_blank");
        },
    },
    mounted() {
        this.loadApplications();
    },
};
</script>


<style scoped>
.table th,
.table td {
    vertical-align: middle;
}
</style>
