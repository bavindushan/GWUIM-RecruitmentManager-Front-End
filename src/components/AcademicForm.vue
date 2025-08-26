<template>
    <div class="p-6 max-w-5xl mx-auto bg-white rounded-2xl shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Academic Job Application</h2>

        <!-- General Details -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">General Details</h3>
            <input v-model="generalDetails.PostApplied" placeholder="Post Applied" class="input-field" />
            <input v-model="generalDetails.FullName" placeholder="Full Name" class="input-field" />
            <input v-model="generalDetails.NameWithInitials" placeholder="Name with Initials" class="input-field" />
            <input v-model="generalDetails.NIC" placeholder="NIC" class="input-field" />
            <input v-model="generalDetails.DOB" type="date" placeholder="Date of Birth" class="input-field" />
            <input v-model="generalDetails.Gender" placeholder="Gender" class="input-field" />
            <input v-model="generalDetails.PhoneNumber" placeholder="Phone Number" class="input-field" />
            <input v-model="generalDetails.Email" type="email" placeholder="Email" class="input-field" />
            <input v-model="generalDetails.PresentAddress" placeholder="Present Address" class="input-field" />
            <input v-model="generalDetails.PermanentAddress" placeholder="Permanent Address" class="input-field" />
            <input v-model="generalDetails.CivilStatus" placeholder="Civil Status" class="input-field" />
            <input v-model="generalDetails.CitizenshipType" placeholder="Citizenship Type" class="input-field" />
            <input v-model="generalDetails.CitizenshipDetails" placeholder="Citizenship Details" class="input-field" />
            <input v-model="generalDetails.EthnicityOrReligion" placeholder="Ethnicity/Religion" class="input-field" />
        </section>

        <!-- Secondary Education -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Secondary Education</h3>
            <div v-for="(sec, index) in secondaryEducations" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="sec.School" placeholder="School" class="input-field" />
                <input v-model="sec.FromYear" type="number" placeholder="From Year" class="input-field" />
                <input v-model="sec.ToYear" type="number" placeholder="To Year" class="input-field" />
                <input v-model="sec.ExaminationPassed" placeholder="Examination Passed" class="input-field" />
                <input v-model="sec.PassedYear" type="number" placeholder="Year Passed" class="input-field" />
                <button @click="removeSecondary(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addSecondary" class="btn-primary">Add Secondary Education</button>
        </section>

        <!-- Higher Education -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Higher Education</h3>
            <div v-for="(uni, index) in universityEducations" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="uni.DegreeOrDiploma" placeholder="Degree/Diploma" class="input-field" />
                <input v-model="uni.Institute" placeholder="Institute" class="input-field" />
                <input v-model="uni.FromYear" type="number" placeholder="From Year" class="input-field" />
                <input v-model="uni.ToYear" type="number" placeholder="To Year" class="input-field" />
                <input v-model="uni.Class" placeholder="Class" class="input-field" />
                <input v-model="uni.YearObtained" type="number" placeholder="Year Obtained" class="input-field" />
                <input v-model="uni.IndexNumber" placeholder="Index Number" class="input-field" />

                <!-- First Degree Main Subjects -->
                <div class="mt-2">
                    <h4 class="font-semibold mb-1">First Degree Subjects</h4>
                    <div v-for="(subj, sIndex) in uni.subjects" :key="sIndex" class="flex items-center mb-1">
                        <input v-model="uni.subjects[sIndex]" placeholder="Subject" class="input-field flex-1" />
                        <button @click="removeSubject(index, sIndex)" class="btn-danger ml-2">Remove</button>
                    </div>
                    <button @click="addSubject(index)" class="btn-primary">Add Subject</button>
                </div>

                <button @click="removeUniversity(index)" class="btn-danger mt-2">Remove Education</button>
            </div>
            <button @click="addUniversity" class="btn-primary">Add Higher Education</button>
        </section>

        <!-- Professional Qualifications -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Professional Qualifications</h3>
            <div v-for="(qual, index) in qualifications" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="qual.Institution" placeholder="Institution" class="input-field" />
                <input v-model="qual.QualificationName" placeholder="Qualification Name" class="input-field" />
                <input v-model="qual.FromYear" type="number" placeholder="From Year" class="input-field" />
                <input v-model="qual.ToYear" type="number" placeholder="To Year" class="input-field" />
                <input v-model="qual.ResultOrExamPassed" placeholder="Result/Exam Passed" class="input-field" />
                <button @click="removeQualification(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addQualification" class="btn-primary">Add Qualification</button>
        </section>

        <!-- Special Qualifications -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Special Qualifications</h3>
            <div v-for="(sq, index) in specialQualifications" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="sq.Description" placeholder="Description" class="input-field" />
                <button @click="removeSpecial(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addSpecial" class="btn-primary">Add Special Qualification</button>
        </section>

        <!-- Language Proficiency -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Language Proficiency</h3>
            <div v-for="(lang, index) in languageProficiencies" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="lang.Language" placeholder="Language" class="input-field" />
                <input v-model="lang.CanSpeak" placeholder="Can Speak" class="input-field" />
                <input v-model="lang.CanRead" placeholder="Can Read" class="input-field" />
                <input v-model="lang.CanWrite" placeholder="Can Write" class="input-field" />
                <input v-model="lang.CanTeach" placeholder="Can Teach" class="input-field" />
                <button @click="removeLanguage(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addLanguage" class="btn-primary">Add Language</button>
        </section>

        <!-- Employment Records -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Employment Records</h3>
            <div v-for="(emp, index) in employmentHistories" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="emp.PostHeld" placeholder="Post Held" class="input-field" />
                <input v-model="emp.Institution" placeholder="Institution" class="input-field" />
                <input v-model="emp.FromDate" type="date" placeholder="From Date" class="input-field" />
                <input v-model="emp.ToDate" type="date" placeholder="To Date" class="input-field" />
                <input v-model="emp.LastSalary" type="number" placeholder="Last Salary" class="input-field" />
                <button @click="removeEmployment(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addEmployment" class="btn-primary">Add Employment</button>
        </section>

        <!-- Experience Details -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Experience Description</h3>
            <div v-for="(exp, index) in experienceDetails" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="exp.Description" placeholder="Description" class="input-field" />
                <button @click="removeExperience(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addExperience" class="btn-primary">Add Experience</button>
        </section>

        <!-- Research & Publications -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Research & Publications</h3>
            <div v-for="(pub, index) in publications" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="pub.Description" placeholder="Description" class="input-field" />
                <button @click="removePublication(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addPublication" class="btn-primary">Add Publication</button>
        </section>

        <!-- Non-Related Referees -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Non-Related Referees</h3>
            <div v-for="(ref, index) in references" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="ref.Name" placeholder="Name" class="input-field" />
                <input v-model="ref.Designation" placeholder="Designation" class="input-field" />
                <input v-model="ref.Address" placeholder="Address" class="input-field" />
                <button @click="removeReference(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addReference" class="btn-primary">Add Referee</button>
        </section>

        <!-- Additional Info -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Additional Information</h3>
            <textarea v-model="additionalInfo" placeholder="Additional Information" class="input-field"></textarea>
        </section>

        <!-- Upload CV -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Upload CV</h3>
            <input type="file" @change="handleFileUpload" class="input-field" />
            <div v-if="uploadedFilePath" class="mt-2">
                <a :href="uploadedFilePath" target="_blank" class="text-blue-500 underline">View Uploaded CV</a>
                <button @click="deleteFile" class="btn-danger ml-2">Delete</button>
            </div>
        </section>

        <!-- Submit Button -->
        <div class="text-center mt-6">
            <button @click="submitApplication" class="btn-success">Submit Application</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api";

