<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Animated background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-[120px] animate-float-slow"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] animate-float-slower"></div>
    </div>

    <main class="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
      <!-- Welcome Card -->
      <div class="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl"></div>
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
          Medicine Search Engine
        </h1>
        <p class="text-gray-300 mt-1">Search any medicine to get instant AI‑powered information.</p>
      </div>

      <!-- Medicine Search Section – Hero Card -->
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div class="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <div class="flex items-center gap-2 text-sm text-cyan-300 mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Medicine Information</span>
          </div>

          <!-- Search Input with Icon & Clear Button -->
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                @keyup.enter="triggerSearch"
                placeholder="e.g., Paracetamol, Ibuprofen, Azithromycin..."
                class="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              @click="triggerSearch"
              class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/30 hover:scale-105 transition transform duration-200"
            >
              Search Medicine
            </button>
          </div>

          <!-- Search hint -->
          <p class="text-xs text-gray-400 mt-3 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Try: paracetamol, ibuprofen, or any medicine name
          </p>
        </div>
      </div>

      <!-- Medicine Info Display -->
      <div v-if="searchQuery" class="animate-fade-in">
        <MedicineInfo :name="searchQuery" />
      </div>
      <div v-else class="text-center py-12 text-gray-400">
        <svg class="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m-4.5 0L15 14.5m-6-5.285L4 14.5m14.25 0L15 14.5m0 0l1.5-1.5m-9 0L9 9.75m6 0l3 3m-3 0l-1.5 1.5m-6 0L6 12m6 0v4.5m6-9.75V19.5a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 014.5 19.5V6.75m0 0L9.75 3z" />
        </svg>
        <p>Enter a medicine name above to see details</p>
        <p class="text-sm mt-1">AI‑powered information about uses, dosage, side effects & warnings</p>
      </div>

      <!-- Disclaimer -->
      <div class="text-center text-xs text-gray-500 border-t border-white/10 pt-6">
        ⚕️ This information is AI‑generated and for educational purposes only. Always consult a qualified doctor.
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MedicineInfo from './MedicineInfo.vue'

const searchQuery = ref('')
const previousSearch = ref('')

function triggerSearch() {
  if (!searchQuery.value.trim()) return
  // Optionally store in local storage for recent searches
  previousSearch.value = searchQuery.value.trim()
}

function clearSearch() {
  searchQuery.value = ''
  // Optionally clear MedicineInfo by resetting query – but it will hide the component anyway
}
</script>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float-slower {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(20px) scale(0.95); }
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
.animate-float-slower {
  animation: float-slower 12s ease-in-out infinite;
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}
</style>