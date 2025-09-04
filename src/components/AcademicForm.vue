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
                <h5 class="fw-bold mb-4"><i class="bi bi-mortarboard me-2"></i> Higher Education / University Education
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
                                    <i class="bi bi-trash"></i>
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
                        <i class="bi bi-plus-circle me-1"></i> Add University Degree
                    </button>

                    <div>
                        <button class="btn btn-primary" @click="saveUniversityEducation">
                            <i class="bi bi-save me-2"></i> Save Higher Education
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 4. First Degree Subjects -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-journal-text me-2"></i> First Degree Main Subjects</h5>

                <div v-if="firstDegreeSubjects.length === 0" class="text-muted mb-3">
                    No university degrees mapped. Click <b>Refresh Subjects Groups</b> after saving university degrees.
                </div>

                <div v-for="(group, index) in firstDegreeSubjects" :key="index" class="mb-3">
                    <label class="form-label">University: <strong>{{ group.universityDegree || '—' }}</strong></label>

                    <div v-for="(subj, sIndex) in group.subjects" :key="sIndex" class="input-group mb-2">
                        <input v-model="group.subjects[sIndex]" class="form-control" placeholder="Subject" />
                        <button class="btn btn-outline-danger" @click="removeSubject(index, sIndex)" type="button">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>

                    <div class="d-flex gap-2 mb-3">
                        <button class="btn btn-success btn-sm" @click="addSubject(index)">
                            <i class="bi bi-plus-circle me-1"></i> Add Subject
                        </button>
                        <small class="text-muted align-self-center ms-2">Save first-degree subjects for each university
                            separately.</small>
                    </div>
                </div>

                <div class="text-end">
                    <button class="btn btn-primary" @click="saveFirstDegreeSubjects">
                        <i class="bi bi-save me-2"></i> Save First Degree Subjects
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
                    <div class="col-md-2"><input v-model="lang.Language" class="form-control" placeholder="Language" />
                    </div>
                    <div class="col-md-2"><input v-model="lang.CanSpeak" class="form-control" placeholder="Speak" />
                    </div>
                    <div class="col-md-2"><input v-model="lang.CanRead" class="form-control" placeholder="Read" /></div>
                    <div class="col-md-2"><input v-model="lang.CanWrite" class="form-control" placeholder="Write" />
                    </div>
                    <div class="col-md-2"><input v-model="lang.CanTeach" class="form-control" placeholder="Teach" />
                    </div>
                    <div class="col-md-2 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeLangRow(index)"><i
                                class="bi bi-trash"></i></button>
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

        <!-- delete all details-->
        <div class="text-center mt-4">
            <button class="btn btn-danger btn-lg" @click="deleteAllApplicationData">
                <i class="bi bi-x-circle me-2"></i> Remove All Details Submitted
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
        };
    },
    mounted() {
        // try to fetch existing data if applicationId is available
        if (this.applicationId) {
            this.prefillAll();
        }
    },
    methods: {
        /********** Prefill existing data (best-effort) **********/
        async prefillAll() {
            try {
                // Note: backend endpoints for GET are assumptions; if they differ, adjust endpoints.
                const id = this.applicationId;
                const calls = [
                    api.get(`/api/applications/${id}/secondary-educations`).catch(() => null),
                    api.get(`/api/applications/${id}/university-educations`).catch(() => null),
                    api.get(`/api/applications/${id}/first-degree-subjects`).catch(() => null),
                    api.get(`/api/applications/${id}/professional-qualifications`).catch(() => null),
                    api.get(`/api/applications/${id}/special-qualifications`).catch(() => null),
                    api.get(`/api/applications/${id}/language-proficiencies`).catch(() => null),
                    api.get(`/api/applications/${id}/employment-histories`).catch(() => null),
                    api.get(`/api/applications/${id}/experience-details`).catch(() => null),
                    api.get(`/api/applications/${id}/research-and-publications`).catch(() => null),
                    api.get(`/api/applications/${id}/references`).catch(() => null),
                    api.get(`/api/applications/${id}/attachments`).catch(() => null),
                    api.get(`/api/applications/${id}/additional-info`).catch(() => null),
                ];

                const results = await Promise.all(calls);

                // Guarded assignments (each response shape may vary; check what's returned)
                if (results[0] && results[0].data) this.secondaryEducations = results[0].data.secondaryEducations || results[0].data || [];
                if (results[1] && results[1].data) {
                    // backend might return array under data or data.universityEducations
                    this.universityEducations = results[1].data.universityEducations || results[1].data || [];
                }
                if (results[2] && results[2].data) {
                    this.firstDegreeSubjects = results[2].data.subjectsGroups || results[2].data || [];
                } else {
                    // map university entries to subject groups if not provided by API
                    this.mapFirstDegreeGroups();
                }
                if (results[3] && results[3].data) this.professionalQualifications = results[3].data.qualifications || results[3].data || [];
                if (results[4] && results[4].data) this.specialQualifications = results[4].data.specialQualifications || results[4].data || [];
                if (results[5] && results[5].data) this.languagesProficiency = results[5].data.languageProficiencies || results[5].data || [];
                if (results[6] && results[6].data) this.employmentRecords = results[6].data.employmentHistories || results[6].data || [];
                if (results[7] && results[7].data) this.experienceDescription = results[7].data.experienceDetails || results[7].data || [];
                if (results[8] && results[8].data) this.researchPublications = results[8].data.publications || results[8].data || [];
                if (results[9] && results[9].data) this.references = results[9].data.references || results[9].data || [];
                if (results[10] && results[10].data) {
                    // attachments response shape may vary
                    this.cvFilePath = results[10].data.filePath || (results[10].data.length ? results[10].data[0]?.filePath : "") || "";
                }
                if (results[11] && results[11].data) {
                    this.additionalInfo.content = results[11].data.content || results[11].data || "";
                }
            } catch (err) {
                // Ignore prefill errors — app will still work
                console.warn("prefill failed", err);
            }
        },

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
                // optional: local id placeholder until backend returns real id
                _localTempId: Date.now() + Math.random(),
            });
            // Update first-degree groups mapping
            this.mapFirstDegreeGroups();
        },
        removeUniversityRow(index) {
            this.universityEducations.splice(index, 1);
            this.mapFirstDegreeGroups();
        },
        mapFirstDegreeGroups() {
            // create or refresh groups for first-degree subjects based on current universityEducations
            this.firstDegreeSubjects = this.universityEducations.map((u) => ({
                universityEducationId: u.Id || u.id || u.UniversityEducationId || null,
                universityDegree: u.DegreeOrDiploma || "",
                subjects: u.subjects ? [...u.subjects] : [],
            }));
        },
        async saveUniversityEducation() {
            try {
                // payload uses jobId per your specification for universityEducations
                await api.post("/api/applications/university-educations", {
                    jobId: Number(this.jobId),
                    universityEducations: this.universityEducations,
                });

                Swal.fire("Saved", "University education saved successfully.", "success");

                // After saving, try to fetch the saved university-education list to get IDs (best-effort)
                if (this.applicationId) {
                    const res = await api.get(`/api/applications/${this.applicationId}/university-educations`).catch(() => null);
                    if (res && res.data) {
                        // Normalize returned list
                        this.universityEducations = res.data.universityEducations || res.data || this.universityEducations;
                        this.mapFirstDegreeGroups();
                    }
                } else {
                    // if we didn't fetch new IDs, just refresh mapping
                    this.mapFirstDegreeGroups();
                }
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save university education.", "error");
            }
        },

        /********** First Degree Subjects **********/
        addSubject(groupIndex) {
            if (!this.firstDegreeSubjects[groupIndex]) return;
            this.firstDegreeSubjects[groupIndex].subjects.push("");
        },
        removeSubject(groupIndex, subjectIndex) {
            this.firstDegreeSubjects[groupIndex].subjects.splice(subjectIndex, 1);
        },
        async saveFirstDegreeSubjects() {
            try {
                // backend expects: { universityEducationId: X, subjects: [...] }
                // We'll save each group separately (if group has universityEducationId).
                const promises = [];
                const groupsMissingId = [];
                for (const g of this.firstDegreeSubjects) {
                    if (!g.universityEducationId) {
                        groupsMissingId.push(g.universityDegree || "(unsaved degree)");
                        continue;
                    }
                    promises.push(api.post("/api/applications/first-degree-subjects", {
                        universityEducationId: Number(g.universityEducationId),
                        subjects: g.subjects,
                    }));
                }

                if (groupsMissingId.length) {
                    return Swal.fire(
                        "Save University First",
                        `Please save your university education entries first (missing IDs for: ${groupsMissingId.join(", ")}).`,
                        "warning"
                    );
                }

                await Promise.all(promises);
                Swal.fire("Saved", "First degree subjects saved successfully.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to save first degree subjects.", "error");
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
            this.cvFile = e.target.files[0] || null;
            if (this.cvFile) {
                // optional: show preview path until user submits
                this.cvFilePath = URL.createObjectURL(this.cvFile);
            }
        },
        async submitCV() {
            if (!this.cvFile) return Swal.fire("Warning", "Please select a file first.", "warning");

            try {
                const formData = new FormData();
                formData.append("file", this.cvFile);

                const res = await api.post("/api/files/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // backend may return filePath in res.data.filePath or res.data.data.filePath etc.
                const filePath = res?.data?.filePath || res?.data?.data?.filePath || (res?.data && typeof res.data === "string" ? res.data : null);
                if (!filePath) {
                    return Swal.fire("Error", "Upload failed: server did not return filePath.", "error");
                }

                this.cvFilePath = filePath;

                // Save attachment entry against application
                if (!this.applicationId) {
                    Swal.fire("Warning", "Application ID missing — CV will not be attached to an application.", "warning");
                    return;
                }

                await api.post("/api/applications/attachments", {
                    applicationId: Number(this.applicationId),
                    fileType: "resume/pdf",
                    filePath: filePath,
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
                // optional: also remove attachment record if backend has such endpoint
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
                // endpoint in your spec: /api/applications/delete-all-ac/{applicationId}
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
