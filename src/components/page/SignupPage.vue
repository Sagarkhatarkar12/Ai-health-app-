<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
    <div class="w-full max-w-5xl">
      <!-- Glass Card -->
      <div class="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

        <!-- Animated Background Accent -->
        <div
          class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob">
        </div>
        <div
          class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000">
        </div>
        <div
          class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000">
        </div>

        <!-- Header -->
        <div class="relative px-8 pt-8 pb-4 text-center">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Join MedCare
          </h1>
          <p class="text-white/70 mt-2">Start your healthcare journey</p>
        </div>

        <!-- Role Toggle (Animated Slider) -->
        <div class="relative flex justify-center px-8 pb-6">
          <div class="bg-white/10 backdrop-blur-sm rounded-full p-1 flex gap-2">
            <button v-for="r in ['doctor', 'patient']" :key="r" @click="role = r"
              class="relative px-8 py-2 rounded-full text-sm font-medium transition-all duration-300"
              :class="role === r ? 'text-white' : 'text-white/60 hover:text-white'">
              <span class="relative z-10 capitalize">{{ r }}</span>
              <div v-if="role === r"
                class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transition-all duration-300">
              </div>
            </button>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit"
          class="relative px-8 pb-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scroll">

          <!-- ========== COMMON FIELDS ========== -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="input-group">
              <input type="text" v-model="form.firstName" required class="input" placeholder=" ">
              <label class="label">First Name *</label>
            </div>
            <div class="input-group">
              <input type="text" v-model="form.lastName" required class="input" placeholder=" ">
              <label class="label">Last Name *</label>
            </div>
            <div class="input-group">
              <input type="tel" v-model="form.phoneNumber" required class="input" placeholder=" ">
              <label class="label">Phone Number *</label>
            </div>
            <div class="file-group">
              <label class="block text-white/80 text-sm mb-1">Profile Image</label>
              <div class="flex items-center gap-3">
                <div v-if="profilePreview" class="w-12 h-12 rounded-full bg-cover bg-center border-2 border-white/30"
                  :style="{ backgroundImage: `url(${profilePreview})` }"></div>
                <label
                  class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg cursor-pointer text-white text-sm transition">
                  Upload
                  <input type="file" @change="handleProfileImage" accept="image/*" class="hidden">
                </label>
              </div>
            </div>
          </div>

          <!-- ========== DOCTOR SECTION ========== -->
          <div v-if="role === 'doctor'" class="space-y-5 border-t border-white/20 pt-5">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <Stethoscope class="w-5 h-5" /> Professional Details
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="input-group">
                <select v-model="form.doctor.specialization" required class="input-select">
                  <option value="" disabled>Select</option>
                  <option v-for="spec in specializations" :key="spec" :value="spec">{{ spec }}</option>
                </select>
                <label class="label">Specialization *</label>
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

            <!-- Dynamic Qualifications -->
            <div>
              <label class="text-white/80 text-sm mb-2 block">Qualifications</label>
              <div v-for="(q, idx) in form.doctor.qualification" :key="idx" class="flex flex-wrap gap-2 mb-2">
                <input v-model="q.degree" placeholder="Degree"
                  class="flex-1 min-w-[120px] bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50">
                <input v-model="q.institution" placeholder="Institution"
                  class="flex-1 min-w-[150px] bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <input v-model.number="q.yearOfCompletion" placeholder="Year" type="number"
                  class="w-28 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <button type="button" @click="removeQualification(idx)"
                  class="text-red-300 hover:text-red-500">✕</button>
              </div>
              <button type="button" @click="addQualification" class="text-sm text-purple-300 hover:text-purple-200">+
                Add Qualification</button>
            </div>

            <!-- Bio -->
            <div class="input-group">
              <textarea v-model="form.doctor.bio" rows="2" class="input" placeholder=" "></textarea>
              <label class="label">Bio / About</label>
            </div>

            <!-- Documents -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="file-group">
                <label class="text-white/80 text-sm block mb-1">Medical License</label>
                <label
                  class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg inline-block cursor-pointer text-white text-sm">
                  Upload PDF/Image
                  <input type="file" @change="(e) => handleDocFile(e, 'medicalLicense')" accept=".pdf,.jpg,.png"
                    class="hidden">
                </label>
                <span v-if="form.doctor.medicalLicense" class="text-xs text-green-300 ml-2">✓ uploaded</span>
              </div>
              <div class="file-group">
                <label class="text-white/80 text-sm block mb-1">Identity Proof</label>
                <label
                  class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg inline-block cursor-pointer text-white text-sm">
                  Upload
                  <input type="file" @change="(e) => handleDocFile(e, 'identityProof')" accept=".pdf,.jpg,.png"
                    class="hidden">
                </label>
                <span v-if="form.doctor.identityProof" class="text-xs text-green-300 ml-2">✓ uploaded</span>
              </div>
            </div>

            <!-- Availability (simplified) -->
            <div>
              <label class="text-white/80 text-sm mb-2 block">Weekly Availability (optional)</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="day in weekDays" :key="day" class="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                  <span class="w-20 text-sm text-white/80">{{ day }}</span>
                  <input type="time" v-model="form.doctor.availability[day.toLowerCase()].startTime"
                    class="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm">
                  <span class="text-white/50">-</span>
                  <input type="time" v-model="form.doctor.availability[day.toLowerCase()].endTime"
                    class="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm">
                </div>
              </div>
            </div>
          </div>

          <!-- ========== PATIENT SECTION ========== -->
          <div v-if="role === 'patient'" class="space-y-5 border-t border-white/20 pt-5">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <Heart class="w-5 h-5" /> Medical Profile
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="input-group">
                <input type="date" v-model="form.patient.dateOfBirth" required class="input" placeholder=" ">
                <label class="label">Date of Birth *</label>
              </div>
              <div class="input-group">
                <select v-model="form.patient.gender" required class="input-select">
                  <option value="" disabled>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <label class="label">Gender *</label>
              </div>
            </div>

            <!-- Address -->
            <div class="bg-white/5 p-4 rounded-xl">
              <label class="text-white/80 text-sm block mb-2">Address</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input v-model="form.patient.address.street" placeholder="Street"
                  class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <input v-model="form.patient.address.city" placeholder="City"
                  class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <input v-model="form.patient.address.state" placeholder="State"
                  class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <input v-model="form.patient.address.pincode" placeholder="Pincode"
                  class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
              </div>
            </div>

            <!-- Medical History (tags) -->
            <div>
              <label class="text-white/80 text-sm mb-2 block">Medical History</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="(item, idx) in form.patient.medicalHistory" :key="idx"
                  class="bg-purple-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {{ item }}
                  <button type="button" @click="removeMedicalHistory(idx)"
                    class="text-white/70 hover:text-white">✕</button>
                </span>
              </div>
              <div class="flex gap-2">
                <input v-model="newMedicalHistory" placeholder="Add condition (e.g., Diabetes)"
                  class="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50">
                <button type="button" @click="addMedicalHistory"
                  class="bg-purple-500/50 hover:bg-purple-500 px-4 rounded-lg text-white">+</button>
              </div>
            </div>

            <!-- Allergies -->
            <div>
              <label class="text-white/80 text-sm mb-2 block">Allergies</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="(item, idx) in form.patient.allergies" :key="idx"
                  class="bg-red-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {{ item }}
                  <button type="button" @click="removeAllergy(idx)" class="text-white/70 hover:text-white">✕</button>
                </span>
              </div>
              <div class="flex gap-2">
                <input v-model="newAllergy" placeholder="e.g., Penicillin"
                  class="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50">
                <button type="button" @click="addAllergy"
                  class="bg-red-500/50 hover:bg-red-500 px-4 rounded-lg text-white">+</button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="input-group">
                <select v-model="form.patient.bloodGroup" class="input-select">
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
                <label class="label">Blood Group</label>
              </div>
            </div>

            <!-- Emergency Contact -->
            <div class="bg-white/5 p-4 rounded-xl">
              <label class="text-white/80 text-sm block mb-2">Emergency Contact</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input v-model="form.patient.emergencyContact.name" placeholder="Name"
                  class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <input v-model="form.patient.emergencyContact.phone" placeholder="Phone"
                  class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <input v-model="form.patient.emergencyContact.relationship" placeholder="Relationship"
                  class="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
              </div>
            </div>

            <!-- Preferences -->
            <div class="flex flex-wrap gap-6">
              <label class="flex items-center gap-2 text-white/80">
                <input type="checkbox" v-model="form.patient.preferences.notifications"
                  class="w-4 h-4 accent-purple-500">
                <span>Enable Notifications</span>
              </label>
              <label class="flex items-center gap-2 text-white/80">
                <input type="checkbox" v-model="form.patient.preferences.newsletter" class="w-4 h-4 accent-purple-500">
                <span>Subscribe to Newsletter</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit"
            class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]">
            Sign Up as {{ role === 'doctor' ? 'Doctor' : 'Patient' }} →
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Stethoscope, Heart } from 'lucide-vue-next'

