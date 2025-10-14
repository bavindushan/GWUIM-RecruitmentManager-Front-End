<template>
    <div class="container py-5">
        <h2 class="mb-4 text-center">Non-Academic Application</h2>

        <!-- 2. GCE O/L Results -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-file-text me-2"></i> GCE O/L Results</h5>
                <div v-for="(ol, index) in olResults" :key="index" class="row g-2 mb-2">
                    <div class="col-md-3"><input type="number" v-model="ol.ExamYear" class="form-control"
                            placeholder="Exam Year" /></div>
                    <div class="col-md-6"><input type="text" v-model="ol.Subject" class="form-control"
                            placeholder="Subject" /></div>
                    <div class="col-md-3"><input type="text" v-model="ol.Grade" class="form-control"
                            placeholder="Grade" /></div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeOLRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addOLRow">
                    <i class="bi bi-plus-circle me-1"></i> Add O/L Result
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveOLResults">
                        <i class="bi bi-save me-2"></i> Save O/L Results
                    </button>
                </div>
            </div>
        </div>

        <!-- 3. GCE A/L Results -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-file-text me-2"></i> GCE A/L Results</h5>
                <div v-for="(al, index) in alResults" :key="index" class="row g-2 mb-2">
                    <div class="col-md-3"><input type="number" v-model="al.ExamYear" class="form-control"
                            placeholder="Exam Year" /></div>
                    <div class="col-md-6"><input type="text" v-model="al.Subject" class="form-control"
                            placeholder="Subject" /></div>
                    <div class="col-md-3"><input type="text" v-model="al.Grade" class="form-control"
                            placeholder="Grade" /></div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeALRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addALRow">
                    <i class="bi bi-plus-circle me-1"></i> Add A/L Result
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveALResults">
                        <i class="bi bi-save me-2"></i> Save A/L Results
                    </button>
                </div>
            </div>
        </div>

        <!-- 4. University Education -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-mortarboard me-2"></i> University Education</h5>
                <div v-for="(edu, index) in universityEducations" :key="index" class="row g-2 mb-2">
                    <div class="col-md-4"><input type="text" v-model="edu.DegreeOrDiploma" class="form-control"
                            placeholder="Degree / Diploma" /></div>
                    <div class="col-md-4"><input type="text" v-model="edu.Institute" class="form-control"
                            placeholder="Institute" /></div>
                    <div class="col-md-2"><input type="number" v-model="edu.FromYear" class="form-control"
                            placeholder="From Year" /></div>
                    <div class="col-md-2"><input type="number" v-model="edu.ToYear" class="form-control"
                            placeholder="To Year" /></div>
                    <div class="col-md-2"><input type="text" v-model="edu.Class" class="form-control"
                            placeholder="Class" /></div>
                    <div class="col-md-2"><input type="number" v-model="edu.YearObtained" class="form-control"
                            placeholder="Year Obtained" /></div>
                    <div class="col-md-2"><input type="text" v-model="edu.IndexNumber" class="form-control"
                            placeholder="Index Number" /></div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeUniversityRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addUniversityRow">
                    <i class="bi bi-plus-circle me-1"></i> Add University
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveUniversityEducation">
                        <i class="bi bi-save me-2"></i> Save University Education
                    </button>
                </div>
            </div>
        </div>

        <!-- 5. Professional Qualifications -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-award me-2"></i> Professional Qualifications</h5>
                <div v-for="(pq, index) in professionalQualifications" :key="index" class="row g-2 mb-2">
                    <div class="col-md-4"><input type="text" v-model="pq.Institution" class="form-control"
                            placeholder="Institution" /></div>
                    <div class="col-md-4"><input type="text" v-model="pq.QualificationName" class="form-control"
                            placeholder="Qualification Name" /></div>
                    <div class="col-md-2"><input type="number" v-model="pq.FromYear" class="form-control"
                            placeholder="From Year" /></div>
                    <div class="col-md-2"><input type="number" v-model="pq.ToYear" class="form-control"
                            placeholder="To Year" /></div>
                    <div class="col-md-2"><input type="text" v-model="pq.ResultOrExamPassed" class="form-control"
                            placeholder="Result / Exam Passed" /></div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removePQRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addPQRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Qualification
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveProfessionalQualifications">
                        <i class="bi bi-save me-2"></i> Save Professional Qualifications
                    </button>
                </div>
            </div>
        </div>

        <!-- 6. Experience Details -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-briefcase me-2"></i> Experience Details</h5>
                <div v-for="(exp, index) in experienceDetails" :key="index" class="row g-2 mb-2">
                    <div class="col-md-11"><input type="text" v-model="exp.Description" class="form-control"
                            placeholder="Description" /></div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeExpRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addExpRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Experience
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveExperienceDetails">
                        <i class="bi bi-save me-2"></i> Save Experience Details
                    </button>
                </div>
            </div>
        </div>

        <!-- 7. Special Qualifications -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-star me-2"></i> Special Qualifications</h5>
                <div v-for="(sq, index) in specialQualifications" :key="index" class="row g-2 mb-2">
                    <div class="col-md-11"><input type="text" v-model="sq.Description" class="form-control"
                            placeholder="Description" /></div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeSQRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addSQRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Special Qualification
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveSpecialQualifications">
                        <i class="bi bi-save me-2"></i> Save Special Qualifications
                    </button>
                </div>
            </div>
        </div>

        <!-- 8. CV Upload -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4">
                    <i class="bi bi-file-earmark-arrow-up me-2"></i> CV Upload
                </h5>

                <input type="file" @change="handleCVUpload" class="form-control mb-3" />

                <div v-if="cvFilePath || cvFile" class="mb-3">
                    <div v-if="cvFilePath" class="d-flex align-items-center gap-2 mb-2">
                        <label class="form-label mb-0">Uploaded CV:</label>
                        <a :href="cvFilePath" target="_blank"
                            class="btn btn-outline-primary btn-sm d-flex align-items-center">
                            <i class="bi bi-file-earmark-text me-1"></i> View CV
                        </a>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-success btn-sm" @click="submitCV" :disabled="!cvFile">
                            <i class="bi bi-upload me-1"></i> Submit CV
                        </button>

                        <button class="btn btn-danger btn-sm" @click="deleteCV">
                            <i class="bi bi-trash me-1"></i> Delete CV
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Actions: Delete & Download -->
        <div class="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <!-- Delete All Details Button -->
            <!-- <button class="btn btn-danger btn-lg" @click="deleteAllApplicationData">
                <i class="bi bi-trash me-2"></i> Remove All Details Submitted
            </button> -->

            <!-- Download and Complete Submission Button -->
            <button class="btn btn-success btn-lg" @click="DownloadandComplete">
                <i class="bi bi-download me-2"></i> Download Application and Complete Submission
            </button>

            <!-- Download and Complete Submission Button (Non-Academic) -->
            <a href="/assets/Application-NA.pdf" download="Application-NA.pdf" class="btn btn-danger btn-lg">
                <i class="bi bi-download me-2"></i>
                Download Empty Application for Apply via Post <br>
                (Applying via Post is Mandatory!!) <br> 
                තැපෑලෙන් අයදුම් කිරීම අනිවාර්ය වේ!!
            </a>

        </div>

    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
