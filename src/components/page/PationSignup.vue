<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 py-12">
    <div class="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">
      
      <!-- Header -->
      <div class="bg-blue-600 px-8 py-10 text-white text-center">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl font-bold">H</span>
        </div>
        <h1 class="text-3xl font-bold">Create Account</h1>
        <p class="text-blue-100 mt-2">Join India's Smart Healthcare Platform</p>
      </div>

      <!-- Form -->
      <div class="p-8">
        <form @submit.prevent="handleRegister" class="space-y-8">

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3 text-center">I am registering as</label>
            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                v-for="r in roles"
                :key="r.value"
                @click="form.role = r.value"
                :class="[
                  'flex flex-col items-center gap-2 py-4 px-4 rounded-2xl border-2 transition-all',
                  form.role === r.value 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                ]"
              >
                <span class="text-3xl">{{ r.icon }}</span>
                <span class="font-medium">{{ r.label }}</span>
              </button>
            </div>
          </div>

          <!-- Common Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-blue-700 border-b pb-2">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input v-model="form.firstName" type="text" required placeholder="Rahul"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input v-model="form.lastName" type="text" required placeholder="Sharma"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input v-model="form.phoneNumber" type="tel" required placeholder="+91 98765 43210"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input v-model="form.email" type="email" required placeholder="rahul@example.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <!-- Patient Specific Fields -->
          <div v-if="form.role === 'patient'" class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-blue-700 border-b pb-2">Patient Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input v-model="form.dateOfBirth" type="date" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select v-model="form.gender" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select v-model="form.bloodGroup"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="" disabled>Select Blood Group</option>
                  <option v-for="bg in ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']" :key="bg" :value="bg">{{ bg }}</option>
                </select>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-bold text-blue-700 border-b pb-2">Address Details</h3>
              <input v-model="form.address.street" type="text" placeholder="Street Address"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input v-model="form.address.city" type="text" placeholder="City"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="form.address.state" type="text" placeholder="State"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="form.address.pincode" type="text" placeholder="Pincode"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-bold text-blue-700 border-b pb-2">Emergency Contact</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="form.emergencyContact.name" type="text" placeholder="Contact Name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="form.emergencyContact.phone" type="tel" placeholder="Contact Phone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <input v-model="form.emergencyContact.relationship" type="text" placeholder="Relationship (e.g. Spouse)"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <!-- Doctor Specific Fields -->
          <div v-if="form.role === 'doctor'" class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-blue-700 border-b pb-2">Professional Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <select v-model="form.specialization" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="" disabled>Select Specialization</option>
                    <option v-for="s in specializations" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                  <input v-model.number="form.experience" type="number" min="0" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
                  <input v-model.number="form.consultationFee" type="number" min="0" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Languages Spoken</label>
                  <input v-model="languagesInput" type="text" placeholder="English, Hindi, Marathi"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
                <textarea v-model="form.bio" rows="3" placeholder="Tell us about your medical journey..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>

            <!-- Qualifications -->
            <div class="space-y-4">
              <div class="flex justify-between items-center border-b pb-2">
                <h3 class="text-lg font-bold text-blue-700">Qualifications</h3>
                <button type="button" @click="addQualification" class="text-blue-600 text-sm font-bold hover:underline">+ Add More</button>
              </div>
              <div v-for="(q, index) in form.qualifications" :key="index" class="p-4 bg-gray-50 rounded-2xl space-y-3 relative">
                <button v-if="form.qualifications.length > 1" type="button" @click="removeQualification(index)" 
                  class="absolute top-2 right-2 text-red-500 hover:text-red-700">✕</button>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input v-model="q.degree" type="text" placeholder="Degree (e.g. MBBS)" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input v-model="q.institution" type="text" placeholder="Institution" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <input v-model.number="q.yearOfCompletion" type="number" placeholder="Year of Completion" required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <!-- Security Section -->
          <div class="space-y-4 pt-4 border-t">
            <h3 class="text-lg font-bold text-blue-700 border-b pb-2">Security</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required minlength="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-9 text-gray-400">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input v-model="form.confirmPassword" :type="showConfirm ? 'text' : 'password'" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" @click="showConfirm = !showConfirm" class="absolute right-4 top-9 text-gray-400">
                  {{ showConfirm ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Error -->
          <p v-if="apiError" class="text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl text-sm">
            {{ apiError }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 text-lg"
          >
            {{ loading ? 'Processing...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-8">
          Already have an account? 
          <RouterLink to="/login" class="text-blue-600 font-bold hover:underline">Login here</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const specializations = [
  'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 
  'Psychiatrist', 'General Physician', 'Orthopedic', 'Gynecologist'
]

const form = reactive({
  role: 'patient',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  // Patient fields
  dateOfBirth: '',
  gender: '',
  address: { street: '', city: '', state: '', pincode: '', country: 'India' },
  bloodGroup: '',
  emergencyContact: { name: '', phone: '', relationship: '' },
  // Doctor fields
  specialization: '',
  experience: 0,
  consultationFee: 0,
  bio: '',
  languages: [],
  qualifications: [{ degree: '', institution: '', yearOfCompletion: null }]
})

const languagesInput = ref('')
const loading = ref(false)
const apiError = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)

const roles = [
  { value: 'patient', label: 'Patient', icon: '🧑‍⚕️' },
  { value: 'doctor', label: 'Doctor', icon: '👨‍⚕️' }
]

const addQualification = () => {
  form.qualifications.push({ degree: '', institution: '', yearOfCompletion: null })
}

const removeQualification = (index) => {
  form.qualifications.splice(index, 1)
}

const handleRegister = async () => {
  apiError.value = ''
  loading.value = true

  if (form.password !== form.confirmPassword) {
    apiError.value = "Passwords do not match!"
    loading.value = false
    return
  }

  // Process languages string to array
  form.languages = languagesInput.value.split(',').map(l => l.trim()).filter(l => l !== '')
  console.log("Submitting registration with data:", form)

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (response.ok) {
      alert('🎉 Account created successfully!')
      localStorage.setItem('token', data.token)
      router.push(`/${form.role}/dashboard`)
    } else {
      apiError.value = data.message || 'Registration failed'
    }
  } catch (err) {
    apiError.value = 'Server connection failed'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>