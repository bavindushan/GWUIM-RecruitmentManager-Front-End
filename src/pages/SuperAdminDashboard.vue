<template>
    <!-- Super Admin Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top" :style="{ backgroundColor: '#660B05' }">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="@/assets/logo_s.png" alt="Logo" height="40" class="me-3" />
                <span class="text-white fw-bold">GWUIM Recruitment Super Admin</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="adminNavbar">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-warning fw-bold bi bi-box-arrow-right" @click="logout"> Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="d-flex mt-5 pt-3" id="superadmin-layout">
        <!-- Sidebar -->
        <nav class="bg-dark text-white p-3 vh-100 shadow" style="width: 250px;">
            <div class="text-center mb-4">
                <h4 class="fw-bold"></h4>
            </div>

            <ul class="nav flex-column gap-2">
                <li class="nav-item">
                    <button class="btn w-100 text-start text-white d-flex align-items-center"
                        :class="{ 'btn-warning': activeTab === 'audit' }" @click="activeTab = 'audit'">
                        <i class="bi bi-journal-text me-2"></i> Audit Logs
                    </button>
                </li>
                <li class="nav-item">
                    <button class="btn w-100 text-start text-white d-flex align-items-center"
                        :class="{ 'btn-warning': activeTab === 'admins' }" @click="activeTab = 'admins'">
                        <i class="bi bi-person-badge me-2"></i> Manage Admins
                    </button>
                </li>
                <li class="nav-item">
                    <button class="btn w-100 text-start text-white d-flex align-items-center"
                        :class="{ 'btn-warning': activeTab === 'jobseekers' }" @click="activeTab = 'jobseekers'">
                        <i class="bi bi-people-fill me-2"></i> Job Seekers
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Main Content -->
        <div class="flex-grow-1 p-4">
            <h3 class="fw-bold mb-4 text-primary">
                <i class="bi bi-speedometer2 me-2"></i> Dashboard Overview
            </h3>

            <!-- Audit Logs -->
            <div v-if="activeTab === 'audit'" class="card shadow-sm rounded-4 mb-4">
                <div class="card-header bg-dark text-white">
                    <i class="bi bi-journal-text me-2"></i> Audit Logs
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Actor</th>
                                <th>Role</th>
                                <th>Action</th>
                                <th>Details</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in paginate(auditLogs, auditPage)" :key="log.LogID">
                                <td>{{ log.LogID }}</td>
                                <td>{{ log.ActorID }}</td>
                                <td><span class="badge bg-info">{{ log.ActorRole }}</span></td>
                                <td>{{ log.Action }}</td>
                                <td>{{ log.Details }}</td>
                                <td><small class="text-muted">{{ log.Timestamp }}</small></td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <nav>
                        <ul class="pagination justify-content-center mt-3">
                            <li class="page-item" :class="{ disabled: auditPage === 1 }"
                                @click="changePage('audit', auditPage - 1)">
                                <a class="page-link">Previous</a>
                            </li>
                            <li class="page-item" v-for="n in totalPages(auditLogs)" :key="n"
                                :class="{ active: auditPage === n }" @click="changePage('audit', n)">
                                <a class="page-link">{{ n }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: auditPage === totalPages(auditLogs) }"
                                @click="changePage('audit', auditPage + 1)">
                                <a class="page-link">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <!-- Manage Admins -->
            <div v-if="activeTab === 'admins'" class="card shadow-sm rounded-4 mb-4">
                <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                    <h5 class="mb-0"><i class="bi bi-person-badge me-2"></i> Admins</h5>
                    <button class="btn btn-light btn-sm fw-bold" @click="openAdminModal(null)">
                        <i class="bi bi-plus-circle"></i> Add Admin
                    </button>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Tel.No.</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="admin in paginate(admins, adminPage)" :key="admin.AdminID">
                                <td>{{ admin.AdminID }}</td>
                                <td>{{ admin.FullName }}</td>
                                <td>{{ admin.Email }}</td>
                                <td>{{ admin.PhoneNumber }}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary me-2" @click="openAdminModal(admin)">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" @click="deleteAdmin(admin.AdminID)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <nav>
                        <ul class="pagination justify-content-center mt-3">
                            <li class="page-item" :class="{ disabled: adminPage === 1 }"
                                @click="changePage('admin', adminPage - 1)">
                                <a class="page-link">Previous</a>
                            </li>
                            <li class="page-item" v-for="n in totalPages(admins)" :key="n"
                                :class="{ active: adminPage === n }" @click="changePage('admin', n)">
                                <a class="page-link">{{ n }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: adminPage === totalPages(admins) }"
                                @click="changePage('admin', adminPage + 1)">
                                <a class="page-link">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <!-- Job Seekers -->
            <div v-if="activeTab === 'jobseekers'" class="card shadow-sm rounded-4 mb-4">
                <div class="card-header bg-success text-white">
                    <i class="bi bi-people-fill me-2"></i> Job Seekers
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-hover table-bordered align-middle text-center">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Tel.No.</th>
                                <th>Account Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in paginate(jobSeekers, jobSeekerPage)" :key="user.UserID">
                                <td>{{ user.UserID }}</td>
                                <td>{{ user.FullName }}</td>
                                <td>{{ user.Email }}</td>
                                <td>{{ user.PhoneNumber }}</td>
                                <td>
                                    <span :class="accountBadge(user.AccountStatus)">{{ user.AccountStatus }}</span>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary" @click="openJobSeekerModal(user)">
                                        <i class="bi bi-eye"></i> View / Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <nav>
                        <ul class="pagination justify-content-center mt-3">
                            <li class="page-item" :class="{ disabled: jobSeekerPage === 1 }"
                                @click="changePage('jobseeker', jobSeekerPage - 1)">
                                <a class="page-link">Previous</a>
                            </li>
                            <li class="page-item" v-for="n in totalPages(jobSeekers)" :key="n"
                                :class="{ active: jobSeekerPage === n }" @click="changePage('jobseeker', n)">
                                <a class="page-link">{{ n }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: jobSeekerPage === totalPages(jobSeekers) }"
                                @click="changePage('jobseeker', jobSeekerPage + 1)">
                                <a class="page-link">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import router from "@/router"; // make sure router is imported

