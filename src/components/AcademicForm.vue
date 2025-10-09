<template>
    <div class="container py-4">
        <!-- 2. Secondary Education -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-book me-2"></i> Secondary Education</h5>

                <table class="table table-bordered table-striped mb-3">
                    <thead class="table-light">
                        <tr>
                            <th>School</th>
                            <th>From Year</th>
                            <th>To Year</th>
                            <th>Examination Passed</th>
                            <th>Passed Year</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(sec, idx) in secondaryEducations" :key="idx">
                            <td><input v-model="sec.School" class="form-control" /></td>
                            <td><input v-model.number="sec.FromYear" type="number" class="form-control" /></td>
                            <td><input v-model.number="sec.ToYear" type="number" class="form-control" /></td>
                            <td><input v-model="sec.ExaminationPassed" class="form-control" /></td>
                            <td><input v-model.number="sec.PassedYear" type="number" class="form-control" /></td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="removeSecondaryRow(idx)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="secondaryEducations.length === 0">
                            <td colspan="6" class="text-center text-muted">No secondary education added yet.</td>
                        </tr>
                    </tbody>
                </table>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addSecondaryRow">
                        <i class="bi bi-plus-circle me-1"></i> Add School
                    </button>

                    <button class="btn btn-primary" @click="saveSecondaryEducation">
                        <i class="bi bi-save me-2"></i> Save Secondary Education
                    </button>
                </div>
            </div>
        </div>

        <!-- 3. Higher Education / University -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4">
                    <i class="bi bi-mortarboard me-2"></i> Higher Education / University Education
                </h5>

                <table class="table table-bordered table-striped mb-3">
                    <thead class="table-light">
                        <tr>
                            <th>Degree / Diploma</th>
                            <th>Institute</th>
                            <th>From Year</th>
                            <th>To Year</th>
                            <th>Class</th>
                            <th>Year Obtained</th>
                            <th>Index Number</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(edu, index) in universityEducations" :key="index">
                            <td><input v-model="edu.DegreeOrDiploma" class="form-control" /></td>
                            <td><input v-model="edu.Institute" class="form-control" /></td>
                            <td><input v-model.number="edu.FromYear" type="number" class="form-control" /></td>
                            <td><input v-model.number="edu.ToYear" type="number" class="form-control" /></td>
                            <td><input v-model="edu.Class" class="form-control" /></td>
                            <td><input v-model.number="edu.YearObtained" type="number" class="form-control" /></td>
                            <td><input v-model="edu.IndexNumber" class="form-control" /></td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="removeUniversityRow(index)">
                                    <i class="bi bi-trash me-1"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="universityEducations.length === 0">
                            <td colspan="8" class="text-center text-muted">No university education added yet.</td>
                        </tr>
                    </tbody>
                </table>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addUniversityRow">
                        <i class="bi bi-plus-circle me-1"></i> Add University
                    </button>

                    <button class="btn btn-primary btn-sm" @click="saveUniversityEducation">
                        <i class="bi bi-save me-1"></i> Save All
                    </button>
                </div>
            </div>
        </div>

        <!-- 4. First Degree Subjects -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4">
                    <i class="bi bi-book me-2"></i> First Degree Subjects
                </h5>

                <label class="form-label">Select University:</label>
                <select v-model="selectedUniversityId" class="form-select mb-3">
                    <option disabled value="">-- Select University --</option>
                    <option v-for="uni in universityEducations" :key="uni.UE_ID" :value="uni.UE_ID">
                        {{ uni.DegreeOrDiploma }} ({{ uni.Institute }})
                    </option>
                </select>

                <div v-for="(subject, index) in subjects" :key="index" class="input-group mb-2">
                    <input v-model="subjects[index]" class="form-control" placeholder="Subject" />
                    <button class="btn btn-outline-danger" @click="removeSubject(index)" type="button">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>

                <div class="d-flex gap-2">
                    <button class="btn btn-success btn-sm" @click="addSubject">
                        <i class="bi bi-plus-circle me-1"></i> Add Subject
                    </button>
                    <button class="btn btn-primary btn-sm" @click="saveFirstDegreeSubjects">
                        <i class="bi bi-save me-1"></i> Save Subjects
                    </button>
                </div>
            </div>
        </div>

        <!-- 5. Professional Qualifications -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-award me-2"></i> Professional Qualifications</h5>

                <table class="table table-bordered table-striped">
                    <thead class="table-light">
                        <tr>
                            <th>Institution</th>
                            <th>Qualification Name</th>
                            <th>From Year</th>
                            <th>To Year</th>
                            <th>Result / Exam Passed</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(pq, index) in professionalQualifications" :key="index">
                            <td><input v-model="pq.Institution" class="form-control" /></td>
                            <td><input v-model="pq.QualificationName" class="form-control" /></td>
                            <td><input v-model.number="pq.FromYear" type="number" class="form-control" /></td>
                            <td><input v-model.number="pq.ToYear" type="number" class="form-control" /></td>
                            <td><input v-model="pq.ResultOrExamPassed" class="form-control" /></td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="removePQRow(index)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="professionalQualifications.length === 0">
                            <td colspan="6" class="text-center text-muted">No professional qualifications added yet.
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addPQRow">
                        <i class="bi bi-plus-circle me-1"></i> Add Qualification
                    </button>
                    <button class="btn btn-primary" @click="saveProfessionalQualifications">
                        <i class="bi bi-save me-2"></i> Save Professional Qualifications
                    </button>
                </div>
            </div>
        </div>

        <!-- 6. Special Qualifications / Extra-curricular -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-stars me-2"></i> Special Qualifications / Extra-curricular</h5>

                <div v-for="(sq, index) in specialQualifications" :key="index" class="mb-2 d-flex gap-2">
                    <input v-model="sq.Description" type="text" class="form-control" placeholder="Description" />
                    <button class="btn btn-danger btn-sm" @click="removeSQRow(index)"><i
                            class="bi bi-trash"></i></button>
                </div>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addSQRow"><i class="bi bi-plus-circle me-1"></i> Add
                        Special Qualification</button>
                    <button class="btn btn-primary" @click="saveSpecialQualifications"><i class="bi bi-save me-2"></i>
                        Save Special Qualifications</button>
                </div>
            </div>
        </div>

        <!-- 7. Languages Proficiency -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-translate me-2"></i> Languages Proficiency</h5>

                <div v-for="(lang, index) in languagesProficiency" :key="index" class="row g-2 mb-2">
                    <div class="col-md-2">
                        <input v-model="lang.Language" class="form-control" placeholder="Language" />
                    </div>

                    <!-- Dropdowns for enum fields -->
                    <div class="col-md-2">
                        <select v-model="lang.CanSpeak" class="form-control">
                            <option disabled value="">Speak</option>
                            <option>Very_Good</option>
                            <option>Good</option>
                            <option>Fair</option>
                            <option>None</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <select v-model="lang.CanRead" class="form-control">
                            <option disabled value="">Read</option>
                            <option>Very_Good</option>
                            <option>Good</option>
                            <option>Fair</option>
                            <option>None</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <select v-model="lang.CanWrite" class="form-control">
                            <option disabled value="">Write</option>
                            <option>Very_Good</option>
                            <option>Good</option>
                            <option>Fair</option>
                            <option>None</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <select v-model="lang.CanTeach" class="form-control">
                            <option disabled value="">Teach</option>
                            <option>Very_Good</option>
                            <option>Good</option>
                            <option>Fair</option>
                            <option>None</option>
                        </select>
                    </div>

                    <div class="col-md-2 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeLangRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addLangRow"><i class="bi bi-plus-circle me-1"></i>
                        Add Language</button>
                    <button class="btn btn-primary" @click="saveLanguagesProficiency"><i class="bi bi-save me-2"></i>
                        Save Languages</button>
                </div>
            </div>
        </div>

        <!-- 8. Employment Records -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-building me-2"></i> Employment Records</h5>

                <table class="table table-bordered table-striped">
                    <thead class="table-light">
                        <tr>
                            <th>Post Held</th>
                            <th>Institution</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Last Salary</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(emp, index) in employmentRecords" :key="index">
                            <td><input v-model="emp.PostHeld" class="form-control" /></td>
                            <td><input v-model="emp.Institution" class="form-control" /></td>
                            <td><input v-model="emp.FromDate" type="date" class="form-control" /></td>
                            <td><input v-model="emp.ToDate" type="date" class="form-control" /></td>
                            <td><input v-model.number="emp.LastSalary" type="number" class="form-control" /></td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="removeEmpRow(index)"><i
                                        class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <tr v-if="employmentRecords.length === 0">
                            <td colspan="6" class="text-center text-muted">No employment records added yet.</td>
                        </tr>
                    </tbody>
                </table>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addEmpRow"><i class="bi bi-plus-circle me-1"></i> Add
                        Employment</button>
                    <button class="btn btn-primary" @click="saveEmploymentRecords"><i class="bi bi-save me-2"></i> Save
                        Employment</button>
                </div>
            </div>
        </div>

        <!-- 9. Experience Description -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-journal-text me-2"></i> Experience Description</h5>

                <div v-for="(exp, index) in experienceDescription" :key="index" class="d-flex gap-2 mb-2">
                    <input v-model="exp.Description" class="form-control" placeholder="Experience Detail" />
                    <button class="btn btn-danger btn-sm" @click="removeExpRow(index)"><i
                            class="bi bi-trash"></i></button>
                </div>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addExpRow"><i class="bi bi-plus-circle me-1"></i> Add
                        Experience</button>
                    <button class="btn btn-primary" @click="saveExperienceDescription"><i class="bi bi-save me-2"></i>
                        Save Experience</button>
                </div>
            </div>
        </div>

        <!-- 10. Research & Publications -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-file-earmark-text me-2"></i> Research & Publications</h5>

                <div v-for="(pub, index) in researchPublications" :key="index" class="d-flex gap-2 mb-2">
                    <input v-model="pub.Description" class="form-control" placeholder="Publication Detail" />
                    <button class="btn btn-danger btn-sm" @click="removePubRow(index)"><i
                            class="bi bi-trash"></i></button>
                </div>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addPubRow"><i class="bi bi-plus-circle me-1"></i> Add
                        Publication</button>
                    <button class="btn btn-primary" @click="saveResearchPublications"><i class="bi bi-save me-2"></i>
                        Save Publications</button>
                </div>
            </div>
        </div>

        <!-- 11. Non-Related Referees -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-people me-2"></i> Non-Related Referees</h5>

                <div v-for="(ref, index) in references" :key="index" class="row g-2 mb-2">
                    <div class="col-md-4"><input v-model="ref.Name" class="form-control" placeholder="Name" /></div>
                    <div class="col-md-4"><input v-model="ref.Designation" class="form-control"
                            placeholder="Designation" /></div>
                    <div class="col-md-3"><input v-model="ref.Address" class="form-control" placeholder="Address" />
                    </div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeRefRow(index)"><i
                                class="bi bi-trash"></i></button>
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" @click="addRefRow"><i class="bi bi-plus-circle me-1"></i> Add
                        Referee</button>
                    <button class="btn btn-primary" @click="saveReferences"><i class="bi bi-save me-2"></i> Save
                        Referees</button>
                </div>
            </div>
        </div>

        <!-- 12. Additional Information -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-info-circle me-2"></i> Additional Information</h5>
                <textarea v-model="additionalInfo.content" class="form-control mb-3" rows="3"
                    placeholder="Additional Info"></textarea>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveAdditionalInfo"><i class="bi bi-save me-2"></i> Save
                        Additional Info</button>
                </div>
            </div>
        </div>

        <!-- 13. CV Upload -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-file-earmark-arrow-up me-2"></i> CV Upload</h5>
                <input type="file" @change="handleCVUpload" class="form-control mb-3" />
                <div v-if="cvFilePath" class="mb-3">
                    <p>Uploaded File: <a :href="cvFilePath" target="_blank">{{ cvFilePath }}</a></p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success btn-sm" @click="submitCV"><i class="bi bi-upload me-1"></i>
                            Submit CV</button>
                        <button class="btn btn-danger btn-sm" @click="deleteCV"><i class="bi bi-trash me-1"></i> Delete
                            CV</button>
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
                <i class="bi bi-download me-2"></i> Download and Complete Submission
            </button>
        </div>
    </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";

