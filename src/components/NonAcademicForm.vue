<template>
    <div class="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Non-Academic Job Application</h2>

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

        <!-- GCE O/L Results -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">GCE O/L Results</h3>
            <div v-for="(ol, index) in olResults" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="ol.ExamYear" type="number" placeholder="Exam Year" class="input-field" />
                <input v-model="ol.Subject" placeholder="Subject" class="input-field" />
                <input v-model="ol.Grade" placeholder="Grade" class="input-field" />
                <button @click="removeOlResult(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addOlResult" class="btn-primary">Add O/L Result</button>
        </section>

        <!-- GCE A/L Results -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">GCE A/L Results</h3>
            <div v-for="(al, index) in alResults" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="al.Subject" placeholder="Subject" class="input-field" />
                <input v-model="al.Grade" placeholder="Grade" class="input-field" />
                <button @click="removeAlResult(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addAlResult" class="btn-primary">Add A/L Result</button>
        </section>

        <!-- University Education -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">University Education</h3>
            <div v-for="(edu, index) in universityEducations" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="edu.DegreeOrDiploma" placeholder="Degree/Diploma" class="input-field" />
                <input v-model="edu.Institute" placeholder="Institute" class="input-field" />
                <input v-model="edu.FromYear" type="number" placeholder="From Year" class="input-field" />
                <input v-model="edu.ToYear" type="number" placeholder="To Year" class="input-field" />
                <input v-model="edu.Class" placeholder="Class" class="input-field" />
                <input v-model="edu.YearObtained" type="number" placeholder="Year Obtained" class="input-field" />
                <input v-model="edu.IndexNumber" placeholder="Index Number" class="input-field" />
                <button @click="removeUniversity(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addUniversity" class="btn-primary">Add University Education</button>
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

        <!-- Experience Details -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Experience Details</h3>
            <div v-for="(exp, index) in experienceDetails" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="exp.Description" placeholder="Description" class="input-field" />
                <button @click="removeExperience(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addExperience" class="btn-primary">Add Experience</button>
        </section>

        <!-- Special Qualifications -->
        <section class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Special Qualifications / Extra-curricular</h3>
            <div v-for="(sq, index) in specialQualifications" :key="index" class="mb-3 p-3 border rounded-lg">
                <input v-model="sq.Description" placeholder="Description" class="input-field" />
                <button @click="removeSpecial(index)" class="btn-danger mt-2">Remove</button>
            </div>
            <button @click="addSpecial" class="btn-primary">Add Special Qualification</button>
        </section>

        <!-- Submit -->
        <div class="mt-6">
            <button @click="handleSubmit" class="btn-success">Submit Application</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import api from "@/services/api"; // centralized Axios instance

const jobId = 1; // you can dynamically get it from route params

// General Details
const generalDetails = ref({
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

// GCE O/L & A/L
const olResults = ref([]);
const alResults = ref([]);

// University Education
const universityEducations = ref([]);

// Professional Qualifications
const qualifications = ref([]);

// Experience Details
const experienceDetails = ref([]);

// Special Qualifications
const specialQualifications = ref([]);

// Methods to add/remove dynamically
const addOlResult = () => olResults.value.push({ ExamYear: "", Subject: "", Grade: "" });
const removeOlResult = (i) => olResults.value.splice(i, 1);

const addAlResult = () => alResults.value.push({ Subject: "", Grade: "" });
const removeAlResult = (i) => alResults.value.splice(i, 1);

const addUniversity = () => universityEducations.value.push({ DegreeOrDiploma: "", Institute: "", FromYear: "", ToYear: "", Class: "", YearObtained: "", IndexNumber: "" });
const removeUniversity = (i) => universityEducations.value.splice(i, 1);

const addQualification = () => qualifications.value.push({ Institution: "", QualificationName: "", FromYear: "", ToYear: "", ResultOrExamPassed: "" });
const removeQualification = (i) => qualifications.value.splice(i, 1);

const addExperience = () => experienceDetails.value.push({ Description: "" });
const removeExperience = (i) => experienceDetails.value.splice(i, 1);

const addSpecial = () => specialQualifications.value.push({ Description: "" });
const removeSpecial = (i) => specialQualifications.value.splice(i, 1);

// Handle Submission
const handleSubmit = async () => {
    try {
        // 1️⃣ General Details
        await api.post("/api/applications/general-details", { jobId, generalDetails: generalDetails.value });

        // 2️⃣ GCE O/L
        if (olResults.value.length) await api.post("/api/applications/gce-ol-results", { jobId, olResults: olResults.value });

        // 3️⃣ GCE A/L
        if (alResults.value.length) await api.post("/api/applications/gce-al-results", { jobId, alResults: alResults.value });

        // 4️⃣ University Education
        if (universityEducations.value.length) await api.post("/api/applications/university-educations", { jobId, universityEducations: universityEducations.value });

        // 5️⃣ Professional Qualifications
        if (qualifications.value.length) await api.post("/api/applications/professional-qualifications", { jobId, qualifications: qualifications.value });

        // 6️⃣ Experience Details
        if (experienceDetails.value.length) await api.post("/api/applications/experience-details", { jobId, experienceDetails: experienceDetails.value });

        // 7️⃣ Special Qualifications
        if (specialQualifications.value.length) await api.post("/api/applications/special-qualifications", { jobId, specialQualifications: specialQualifications.value });

        Swal.fire("Success!", "Application submitted successfully!", "success");
    } catch (error) {
        Swal.fire("Error", "Submission failed. Please try again.", "error");
    }
};
</script>

<style scoped>
.input-field {
    display: block;
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.btn-primary {
    background-color: #3498db;
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
}

.btn-danger {
    background-color: #e74c3c;
    color: white;
    padding: 4px 10px;
    border-radius: 8px;
}

.btn-success {
    background-color: #2ecc71;
    color: white;
    padding: 8px 14px;
    border-radius: 8px;
    width: 100%;
}
</style>