// Role
const role = ref < 'doctor' | 'patient' > ('doctor')

// Common form
const form = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
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

// Preview
const profilePreview = ref < string | null > (null)

// Dynamic helpers
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

// File handlers
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

// Constants
const specializations = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Psychiatrist', 'General Physician', 'Orthopedic', 'Gynecologist']
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Submit
const handleSubmit = async () => {
  const payload = { role: role.value, ...form }
  console.log('Signup payload:', payload)
  alert(`🎉 ${role.value === 'doctor' ? 'Doctor' : 'Patient'} account created! Check console for data.`)
  // Replace with actual API call
}
</script>

<style scoped>
/* Floating labels */
.input-group {
  position: relative;
  margin-top: 0.5rem;
}

.input,
.input-select,
.input-group textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: white;
  transition: all 0.2s;
}

.input:focus,
.input-select:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #a855f7;
  background: rgba(255, 255, 255, 0.15);
}

.label {
  position: absolute;
  left: 1rem;
  top: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s;
  pointer-events: none;
}

.input:focus~.label,
.input:not(:placeholder-shown)~.label,
.input-select:focus~.label,
.input-select:not([value=""])~.label,
.input-group textarea:focus~.label,
.input-group textarea:not(:placeholder-shown)~.label {
  top: -0.6rem;
  left: 0.8rem;
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0 0.3rem;
  border-radius: 0.5rem;
  color: #c084fc;
}

/* Custom scroll */
.custom-scroll::-webkit-scrollbar {
  width: 5px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

/* Animations */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>