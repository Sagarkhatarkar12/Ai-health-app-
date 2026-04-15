<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1120] p-4">
    <!-- Animated Background Orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-[120px] animate-float-slow"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px] animate-float-slower"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] animate-pulse-slow"></div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='rgba(255,255,255,0.03)' stroke-width='0.5' /%3E%3C/svg%3E')] opacity-30"></div>

    <div class="relative w-full max-w-6xl z-10">
      <!-- Outer Glow -->
      <div class="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-60 animate-gradient-x"></div>

      <!-- Main Glass Card -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
        <!-- Top Shimmer Line -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer"></div>

        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='rgba(255,255,255,0.05)' stroke-width='0.5' /%3E%3C/svg%3E')]"></div>
        </div>

        <!-- Header -->
        <div class="relative px-8 pt-8 pb-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent">
            Join AI Health
          </h1>
          <p class="text-gray-400 mt-2 text-lg">Begin your intelligent healthcare journey</p>
        </div>

        <!-- Role Toggle -->
        <div class="relative flex justify-center px-8 pb-6">
          <div class="bg-white/5 backdrop-blur-sm rounded-full p-1.5 flex gap-2 border border-white/10">
            <button
              v-for="r in ['patient', 'doctor']"
              :key="r"
              @click="role = r"
              class="relative px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              :class="role === r ? 'text-white' : 'text-gray-400 hover:text-gray-200'"
            >
              <span class="relative z-10 capitalize">{{ r }}</span>
              <div
                v-if="role === r"
                class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30"
              ></div>
            </button>
          </div>
        </div>

        <!-- Error Alert -->
        <Transition name="fade-slide">
          <div
            v-if="error"
            class="mx-8 mb-4 p-4 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-200 text-sm flex items-start gap-3"
          >
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="relative px-8 pb-8 space-y-6 max-h-[65vh] overflow-y-auto custom-scroll">
          <!-- ========== COMMON FIELDS ========== -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <div class="input-group">
              <input type="text" v-model="form.firstName" required class="input" placeholder=" ">
              <label class="label">First Name <span class="text-red-400">*</span></label>
            </div>
            <div class="input-group">
              <input type="text" v-model="form.lastName" required class="input" placeholder=" ">
              <label class="label">Last Name <span class="text-red-400">*</span></label>
            </div>
            <div class="input-group">
              <input type="tel" v-model="form.phoneNumber" required class="input" placeholder=" ">
              <label class="label">Phone Number <span class="text-red-400">*</span></label>
            </div>
            <div class="input-group">
              <input type="email" v-model="form.email" required class="input" placeholder=" ">
              <label class="label">Email <span class="text-red-400">*</span></label>
            </div>
            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required class="input" placeholder=" ">
              <label class="label">Password <span class="text-red-400">*</span></label>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <!-- eye icons -->
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>

            <!-- Profile Image Upload -->
            <div class="md:col-span-2">
              <label class="block text-gray-300 text-sm font-medium mb-2">Profile Image</label>
              <div class="flex items-center gap-4">
                <div
                  v-if="profilePreview"
                  class="w-16 h-16 rounded-full bg-cover bg-center border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                  :style="{ backgroundImage: `url(${profilePreview})` }"
                ></div>
                <div
                  v-else
                  class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-white/10 flex items-center justify-center"
                >
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <label
                  class="group relative px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>Choose Image</span>
                  <input type="file" @change="handleProfileImage" accept="image/*" class="hidden">
                </label>
              </div>
            </div>
          </div>

          <!-- ========== DOCTOR SECTION ========== -->
          <div v-if="role === 'doctor'" class="space-y-5 border-t border-white/10 pt-5">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <div class="p-1.5 rounded-lg bg-cyan-500/20">
                <Stethoscope class="w-5 h-5 text-cyan-300" />
              </div>
              Professional Details
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="input-group">
                <select v-model="form.doctor.specialization" required class="input-select">
                  <option value="" disabled>Select</option>
                  <option v-for="spec in specializations" :key="spec" :value="spec">{{ spec }}</option>
                </select>
                <label class="label">Specialization <span class="text-red-400">*</span></label>
              </div>
              <div class="input-group">
                <input type="number" v-model.number="form.doctor.experience" min="0" class="input" placeholder=" ">
                <label class="label">Experience (years)</label>
              </div>
              <div class="input-group">
                <input type="number" v-model.number="form.doctor.consultationFee" min="0" class="input" placeholder=" ">
                <label class="label">Consultation Fee (₹)</label>
              </div>
              <div class="input-group">
                <input type="text" v-model="form.doctor.languagesRaw" class="input" placeholder=" ">
                <label class="label">Languages (comma separated)</label>
              </div>
            </div>

            <!-- Qualifications -->
            <div>
              <label class="text-gray-300 text-sm font-medium mb-2 block">Qualifications</label>
              <div v-for="(q, idx) in form.doctor.qualification" :key="idx" class="flex flex-wrap gap-2 mb-2">
                <input v-model="q.degree" placeholder="Degree" class="input-mini flex-1 min-w-[120px]">
                <input v-model="q.institution" placeholder="Institution" class="input-mini flex-1 min-w-[150px]">
                <input v-model.number="q.yearOfCompletion" placeholder="Year" type="number" class="input-mini w-24">
                <button type="button" @click="removeQualification(idx)" class="p-2 text-red-400 hover:text-red-300 transition-colors">✕</button>
              </div>
              <button type="button" @click="addQualification" class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Qualification
              </button>
            </div>

            <!-- Bio -->
            <div class="input-group">
              <textarea v-model="form.doctor.bio" rows="2" class="input" placeholder=" "></textarea>
              <label class="label">Bio / About</label>
            </div>

            <!-- Documents -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="text-gray-300 text-sm font-medium block mb-2">Medical License</label>
                <label class="group relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all duration-300">
                  <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span class="text-sm text-gray-300">Upload PDF/Image</span>
                  <input type="file" @change="(e) => handleDocFile(e, 'medicalLicense')" accept=".pdf,.jpg,.png" class="hidden">
                </label>
                <span v-if="form.doctor.medicalLicense" class="text-xs text-green-400 block mt-1">✓ File selected</span>
              </div>
              <div>
                <label class="text-gray-300 text-sm font-medium block mb-2">Identity Proof</label>
                <label class="group relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all duration-300">
                  <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-sm text-gray-300">Upload Document</span>
                  <input type="file" @change="(e) => handleDocFile(e, 'identityProof')" accept=".pdf,.jpg,.png" class="hidden">
                </label>
                <span v-if="form.doctor.identityProof" class="text-xs text-green-400 block mt-1">✓ File selected</span>
              </div>
            </div>

            <!-- Availability -->
            <div>
              <label class="text-gray-300 text-sm font-medium mb-3 block">Weekly Availability</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="day in weekDays" :key="day" class="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span class="w-20 text-sm text-gray-300">{{ day }}</span>
                  <input type="time" v-model="form.doctor.availability[day.toLowerCase()].startTime" class="input-mini flex-1">
                  <span class="text-gray-500">—</span>
                  <input type="time" v-model="form.doctor.availability[day.toLowerCase()].endTime" class="input-mini flex-1">
                </div>
              </div>
            </div>
          </div>

          <!-- ========== PATIENT SECTION ========== -->
          <div v-if="role === 'patient'" class="space-y-5 border-t border-white/10 pt-5">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <div class="p-1.5 rounded-lg bg-purple-500/20">
                <Heart class="w-5 h-5 text-purple-300" />
              </div>
              Medical Profile
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="input-group">
                <input type="date" v-model="form.patient.dateOfBirth" required class="input" placeholder=" ">
                <label class="label">Date of Birth <span class="text-red-400">*</span></label>
              </div>
              <div class="input-group">
                <select v-model="form.patient.gender" required class="input-select">
                  <option value="" disabled>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <label class="label">Gender <span class="text-red-400">*</span></label>
              </div>
            </div>

            <!-- Address -->
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
              <label class="text-gray-300 text-sm font-medium block mb-3">Address</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input v-model="form.patient.address.street" placeholder="Street" class="input-mini">
                <input v-model="form.patient.address.city" placeholder="City" class="input-mini">
                <input v-model="form.patient.address.state" placeholder="State" class="input-mini">
                <input v-model="form.patient.address.pincode" placeholder="Pincode" class="input-mini">
              </div>
            </div>

            <!-- Medical History -->
            <div>
              <label class="text-gray-300 text-sm font-medium mb-2 block">Medical History</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="(item, idx) in form.patient.medicalHistory" :key="idx"
                  class="bg-cyan-500/20 text-cyan-200 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border border-cyan-500/30"
                >
                  {{ item }}
                  <button type="button" @click="removeMedicalHistory(idx)" class="hover:text-white">✕</button>
                </span>
              </div>
              <div class="flex gap-2">
                <input v-model="newMedicalHistory" placeholder="Add condition (e.g., Diabetes)" class="input-mini flex-1">
                <button type="button" @click="addMedicalHistory"
                  class="px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 transition-all"
                >+</button>
              </div>
            </div>

            <!-- Allergies -->
            <div>
              <label class="text-gray-300 text-sm font-medium mb-2 block">Allergies</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="(item, idx) in form.patient.allergies" :key="idx"
                  class="bg-red-500/20 text-red-200 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border border-red-500/30"
                >
                  {{ item }}
                  <button type="button" @click="removeAllergy(idx)" class="hover:text-white">✕</button>
                </span>
              </div>
              <div class="flex gap-2">
                <input v-model="newAllergy" placeholder="e.g., Penicillin" class="input-mini flex-1">
                <button type="button" @click="addAllergy"
                  class="px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 transition-all"
                >+</button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="input-group">
                <select v-model="form.patient.bloodGroup" class="input-select">
                  <option value="">Select</option>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                  <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                </select>
                <label class="label">Blood Group</label>
              </div>
            </div>

            <!-- Emergency Contact -->
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
              <label class="text-gray-300 text-sm font-medium block mb-3">Emergency Contact</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input v-model="form.patient.emergencyContact.name" placeholder="Name" class="input-mini">
                <input v-model="form.patient.emergencyContact.phone" placeholder="Phone" class="input-mini">
                <input v-model="form.patient.emergencyContact.relationship" placeholder="Relationship" class="input-mini">
              </div>
            </div>

            <!-- Preferences -->
            <div class="flex flex-wrap gap-6">
              <label class="flex items-center gap-3 text-gray-300 cursor-pointer">
                <input type="checkbox" v-model="form.patient.preferences.notifications" class="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50">
                <span>Enable Notifications</span>
              </label>
              <label class="flex items-center gap-3 text-gray-300 cursor-pointer">
                <input type="checkbox" v-model="form.patient.preferences.newsletter" class="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50">
                <span>Subscribe to Newsletter</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.01] overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span v-if="!loading" class="relative flex items-center justify-center gap-2">
              Sign Up as {{ role === 'doctor' ? 'Doctor' : 'Patient' }}
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span v-else class="relative flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Stethoscope, Heart } from 'lucide-vue-next'
import api from '../../services/api'

