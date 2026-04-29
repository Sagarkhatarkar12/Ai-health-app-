<!-- src/components/page/patient/PatientDashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1120] relative overflow-hidden">
    <!-- Animated background orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-[120px] animate-float-slow"></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] animate-float-slower">
      </div>
    </div>

    <!-- Grid pattern -->
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0 L30 60 M0 30 L60 30\' stroke=\'rgba(255,255,255,0.03)\' stroke-width=\'0.5\' /%3E%3C/svg%3E\')] opacity-30">
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1
              class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-indigo-100 bg-clip-text text-transparent">
              Patient Dashboard
            </h1>
            <p class="text-gray-400 mt-1">
              Welcome back, <span class="text-cyan-300 font-medium">{{ patientName }}</span>!
            </p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
              <p class="text-xs text-gray-500">Last updated</p>
              <p class="text-gray-300 font-medium">{{ lastUpdated }}</p>
            </div>
            <div class="relative">
              <div class="absolute inset-0 bg-cyan-400/30 rounded-full blur-md"></div>
              <div
                class="relative w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <UserIcon class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <!-- Heart Rate -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Heart Rate</h3>
            <HeartIcon class="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">
              {{ healthMetrics.heartRate?.current || '--' }} <span class="text-sm font-normal text-gray-400">bpm</span>
            </p>
            <p class="text-xs text-gray-500 mt-1">Normal: {{ healthMetrics.heartRate?.normal || '60-100' }}</p>
            <div class="mt-3">
              <span
                :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', getStatusClasses(healthMetrics.heartRate?.status)]">
                {{ healthMetrics.heartRate?.status || 'Normal' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Blood Pressure -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Blood Pressure</h3>
            <ActivityIcon class="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">
              {{ healthMetrics.bloodPressure?.systolic || '--' }}/{{ healthMetrics.bloodPressure?.diastolic || '--' }}
              <span class="text-sm font-normal text-gray-400">mmHg</span>
            </p>
            <p class="text-xs text-gray-500 mt-1">Normal: 120/80</p>
            <div class="mt-3">
              <span
                :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', getStatusClasses(healthMetrics.bloodPressure?.status)]">
                {{ healthMetrics.bloodPressure?.status || 'Normal' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Blood Sugar -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Blood Sugar</h3>
            <DropletIcon class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">
              {{ healthMetrics.bloodSugar?.current || '--' }} <span
                class="text-sm font-normal text-gray-400">mg/dL</span>
            </p>
            <p class="text-xs text-gray-500 mt-1">Normal: {{ healthMetrics.bloodSugar?.normal || '70-140' }}</p>
            <div class="mt-3">
              <span
                :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', getStatusClasses(healthMetrics.bloodSugar?.status)]">
                {{ healthMetrics.bloodSugar?.status || 'Normal' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Steps -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Daily Steps</h3>
            <FootprintsIcon class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">
              {{ healthMetrics.steps?.today?.toLocaleString() || '0' }} <span
                class="text-sm font-normal text-gray-400">steps</span>
            </p>
            <div class="mt-2">
              <div class="flex justify-between text-xs text-gray-400 mb-1">
                <span>Goal: {{ healthMetrics.steps?.goal?.toLocaleString() || '10000' }}</span>
                <span>{{ stepsPercentage }}%</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                  :style="{ width: `${stepsPercentage}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Tabs -->
      <div class="space-y-6">
        <!-- Tab Navigation -->
        <div class="flex border-b border-white/10 overflow-x-auto">
          <button v-for="tab in tabs" :key="tab.value" @click="selectedTab = tab.value"
            class="relative px-6 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            :class="selectedTab === tab.value ? 'text-cyan-300' : 'text-gray-400 hover:text-gray-200'">
            {{ tab.label }}
            <span v-if="selectedTab === tab.value"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
          </button>
        </div>

        <!-- Tab Content -->
        <Transition name="fade-slide" mode="out-in">
          <div :key="selectedTab">
            <!-- Overview Tab -->
            <div v-if="selectedTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Weight Progress -->
              <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 class="text-lg font-semibold text-white mb-1">Weight Progress</h3>
                <p class="text-sm text-gray-400 mb-4">Track your weight goals</p>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-3xl font-bold text-white">
                      {{ healthMetrics.weight?.current || '--' }} <span
                        class="text-sm font-normal text-gray-400">kg</span>
                    </p>
                    <p class="text-sm text-gray-400">Target: {{ healthMetrics.weight?.target || '--' }} kg</p>
                  </div>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                    {{ weightStatus }}
                  </span>
                </div>
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    :style="{ width: `${weightProgress}%` }"></div>
                </div>
              </div>

              <!-- Sleep Quality -->
              <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 class="text-lg font-semibold text-white mb-1">Sleep Quality</h3>
                <p class="text-sm text-gray-400 mb-4">Last night's sleep</p>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-3xl font-bold text-white">
                      {{ healthMetrics.sleep?.hours || '--' }} <span
                        class="text-sm font-normal text-gray-400">hrs</span>
                    </p>
                    <p class="text-sm text-gray-400">Quality: {{ healthMetrics.sleep?.quality || '--' }}</p>
                  </div>
                  <CheckCircleIcon class="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>

            <!-- Appointments Tab -->
            <div v-else-if="selectedTab === 'appointments'" class="space-y-4">
              <h2 class="text-xl font-semibold text-white">My Appointments</h2>
              <div v-if="loadingAppointments" class="text-center py-8">
                <RefreshCwIcon class="w-6 h-6 animate-spin mx-auto text-cyan-400" />
              </div>
              <div v-else-if="patientAppointments.length === 0"
                class="bg-white/5 rounded-xl p-8 text-center text-gray-400">
                No appointments yet.
              </div>
              <div v-else class="grid gap-4">
                <div v-for="appt in patientAppointments" :key="appt._id"
                  class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5">
                  <div class="flex justify-between">
                    <div>
                      <h3 class="font-semibold text-white">
                        Dr. {{ appt.doctorId?.firstName }} {{ appt.doctorId?.lastName }}
                      </h3>

                      <p class="text-sm text-gray-400">
                        {{ appt.appointmentDate?.split('T')[0] }} • {{ appt.timeSlot?.startTime }}
                      </p>
                      <p class="text-xs text-cyan-300 mt-1">{{ appt.type }} consultation</p>
                      <p class="text-xs text-gray-400 mt-1">{{ appt.doctorId?.phoneNumber }}</p>
                      <p class="text-sm text-gray-400 mt-1 ">{{ appt.doctorId?.consultantionFee || "200" }}</p>
                    </div>
                    <span
                      :class="['px-3 py-1 rounded-full text-xs font-medium border', getAppointmentStatusClasses(appt.status)]">
                      {{ appt.status }}
                    </span>
                  </div>

                  <div v-if="appt.status === 'confirmed' && appt.type === 'video'" class="mt-4">
                    <button @click="joinVideoCall(appt)"
                      class="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Join Video Call
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Book Appointment Tab -->
            <div v-else-if="selectedTab === 'book'" class="space-y-6">
              <div class="flex flex-wrap gap-4 items-center">
                <div class="relative flex-1 min-w-[200px]">
                  <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input v-model="searchQuery" @input="debouncedFetchDoctors" placeholder="Search doctors..."
                    class="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
                </div>
                <select v-model="selectedSpecialization" @change="fetchDoctors"
                  class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option value="">All Specializations</option>
                  <option v-for="spec in specializations" :key="spec" :value="spec">{{ spec }}</option>
                </select>
              </div>

              <div v-if="loadingDoctors" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="i in 4" :key="i" class="bg-white/5 rounded-xl p-5 animate-pulse">
                  <div class="h-4 bg-white/10 rounded w-3/4 mb-3"></div>
                  <div class="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="doctor in doctors" :key="doctor._id" @click="selectDoctor(doctor)"
                  class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-all cursor-pointer">
                  <div class="flex items-start gap-4">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {{ doctor.firstName?.[0] }}{{ doctor.lastName?.[0] }}
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-white">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h3>
                      <p class="text-sm text-cyan-300">{{ doctor.specialization }}</p>
                      <p class="text-xs text-gray-400">
                        {{ doctor.experience }} yrs exp • ₹{{ doctor.consultationFee }}
                      </p>
                      <div class="flex items-center gap-1 mt-1">
                        <span class="text-yellow-400">★</span>
                        <span class="text-xs text-gray-300">{{ doctor.rating?.toFixed(1) || 'New' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!loadingDoctors && doctors.length === 0" class="text-center py-8 text-gray-400">
                No doctors found.
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Booking Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedDoctor"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-6 max-w-md w-full">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-white">
                Book with Dr. {{ selectedDoctor.firstName }} {{ selectedDoctor.lastName }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-white">
                <XIcon class="w-5 h-5" />
              </button>
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-400 mb-1">Select Date</label>
              <input type="date" v-model="selectedDate" :min="today"
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" @change="fetchSlots" />
            </div>
            <div v-if="loadingSlots" class="text-center py-4">
              <RefreshCwIcon class="w-6 h-6 animate-spin mx-auto text-cyan-400" />
            </div>
            <div v-else-if="availableSlots.length" class="mb-4">
              <label class="block text-sm text-gray-400 mb-2">Select Time</label>
              <div class="grid grid-cols-3 gap-2">
                <button v-for="slot in availableSlots" :key="slot.startTime" @click="selectedSlot = slot"
                  class="px-3 py-2 text-sm rounded-lg border transition-all" :class="selectedSlot?.startTime === slot.startTime
                    ? 'bg-cyan-500/30 border-cyan-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    ">
                  {{ slot.startTime }}
                </button>
              </div>
            </div>
            <div v-else-if="selectedDate" class="text-center py-4 text-gray-400">
              No slots available.
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-400 mb-1">Symptoms (optional)</label>
              <textarea v-model="symptoms" rows="2"
                class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                placeholder="Describe your symptoms..."></textarea>
            </div>
            <div class="flex justify-end gap-3">
              <button @click="closeModal"
                class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10">
                Cancel
              </button>
              <button @click="bookAppointment" :disabled="!selectedSlot || bookingInProgress"
                class="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium disabled:opacity-50">
                {{ bookingInProgress ? 'Booking...' : 'Confirm Booking' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import { doctorService } from "../../../services/doctorService"
// import doctorService from '../../../services/doctorService'
import { appointmentService } from '../../../services/appointmentService'
import { useRouter } from 'vue-router'
import {
  User as UserIcon,
  Heart as HeartIcon,
  Calendar as CalendarIcon,
  Activity as ActivityIcon,
  Droplet as DropletIcon,
  Footprints as FootprintsIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  RefreshCw as RefreshCwIcon,
  X as XIcon
} from 'lucide-vue-next'

// --- Stores & Router ---
const authStore = useAuthStore()
const router = useRouter()

// --- Computed ---
const patientName = computed(() => authStore.user?.profile?.firstName || 'Patient')

// --- Reactive State ---
const lastUpdated = ref('Just now')
const healthMetrics = ref({
  heartRate: { current: 72, normal: '60-100', status: 'Normal' },
  bloodPressure: { systolic: 120, diastolic: 80, status: 'Normal' },
  bloodSugar: { current: 95, normal: '70-140', status: 'Normal' },
  weight: { current: 68, target: 65 },
  steps: { today: 8432, goal: 10000 },
  sleep: { hours: 7.5, quality: 'Good' }
})

const stepsPercentage = computed(() => {
  const m = healthMetrics.value.steps
  return m ? Math.min(100, Math.round((m.today / m.goal) * 100)) : 0
})
const weightProgress = computed(() => {
  const w = healthMetrics.value.weight
  if (!w) return 0
  const diff = w.current - w.target
  return Math.min(100, Math.max(0, 50 - diff * 10))
})
const weightStatus = computed(() =>
  healthMetrics.value.weight?.current > healthMetrics.value.weight?.target ? 'Losing' : 'On Track'
)

const getStatusClasses = (status) => {
  const map = {
    Normal: 'bg-green-500/20 text-green-300 border-green-500/30',
    Warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Critical: 'bg-red-500/20 text-red-300 border-red-500/30'
  }
  return map[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
}
const getAppointmentStatusClasses = (status) => {
  const map = {
    pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    confirmed: 'bg-green-500/20 text-green-300 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
    completed: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  }
  return map[status] || ''
}

// --- Tabs ---
const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Appointments', value: 'appointments' },
  { label: 'Book Appointment', value: 'book' }
]
const selectedTab = ref('overview')

// --- Doctor Listing ---
const doctors = ref([])
const loadingDoctors = ref(false)
const searchQuery = ref('')
const selectedSpecialization = ref('')
const specializations = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'General Physician',
  'Orthopedic',
  'Gynecologist'
]

let searchTimeout = null
const debouncedFetchDoctors = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => fetchDoctors(), 300)
}

async function fetchDoctors() {
  loadingDoctors.value = true
  try {

    console.log("Fetching doctor here ...")
    const params = {}

    console.log(selectedSpecialization.value);

    if (selectedSpecialization.value) params.specialization = selectedSpecialization.value;
    if (searchQuery.value) params.search = searchQuery.value;
    const res = await doctorService.getDoctor(params)
    console.log(res.doctors);
    doctors.value = res.doctors || []
  } catch (e) {
    console.error('Failed to fetch doctors:', e)
    doctors.value = []
  } finally {
    loadingDoctors.value = false
  }
}

// --- Booking Modal ---
const selectedDoctor = ref(null)
const selectedDate = ref('')
const availableSlots = ref([])
const selectedSlot = ref(null)
const symptoms = ref('')
const loadingSlots = ref(false)
const bookingInProgress = ref(false)
const today = new Date().toISOString().split('T')[0]

function selectDoctor(doctor) {
  selectedDoctor.value = doctor
  selectedDate.value = today
  selectedSlot.value = null
  symptoms.value = ''
  fetchSlots()
}

function closeModal() {
  selectedDoctor.value = null
  availableSlots.value = []
}

async function fetchSlots() {
  if (!selectedDoctor.value || !selectedDate.value) return
  loadingSlots.value = true
  try {
    console.log("Fetch slots")
    console.log(selectDoctor)
    const res = await doctorService.getDoctorSlots(selectedDoctor.value._id, selectedDate.value)
    console.log(res.slots)


    availableSlots.value = res.slots || []
  } catch (e) {
    console.error('Failed to fetch slots:', e)
    availableSlots.value = []
  } finally {
    loadingSlots.value = false
  }
}

async function bookAppointment() {
  if (!selectedDoctor.value || !selectedSlot.value) return
  bookingInProgress.value = true
  try {
    console.log("book Appointment")
    await appointmentService.bookAppointment({
      doctorId: selectedDoctor.value._id,
      appointmentDate: selectedDate.value,
      timeSlot: selectedSlot.value,
      type: 'video',
      symptoms: symptoms.value
    })
    alert('Appointment booked successfully!')
    closeModal()
    // Refresh appointments if on that tab
    if (selectedTab.value === 'appointments') fetchPatientAppointments()
  } catch (e) {
    alert('Booking failed: ' + (e.response?.data?.message || e.message))
  } finally {
    bookingInProgress.value = false
  }
}

// --- Patient Appointments ---
const patientAppointments = ref([])
const loadingAppointments = ref(false)

async function fetchPatientAppointments() {
  loadingAppointments.value = true
  console.log("fetchPatien")
  try {
    const res = await appointmentService.getPatientAppointments()
    console.log(res)
    patientAppointments.value = res.data.appointments || []

  } catch (e) {
    console.error('Failed to fetch appointments:', e)
  } finally {
    loadingAppointments.value = false
  }
}

function joinVideoCall(appt) {
  console.log(appt)
  if (appt.roomId) {
    router.push(`/call/${appt.roomId}`)
  } else {
    alert('No video room assigned yet.')
  }
}

// --- Watchers & Lifecycle ---
watch(selectedTab, (val) => {
  if (val === 'appointments') fetchPatientAppointments()
})

onMounted(() => {
  fetchDoctors()
})
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

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 12s ease-in-out infinite;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>