<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
      <h1 class="text-2xl font-bold  mb-1">Account Banayein</h1>
      <p class="text-sm text-gray-500 mb-6">
        Pehle se account hai?
        <a href="/login" class="text-teal-600 hover:underline font-medium">Login karein</a>
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- Role -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            v-model="form.role"
            @change="onRoleChange"
            data-testid="select-role"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <!-- <option value="admin">Admin</option> -->
          </select>
          <p v-if="errors.role" class="text-red-500 text-xs mt-1">{{ errors.role }}</p>
        </div>

        <!-- Name -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Poora Naam</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Apna naam dalein"
            data-testid="input-name"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            data-testid="input-email"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            data-testid="input-password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <!-- Phone -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
          <input
            v-model="form.phone"
            type="text"
            placeholder="10 digit number"
            data-testid="input-phone"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
        </div>

        <!-- Patient Fields -->
        <template v-if="form.role === 'patient'">
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth (Optional)</label>
            <input
              v-model="form.dateOfBirth"
              type="date"
              data-testid="input-dob"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Blood Group (Optional)</label>
            <select
              v-model="form.bloodGroup"
              data-testid="select-blood-group"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Blood group chunein</option>
              <option v-for="bg in bloodGroups" :key="bg" :value="bg">{{ bg }}</option>
            </select>
          </div>
        </template>

        <!-- Doctor Fields -->
        <template v-if="form.role === 'doctor'">
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <select
              v-model="form.specialization"
              data-testid="select-specialization"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Specialization chunein</option>
              <option v-for="s in specializations" :key="s" :value="s">{{ s }}</option>
            </select>
            <p v-if="errors.specialization" class="text-red-500 text-xs mt-1">{{ errors.specialization }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (Rs.)</label>
              <input
                v-model.number="form.consultationFee"
                type="number"
                placeholder="500"
                data-testid="input-fee"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
              <input
                v-model.number="form.experienceYears"
                type="number"
                placeholder="5"
                data-testid="input-experience"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Qualifications (Comma se alag karein)</label>
            <input
              v-model="form.qualifications"
              type="text"
              placeholder="MBBS, MD, MS"
              data-testid="input-qualifications"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </template>

        <!-- Error Message -->
        <p
          v-if="submitError"
          class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
        >
          {{ submitError }}
        </p>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          data-testid="button-register"
          class="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          {{ isLoading ? 'Register ho raha hai...' : 'Register Karein' }}
        </button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface FormData {
  role: 'patient' | 'doctor' | 'admin'
  name: string
  email: string
  password: string
  phone: string
  dateOfBirth: string
  bloodGroup: string
  specialization: string
  consultationFee: number | null
  experienceYears: number | null
  qualifications: string
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const specializations = [
  'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician',
  'General Physician', 'Orthopedic', 'Gynecologist', 'Psychiatrist'
]

const form = reactive<FormData>({
  role: 'patient',
  name: '',
  email: '',
  password: '',
  phone: '',
  dateOfBirth: '',
  bloodGroup: '',
  specialization: '',
  consultationFee: null,
  experienceYears: null,
  qualifications: '',
})

const errors = reactive<Partial<Record<keyof FormData, string>>>({})
const isLoading = ref(false)
const submitError = ref('')

function onRoleChange() {
    // console.log('Role changed to:', form.role)
    
  Object.keys(errors).forEach(key => delete (errors as any)[key])
  submitError.value = ''
}

function validate(): boolean {
  Object.keys(errors).forEach(key => delete (errors as any)[key])

  if (form.name.trim().length < 2) {
    errors.name = 'Naam kam se kam 2 characters ka hona chahiye'
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Valid email dalein'
  }

  if (form.password.length < 6) {
    errors.password = 'Password kam se kam 6 characters ka hona chahiye'
  }

  if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
    errors.phone = '10 digit ka valid phone number dalein'
  }

  if (form.role === 'doctor' && !form.specialization) {
    errors.specialization = 'Specialization zaroori hai'
  }

  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validate()) return

  isLoading.value = true
  submitError.value = ''

  try {
    const payload: any = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      phone: form.phone || undefined,
    }
    console.log('Submitting payload:', payload)

    if (form.role === 'patient') {
      payload.dateOfBirth = form.dateOfBirth || undefined
      payload.bloodGroup = form.bloodGroup || undefined
    }

    if (form.role === 'doctor') {
      payload.specialization = form.specialization
      payload.consultationFee = form.consultationFee ?? undefined
      payload.experienceYears = form.experienceYears ?? undefined
      payload.qualifications = form.qualifications
        ? form.qualifications.split(',').map(q => q.trim()).filter(Boolean)
        : []
    }

    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      submitError.value = data.message || 'Registration fail hui. Dobara koshish karein.'
      return
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    if (data.user.role === 'doctor') {
      window.location.href = '/doctor/dashboard'
    } else if (data.user.role === 'admin') {
      window.location.href = '/admin/dashboard'
    } else {
      window.location.href = '/patient/dashboard'
    }

  } catch (err) {
    submitError.value = 'Network error. Internet connection check karein.'
  } finally {
    isLoading.value = false
  }
}

</script>