export default {
    data() {
        return {
            activeTab: "audit",
            auditLogs: [],
            admins: [],
            jobSeekers: [],
            adminForm: { fullName: "", email: "", department: "", phoneNumber: "", newPassword: "" },
            editingAdmin: null,
            adminModalInstance: null,

            selectedJobSeeker: null,
            jobSeekerModalInstance: null,
            newPassword: "",

            // Pagination
            auditPage: 1,
            adminPage: 1,
            jobSeekerPage: 1,
            perPage: 5,
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("superAdminToken");
            router.push("/superadmin/login");
        },
        checkAuth() {
            const token = localStorage.getItem("superAdminToken");
            if (!token) this.logout();
        },
        async loadAuditLogs() {
            try {
                const res = await api.get("/api/super-admin/auditlog");
                this.auditLogs = res.data.data || res.data;
            } catch {
                Swal.fire("Error", "Failed to load audit logs", "error");
            }
        },
        async loadAdmins() {
            try {
                const res = await api.get("/api/super-admin/admins");
                this.admins = res.data.data || res.data;
            } catch {
                Swal.fire("Error", "Failed to load admins", "error");
            }
        },
        async loadJobSeekers() {
            try {
                const res = await api.get("/api/admin/applicants-all");
                this.jobSeekers = res.data.data || res.data;
            } catch {
                Swal.fire("Error", "Failed to load job seekers", "error");
            }
        },
        paginate(list, page) {
            const start = (page - 1) * this.perPage;
            return list.slice(start, start + this.perPage);
        },
        totalPages(list) {
            return Math.ceil(list.length / this.perPage);
        },
        changePage(type, page) {
            if (page < 1) return;
            if (type === "audit" && page <= this.totalPages(this.auditLogs)) this.auditPage = page;
            if (type === "admin" && page <= this.totalPages(this.admins)) this.adminPage = page;
            if (type === "jobseeker" && page <= this.totalPages(this.jobSeekers)) this.jobSeekerPage = page;
        },
        accountBadge(status) {
            return {
                Active: "badge bg-success",
                Suspended: "badge bg-warning text-dark",
                Deleted: "badge bg-danger",
            }[status] || "badge bg-secondary";
        },

    },
    mounted() {
        this.checkAuth();
        this.loadAuditLogs();
        this.loadAdmins();
        this.loadJobSeekers();
    },
};
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}
</style>