const router = useRouter()
const role = ref<'doctor' | 'patient'>('patient')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

// Common form
const form = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  profileImage: null as File | null,
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

const profilePreview = ref<string | null>(null)

// Helpers
const addQualification = () => form.doctor.qualification.push({ degree: '', institution: '', yearOfCompletion: new Date().getFullYear() })
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

const handleProfileImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    form.profileImage = target.files[0]
    profilePreview.value = URL.createObjectURL(target.files[0])
  }
}
const handleDocFile = (e: Event, type: 'medicalLicense' | 'identityProof') => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) form.doctor[type] = target.files[0]
}

const specializations = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Psychiatrist', 'General Physician', 'Orthopedic', 'Gynecologist']
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    const payload: any = {
      role: role.value,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      phoneNumber: form.phoneNumber,
    }

    if (role.value === 'doctor') {
      const languages = form.doctor.languagesRaw ? form.doctor.languagesRaw.split(',').map(l => l.trim()).filter(Boolean) : []
      payload.specialization = form.doctor.specialization
      payload.experience = form.doctor.experience
      payload.consultationFee = form.doctor.consultationFee
      payload.qualification = form.doctor.qualification
      payload.languages = languages
      payload.bio = form.doctor.bio
      payload.availability = form.doctor.availability
    } else {
      payload.dateOfBirth = form.patient.dateOfBirth
      payload.gender = form.patient.gender
      payload.address = form.patient.address
      payload.bloodGroup = form.patient.bloodGroup
      payload.emergencyContact = form.patient.emergencyContact
      payload.medicalHistory = form.patient.medicalHistory
      payload.allergies = form.patient.allergies
    }

    const formData = new FormData()
    // console.log(payload);
  formData.append('payload', JSON.stringify(payload))
    if (form.profileImage) formData.append('profileImage', form.profileImage)
    if (role.value === 'doctor') {
      if (form.doctor.medicalLicense) formData.append('medicalLicense', form.doctor.medicalLicense)
      if (form.doctor.identityProof) formData.append('identityProof', form.doctor.identityProof)
    }

    const response = await api.post('/api/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

    if (response.data.success) {
      router.push({ path: '/login', query: { registered: 'true', role: role.value } })
    }
  } catch (err: any) {
    console.error('Registration error:', err)
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Animations */
@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float-slower {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(20px) scale(0.95); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
.animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
.animate-gradient-x { background-size: 200% 200%; animation: gradient-x 6s ease infinite; }
.animate-shimmer {
  position: relative;
  overflow: hidden;
}
.animate-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

/* Input Groups */
.input-group {
  position: relative;
}
.input, .input-select, .input-group textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
  color: white;
  transition: all 0.3s;
  font-size: 0.95rem;
}
.input:focus, .input-select:focus, .input-group textarea:focus {
  outline: none;
  border-color: #22d3ee;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1);
}
.label {
  position: absolute;
  left: 1rem;
  top: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s;
  pointer-events: none;
  font-size: 0.95rem;
}
.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label,
.input-select:focus ~ .label,
.input-select:not([value=""]) ~ .label,
.input-group textarea:focus ~ .label,
.input-group textarea:not(:placeholder-shown) ~ .label {
  top: -0.6rem;
  left: 0.8rem;
  font-size: 0.7rem;
  background: #1e293b;
  padding: 0 0.4rem;
  border-radius: 0.5rem;
  color: #22d3ee;
}
.input-mini {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.65rem 0.75rem;
  color: white;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.input-mini:focus {
  outline: none;
  border-color: #22d3ee;
  background: rgba(255, 255, 255, 0.08);
}
.input-mini::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* Scrollbar */
.custom-scroll::-webkit-scrollbar {
  width: 5px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(34, 211, 238, 0.3);
  border-radius: 10px;
}

/* Transition */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>