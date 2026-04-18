<template>
  <div class="relative group perspective-1000">
    <!-- Animated outer glow -->
    <div
      class="absolute -inset-1 bg-gradient-to-r rounded-3xl blur-xl opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl"
      :class="[
        medicineFound
          ? 'from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x'
          : 'from-red-400 via-orange-500 to-amber-500 animate-pulse-slow'
      ]"
    ></div>

    <!-- Main Card -->
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/20"
    >
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-20">
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='rgba(255,255,255,0.05)' stroke-width='0.5' /%3E%3C/svg%3E')]"
        ></div>
      </div>

      <!-- Top decorative line -->
      <div
        class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer"
      ></div>

      <div class="relative p-6 md:p-8">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-start gap-5 mb-6">
          <!-- Animated Capsule Icon -->
          <div class="relative flex-shrink-0">
            <div class="absolute inset-0 bg-cyan-400/30 rounded-2xl blur-xl animate-pulse-slow"></div>
            <div
              class="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 transform transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
            >
              <svg
                class="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9v6c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M12 8v4M12 16h.01" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="12" cy="10" r="1.5" fill="white" class="animate-ping-slow" />
              </svg>
            </div>
          </div>

          <!-- Title and Metadata -->
          <div class="flex-1 pt-2">
            <h3
              class="text-3xl md:text-4xl font-bold tracking-tight capitalize bg-gradient-to-r from-white via-cyan-100 to-indigo-100 bg-clip-text text-transparent"
            >
              {{ displayName }}
            </h3>
            <div class="flex flex-wrap items-center gap-2 mt-2">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                :class="
                  medicineFound
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                    : 'bg-red-500/20 text-red-200 border border-red-500/30'
                "
              >
                <span class="relative flex h-2 w-2 mr-1.5">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    :class="medicineFound ? 'bg-cyan-400' : 'bg-red-400'"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2"
                    :class="medicineFound ? 'bg-cyan-500' : 'bg-red-500'"
                  ></span>
                </span>
                {{ medicineFound ? 'AI Verified' : 'Unknown' }}
              </span>
              <span
                v-if="medicineInfo.category"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30"
              >
                {{ medicineInfo.category }}
              </span>
              <span class="text-xs text-gray-400 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Rx Only
              </span>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="space-y-4 py-6">
          <div class="h-6 bg-white/10 rounded-full w-1/3 animate-pulse"></div>
          <div class="space-y-3">
            <div class="h-4 bg-white/10 rounded-full w-full"></div>
            <div class="h-4 bg-white/10 rounded-full w-5/6"></div>
            <div class="h-4 bg-white/10 rounded-full w-4/6"></div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="h-20 bg-white/5 rounded-xl"></div>
            <div class="h-20 bg-white/5 rounded-xl"></div>
          </div>
        </div>

        <!-- Content with Tabs -->
        <div v-else-if="medicineFound" class="mt-2">
          <!-- Tab Navigation -->
          <div class="flex border-b border-white/10 mb-5">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="relative px-4 py-2.5 text-sm font-medium transition-colors duration-200"
              :class="
                activeTab === tab.id
                  ? 'text-cyan-300'
                  : 'text-gray-400 hover:text-gray-200'
              "
            >
              {{ tab.label }}
              <span
                v-if="activeTab === tab.id"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
              ></span>
            </button>
          </div>

          <!-- Tab Content with Transition -->
          <Transition name="fade-slide" mode="out-in">
            <div :key="activeTab" class="min-h-[200px]">
              <!-- Uses Tab -->
              <div v-if="activeTab === 'uses'" class="space-y-4">
                <div class="relative pl-2">
                  <div class="absolute -left-6 -top-2 text-6xl text-cyan-500/20 font-serif select-none">
                    “
                  </div>
                  <p class="relative text-lg leading-relaxed text-gray-200">
                    {{ medicineInfo.uses }}
                  </p>
                </div>
                <!-- Additional indications if present -->
                <div v-if="medicineInfo.indications && medicineInfo.indications.length" class="mt-4 pt-4 border-t border-white/10">
                  <h4 class="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Common Indications
                  </h4>
                  <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li v-for="(item, idx) in medicineInfo.indications" :key="idx" class="flex items-start gap-2">
                      <span class="text-cyan-400 mt-1">•</span>
                      <span class="text-sm text-gray-300">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Dosage Tab -->
              <div v-else-if="activeTab === 'dosage'" class="space-y-4">
                <div v-if="medicineInfo.dosage" class="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 class="text-sm font-semibold text-cyan-300 mb-3">Recommended Dosage</h4>
                  <p class="text-gray-200">{{ medicineInfo.dosage }}</p>
                </div>
                <p v-else class="text-gray-400 italic">
                  Dosage information not available. Always follow your doctor's prescription.
                </p>
              </div>

              <!-- Side Effects Tab -->
              <div v-else-if="activeTab === 'sideEffects'" class="space-y-4">
                <div v-if="sideEffectsList.length" class="bg-yellow-500/5 rounded-xl p-4 border border-yellow-500/20">
                  <h4 class="text-sm font-semibold text-yellow-300 mb-2 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Possible Side Effects
                  </h4>
                  <ul class="space-y-1">
                    <li v-for="(effect, idx) in sideEffectsList" :key="idx" class="text-sm text-gray-300 flex items-start gap-2">
                      <span class="text-yellow-400 mt-1">•</span>
                      {{ effect }}
                    </li>
                  </ul>
                </div>
                <p v-else class="text-gray-400 italic">
                  Side effect information not available. Consult your healthcare provider.
                </p>
              </div>

              <!-- Warnings Tab -->
              <div v-else-if="activeTab === 'warnings'" class="space-y-4">
                <div v-if="warningsList.length" class="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
                  <h4 class="text-sm font-semibold text-amber-300 mb-2 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Important Warnings & Precautions
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(warning, idx) in warningsList" :key="idx" class="text-sm text-gray-300 flex items-start gap-2">
                      <span class="text-amber-400 font-bold mt-0.5">!</span>
                      <span>{{ warning }}</span>
                    </li>
                  </ul>
                </div>
                <p v-else class="text-gray-400 italic">
                  No specific warnings available. Always read the medication guide.
                </p>
              </div>
            </div>
          </Transition>

          <!-- Footer Metadata -->
          <div class="mt-6 flex flex-wrap items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>AI‑powered</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updated now</span>
              </div>
            </div>
            <button
              @click="refreshInfo"
              class="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              :disabled="isLoading"
            >
              <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Not Found / Error State -->
        <div v-else class="py-6 text-center">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-lg text-gray-300 mb-2">{{ error || 'Medicine information not found' }}</p>
          <p class="text-sm text-gray-500">Try checking the spelling or search for a different medicine.</p>
        </div>
      </div>

      <!-- Corner accents -->
      <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import axios from 'axios'

