<template>

    <!-- Admin Navbar -->
    <AdminNavbar />

    <div class="container mt-5 pt-5">
        <h2 class="mb-4 text-center fw-bold">Manage Applications</h2>

        <!-- Filters -->
        <div class="row mb-4 g-3">
            <div class="col-md-4">
                <label class="form-label fw-bold">Job Name</label>
                <select class="form-select" v-model="filters.jobName">
                    <option value="">-- Select Job --</option>
                    <option v-for="job in jobs" :key="job.JobID" :value="job.Title">
                        {{ job.Title }}
                    </option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label fw-bold">From Date</label>
                <input type="date" class="form-control" v-model="filters.fromDate">
            </div>
            <div class="col-md-3">
                <label class="form-label fw-bold">To Date</label>
                <input type="date" class="form-control" v-model="filters.toDate">
            </div>
            <div class="col-md-2 d-flex align-items-end">
                <button class="btn btn-primary w-100" @click="applyFilters">Apply Filters</button>
            </div>
            <div class="text-end mb-3">
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#interviewSheetModal">
                    <i class="bi bi-clipboard2-data"></i> Generate Interview Sheet
                </button>
            </div>

        </div>

        <!-- Interview Sheet Modal -->
        <div class="modal fade" id="interviewSheetModal" tabindex="-1" aria-labelledby="interviewSheetModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content shadow">
                    <div class="modal-header text-white" :style="{ backgroundColor: '#660B05' }">
                        <h5 class="modal-title fw-bold" id="interviewSheetModalLabel">
                            Generate Interview Sheet
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="row g-3 align-items-end">
                            <div class="col-md-4">
                                <label class="form-label fw-bold">Interview Date</label>
                                <input type="date" class="form-control" v-model="interview.date">
                            </div>

                            <div class="col-md-4">
                                <label class="form-label fw-bold">Venue</label>
                                <input type="text" class="form-control" v-model="interview.venue"
                                    placeholder="Enter venue">
                            </div>

                            <div class="col-md-4">
                                <label class="form-label fw-bold">Time</label>
                                <input type="time" class="form-control" v-model="interview.time">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-success" @click="exportToExcel">
                            <i class="bi bi-file-earmark-excel"></i> Export Excel
                        </button>
                        <button class="btn btn-danger" @click="generateInterviewPDF">
                            <i class="bi bi-file-earmark-pdf"></i> Print PDF
                        </button>
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Applications Table -->
        <div class="table-responsive shadow rounded">
            <table class="table table-hover table-bordered align-middle text-center">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Post Applied</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="app in filteredApplications" :key="app.ApplicationID">
                        <td>{{ app.ApplicationID }}</td>
                        <td>{{ app.FullName }}</td>
                        <td>{{ app.Email }}</td>
                        <td>{{ app.PostApplied }}</td>
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
                    <tr v-if="filteredApplications.length === 0">
                        <td colspan="6">No applications found.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Bootstrap Modal with Tabs -->
        <div class="modal fade" id="appModal" tabindex="-1" aria-labelledby="appModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header text-white" :style="{ backgroundColor: '#660B05' }">
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
                                <p><strong>Full Name:</strong> {{ selectedApp.applicationgeneraldetails?.FullName }}</p>
                                <p><strong>Email:</strong> {{ selectedApp.applicationgeneraldetails?.Email }}</p>
                                <p><strong>NIC:</strong> {{ selectedApp.applicationgeneraldetails?.NIC }}</p>
                                <p><strong>Phone:</strong> {{ selectedApp.applicationgeneraldetails?.PhoneNumber }}</p>
                                <p><strong>Post Applied:</strong> {{
                                    selectedApp.applicationgeneraldetails?.PostApplied }}</p>
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
                                <div v-if="selectedApp.universityeducations?.length">
                                    <div v-for="edu in selectedApp.universityeducations" :key="edu.UE_ID" class="mb-3">
                                        <p><strong>Degree/Diploma:</strong> {{ edu.DegreeOrDiploma }}</p>
                                        <p><strong>Institute:</strong> {{ edu.Institute }}</p>
                                        <p><strong>Years:</strong> {{ edu.FromYear }} - {{ edu.ToYear }}</p>
                                        <p><strong>Class:</strong> {{ edu.Class }}</p>
                                        <p><strong>Main Subjects:</strong>
                                            <span v-for="sub in edu.firstdegreesubjects" :key="sub.SubjectID">{{
                                                sub.MainSubject }}{{
                                                    edu.firstdegreesubjects.length > 1 ? ', ' : '' }}</span>
                                        </p>
                                        <hr>
                                    </div>
                                </div>
                                <p v-else>No university education details available.</p>
                            </div>

                            <!-- Qualifications Tab -->
                            <div class="tab-pane fade" id="qualifications" role="tabpanel">
                                <div v-if="selectedApp.professionalqualifications?.length">
                                    <ul>
                                        <li v-for="pq in selectedApp.professionalqualifications" :key="pq.PQ_ID">
                                            {{ pq.QualificationName }} - {{ pq.Institution }} ({{ pq.FromYear }} -
                                            {{ pq.ToYear }})
                                        </li>
                                    </ul>
                                </div>
                                <p v-else>No professional qualifications available.</p>
                            </div>

                            <!-- References Tab -->
                            <div class="tab-pane fade" id="references" role="tabpanel">
                                <div v-if="selectedApp.applicationreferences?.length">
                                    <ul>
                                        <li v-for="ref in selectedApp.applicationreferences" :key="ref.ReferenceID">
                                            <strong>{{ ref.Name }}</strong> — {{ ref.Designation }}<br>
                                            <small>{{ ref.Address }}</small>
                                        </li>
                                    </ul>
                                </div>
                                <p v-else>No references available.</p>
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
                        <button type="button" class="bi bi-x-square btn btn-danger" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
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

