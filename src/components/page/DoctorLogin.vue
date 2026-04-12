<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 text-white">
        <h1 class="text-3xl font-bold">Create an Account</h1>
        <p class="text-white/80 mt-1">Join our healthcare platform</p>
      </div>

      <!-- Role Toggle -->
      <div class="flex border-b border-gray-200">
        <button @click="role = 'doctor'" :class="[
          'flex-1 py-4 text-center font-medium transition-all',
          role === 'doctor'
            ? 'text-primary border-b-2 border-primary bg-primary/5'
            : 'text-gray-500 hover:text-gray-700'
        ]">
          <User class="w-5 h-5 inline mr-2" />
          Doctor
        </button>
        <button @click="role = 'patient'" :class="[
          'flex-1 py-4 text-center font-medium transition-all',
          role === 'patient'
            ? 'text-primary border-b-2 border-primary bg-primary/5'
            : 'text-gray-500 hover:text-gray-700'
        ]">
          <Users class="w-5 h-5 inline mr-2" />
          Patient
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- ==================== COMMON FIELDS ==================== -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input v-model="form.firstName" type="text" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input v-model="form.lastName" type="text" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input v-model="form.phoneNumber" type="tel" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input type="file" @change="handleProfileImage" accept="image/*"
              class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary/10 file:text-primary hover:file:bg-primary/20">
          </div>
        </div>

        <!-- ==================== DOCTOR FIELDS ==================== -->
        <div v-if="role === 'doctor'" class="space-y-6 border-t pt-6">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Stethoscope class="w-5 h-5 text-primary" /> Professional Details
          </h2>

          <!-- Specialization -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
            <select v-model="form.doctor.specialization" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">Select</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="General Physician">General Physician</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Gynecologist">Gynecologist</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
              <input v-model.number="form.doctor.experience" type="number" min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
              <input v-model.number="form.doctor.consultationFee" type="number" min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
          </div>

          <!-- Qualifications (dynamic list) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
            <div v-for="(q, idx) in form.doctor.qualification" :key="idx" class="flex gap-2 mb-2">
              <input v-model="q.degree" placeholder="Degree" class="flex-1 px-3 py-1 border rounded">
              <input v-model="q.institution" placeholder="Institution" class="flex-1 px-3 py-1 border rounded">
              <input v-model.number="q.yearOfCompletion" placeholder="Year" type="number"
                class="w-24 px-3 py-1 border rounded">
              <button type="button" @click="removeQualification(idx)" class="text-red-500 hover:text-red-700">✕</button>
            </div>
            <button type="button" @click="addQualification" class="text-sm text-primary hover:underline">+ Add
              Qualification</button>
          </div>

          <!-- Languages (comma separated) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Languages (comma separated)</label>
            <input v-model="form.doctor.languagesRaw" placeholder="e.g., English, Hindi, Spanish"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg">
          </div>

          <!-- Bio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bio / About</label>
            <textarea v-model="form.doctor.bio" rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
          </div>

          <!-- Documents -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Medical License (PDF/Image)</label>
              <input type="file" @change="(e) => handleDocFile(e, 'medicalLicense')" accept=".pdf,.jpg,.png">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Identity Proof</label>
              <input type="file" @change="(e) => handleDocFile(e, 'identityProof')" accept=".pdf,.jpg,.png">
            </div>
          </div>

          <!-- Availability (simplified per day) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Availability (optional)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="day in weekDays" :key="day" class="flex items-center gap-2">
                <span class="w-24 text-sm">{{ day }}</span>
                <input type="time" v-model="form.doctor.availability[day.toLowerCase()].startTime"
                  class="border rounded px-2 py-1 text-sm">
                <span>to</span>
                <input type="time" v-model="form.doctor.availability[day.toLowerCase()].endTime"
                  class="border rounded px-2 py-1 text-sm">
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== PATIENT FIELDS ==================== -->
        <div v-if="role === 'patient'" class="space-y-6 border-t pt-6">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Heart class="w-5 h-5 text-primary" /> Personal & Medical Info
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input v-model="form.patient.dateOfBirth" type="date" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select v-model="form.patient.gender" required class="w-full px-4 py-2 border rounded-lg">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <!-- Address -->
          <fieldset class="border p-4 rounded-lg">
            <legend class="text-sm font-medium px-2">Address</legend>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input v-model="form.patient.address.street" placeholder="Street" class="border rounded px-3 py-2">
              <input v-model="form.patient.address.city" placeholder="City" class="border rounded px-3 py-2">
              <input v-model="form.patient.address.state" placeholder="State" class="border rounded px-3 py-2">
              <input v-model="form.patient.address.pincode" placeholder="Pincode" class="border rounded px-3 py-2">
            </div>
          </fieldset>

          <!-- Medical History (dynamic) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(item, idx) in form.patient.medicalHistory" :key="idx"
                class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {{ item }}
                <button type="button" @click="removeMedicalHistory(idx)" class="text-red-500">✕</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input v-model="newMedicalHistory" placeholder="e.g., Diabetes" class="flex-1 border rounded px-3 py-1">
              <button type="button" @click="addMedicalHistory"
                class="bg-primary/10 text-primary px-4 rounded">Add</button>
            </div>
          </div>

          <!-- Allergies (dynamic) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(item, idx) in form.patient.allergies" :key="idx"
                class="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {{ item }}
                <button type="button" @click="removeAllergy(idx)" class="text-yellow-700">✕</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input v-model="newAllergy" placeholder="e.g., Penicillin" class="flex-1 border rounded px-3 py-1">
              <button type="button" @click="addAllergy" class="bg-primary/10 text-primary px-4 rounded">Add</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select v-model="form.patient.bloodGroup" class="w-full border rounded-lg px-4 py-2">
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
          </div>

          <!-- Emergency Contact -->
          <fieldset class="border p-4 rounded-lg">
            <legend class="text-sm font-medium px-2">Emergency Contact</legend>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input v-model="form.patient.emergencyContact.name" placeholder="Name" class="border rounded px-3 py-2">
              <input v-model="form.patient.emergencyContact.phone" placeholder="Phone" class="border rounded px-3 py-2">
              <input v-model="form.patient.emergencyContact.relationship" placeholder="Relationship"
                class="border rounded px-3 py-2">
            </div>
          </fieldset>

          <!-- Preferences -->
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="form.patient.preferences.notifications">
              <span class="text-sm">Enable Notifications</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="form.patient.preferences.newsletter">
              <span class="text-sm">Subscribe to Newsletter</span>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button type="submit"
            class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition transform hover:scale-[1.02] shadow-md">
            Sign Up as {{ role === 'doctor' ? 'Doctor' : 'Patient' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Users, Stethoscope, Heart } from 'lucide-vue-next'

// ---------- ROLE ----------
const role = ref<'doctor' | 'patient'>('doctor')

// ---------- COMMON FORM DATA ----------
const form = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  profileImage: null as File | null,
  // Doctor specific
  doctor: {
    specialization: '',
    experience: 0,
    consultationFee: 0,
    qualification: [] as { degree: string; institution: string; yearOfCompletion: number }[],
    languagesRaw: '',
    bio: '',
    medicalLicense: null as File | null,
    identityProof: null as File | null,
    availability: {
      monday: { startTime: '', endTime: '' },
      tuesday: { startTime: '', endTime: '' },
      wednesday: { startTime: '', endTime: '' },
      thursday: { startTime: '', endTime: '' },
      friday: { startTime: '', endTime: '' },
      saturday: { startTime: '', endTime: '' },
      sunday: { startTime: '', endTime: '' }
    }
  },
  // Patient specific
  patient: {
    dateOfBirth: '',
    gender: '',
    address: { street: '', city: '', state: '', pincode: '', country: 'India' },
    medicalHistory: [] as string[],
    allergies: [] as string[],
    bloodGroup: '',
    emergencyContact: { name: '', phone: '', relationship: '' },
    preferences: { notifications: true, newsletter: false }
  }
})

