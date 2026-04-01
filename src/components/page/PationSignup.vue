<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
      
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
        <form @submit.prevent="handleRegister" class="space-y-6">

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">I am registering as</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                v-for="r in roles"
                :key="r.value"
                @click="form.role = r.value"
                :class="[
                  'flex flex-col items-center gap-2 py-4 px-4 rounded-2xl border-2 transition-all',
                  form.role === r.value 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <span class="text-3xl">{{ r.icon }}</span>
                <span class="font-medium">{{ r.label }}</span>
              </button>
            </div>
          </div>

          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
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

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input v-model="form.email" type="email" required placeholder="rahul@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 6 characters"
              />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div class="relative">
              <input
                v-model="form.confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter password"
              />
              <button type="button" @click="showConfirm = !showConfirm"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {{ showConfirm ? '🙈' : '👁️' }}
              </button>
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
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-2xl transition-all"
          >
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-8">
          Already have an account? 
          <RouterLink to="/login" class="text-blue-600 font-semibold hover:underline">Login here</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'patient'
})

const loading = ref(false)
const apiError = ref('')

const showPassword = ref(false)
const showConfirm = ref(false)

const roles = [
  { value: 'patient', label: 'Patient', icon: '🧑‍⚕️' },
  { value: 'doctor', label: 'Doctor', icon: '👨‍⚕️' }
]

const handleRegister = async () => {
  apiError.value = ''
  loading.value = true

  if (form.password !== form.confirmPassword) {
    apiError.value = "Passwords do not match!"
    loading.value = false
    return
  }

  if (form.password.length < 6) {
    apiError.value = "Password must be at least 6 characters long"
    loading.value = false
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    console.log('API Response:', data)

    if (response.ok) {
      alert('🎉 Account created successfully!')
      localStorage.setItem('token', data.token)
      router.push(`/${form.role}/dashboard`)
    } else {
      apiError.value = data.message || 'Registration failed'
    }
  } catch (err) {
    apiError.value = 'Server se connect nahi ho raha hai'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>