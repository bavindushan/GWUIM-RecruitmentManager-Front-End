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
    <!-- Main Container -->
    <div class="container mt-5 pt-5">
        <h2 class="mb-4 text-center fw-bold">Manage Applicants</h2>

        <!-- Applicants Table -->
        <div class="table-responsive shadow rounded">
            <table class="table table-hover table-bordered align-middle text-center">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Account Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="applicant in applicants" :key="applicant.UserID">
                        <td>{{ applicant.UserID }}</td>
                        <td>{{ applicant.FullName }}</td>
                        <td>{{ applicant.Email }}</td>
                        <td>{{ applicant.PhoneNumber }}</td>
                        <td>
                            <span :class="statusBadge(applicant.AccountStatus)">
                                {{ applicant.AccountStatus }}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-primary" @click="openModal(applicant)">
                                <i class="bi bi-eye"></i> View / Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal for Applicant Details -->
        <div class="modal fade" id="applicantModal" tabindex="-1" aria-labelledby="applicantModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header text-white" :style="{ backgroundColor: '#660B05' }">
                        <h5 class="modal-title" id="applicantModalLabel">Applicant Details</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>

                    <div class="modal-body" v-if="selectedApplicant">
                        <!-- Edit Details Form -->
                        <h5 class="mb-3">Edit Applicant Details</h5>
                        <div class="mb-3">
                            <label class="form-label">Full Name</label>
                            <input v-model="selectedApplicant.FullName" type="text" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input v-model="selectedApplicant.Email" type="email" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone</label>
                            <input v-model="selectedApplicant.PhoneNumber" type="text" class="form-control" />
                        </div>

                        <!-- Change Account Status -->
                        <div class="mb-3">
                            <label class="form-label fw-bold">Account Status</label>
                            <select v-model="selectedApplicant.AccountStatus" class="form-select">
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                                <option value="Deleted">Deleted</option>
                            </select>
                        </div>

                        <!-- Change Password -->
                        <div class="mb-3">
                            <label class="form-label">New Password</label>
                            <input v-model="newPassword" type="password" class="form-control"
                                placeholder="Enter new password" />
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="updateApplicant">
                            <i class="bi bi-check-circle"></i> Save Changes
                        </button>
                        <button class="btn btn-warning" @click="changePassword">
                            <i class="bi bi-key"></i> Change Password
                        </button>
                        <button type="button" class="bi bi-x-square btn btn-danger" data-bs-dismiss="modal">
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
import { Modal } from "bootstrap";

export default {
    data() {
        return {
            applicants: [],
            selectedApplicant: null,
            newPassword: "",
            modalInstance: null,
        };
    },
    methods: {
        async loadApplicants() {
            try {
                const res = await api.get("/api/admin/applicants-all");
                this.applicants = res.data.data || res.data;
            } catch (err) {
                Swal.fire("Error", "Failed to load applicants", "error");
            }
        },
        openModal(applicant) {
            this.selectedApplicant = { ...applicant };
            this.newPassword = "";
            this.$nextTick(() => {
                if (!this.modalInstance) {
                    this.modalInstance = new Modal(document.getElementById("applicantModal"));
                }
                this.modalInstance.show();
            });
        },
        statusBadge(status) {
            switch (status) {
                case "Active": return "badge bg-success";
                case "Suspended": return "badge bg-warning text-dark";
                case "Deleted": return "badge bg-danger";
                default: return "badge bg-secondary";
            }
        },
        async updateApplicant() {
            try {
                await api.put(`/api/admin/update-applicant/${this.selectedApplicant.UserID}`, this.selectedApplicant);
                Swal.fire("Success", "Applicant details updated", "success");
                this.loadApplicants();
                this.modalInstance.hide();
            } catch (err) {
                Swal.fire("Error", "Failed to update applicant", "error");
            }
        },
        async changePassword() {
            if (!this.newPassword) {
                Swal.fire("Warning", "Please enter a new password", "warning");
                return;
            }
            try {
                await api.post(`/api/admin/change-applicant-password/${this.selectedApplicant.UserID}`, {
                    password: this.newPassword,
                });
                Swal.fire("Success", "Password changed successfully", "success");
                this.newPassword = "";
            } catch (err) {
                Swal.fire("Error", "Failed to change password", "error");
            }
        },
    },
    mounted() {
        this.loadApplicants();
    },
};
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}
</style>
