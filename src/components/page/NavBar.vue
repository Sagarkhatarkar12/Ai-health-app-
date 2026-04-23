<template>
  <nav 
    ref="navbarRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isScrolled ? 'py-2 backdrop-blur-2xl bg-gradient-to-r from-amber-900/40 via-emerald-900/30 to-sky-900/40 border-b border-white/20 shadow-2xl' : 'py-3 backdrop-blur-xl bg-gradient-to-r from-amber-900/30 via-emerald-900/20 to-sky-900/30 border-b border-white/10 shadow-lg'"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8">
      
      <!-- Logo / Brand – Enhanced Dual Nature -->
      <router-link to="/" class="group flex items-center gap-3 transition-all duration-500 hover:scale-105">
        <div class="relative">
          <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
          <div class="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-amber-500 to-sky-600 flex items-center justify-center shadow-xl shadow-emerald-500/30 group-hover:shadow-amber-500/40 transition-all duration-500 overflow-hidden">
            <svg class="absolute w-5 h-5 text-white drop-shadow-sm opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2C9,7,4,9,4,14c0,4,4,6,8,6s8-2,8-6C20,9,15,7,12,2z" />
            </svg>
            <svg class="relative w-4 h-4 text-white drop-shadow-sm opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-2xl font-bold tracking-tight">
            <span class="bg-gradient-to-r from-emerald-200 via-amber-100 to-sky-200 bg-clip-text text-transparent">Ayu</span>
            <span class="bg-gradient-to-r from-sky-200 to-emerald-200 bg-clip-text text-transparent">Mitram</span>
          </span>
          <span class="text-[10px] font-medium text-white/60 tracking-wider">Tradition • Science • Care</span>
        </div>
      </router-link>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex items-center space-x-1">
        <!-- Ayurvedic Chatbot -->
        <router-link
          to="/ayurvedic-chatbot"
          class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-emerald-200 hover:text-white transition-all duration-300 group overflow-hidden"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
          <span class="relative z-10 flex items-center gap-1">
            <span class="text-lg animate-float">🌿</span> 
            <span class="font-semibold">AyurGPT</span>
          </span>
          <span class="absolute inset-0 rounded-xl bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-emerald-500/30"></span>
        </router-link>

        <!-- ✨ NEW: Medicine Search Link ✨ -->
        <router-link
          to="/medicine-search"
          class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-sky-200 hover:text-white transition-all duration-300 group overflow-hidden"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/20 to-sky-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
          <span class="relative z-10 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Medicine Search
          </span>
          <span class="absolute inset-0 rounded-xl bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-sky-500/30"></span>
        </router-link>

        <!-- Role-based Dashboard Links -->
        <template v-if="authStore.isAuthenticated">
          <router-link
            v-if="authStore.userRole === 'patient'"
            to="/patient/dashboard"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-all duration-300 group overflow-hidden"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-amber-500/15 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span class="relative z-10 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              My Health
            </span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10"></span>
          </router-link>
          <router-link
            v-if="authStore.userRole === 'doctor'"
            to="/doctor/dashboard"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-all duration-300 group overflow-hidden"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-indigo-500/15 to-sky-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span class="relative z-10 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Doctor Hub
            </span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10"></span>
          </router-link>
          <router-link
            v-if="authStore.userRole === 'admin'"
            to="/admin/dashboard"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-all duration-300 group overflow-hidden"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-orange-500/15 to-rose-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span class="relative z-10">Admin Panel</span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10"></span>
          </router-link>
        </template>

        <!-- Auth links for non-authenticated users -->
        <template v-else>
          <router-link
            to="/login"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-all duration-300 group overflow-hidden"
          >
            <span class="relative z-10">Login</span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </router-link>
          <router-link
            to="/api/register"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-sky-500/50 transition-all duration-300 hover:scale-105 group overflow-hidden"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative z-10">Begin Journey</span>
          </router-link>
        </template>
      </div>

      <!-- Right side actions -->
      <div class="flex items-center gap-3">
        <!-- Video Call Button -->
        <button
          @click="router.push('/video-call')"
          class="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-amber-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span class="absolute inset-0 rounded-xl ring-2 ring-amber-400/50 animate-ping-slow opacity-0 group-hover:opacity-100"></span>
          <svg class="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span class="relative">e-Sanjeevani</span>
        </button>

        <!-- User Menu -->
        <div v-if="authStore.isAuthenticated" class="relative" @click="toggleUserMenu">
          <button class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-amber-500 flex items-center justify-center text-white font-semibold overflow-hidden shadow-md">
              <img
                v-if="authStore.user?.profile?.profileImage"
                :src="authStore.user.profile.profileImage"
                alt="Profile"
                class="w-full h-full object-cover"
              />
              <span v-else>{{ userInitials }}</span>
            </div>
            <svg class="w-4 h-4 text-gray-300 transition-transform duration-200" :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <transition name="dropdown">
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl overflow-hidden">
              <router-link :to="`/${authStore.userRole}/profile`" class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-emerald-500/20 transition-all duration-200 hover:pl-5">🌿 Profile</router-link>
              <router-link :to="`/${authStore.userRole}/settings`" class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-emerald-500/20 transition-all duration-200 hover:pl-5">⚙️ Settings</router-link>
              <hr class="border-white/10 my-1" />
              <button @click="handleLogout" class="w-full text-left px-4 py-2.5 text-sm text-amber-400 hover:bg-red-500/20 transition-all duration-200 hover:pl-5">🚪 Logout</button>
            </div>
          </transition>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 focus:outline-none"
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

    <!-- Mobile Navigation Menu (with Medicine Search added) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-white/20">
        <div class="flex flex-col space-y-2">
          <router-link
            to="/ayurvedic-chatbot"
            class="px-4 py-3 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-500/10 transition-all duration-200 flex items-center gap-2"
            @click="mobileMenuOpen = false"
          >
            <span class="text-xl">🌿</span> AyurGPT
          </router-link>

          <!-- Medicine Search in mobile menu -->
          <router-link
            to="/medicine-search"
            class="px-4 py-3 rounded-xl text-sky-300 hover:text-white hover:bg-sky-500/10 transition-all duration-200 flex items-center gap-2"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Medicine Search
          </router-link>

          <template v-if="authStore.isAuthenticated">
            <router-link
              v-if="authStore.userRole === 'patient'"
              to="/patient/dashboard"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              @click="mobileMenuOpen = false"
            >
              My Health Dashboard
            </router-link>
            <router-link
              v-if="authStore.userRole === 'doctor'"
              to="/doctor/dashboard"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              @click="mobileMenuOpen = false"
            >
              Doctor Hub
            </router-link>
            <router-link
              v-if="authStore.userRole === 'admin'"
              to="/admin/dashboard"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              @click="mobileMenuOpen = false"
            >
              Admin Panel
            </router-link>
            <button
              @click="handleLogout"
              class="px-4 py-3 rounded-xl text-amber-400 hover:text-white hover:bg-white/10 transition-all duration-200 text-left"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              @click="mobileMenuOpen = false"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-center transition-all duration-200 hover:shadow-md"
              @click="mobileMenuOpen = false"
            >
              Begin Journey
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
const isScrolled = ref(false)
const navbarRef = ref<HTMLElement | null>(null)

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

function closeUserMenuOnClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  document.addEventListener('click', closeUserMenuOnClickOutside)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenuOnClickOutside)
  window.removeEventListener('scroll', handleScroll)
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
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: float 2s ease-in-out infinite;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>