const jobId = 1;
let applicationId = null;

// State
const generalDetails = reactive({
    PostApplied: "",
    FullName: "",
    NameWithInitials: "",
    NIC: "",
    DOB: "",
    Gender: "",
    PhoneNumber: "",
    Email: "",
    PresentAddress: "",
    PermanentAddress: "",
    CivilStatus: "",
    CitizenshipType: "",
    CitizenshipDetails: "",
    EthnicityOrReligion: ""
});

const secondaryEducations = reactive([]);
const universityEducations = reactive([]);
const qualifications = reactive([]);
const specialQualifications = reactive([]);
const languageProficiencies = reactive([]);
const employmentHistories = reactive([]);
const experienceDetails = reactive([]);
const publications = reactive([]);
const references = reactive([]);
const additionalInfo = ref("");
const uploadedFilePath = ref("");

// Methods for dynamic arrays
const addSecondary = () => secondaryEducations.push({ School: "", FromYear: "", ToYear: "", ExaminationPassed: "", PassedYear: "" });
const removeSecondary = (i) => secondaryEducations.splice(i, 1);

const addUniversity = () => universityEducations.push({ DegreeOrDiploma: "", Institute: "", FromYear: "", ToYear: "", Class: "", YearObtained: "", IndexNumber: "", subjects: [] });
const removeUniversity = (i) => universityEducations.splice(i, 1);

