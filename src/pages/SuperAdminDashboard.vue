<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Super Admin Dashboard</h1>

        <!-- Tabs -->
        <div class="flex space-x-4 mb-6">
            <button @click="activeTab = 'admins'" :class="activeTab === 'admins' ? activeClass : inactiveClass">
                Manage Admin Accounts
            </button>
            <button @click="activeTab = 'jobseekers'" :class="activeTab === 'jobseekers' ? activeClass : inactiveClass">
                Manage Job-Seeker Accounts
            </button>
        </div>

        <!-- Tab Content -->
        <div v-if="activeTab === 'admins'" class="p-4 border rounded-lg bg-white shadow">
            <h2 class="text-lg font-semibold mb-4">Manage Admin Accounts</h2>
            <!-- Will load ManageAdmins.vue later -->
            <p>Manage Admin Accounts content will go here...</p>
        </div>

        <div v-if="activeTab === 'jobseekers'" class="p-4 border rounded-lg bg-white shadow">
            <h2 class="text-lg font-semibold mb-4">Manage Job-Seeker Accounts</h2>
            <!-- Will load ManageJobSeekers.vue later -->
            <p>Manage Job-Seeker Accounts content will go here...</p>
        </div>

        <!-- Audit Log Table -->
        <div class="mt-8 p-4 border rounded-lg bg-white shadow">
            <h2 class="text-lg font-semibold mb-4">Audit Log</h2>

            <table class="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-200 p-2">Actor</th>
                        <th class="border border-gray-200 p-2">Role</th>
                        <th class="border border-gray-200 p-2">Action</th>
                        <th class="border border-gray-200 p-2">Details</th>
                        <th class="border border-gray-200 p-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="log in auditLogs" :key="log.id" class="hover:bg-gray-50">
                        <td class="border border-gray-200 p-2">{{ log.ActorID }}</td>
                        <td class="border border-gray-200 p-2">{{ log.ActorRole }}</td>
                        <td class="border border-gray-200 p-2">{{ log.Action }}</td>
                        <td class="border border-gray-200 p-2">{{ log.Details }}</td>
                        <td class="border border-gray-200 p-2">{{ formatDate(log.Timestamp) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from "@/services/api";

export default {
    data() {
        return {
            activeTab: "admins",
            auditLogs: [],
            activeClass:
                "px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow",
            inactiveClass:
                "px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300",
        };
    },
    methods: {
        async fetchAuditLogs() {
            try {
                const token = localStorage.getItem("token"); // token stored after login
                const response = await api.get("/api/super-admin/auditlog", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.auditLogs = response.data.logs || response.data;
            } catch (err) {
                console.error("Failed to fetch audit logs:", err);
            }
        },
        formatDate(timestamp) {
            return new Date(timestamp).toLocaleString();
        },
    },
    mounted() {
        this.fetchAuditLogs();
    },
};
</script>

<style scoped>
/* Optional: Add custom styles */
</style>