import api from "@/services/api";

export default {
    props: ['jobId', 'applicationId'],
    data() {
        return {
            olResults: [],
            alResults: [],
            universityEducations: [],
            professionalQualifications: [],
            experienceDetails: [],
            specialQualifications: [],
            cvFile: null,
            cvFilePath: ''
        };
    },
    methods: {
        // O/L Results
        addOLRow() { this.olResults.push({ ExamYear: '', Subject: '', Grade: '' }); },
        removeOLRow(index) { this.olResults.splice(index, 1); },
        async saveOLResults() {
            try {
                await api.post('/api/applications/gce-ol-results', {
                    jobId: parseInt(this.jobId),
                    olResults: this.olResults
                });
                Swal.fire('Saved!', 'O/L Results saved successfully.', 'success');
            } catch (err) {
                console.error(err);
                Swal.fire('Error!', 'Failed to save O/L Results.', 'error');
            }
        },

        // A/L Results
        addALRow() { this.alResults.push({ ExamYear: '', Subject: '', Grade: '' }); },
        removeALRow(index) { this.alResults.splice(index, 1); },
        async saveALResults() {
            await api.post('/api/applications/gce-al-results', {
                jobId: parseInt(this.jobId),
                alResults: this.alResults
            });
            Swal.fire('Saved!', 'A/L Results saved successfully.', 'success');
        },

        // University Education
        addUniversityRow() { this.universityEducations.push({ DegreeOrDiploma: '', Institute: '', FromYear: '', ToYear: '', Class: '', YearObtained: '', IndexNumber: '' }); },
        removeUniversityRow(index) { this.universityEducations.splice(index, 1); },
        async saveUniversityEducation() {
            await api.post('/api/applications/university-educations', {
                jobId: parseInt(this.jobId),
                universityEducations: this.universityEducations
            });
            Swal.fire('Saved!', 'University Education saved successfully.', 'success');
        },

        // Professional Qualifications
        addPQRow() { this.professionalQualifications.push({ Institution: '', QualificationName: '', FromYear: '', ToYear: '', ResultOrExamPassed: '' }); },
        removePQRow(index) { this.professionalQualifications.splice(index, 1); },
        async saveProfessionalQualifications() {
            await api.post('/api/applications/professional-qualifications', {
                jobId: parseInt(this.jobId),
                qualifications: this.professionalQualifications
            });
            Swal.fire('Saved!', 'Professional Qualifications saved successfully.', 'success');
        },

        // Experience
        addExpRow() { this.experienceDetails.push({ Description: '' }); },
        removeExpRow(index) { this.experienceDetails.splice(index, 1); },
        async saveExperienceDetails() {
            await api.post('/api/applications/experience-details', {
                jobId: parseInt(this.jobId),
                experienceDetails: this.experienceDetails
            });
            Swal.fire('Saved!', 'Experience Details saved successfully.', 'success');
        },

        // Special Qualifications
        addSQRow() { this.specialQualifications.push({ Description: '' }); },
        removeSQRow(index) { this.specialQualifications.splice(index, 1); },
        async saveSpecialQualifications() {
            await api.post('/api/applications/special-qualifications', {
                jobId: parseInt(this.jobId),
                specialQualifications: this.specialQualifications
            });
            Swal.fire('Saved!', 'Special Qualifications saved successfully.', 'success');
        },
        handleCVUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.cvFile = file;
            }
        },

        async submitCV() {
            if (!this.cvFile) {
                Swal.fire('Warning!', "Please select a file first!", 'warning');
                return;
            }

            const formData = new FormData();
            formData.append("file", this.cvFile);

            try {
                // Upload file to server
                const uploadResponse = await api.post('/api/files/upload', formData);
                const fileUrl = uploadResponse.data?.data?.fileUrl;

                if (fileUrl) {
                    this.cvFilePath = fileUrl;

                    // Save file path to application
                    await api.post('/api/applications/attachments', {
                        applicationId: parseInt(this.applicationId),
                        fileType: "resume/pdf",
                        filePath: this.cvFilePath
                    });

                    Swal.fire('Uploaded!', "CV uploaded successfully!", 'success');
                }

            } catch (err) {
                console.error(err);
                Swal.fire('Error!', "Error uploading CV", 'error');
            }
        },

        async deleteCV() {
            if (!this.cvFilePath) return;

            try {
                // Extract filename from path
                const filename = this.cvFilePath.split("/").pop();
                await api.delete(`/api/files/delete/${filename}`);

                // Clear local state
                this.cvFile = null;
                this.cvFilePath = '';
                Swal.fire('Deleted!', "CV deleted successfully!", 'success');
            } catch (err) {
                console.error(err);
                Swal.fire('Error!', "Error deleting CV", 'error');
            }
        },

        async deleteAllApplicationData() {
            // Show SweetAlert2 confirmation
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This will delete all your application data and cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete all!',
                cancelButtonText: 'Cancel'
            });

            if (!result.isConfirmed) {
                return; // User cancelled
            }

            try {
                await api.delete(`/api/applications/delete-all-na/${parseInt(this.applicationId)}`);

                // Clear frontend state
                this.olResults = [];
                this.alResults = [];
                this.universityEducations = [];
                this.professionalQualifications = [];
                this.experienceDetails = [];
                this.specialQualifications = [];
                this.cvFile = null;
                this.cvFilePath = '';

                Swal.fire('Deleted!', 'All application details have been deleted.', 'success');
            } catch (err) {
                console.error(err);
                Swal.fire('Error!', 'Failed to delete application details.', 'error');
            }
        },
        async DownloadandComplete() {
            try {
                const appId = parseInt(this.applicationId);
                const url = `/api/applications-print/download/${appId}`;

                // Call API using api.js instance
                const response = await api.get(url, { responseType: 'blob' });

                // Create a link to download the file
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `Application_${appId}.pdf`;
                document.body.appendChild(link);
                link.click();
                link.remove();

                // Show success alert and wait before redirect
                await Swal.fire({
                    icon: 'success',
                    title: 'Downloaded!',
                    text: 'Your application has been downloaded successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                    didClose: () => {
                        // Redirect only after alert closes
                        this.$router.push({ name: '/dashboard' });
                    }
                });

            } catch (err) {
                console.error(err);
                Swal.fire('Error!', 'Failed to download application.', 'error');
            }
        }

    }
};
</script>


<style scoped>
.card {
    border: 2px solid maroon;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