// --- Types ---
interface MedicineData {
  name?: string
  uses?: string | string[]
  dosage?: string
  sideEffects?: string[] | string
  precautions?: string[] | string
  warnings?: string[] | string
  indications?: string[]
  category?: string
}

interface MedicineInfo extends MedicineData {
  found: boolean
  rawData?: any
}

interface Props {
  name: string
}

const props = defineProps<Props>()

// --- State ---
const isLoading = ref(false)
const error = ref<string | null>(null)
const medicineInfo = ref<MedicineInfo>({ found: false })

// Tabs definition (THIS WAS MISSING)
const tabs = [
  { id: 'uses' as const, label: 'Uses' },
  { id: 'dosage' as const, label: 'Dosage' },
  { id: 'sideEffects' as const, label: 'Side Effects' },
  { id: 'warnings' as const, label: 'Warnings' }
]

const activeTab = ref<typeof tabs[number]['id']>('uses')

// --- Computed ---
const medicineFound = computed(() => medicineInfo.value.found && !error.value)

const displayName = computed(() =>
  medicineInfo.value.name || props.name || 'Medicine'
)

const sideEffectsList = computed(() => {
  const se = medicineInfo.value.sideEffects
  if (!se) return []
  return Array.isArray(se) ? se : [se]
})

const warningsList = computed(() => {
  const w = medicineInfo.value.warnings
  const p = medicineInfo.value.precautions

  const wArr = Array.isArray(w) ? w : w ? [w] : []
  const pArr = Array.isArray(p) ? p : p ? [p] : []

  return [...wArr, ...pArr]
})

// --- Mock Data (Fallback) ---
const mockDatabase: Record<string, MedicineData> = {
  paracetamol: {
    name: 'Paracetamol',
    uses: 'Pain relief and fever reduction. Widely used for headaches, muscle aches, arthritis, backaches, toothaches, and colds.',
    dosage: 'Adults: 500-1000mg every 4-6 hours (max 4000mg/day). Children: Based on weight.',
    sideEffects: ['Nausea', 'Stomach pain', 'Rash (rare)'],
    warnings: ['Avoid alcohol', 'Do not exceed recommended dose'],
    precautions: ['Liver disease patients should use caution'],
    category: 'Analgesic / Antipyretic'
  },
  ibuprofen: {
    name: 'Ibuprofen',
    uses: 'Nonsteroidal anti‑inflammatory drug (NSAID) used for pain, fever, and inflammation.',
    dosage: 'Adults: 200-400mg every 4-6 hours (max 1200mg OTC).',
    sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
    warnings: ['May increase risk of heart attack or stroke', 'Avoid with alcohol'],
    category: 'NSAID'
  }
}

// --- API Function ---
async function fetchMedicineInfo(searchName: string) {
  console.log(searchName)
  if (!searchName.trim()) {
    error.value = 'Please enter a medicine name'
    return
  }

  isLoading.value = true
  error.value = null

  const key = searchName.trim().toLowerCase()

  try {
    const baseURL = 'http://localhost:3000'
    const res = await axios.post(`${baseURL}/api/medicine`, {
      medicineName: key
    })

    const data = res.data?.data || res.data

    // Normalize uses
    const usesText = Array.isArray(data.uses)
      ? data.uses.join('. ')
      : data.uses || 'No information available'

    medicineInfo.value = {
      ...data,
      uses: usesText,
      found: true
    }

  } catch (err: any) {
    console.error('API Error:', err.message)

    // Fallback to mock data
    const mock = mockDatabase[key]
    if (mock) {
      medicineInfo.value = { ...mock, found: true }
      error.value = null
    } else {
      error.value = err.response?.data?.message || 'Failed to fetch medicine information'
      medicineInfo.value = { found: false }
    }
  } finally {
    isLoading.value = false
  }
}

// Refresh
function refreshInfo() {
  fetchMedicineInfo(props.name)
}

// Watch for prop changes
watch(
  () => props.name,
  (newName) => {
    if (newName) fetchMedicineInfo(newName)
  },
  { immediate: true }
)
</script>

<style scoped>
/* 3D perspective */
.perspective-1000 {
  perspective: 1000px;
}

/* Gradient animation */
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 6s ease infinite;
}

/* Shimmer effect */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
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

/* Pulse slow */
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Ping slow */
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}
.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Fade slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>