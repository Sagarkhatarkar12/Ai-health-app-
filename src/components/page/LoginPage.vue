<template>
    <div
        class="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1120] p-4">
        <!-- Animated background orbs -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-[120px] animate-float-slow">
            </div>
            <div
                class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px] animate-float-slower">
            </div>
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] animate-pulse-slow">
            </div>
        </div>

        <!-- Grid pattern overlay -->
        <div
            class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='rgba(255,255,255,0.03)' stroke-width='0.5' /%3E%3C/svg%3E')] opacity-30">
        </div>

        <!-- Login Card -->
        <div class="relative w-full max-w-md z-10">
            <!-- Outer glow -->
            <div
                class="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-60 animate-gradient-x">
            </div>

            <!-- Main Card -->
            <div
                class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
                <!-- Top decorative line -->
                <div
                    class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer">
                </div>

                <!-- Logo / Header -->
                <div class="flex items-center justify-center gap-3 mb-8">
                    <div class="relative">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-md opacity-60">
                        </div>
                        <div
                            class="relative h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                    </div>
                    <h1 class="text-3xl font-bold tracking-tight">
                        <span
                            class="bg-gradient-to-r from-cyan-200 via-white to-indigo-200 bg-clip-text text-transparent">AI</span>
                        <span class="text-white/90 font-light">Health</span>
                    </h1>
                </div>

                <h2 class="text-2xl font-semibold text-white text-center mb-2">Welcome Back</h2>
                <p class="text-gray-400 text-center text-sm mb-6">Sign in to your account</p>

                <!-- Error Alert -->
                <Transition name="fade-slide">
                    <div v-if="error"
                        class="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-2">
                        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ error }}</span>
                    </div>
                </Transition>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-5">
                    <!-- Email Field -->
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 7.89a2 2 0 002.34 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input v-model="form.email" type="email" required placeholder="doctor@example.com"
                                class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                :disabled="loading" />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <div class="flex justify-between items-center mb-1.5">
                            <label class="text-sm font-medium text-gray-300">Password</label>
                            <router-link to="/forgot-password"
                                class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                                Forgot password?
                            </router-link>
                        </div>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                                placeholder="••••••••"
                                class="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                :disabled="loading" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300">
                                <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center">
                        <input v-model="rememberMe" type="checkbox" id="remember"
                            class="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50" />
                        <label for="remember" class="ml-2 text-sm text-gray-400">Remember me</label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="loading"
                        class="group relative w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed">
                        <span
                            class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span class="relative flex items-center justify-center gap-2">
                            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
                            <svg v-if="!loading" class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>
                </form>

                <!-- Register Link -->
                <p class="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?
                    <router-link to="/register" class="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                        Create one
                    </router-link>
                </p>

                <!-- Demo Credentials (Optional) -->
                <div class="mt-6 pt-4 border-t border-white/10">
                    <p class="text-xs text-gray-500 text-center mb-2">Demo Credentials</p>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <button @click="fillDemo('patient')"
                            class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                            👤 Patient
                        </button>
                        <button @click="fillDemo('doctor')"
                            class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                            👨‍⚕️ Doctor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
    email: '',
    password: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const handleLogin = async () => {
    error.value = ''
    loading.value = true

    try {
        await authStore.login(form.email, form.password)

        // Redirect based on role
        const role = authStore.user?.role
        if (role === 'patient') {
            router.push('/patient/dashboard')
        } else if (role === 'doctor') {
            router.push('/doctor/dashboard')
        } else if (role === 'admin') {
            router.push('/admin/dashboard')
        } else {
            router.push('/')
        }
    } catch (err) {
        error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
    } finally {
        loading.value = false
    }
}

const fillDemo = (role) => {
    if (role === 'patient') {
        form.email = 'patient@example.com'
        form.password = 'Patient@123'
    } else {
        form.email = 'doctor@example.com'
        form.password = 'Doctor@123'
    }
}
</script>

<style scoped>
@keyframes float-slow {

    0%,
    100% {
        transform: translateY(0) scale(1);
    }

    50% {
        transform: translateY(-20px) scale(1.05);
    }
}

@keyframes float-slower {

    0%,
    100% {
        transform: translateY(0) scale(1);
    }

    50% {
        transform: translateY(20px) scale(0.95);
    }
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.4;
        transform: scale(1);
    }

    50% {
        opacity: 0.7;
        transform: scale(1.1);
    }
}

@keyframes gradient-x {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
    animation: float-slower 12s ease-in-out infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 6s ease-in-out infinite;
}

.animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 6s ease infinite;
}

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

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(-8px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>