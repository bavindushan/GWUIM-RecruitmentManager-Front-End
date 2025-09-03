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
                        <a class="nav-link text-white" @click="goToDashboard">🏠 Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="goToPostJob">📝 Post Job</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="goToApplicants">👤 Applicants</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="goToManageStatus">📊 Manage Status</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-warning fw-bold" @click="logout">🚪 Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

// Navigation functions
const goToDashboard = () => router.push("/admin/dashboard");
const goToPostJob = () => router.push("/admin/post-job");
const goToApplicants = () => router.push("/admin/manage-applicants");
const goToManageStatus = () => router.push("/admin/manage-status");
const goToJobDetails = (id) => router.push(`/admin/job/${id}`);

// Logout function
const logout = () => {
    localStorage.removeItem("adminToken"); // clear token
    router.push("/admin/login");
};
</script>

<style scoped>
.navbar-nav .nav-link {
    cursor: pointer;
}
</style>