// Helpers for dynamic arrays
const addQualification = () => {
  form.doctor.qualification.push({ degree: '', institution: '', yearOfCompletion: new Date().getFullYear() })
}
const removeQualification = (idx: number) => form.doctor.qualification.splice(idx, 1)

const newMedicalHistory = ref('')
const addMedicalHistory = () => {
  if (newMedicalHistory.value.trim()) form.patient.medicalHistory.push(newMedicalHistory.value.trim())
  newMedicalHistory.value = ''
}
const removeMedicalHistory = (idx: number) => form.patient.medicalHistory.splice(idx, 1)

const newAllergy = ref('')
const addAllergy = () => {
  if (newAllergy.value.trim()) form.patient.allergies.push(newAllergy.value.trim())
  newAllergy.value = ''
}
const removeAllergy = (idx: number) => form.patient.allergies.splice(idx, 1)

// File handlers
const handleProfileImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) form.profileImage = target.files[0]
}
const handleDocFile = (e: Event, type: 'medicalLicense' | 'identityProof') => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) form.doctor[type] = target.files[0]
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Submit handler (mocked API call)
const handleSubmit = async () => {
  // Prepare payload based on role
  let payload: any = {
    firstName: form.firstName,
    lastName: form.lastName,
    phoneNumber: form.phoneNumber,
    profileImage: form.profileImage, // in real app, upload to server
    role: role.value
  }

  if (role.value === 'doctor') {
    payload = {
      ...payload,
      specialization: form.doctor.specialization,
      experience: form.doctor.experience,
      consultationFee: form.doctor.consultationFee,
      qualification: form.doctor.qualification,
      languages: form.doctor.languagesRaw.split(',').map(l => l.trim()).filter(l => l),
      bio: form.doctor.bio,
      document: {
        medicalLicense: form.doctor.medicalLicense,
        identityProof: form.doctor.identityProof
      },
      availability: form.doctor.availability,
      verificationStatus: 'pending',
      isAvailable: true
    }
  } else {
    payload = {
      ...payload,
      dateOfBirth: form.patient.dateOfBirth,
      gender: form.patient.gender,
      address: form.patient.address,
      medicalHistory: form.patient.medicalHistory,
      allergies: form.patient.allergies,
      bloodGroup: form.patient.bloodGroup,
      emergencyContact: form.patient.emergencyContact,
      preferences: form.patient.preferences
    }
  }

  // Mock API call
  console.log('Submitting:', payload)
  alert(`Signup successful! (${role.value} account created)\nCheck console for payload.`)

  // In real app: await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(payload) })
}
</script>

<style scoped>
/* Optional: smooth transitions */
input,
select,
textarea,
button {
  transition: all 0.2s ease;
}
</style>