const addSubject = (uniIndex) => universityEducations[uniIndex].subjects.push("");
const removeSubject = (uniIndex, subjIndex) => universityEducations[uniIndex].subjects.splice(subjIndex, 1);

const addQualification = () => qualifications.push({ Institution: "", QualificationName: "", FromYear: "", ToYear: "", ResultOrExamPassed: "" });
const removeQualification = (i) => qualifications.splice(i, 1);

const addSpecial = () => specialQualifications.push({ Description: "" });
const removeSpecial = (i) => specialQualifications.splice(i, 1);

const addLanguage = () => languageProficiencies.push({ Language: "", CanSpeak: "", CanRead: "", CanWrite: "", CanTeach: "" });
const removeLanguage = (i) => languageProficiencies.splice(i, 1);

const addEmployment = () => employmentHistories.push({ PostHeld: "", Institution: "", FromDate: "", ToDate: "", LastSalary: "" });
const removeEmployment = (i) => employmentHistories.splice(i, 1);

const addExperience = () => experienceDetails.push({ Description: "" });
const removeExperience = (i) => experienceDetails.splice(i, 1);

const addPublication = () => publications.push({ Description: "" });
const removePublication = (i) => publications.splice(i, 1);

const addReference = () => references.push({ Name: "", Designation: "", Address: "" });
const removeReference = (i) => references.splice(i, 1);

// File upload
const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await api.post("/api/files/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
        uploadedFilePath.value = res.data.filePath;
    } catch (err) {
        Swal.fire("Error", "File upload failed", "error");
    }
};

const deleteFile = async () => {
    if (!uploadedFilePath.value) return;
    const filename = uploadedFilePath.value.split("/").pop();
    try {
        await api.delete(`/api/files/delete/${filename}`);
        uploadedFilePath.value = "";
        Swal.fire("Deleted", "File deleted successfully", "success");
    } catch (err) {
        Swal.fire("Error", "File deletion failed", "error");
    }
};

// Submit
const submitApplication = async () => {
    try {
        // 1️⃣ General Details
        const genRes = await api.post("/api/applications/general-details", { jobId, generalDetails });
        applicationId = genRes.data.applicationId;

        // 2️⃣ Secondary Education
        if (secondaryEducations.length) await api.post("/api/applications/secondary-educations", { applicationId, secondaryEducations });

        // 3️⃣ Higher Education
        for (const uni of universityEducations) {
            const uniRes = await api.post("/api/applications/university-educations", { jobId, universityEducations: [uni] });
            const uniId = uniRes.data.universityEducationId;

            if (uni.subjects.length) {
                await api.post("/api/applications/first-degree-subjects", { universityEducationId: uniId, subjects: uni.subjects });
            }
        }

        // 4️⃣ Professional Qualifications
        if (qualifications.length) await api.post("/api/applications/professional-qualifications", { jobId, qualifications });

        // 5️⃣ Special Qualifications
        if (specialQualifications.length) await api.post("/api/applications/special-qualifications", { jobId, specialQualifications });

        // 6️⃣ Language Proficiency
        if (languageProficiencies.length) await api.post("/api/applications/language-proficiencies", { jobId, languageProficiencies });

        // 7️⃣ Employment Histories
        if (employmentHistories.length) await api.post("/api/applications/employment-histories", { jobId, employmentHistories });

        // 8️⃣ Experience Details
        if (experienceDetails.length) await api.post("/api/applications/experience-details", { jobId, experienceDetails });

        // 9️⃣ Publications
        if (publications.length) await api.post("/api/applications/research-and-publications", { jobId, publications });

        // 🔟 References
        if (references.length) await api.post("/api/applications/references", { jobId, references });

        // 1️⃣1️⃣ Additional Info
        if (additionalInfo.value) await api.post("/api/applications/additional-info", { applicationId, content: additionalInfo.value });

        // 1️⃣2️⃣ Uploaded CV
        if (uploadedFilePath.value) await api.post("/api/applications/attachments", { applicationId, fileType: "resume/pdf", filePath: uploadedFilePath.value });

        Swal.fire("Success", "Application submitted successfully!", "success");
    } catch (err) {
        Swal.fire("Error", "Submission failed", "error");
    }
};
</script>

<style scoped>
.input-field {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
}

.btn-primary {
    background-color: #3b82f6;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
}

.btn-danger {
    background-color: #ef4444;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
}

.btn-success {
    background-color: #22c55e;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
}
</style>
