<template>
  <nav class="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 backdrop-blur-xl bg-black/60 border-b border-white/10 shadow-lg">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo / Brand -->
      <router-link to="/" class="group flex items-center gap-3">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <span class="text-2xl font-bold tracking-tight">
          <span class="bg-gradient-to-r from-cyan-200 via-white to-indigo-200 bg-clip-text text-transparent">AI</span>
          <span class="text-white font-light">Health</span>
        </span>
      </router-link>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex items-center space-x-1">
        <!-- Show dashboard links only when logged in and role matches -->
        <template v-if="authStore.isAuthenticated">
          <router-link
            v-if="authStore.userRole === 'patient'"
            to="/patient/dashboard"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 group"
          >
            <span class="relative z-10">Patient Dashboard</span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-transparent group-hover:border-white/10"></span>
          </router-link>
          <router-link
            v-if="authStore.userRole === 'doctor'"
            to="/doctor/dashboard"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 group"
          >
            <span class="relative z-10">Doctor Dashboard</span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-transparent group-hover:border-white/10"></span>
          </router-link>
          <router-link
            v-if="authStore.userRole === 'admin'"
            to="/admin/dashboard"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 group"
          >
            <span class="relative z-10">Admin Panel</span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-transparent group-hover:border-white/10"></span>
          </router-link>
        </template>

        <!-- Show these links for non-authenticated users -->
        <template v-else>
          <router-link
            to="/login"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 group"
          >
            <span class="relative z-10">Login</span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-transparent group-hover:border-white/10"></span>
          </router-link>
          <router-link
            to="/api/register"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 group"
          >
            <span class="relative z-10">Sign Up</span>
          </router-link>
        </template>
      </div>

      <!-- Right side actions -->
      <div class="flex items-center gap-3">
        <!-- Video Call Button with glowing effect -->
        <button
          @click="router.push('/video-call')"
          class="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span class="absolute inset-0 rounded-xl ring-2 ring-cyan-400/50 animate-ping-slow opacity-0 group-hover:opacity-100"></span>
          <svg class="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span class="relative">Video Call</span>
        </button>

        <!-- User Menu (when logged in) -->
        <div v-if="authStore.isAuthenticated" class="relative" @click="toggleUserMenu">
          <button class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold">
              {{ userInitials }}
            </div>
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <!-- Dropdown -->
          <transition name="fade">
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
              <router-link :to="`/${authStore.userRole}/profile`" class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors">Profile</router-link>
              <router-link :to="`/${authStore.userRole}/settings`" class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors">Settings</router-link>
              <hr class="border-white/10 my-1" />
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors">Logout</button>
            </div>
          </transition>
        </div>

        <!-- Mobile menu button (hamburger) -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-white/10">
        <div class="flex flex-col space-y-1">
          <template v-if="authStore.isAuthenticated">
            <router-link
              v-if="authStore.userRole === 'patient'"
              to="/patient/dashboard"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
              @click="mobileMenuOpen = false"
            >
              Patient Dashboard
            </router-link>
            <router-link
              v-if="authStore.userRole === 'doctor'"
              to="/doctor/dashboard"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
              @click="mobileMenuOpen = false"
            >
              Doctor Dashboard
            </router-link>
            <router-link
              v-if="authStore.userRole === 'admin'"
              to="/admin/dashboard"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
              @click="mobileMenuOpen = false"
            >
              Admin Panel
            </router-link>
            <button
              @click="handleLogout"
              class="px-4 py-3 rounded-xl text-red-400 hover:text-white hover:bg-white/10 transition-colors text-left"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
              @click="mobileMenuOpen = false"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center"
              @click="mobileMenuOpen = false"
            >
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const showUserMenu = ref(false)

const userInitials = computed(() => {
  const name = authStore.user?.profile?.firstName || authStore.user?.email?.split('@')[0] || 'U'
  return name.charAt(0).toUpperCase()
})

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

function handleLogout() {
  authStore.logout()
  showUserMenu.value = false
  mobileMenuOpen.value = false
  router.push('/login')
}

// Close dropdown when clicking outside
function closeUserMenuOnClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeUserMenuOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenuOnClickOutside)
})
</script>

<style scoped>
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.2; }
  100% { transform: scale(1); opacity: 0.5; }
}
.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>