export default {
    name: "AcademicForm",
    props: {
        jobId: { type: [Number, String], required: true },
        applicationId: { type: [Number, String], required: true },
    },
    data() {
        return {
            // Main models (match your provided fields)
            secondaryEducations: [],
            universityEducations: [],
            firstDegreeSubjects: [], // { universityEducationId, universityDegree, subjects: [] }
            professionalQualifications: [],
            specialQualifications: [],
            languagesProficiency: [],
            employmentRecords: [],
            experienceDescription: [],
            researchPublications: [],
            references: [],
            additionalInfo: { content: "" },
            cvFile: null,
            cvFilePath: "",
            loading: false,

            newUniversity: {
                DegreeOrDiploma: "",
                Institute: "",
                FromYear: null,
                ToYear: null,
                Class: "",
                YearObtained: null,
                IndexNumber: "",
            },
            subjects: [],
            selectedUniversityId: "",
        };
    },
    methods: {

        /********** Secondary Education **********/
        addSecondaryRow() {
            this.secondaryEducations.push({ School: "", FromYear: null, ToYear: null, ExaminationPassed: "", PassedYear: null });
        },
        removeSecondaryRow(index) {
            this.secondaryEducations.splice(index, 1);
        },
        async saveSecondaryEducation() {
            try {
                if (!this.applicationId) {
                    return Swal.fire("Missing", "Application ID is required to save secondary education.", "warning");
                }
                await api.post("/api/applications/secondary-educations", {
                    applicationId: Number(this.applicationId),
                    secondaryEducations: this.secondaryEducations,
                });
                Swal.fire("Saved", "Secondary education saved successfully.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save secondary education.", "error");
            }
        },

        /********** University Education **********/
        addUniversityRow() {
            this.universityEducations.push({
                DegreeOrDiploma: "",
                Institute: "",
                FromYear: null,
                ToYear: null,
                Class: "",
                YearObtained: null,
                IndexNumber: "",
            });
        },

        removeUniversityRow(index) {
            this.universityEducations.splice(index, 1);
        },

        async saveUniversityEducation() {
            try {
                if (!this.universityEducations.length) {
                    return Swal.fire("No Data", "Please add at least one university education.", "warning");
                }

                // Validate each row
                for (const edu of this.universityEducations) {
                    if (!edu.DegreeOrDiploma || !edu.Institute || !edu.FromYear || !edu.ToYear) {
                        return Swal.fire("Incomplete", "Please fill in all required fields for all university education rows.", "warning");
                    }
                }

                // Send all university education data at once
                await api.post("/api/applications/university-educations", {
                    jobId: Number(this.jobId),
                    universityEducations: this.universityEducations,
                });

                Swal.fire("Saved", "All university education saved successfully.", "success");

                // Refresh data from DB (ensures consistency)
                await this.fetchUniversityEducations();

            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save university education.", "error");
            }
        }
        ,
        /********** First Degree Subjects **********/

        addSubject() {
            this.subjects.push("");
        },

        removeSubject(index) {
            this.subjects.splice(index, 1);
        },

        async saveFirstDegreeSubjects() {
            try {
                if (!this.selectedUniversityId) {
                    return Swal.fire("Select University", "Please select a university first.", "warning");
                }

                if (!this.subjects.length) {
                    return Swal.fire("Add Subjects", "Please add at least one subject.", "warning");
                }

                await api.post("/api/applications/first-degree-subjects", {
                    universityEducationId: Number(this.selectedUniversityId),
                    subjects: this.subjects,
                });

                Swal.fire("Saved", "Subjects saved successfully.", "success");

                // Clear after save
                this.subjects = [];
                this.selectedUniversityId = "";
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save first degree subjects.", "error");
            }
        },

        async fetchUniversityEducations() {
            try {
                const response = await api.get(`/api/applications/university-educations/${this.jobId}`);
                this.universityEducations = response.data?.data || [];
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to fetch university educations.", "error");
            }
        },

        /********** Professional Qualifications **********/
        addPQRow() {
            this.professionalQualifications.push({ Institution: "", QualificationName: "", FromYear: null, ToYear: null, ResultOrExamPassed: "" });
        },
        removePQRow(idx) {
            this.professionalQualifications.splice(idx, 1);
        },
        async saveProfessionalQualifications() {
            try {
                await api.post("/api/applications/professional-qualifications", {
                    jobId: Number(this.jobId),
                    qualifications: this.professionalQualifications,
                });
                Swal.fire("Saved", "Professional qualifications saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save professional qualifications.", "error");
            }
        },

        /********** Special Qualifications **********/
        addSQRow() {
            this.specialQualifications.push({ Description: "" });
        },
        removeSQRow(idx) {
            this.specialQualifications.splice(idx, 1);
        },
        async saveSpecialQualifications() {
            try {
                await api.post("/api/applications/special-qualifications", {
                    jobId: Number(this.jobId),
                    specialQualifications: this.specialQualifications,
                });
                Swal.fire("Saved", "Special qualifications saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save special qualifications.", "error");
            }
        },

        /********** Languages Proficiency **********/
        addLangRow() {
            this.languagesProficiency.push({ Language: "", CanSpeak: "", CanRead: "", CanWrite: "", CanTeach: "" });
        },
        removeLangRow(idx) {
            this.languagesProficiency.splice(idx, 1);
        },
        async saveLanguagesProficiency() {
            try {
                await api.post("/api/applications/language-proficiencies", {
                    jobId: Number(this.jobId),
                    languageProficiencies: this.languagesProficiency,
                });
                Swal.fire("Saved", "Languages proficiency saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save languages proficiency.", "error");
            }
        },

        /********** Employment Records **********/
        addEmpRow() {
            this.employmentRecords.push({ PostHeld: "", Institution: "", FromDate: "", ToDate: "", LastSalary: null });
        },
        removeEmpRow(idx) {
            this.employmentRecords.splice(idx, 1);
        },
        async saveEmploymentRecords() {
            try {
                await api.post("/api/applications/employment-histories", {
                    jobId: Number(this.jobId),
                    employmentHistories: this.employmentRecords,
                });
                Swal.fire("Saved", "Employment records saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save employment records.", "error");
            }
        },

        /********** Experience Description **********/
        addExpRow() {
            this.experienceDescription.push({ Description: "" });
        },
        removeExpRow(idx) {
            this.experienceDescription.splice(idx, 1);
        },
        async saveExperienceDescription() {
            try {
                await api.post("/api/applications/experience-details", {
                    jobId: Number(this.jobId),
                    experienceDetails: this.experienceDescription,
                });
                Swal.fire("Saved", "Experience details saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save experience details.", "error");
            }
        },

        /********** Research & Publications **********/
        addPubRow() {
            this.researchPublications.push({ Description: "" });
        },
        removePubRow(idx) {
            this.researchPublications.splice(idx, 1);
        },
        async saveResearchPublications() {
            try {
                await api.post("/api/applications/research-and-publications", {
                    jobId: Number(this.jobId),
                    publications: this.researchPublications,
                });
                Swal.fire("Saved", "Research & publications saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save research publications.", "error");
            }
        },

        /********** References **********/
        addRefRow() {
            this.references.push({ Name: "", Designation: "", Address: "" });
        },
        removeRefRow(idx) {
            this.references.splice(idx, 1);
        },
        async saveReferences() {
            try {
                await api.post("/api/applications/references", {
                    jobId: Number(this.jobId),
                    references: this.references,
                });
                Swal.fire("Saved", "References saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save references.", "error");
            }
        },

        /********** Additional Info **********/
        async saveAdditionalInfo() {
            try {
                if (!this.applicationId) return Swal.fire("Missing", "Application ID is required.", "warning");
                await api.post("/api/applications/additional-info", {
                    applicationId: Number(this.applicationId),
                    content: this.additionalInfo.content,
                });
                Swal.fire("Saved", "Additional information saved.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save additional info.", "error");
            }
        },

        /********** CV Upload / Delete **********/
        handleCVUpload(e) {
            const file = e.target.files[0] || null;
            if (file) {
                this.cvFile = file;
                // optional: show preview until submit
                this.cvFilePath = URL.createObjectURL(file);
            }
        },

        async submitCV() {
            if (!this.cvFile) {
                return Swal.fire("Warning", "Please select a file first.", "warning");
            }

            if (!this.applicationId) {
                return Swal.fire("Warning", "Application ID missing — CV will not be attached.", "warning");
            }

            try {
                const formData = new FormData();
                formData.append("file", this.cvFile);

                // Upload file to backend
                const res = await api.post("/api/files/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // Get actual file URL from backend response
                const fileUrl = res?.data?.data?.fileUrl || null;
                if (!fileUrl) {
                    return Swal.fire("Error", "Upload failed: server did not return file URL.", "error");
                }

                this.cvFilePath = fileUrl;

                // Save attachment entry to application
                await api.post("/api/applications/attachments", {
                    applicationId: Number(this.applicationId),
                    fileType: "resume/pdf",
                    filePath: fileUrl,
                });

                Swal.fire("Uploaded", "CV uploaded and attached successfully.", "success");

            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Error uploading CV.", "error");
            }
        },

        async deleteCV() {
            if (!this.cvFilePath) return;

            try {
                const filename = this.cvFilePath.split("/").pop();
                await api.delete(`/api/files/delete/${filename}`);

                // Clear frontend state
                this.cvFile = null;
                this.cvFilePath = "";
                Swal.fire("Deleted", "CV deleted successfully.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Error deleting CV.", "error");
            }
        },

        /********** Delete All Application Data (Rollback) **********/
        async deleteAllApplicationData() {
            if (!this.applicationId) {
                return Swal.fire("Missing", "Application ID required to delete application data.", "warning");
            }

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This will delete all your application data and cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete all!",
                cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return;

            try {
                await api.delete(`/api/applications/delete-all-ac/${this.applicationId}`);

                // reset client state
                this.secondaryEducations = [];
                this.universityEducations = [];
                this.firstDegreeSubjects = [];
                this.professionalQualifications = [];
                this.specialQualifications = [];
                this.languagesProficiency = [];
                this.employmentRecords = [];
                this.experienceDescription = [];
                this.researchPublications = [];
                this.references = [];
                this.additionalInfo = { content: "" };
                this.cvFile = null;
                this.cvFilePath = "";

                Swal.fire("Deleted!", "All application details have been deleted.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete application details.", "error");
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
                        this.$router.push({ name: 'dashboard' });
                    }
                });

            } catch (err) {
                console.error(err);
                Swal.fire('Error!', 'Failed to download application.', 'error');
            }
        }
    },
};
</script>

<style scoped>
.card {
    transition: all 0.3s ease;
    border: 2px solid maroon;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