<script>
import api from "@/services/api";
import AdminNavbar from "@/components/NavbarAdmin.vue";
import Swal from "sweetalert2";
import { Modal } from "bootstrap"; //  Import Bootstrap Modal
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default {
    components: {
        AdminNavbar, // <-- register the navbar
    },
    data() {
        return {
            jobs: [],
            applications: [],
            filteredApplications: [],
            selectedApp: null,
            newStatus: "",
            modalInstance: null,
            filters: {
                jobName: "",
                fromDate: "",
                toDate: "",
            },
            interview: {
                date: "",
                venue: "",
                time: "",
            },
        };

    },
    methods: {
        async loadJobs() {
            try {
                const res = await api.get("/api/admin/jobs-all");
                this.jobs = res.data.data || [];
            } catch (err) {
                Swal.fire("Error", "Failed to load jobs", "error");
            }
        },

        async loadApplications() {
            try {
                const res = await api.get("/api/applications/applications-all");
                this.applications = res.data.data || [];

                this.filteredApplications = [...this.applications];
            } catch (err) {
                Swal.fire("Error", "Failed to load applications", "error");
            }
        },

        applyFilters() {
            this.filteredApplications = this.applications.filter((app) => {
                const jobMatch = this.filters.jobName
                    ? app.PostApplied === this.filters.jobName
                    : true;

                const fromMatch = this.filters.fromDate
                    ? new Date(app.SubmissionDate) >= new Date(this.filters.fromDate)
                    : true;

                const toMatch = this.filters.toDate
                    ? new Date(app.SubmissionDate) <= new Date(this.filters.toDate)
                    : true;

                return jobMatch && fromMatch && toMatch;
            });
        },
        async openModal(app) {
            try {
                //  Fetch full application details from backend
                const res = await api.get(`/api/admin/applications/${app.ApplicationID}`);
                this.selectedApp = res.data.data; // store full details
                this.newStatus = this.selectedApp.Status;

                // Show modal after setting data
                this.$nextTick(() => {
                    if (!this.modalInstance) {
                        this.modalInstance = new Modal(document.getElementById("appModal"));
                    }
                    this.modalInstance.show();
                });
            } catch (err) {
                console.error("Failed to fetch application details:", err);
                Swal.fire("Error", "Failed to load full application details", "error");
            }
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
            try {
                const token = localStorage.getItem("adminToken"); // Get admin token
                const response = await api.get(`/api/applications-print/download/${this.selectedApp.ApplicationID}`, {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token like in Postman
                    },
                });

                // Create a download link for the file
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `application_${this.selectedApp.ApplicationID}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (err) {
                console.error("Download error:", err);
                Swal.fire("Error", "Failed to download application", "error");
            }
        },
        async downloadCV() {
            try {
                const token = localStorage.getItem("adminToken");

                //  Updated API path
                const response = await api.get(
                    `/api/applications/download-cv/${this.selectedApp.ApplicationID}`,
                    {
                        responseType: "blob",
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `cv_${this.selectedApp.ApplicationID}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (err) {
                console.error("Download CV error:", err);
                Swal.fire("Error", "Failed to download CV", "error");
            }
        },
        exportToExcel() {
            if (!this.filteredApplications.length) {
                Swal.fire("Info", "No applications to export", "info");
                return;
            }

            const data = this.filteredApplications.map(app => ({
                "Application No": app.ApplicationID,
                "Full Name": app.FullName,
                "Email": app.Email,
                "Post Applied": app.PostApplied,
                "Department": app.Department,
                "Status": app.Status,
                "Interview Date": this.interview.date,
                "Venue": this.interview.venue,
                "Time": this.interview.time,
                "Date of Birth": app.applicationgeneraldetails?.DOB ? new Date(app.applicationgeneraldetails.DOB).toLocaleDateString() : "N/A",
                "Phone": app.applicationgeneraldetails?.PhoneNumber || "N/A",
                "Address": app.applicationgeneraldetails?.PresentAddress || "N/A",
                "Education Qualifications": app.universityeducations.map(edu => `${edu.DegreeOrDiploma} (${edu.Institute})`).join("; "),
                "Professional Qualifications": app.professionalqualifications.map(pq => `${pq.QualificationName} (${pq.Institution})`).join("; "),
                "Research & Publications": app.researchandpublications.map(rp => rp.Description).join("; "),
                "References": app.applicationreferences.map(ref => `${ref.Name} - ${ref.Designation}`).join("; "),
            }));

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Interview List");

            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(blob, `Interview_Sheet_${new Date().toISOString().split("T")[0]}.xlsx`);

            // Close modal
            const modalEl = document.getElementById('interviewSheetModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
        },
        generateInterviewPDF() {
            if (!this.filteredApplications.length) {
                Swal.fire("Info", "No applications to print", "info");
                return;
            }

            if (!this.interview.date || !this.interview.venue || !this.interview.time) {
                Swal.fire("Warning", "Please fill Interview Date, Venue and Time", "warning");
                return;
            }

            // Landscape A4
            const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

            this.filteredApplications.forEach((app, index) => {
                if (index > 0) doc.addPage();

                const post = app.PostApplied || "N/A";
                const department = app.Department || "Department Not Specified";
                const subject = app.Description || "N/A";

                // === HEADER ===
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.text(
                    "GAMPAHA WICKRAMARACHCHI UNIVERSITY OF INDIGENOUS MEDICINE, SRI LANKA",
                    10, 15
                );

                doc.setFontSize(11);
                doc.text(`RECRUITMENT FOR THE POSTS OF ${post}`, 10, 23);
                doc.text(`DEPARTMENT: ${department}`, 10, 30);
                doc.text(`SUBJECT: ${subject}`, 10, 37);

                doc.setFontSize(10);
                doc.text(`Date: ${this.interview.date}`, 10, 44);
                doc.text(`Interview No: ${app.ApplicationID}`, 80, 44);
                doc.text(`Venue: ${this.interview.venue}`, 150, 44);
                doc.text(`Time: ${this.interview.time}`, 250, 44);

                // === TABLE DATA ===
                const dob = app.applicationgeneraldetails?.DOB
                    ? new Date(app.applicationgeneraldetails.DOB).toLocaleDateString()
                    : "N/A";
                const age = this.calculateAge(app.applicationgeneraldetails?.DOB) || "-";

                // ✅ Get only current employment (ToDate == null)
                const currentEmployment = app.employmenthistories?.find(emp => !emp.ToDate);
                let presentPostInfo = "N/A";
                if (currentEmployment) {
                    const fromDate = currentEmployment.FromDate
                        ? new Date(currentEmployment.FromDate).toLocaleDateString()
                        : "N/A";
                    const salary = currentEmployment.LastSalary
                        ? `Rs. ${currentEmployment.LastSalary}`
                        : "N/A";

                    presentPostInfo = `${currentEmployment.PostHeld} at ${currentEmployment.Institution} (${fromDate}-Present) - ${salary}`;
                }

                // ✅ Helper function to format multiline data with comma + blank line
                const formatList = (list, mapper) =>
                    list?.length
                        ? list.map(mapper).map(item => `${item},\n`).join("\n")
                        : "N/A";

                // === Formatted Data Fields ===
                const fullNameAndAddress = `${app.FullName},\n\n${app.applicationgeneraldetails?.PresentAddress || ""},\n\n${app.Email},\n\n${app.applicationgeneraldetails?.PhoneNumber || ""}`;

                const dobAndAge = `${dob},\n\n (${age} yrs)`;

                const education = formatList(app.universityeducations, edu =>
                    `${edu.DegreeOrDiploma} (${edu.Institute})`
                );

                const professionalQuals = formatList(app.professionalqualifications, pq =>
                    `${pq.QualificationName} (${pq.Institution})`
                );

                const research = formatList(app.researchandpublications, rp =>
                    rp.Description
                );

                const experience = formatList(app.experiencedetails, exp =>
                    exp.Description
                );

                const extraCurricular = formatList(app.specialqualifications, sq =>
                    sq.Description
                );

                // === BODY ROW ===
                const body = [[
                    app.ApplicationID,
                    fullNameAndAddress,
                    dobAndAge,
                    education,
                    professionalQuals,
                    research,
                    presentPostInfo,
                    "Academic Distinctions N/A",
                    experience,
                    extraCurricular
                ]];

                // === AUTO TABLE ===
                autoTable(doc, {
                    head: [[
                        "App No.",
                        "FULL NAME & ADDRESS",
                        "DATE OF BIRTH & AGE",
                        "EDUCATION QUALIFICATIONS",
                        "PROFESSIONAL QUALIFICATIONS RELATED TO THE POST APPLIED",
                        "RESEARCH & PUBLICATIONS",
                        "PRESENT POST & SALARY",
                        "ACADEMIC DISTINCTION AT UNIVERSITY LEVEL",
                        "PROFESSIONAL EXPERIENCE",
                        "EXTRA-CURRICULAR ACTIVITIES"
                    ]],
                    body,
                    startY: 50,
                    margin: { left: 8, right: 8 },
                    styles: {
                        fontSize: 8,
                        cellPadding: 1.5,
                        overflow: "linebreak",
                        valign: "top",
                        halign: "left",
                        minCellHeight: 6,
                        lineColor: [180, 180, 180],
                        lineWidth: 0.1
                    },
                    headStyles: {
                        fillColor: [230, 230, 230],
                        textColor: [0, 0, 0],
                        fontStyle: "bold",
                        halign: "center",
                        valign: "middle",
                        lineWidth: 0.1
                    },
                    columnStyles: {
                        0: { cellWidth: 10 },  // App No
                        1: { cellWidth: 45 },  // Full Name & Address
                        2: { cellWidth: 20 },  // DOB & Age
                        3: { cellWidth: 35 },  // Education
                        4: { cellWidth: 35 },  // Professional Quals
                        5: { cellWidth: 35 },  // Research
                        6: { cellWidth: 25 },  // Present Post
                        7: { cellWidth: 25 },  // Academic Distinctions
                        8: { cellWidth: 35 },  // Experience
                        9: { cellWidth: 25 }   // Extra-Curricular
                    },
                    tableWidth: "wrap",
                    didDrawPage: function (data) {
                        const pageCount = doc.internal.getNumberOfPages();
                        doc.setFontSize(8);
                        doc.text(`Page ${index + 1} of ${pageCount}`, 270, 200, { align: "right" });
                    }
                });
            });

            doc.save(`Interview_Sheets_${new Date().toISOString().split("T")[0]}.pdf`);

            // Close modal
            const modalEl = document.getElementById("interviewSheetModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
        },
        calculateAge(dob) {
            if (!dob) return "-";
            const diff = Date.now() - new Date(dob).getTime();
            return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        },

    },
    mounted() {
        this.loadJobs();
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
