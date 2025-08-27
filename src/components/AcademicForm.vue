<template>
    <div class="container py-4">

        <!-- 1. General Details -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-person-lines-fill me-2"></i> General Details</h5>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Post Applied</label>
                        <input type="text" v-model="generalDetails.PostApplied" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Full Name</label>
                        <input type="text" v-model="generalDetails.FullName" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Name With Initials</label>
                        <input type="text" v-model="generalDetails.NameWithInitials" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">NIC</label>
                        <input type="text" v-model="generalDetails.NIC" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">DOB</label>
                        <input type="date" v-model="generalDetails.DOB" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Gender</label>
                        <select v-model="generalDetails.Gender" class="form-select">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Phone Number</label>
                        <input type="text" v-model="generalDetails.PhoneNumber" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input type="email" v-model="generalDetails.Email" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Present Address</label>
                        <input type="text" v-model="generalDetails.PresentAddress" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Permanent Address</label>
                        <input type="text" v-model="generalDetails.PermanentAddress" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Civil Status</label>
                        <input type="text" v-model="generalDetails.CivilStatus" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Citizenship Type</label>
                        <input type="text" v-model="generalDetails.CitizenshipType" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Citizenship Details</label>
                        <input type="text" v-model="generalDetails.CitizenshipDetails" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Ethnicity / Religion</label>
                        <input type="text" v-model="generalDetails.EthnicityOrReligion" class="form-control" />
                    </div>
                </div>

                <div class="text-end mt-3">
                    <button class="btn btn-primary" @click="saveGeneralDetails">
                        <i class="bi bi-save me-2"></i> Save General Details
                    </button>
                </div>
            </div>
        </div>

        <!-- 2. Secondary Education -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-book me-2"></i> Secondary Education (O/L + A/L)</h5>

                <!-- O/L Table -->
                <h6>GCE O/L Results</h6>
                <table class="table table-bordered table-striped mb-3">
                    <thead class="table-light">
                        <tr>
                            <th>Year</th>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ol, index) in olResults" :key="index">
                            <td><input type="number" v-model="ol.ExamYear" class="form-control" /></td>
                            <td><input type="text" v-model="ol.Subject" class="form-control" /></td>
                            <td><input type="text" v-model="ol.Grade" class="form-control" /></td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="removeOLRow(index)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-success btn-sm mb-3" @click="addOLRow">
                    <i class="bi bi-plus-circle me-1"></i> Add O/L Subject
                </button>

                <!-- A/L Table -->
                <h6>GCE A/L Results</h6>
                <table class="table table-bordered table-striped mb-3">
                    <thead class="table-light">
                        <tr>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(al, index) in alResults" :key="index">
                            <td><input type="text" v-model="al.Subject" class="form-control" /></td>
                            <td><input type="text" v-model="al.Grade" class="form-control" /></td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="removeALRow(index)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-success btn-sm mb-3" @click="addALRow">
                    <i class="bi bi-plus-circle me-1"></i> Add A/L Subject
                </button>

                <div class="text-end">
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(edu, index) in universityEducations" :key="index">
                            <td><input type="text" v-model="edu.DegreeOrDiploma" class="form-control" /></td>
                            <td><input type="text" v-model="edu.Institute" class="form-control" /></td>
                            <td><input type="number" v-model="edu.FromYear" class="form-control" /></td>
                            <td><input type="number" v-model="edu.ToYear" class="form-control" /></td>
                            <td><input type="text" v-model="edu.Class" class="form-control" /></td>
                            <td><input type="number" v-model="edu.YearObtained" class="form-control" /></td>
                            <td><input type="text" v-model="edu.IndexNumber" class="form-control" /></td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="removeUniversityRow(index)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-success btn-sm mb-3" @click="addUniversityRow">
                    <i class="bi bi-plus-circle me-1"></i> Add University Degree
                </button>

                <div class="text-end">
                    <button class="btn btn-primary" @click="saveUniversityEducation">
                        <i class="bi bi-save me-2"></i> Save Higher Education
                    </button>
                </div>
            </div>
        </div>

        <!-- 4. First Degree Subjects -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-journal-text me-2"></i> First Degree Main Subjects</h5>
                <div v-for="(subjGroup, index) in firstDegreeSubjects" :key="index" class="mb-3">
                    <label class="form-label">University Education: {{ subjGroup.universityDegree }}</label>
                    <input type="text" v-for="(subject, sIndex) in subjGroup.subjects" :key="sIndex"
                        v-model="subjGroup.subjects[sIndex]" class="form-control mb-2" placeholder="Subject" />
                    <button class="btn btn-success btn-sm" @click="addSubject(index)">
                        <i class="bi bi-plus-circle me-1"></i> Add Subject
                    </button>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(pq, index) in professionalQualifications" :key="index">
                            <td><input type="text" v-model="pq.Institution" class="form-control" /></td>
                            <td><input type="text" v-model="pq.QualificationName" class="form-control" /></td>
                            <td><input type="number" v-model="pq.FromYear" class="form-control" /></td>
                            <td><input type="number" v-model="pq.ToYear" class="form-control" /></td>
                            <td><input type="text" v-model="pq.ResultOrExamPassed" class="form-control" /></td>
                            <td>
                                <button class="btn btn-danger btn-sm" @click="removePQRow(index)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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

        <!-- 6. Special Qualifications / Extra-curricular -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-stars me-2"></i> Special Qualifications / Extra-curricular</h5>
                <div v-for="(sq, index) in specialQualifications" :key="index" class="mb-2 d-flex gap-2">
                    <input type="text" v-model="sq.Description" class="form-control" placeholder="Description" />
                    <button class="btn btn-danger btn-sm" @click="removeSQRow(index)">
                        <i class="bi bi-trash"></i>
                    </button>
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

        <!-- 7. Languages Proficiency -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-translate me-2"></i> Languages Proficiency</h5>
                <div v-for="(lang, index) in languagesProficiency" :key="index" class="row g-2 mb-2">
                    <div class="col-md-2">
                        <input type="text" v-model="lang.Language" class="form-control" placeholder="Language" />
                    </div>
                    <div class="col-md-2">
                        <input type="text" v-model="lang.CanSpeak" class="form-control" placeholder="Speak" />
                    </div>
                    <div class="col-md-2">
                        <input type="text" v-model="lang.CanRead" class="form-control" placeholder="Read" />
                    </div>
                    <div class="col-md-2">
                        <input type="text" v-model="lang.CanWrite" class="form-control" placeholder="Write" />
                    </div>
                    <div class="col-md-2">
                        <input type="text" v-model="lang.CanTeach" class="form-control" placeholder="Teach" />
                    </div>
                    <div class="col-md-2 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeLangRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addLangRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Language
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveLanguagesProficiency">
                        <i class="bi bi-save me-2"></i> Save Languages
                    </button>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(emp, index) in employmentRecords" :key="index">
                            <td><input type="text" v-model="emp.PostHeld" class="form-control" /></td>
                            <td><input type="text" v-model="emp.Institution" class="form-control" /></td>
                            <td><input type="date" v-model="emp.FromDate" class="form-control" /></td>
                            <td><input type="date" v-model="emp.ToDate" class="form-control" /></td>
                            <td><input type="number" v-model="emp.LastSalary" class="form-control" /></td>
                            <td>
                                <button class="btn btn-danger btn-sm" @click="removeEmpRow(index)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-success btn-sm mb-3" @click="addEmpRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Employment
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveEmploymentRecords">
                        <i class="bi bi-save me-2"></i> Save Employment
                    </button>
                </div>
            </div>
        </div>

        <!-- 9. Experience Description -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-journal-text me-2"></i> Experience Description</h5>
                <div v-for="(exp, index) in experienceDescription" :key="index" class="d-flex gap-2 mb-2">
                    <input type="text" v-model="exp.Description" class="form-control" placeholder="Experience Detail" />
                    <button class="btn btn-danger btn-sm" @click="removeExpRow(index)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addExpRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Experience
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveExperienceDescription">
                        <i class="bi bi-save me-2"></i> Save Experience
                    </button>
                </div>
            </div>
        </div>

        <!-- 10. Research & Publications -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-file-earmark-text me-2"></i> Research & Publications</h5>
                <div v-for="(pub, index) in researchPublications" :key="index" class="d-flex gap-2 mb-2">
                    <input type="text" v-model="pub.Description" class="form-control"
                        placeholder="Publication Detail" />
                    <button class="btn btn-danger btn-sm" @click="removePubRow(index)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addPubRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Publication
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveResearchPublications">
                        <i class="bi bi-save me-2"></i> Save Publications
                    </button>
                </div>
            </div>
        </div>

        <!-- 11. Non-Related Referees -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5">
                <h5 class="fw-bold mb-4"><i class="bi bi-people me-2"></i> Non-Related Referees</h5>
                <div v-for="(ref, index) in references" :key="index" class="row g-2 mb-2">
                    <div class="col-md-4"><input type="text" v-model="ref.Name" class="form-control"
                            placeholder="Name" /></div>
                    <div class="col-md-4"><input type="text" v-model="ref.Designation" class="form-control"
                            placeholder="Designation" /></div>
                    <div class="col-md-3"><input type="text" v-model="ref.Address" class="form-control"
                            placeholder="Address" /></div>
                    <div class="col-md-1 d-flex justify-content-center">
                        <button class="btn btn-danger btn-sm" @click="removeRefRow(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-success btn-sm mb-3" @click="addRefRow">
                    <i class="bi bi-plus-circle me-1"></i> Add Referee
                </button>
                <div class="text-end">
                    <button class="btn btn-primary" @click="saveReferences">
                        <i class="bi bi-save me-2"></i> Save Referees
                    </button>
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
                    <button class="btn btn-primary" @click="saveAdditionalInfo">
                        <i class="bi bi-save me-2"></i> Save Additional Info
                    </button>
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
                    <button class="btn btn-danger btn-sm" @click="deleteCV"><i class="bi bi-trash"></i> Delete
                        CV</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            jobId: 1,
            generalDetails: {
                PostApplied: '',
                FullName: '',
                NameWithInitials: '',
                NIC: '',
                DOB: '',
                Gender: '',
                PhoneNumber: '',
                Email: '',
                PresentAddress: '',
                PermanentAddress: '',
                CivilStatus: '',
                CitizenshipType: '',
                CitizenshipDetails: '',
                EthnicityOrReligion: ''
            },
            olResults: [],
            alResults: [],
            universityEducations: [],
            firstDegreeSubjects: [],
            professionalQualifications: [],
            specialQualifications: [],
            languagesProficiency: [],
            employmentRecords: [],
            experienceDescription: [],
            researchPublications: [],
            references: [],
            additionalInfo: { content: '' },
            cvFile: null,
            cvFilePath: ''
        };
    },
    methods: {
        // General Details
        saveGeneralDetails() {
            console.log('Save General Details', this.generalDetails);
        },
        // O/L & A/L
        addOLRow() { this.olResults.push({ ExamYear: '', Subject: '', Grade: '' }); },
        removeOLRow(index) { this.olResults.splice(index, 1); },
        addALRow() { this.alResults.push({ Subject: '', Grade: '' }); },
        removeALRow(index) { this.alResults.splice(index, 1); },
        saveSecondaryEducation() { console.log('Save Secondary Education', this.olResults, this.alResults); },
        // University
        addUniversityRow() { this.universityEducations.push({ DegreeOrDiploma: '', Institute: '', FromYear: '', ToYear: '', Class: '', YearObtained: '', IndexNumber: '' }); },
        removeUniversityRow(index) { this.universityEducations.splice(index, 1); },
        saveUniversityEducation() { console.log('Save University Education', this.universityEducations); },
        // First Degree Subjects
        addSubject(index) { this.firstDegreeSubjects[index].subjects.push(''); },
        saveFirstDegreeSubjects() { console.log('Save First Degree Subjects', this.firstDegreeSubjects); },
        // Professional Qualifications
        addPQRow() { this.professionalQualifications.push({ Institution: '', QualificationName: '', FromYear: '', ToYear: '', ResultOrExamPassed: '' }); },
        removePQRow(index) { this.professionalQualifications.splice(index, 1); },
        saveProfessionalQualifications() { console.log('Save PQ', this.professionalQualifications); },
        // Special Qualifications
        addSQRow() { this.specialQualifications.push({ Description: '' }); },
        removeSQRow(index) { this.specialQualifications.splice(index, 1); },
        saveSpecialQualifications() { console.log('Save SQ', this.specialQualifications); },
        // Languages
        addLangRow() { this.languagesProficiency.push({ Language: '', CanSpeak: '', CanRead: '', CanWrite: '', CanTeach: '' }); },
        removeLangRow(index) { this.languagesProficiency.splice(index, 1); },
        saveLanguagesProficiency() { console.log('Save Languages', this.languagesProficiency); },
        // Employment Records
        addEmpRow() { this.employmentRecords.push({ PostHeld: '', Institution: '', FromDate: '', ToDate: '', LastSalary: '' }); },
        removeEmpRow(index) { this.employmentRecords.splice(index, 1); },
        saveEmploymentRecords() { console.log('Save Employment Records', this.employmentRecords); },
        // Experience
        addExpRow() { this.experienceDescription.push({ Description: '' }); },
        removeExpRow(index) { this.experienceDescription.splice(index, 1); },
        saveExperienceDescription() { console.log('Save Experience', this.experienceDescription); },
        // Research Publications
        addPubRow() { this.researchPublications.push({ Description: '' }); },
        removePubRow(index) { this.researchPublications.splice(index, 1); },
        saveResearchPublications() { console.log('Save Publications', this.researchPublications); },
        // References
        addRefRow() { this.references.push({ Name: '', Designation: '', Address: '' }); },
        removeRefRow(index) { this.references.splice(index, 1); },
        saveReferences() { console.log('Save References', this.references); },
        // Additional Info
        saveAdditionalInfo() { console.log('Save Additional Info', this.additionalInfo); },
        // CV
        handleCVUpload(event) {
            this.cvFile = event.target.files[0];
            if (this.cvFile) {
                // Upload logic to API
                this.cvFilePath = URL.createObjectURL(this.cvFile); // placeholder
            }
        },
        deleteCV() {
            this.cvFile = null;
            this.cvFilePath = '';
        }
    }
};
</script>

<style scoped>
.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
