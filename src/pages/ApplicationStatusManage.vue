<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Manage Applications</h1>

        <!-- Applications Table -->
        <table class="min-w-full border border-gray-300 rounded-lg shadow-sm">
            <thead class="bg-gray-200">
                <tr>
                    <th class="py-2 px-4 border">ID</th>
                    <th class="py-2 px-4 border">Full Name</th>
                    <th class="py-2 px-4 border">Email</th>
                    <th class="py-2 px-4 border">Status</th>
                    <th class="py-2 px-4 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="app in applications" :key="app.ApplicationID" class="text-center hover:bg-gray-100">
                    <td class="py-2 px-4 border">{{ app.ApplicationID }}</td>
                    <td class="py-2 px-4 border">{{ app.FullName }}</td>
                    <td class="py-2 px-4 border">{{ app.Email }}</td>
                    <td class="py-2 px-4 border">{{ app.Status }}</td>
                    <td class="py-2 px-4 border">
                        <button @click="viewDetails(app)"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                            View
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal for Application Details -->
        <div v-if="selectedApp" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-1/2 shadow-lg relative">
                <h2 class="text-xl font-bold mb-4">Application Details</h2>

                <p><strong>Full Name:</strong> {{ selectedApp.FullName }}</p>
                <p><strong>Email:</strong> {{ selectedApp.Email }}</p>
                <p><strong>Status:</strong> {{ selectedApp.Status }}</p>

                <!-- Status Change Dropdown -->
                <div class="mt-4">
                    <label class="block mb-1 font-semibold">Change Status:</label>
                    <select v-model="newStatus" class="border rounded px-3 py-1 w-full">
                        <option disabled value="">-- Select Status --</option>
                        <option value="New">New</option>
                        <option value="In_Reviewing">In Reviewing</option>
                        <option value="Called_for_Interview">Called for Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <!-- Buttons -->
                <div class="mt-6 flex justify-between">
                    <button @click="changeStatus" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                        Update Status
                    </button>
                    <button @click="downloadApplication"
                        class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
                        Download Application
                    </button>
                    <button @click="downloadCV" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                        Download CV
                    </button>
                    <button @click="closeModal" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            applications: [],
            selectedApp: null,
            newStatus: "",
        };
    },
    methods: {
        async loadApplications() {
            try {
                const res = await api.get("/api/applications/applications-all");
                this.applications = res.data.data || res.data; // Adjust based on API response
            } catch (err) {
                Swal.fire("Error", "Failed to load applications", "error");
            }
        },
        viewDetails(app) {
            this.selectedApp = app;
            this.newStatus = app.Status;
        },
        closeModal() {
            this.selectedApp = null;
        },
        async changeStatus() {
            if (!this.newStatus) {
                Swal.fire("Warning", "Please select a status", "warning");
                return;
            }
            try {
                await api.post(`/api/admin/change-application-status/${this.selectedApp.ApplicationID}`, {
                    status: this.newStatus,
                });
                Swal.fire("Success", "Status updated successfully", "success");
                this.selectedApp.Status = this.newStatus;
                this.loadApplications(); // Refresh table
            } catch (err) {
                Swal.fire("Error", "Failed to update status", "error");
            }
        },
        async downloadApplication() {
            try {
                window.open(`/api/admin/download-application/${this.selectedApp.ApplicationID}`, "_blank");
            } catch (err) {
                Swal.fire("Error", "Failed to download application", "error");
            }
        },
        async downloadCV() {
            try {
                window.open(`/api/admin/download-cv/${this.selectedApp.ApplicationID}`, "_blank");
            } catch (err) {
                Swal.fire("Error", "Failed to download CV", "error");
            }
        },
    },
    mounted() {
        this.loadApplications();
    },
};
</script>

<style>
/* Optional: Modal Animation */
</style>
