<!-- src/components/PatientDashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1120] relative overflow-hidden">
    <!-- Background orbs -->
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
            <p class="text-gray-400 mt-1">Welcome back, <span class="text-cyan-300 font-medium">{{ authUser.user.profile.firstName}}</span>!</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
              <p class="text-xs text-gray-500">Last updated</p>
              <p class="text-gray-300 font-medium">2 hours ago</p>
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
        <!-- Heart Rate Card -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Heart Rate</h3>
            <HeartIcon class="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">{{ healthMetrics.heartRate.current }} <span
                class="text-sm font-normal text-gray-400">bpm</span></p>
            <p class="text-xs text-gray-500 mt-1">Normal: {{ healthMetrics.heartRate.normal }}</p>
            <div class="mt-3">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                {{ healthMetrics.heartRate.status }}
              </span>
            </div>
          </div>
          <!-- Mini sparkline (decorative) -->
          <div class="absolute bottom-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg class="w-16 h-8" viewBox="0 0 100 30">
              <path d="M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15" fill="none" stroke="currentColor"
                stroke-width="2" class="text-cyan-400" />
            </svg>
          </div>
        </div>

        <!-- Blood Pressure Card -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Blood Pressure</h3>
            <ActivityIcon class="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">{{ healthMetrics.bloodPressure.systolic }}/{{
              healthMetrics.bloodPressure.diastolic }} <span class="text-sm font-normal text-gray-400">mmHg</span></p>
            <p class="text-xs text-gray-500 mt-1">Normal: 120/80</p>
            <div class="mt-3">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                {{ healthMetrics.bloodPressure.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Blood Sugar Card -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Blood Sugar</h3>
            <DropletIcon class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">{{ healthMetrics.bloodSugar.current }} <span
                class="text-sm font-normal text-gray-400">mg/dL</span></p>
            <p class="text-xs text-gray-500 mt-1">Normal: {{ healthMetrics.bloodSugar.normal }}</p>
            <div class="mt-3">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                {{ healthMetrics.bloodSugar.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Steps Card -->
        <div
          class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-300">Daily Steps</h3>
            <FootprintsIcon class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white">{{ healthMetrics.steps.today.toLocaleString() }} <span
                class="text-sm font-normal text-gray-400">steps</span></p>
            <div class="mt-2">
              <div class="flex justify-between text-xs text-gray-400 mb-1">
                <span>Goal: {{ healthMetrics.steps.goal.toLocaleString() }}</span>
                <span>{{ Math.round((healthMetrics.steps.today / healthMetrics.steps.goal) * 100) }}%</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                  :style="{ width: `${(healthMetrics.steps.today / healthMetrics.steps.goal) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Tabs -->
      <div class="space-y-6">
        <!-- Tab Navigation -->
        <div class="flex border-b border-white/10">
          <button v-for="tab in tabs" :key="tab.value" @click="selectedTab = tab.value"
            class="relative px-6 py-3 text-sm font-medium transition-colors duration-200" :class="selectedTab === tab.value
              ? 'text-cyan-300'
              : 'text-gray-400 hover:text-gray-200'
              ">
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
                    <p class="text-3xl font-bold text-white">{{ healthMetrics.weight.current }} <span
                        class="text-sm font-normal text-gray-400">kg</span></p>
                    <p class="text-sm text-gray-400">Target: {{ healthMetrics.weight.target }} kg</p>
                  </div>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                    On Track
                  </span>
                </div>
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    :style="{ width: `${((healthMetrics.weight.current - 60) / (healthMetrics.weight.target - 60)) * 100}%` }">
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">{{ (healthMetrics.weight.current -
                  healthMetrics.weight.target).toFixed(1) }} kg to goal</p>
              </div>

              <!-- Sleep Quality -->
              <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 class="text-lg font-semibold text-white mb-1">Sleep Quality</h3>
                <p class="text-sm text-gray-400 mb-4">Last night's sleep</p>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-3xl font-bold text-white">{{ healthMetrics.sleep.hours }} <span
                        class="text-sm font-normal text-gray-400">hrs</span></p>
                    <p class="text-sm text-gray-400">Quality: {{ healthMetrics.sleep.quality }}</p>
                  </div>
                  <CheckCircleIcon class="w-8 h-8 text-green-400" />
                </div>
                <div class="space-y-3">
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-300">Deep Sleep</span>
                      <span class="text-gray-400">2.5 hrs</span>
                    </div>
                    <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                        style="width: 33%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-300">Light Sleep</span>
                      <span class="text-gray-400">4.5 hrs</span>
                    </div>
                    <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" style="width: 60%">
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-300">REM Sleep</span>
                      <span class="text-gray-400">0.5 hrs</span>
                    </div>
                    <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style="width: 7%">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Appointments Tab -->
            <div v-else-if="selectedTab === 'appointments'" class="space-y-4">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-white">Upcoming & Past Appointments</h2>
                <button
                  class="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
                  <span class="flex items-center gap-2">
                    <CalendarIcon class="w-4 h-4" />
                    Schedule New
                  </span>
                </button>
              </div>
              <div class="grid gap-4">
                <div v-for="appointment in recentAppointments" :key="appointment.id"
                  class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-colors">
                  <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 class="font-semibold text-lg text-white">{{ appointment.type }}</h3>
                      <p class="text-gray-300">Dr. {{ appointment.doctor }}</p>
                      <p class="text-sm text-gray-400 mt-1 flex items-center gap-1">
                        <CalendarIcon class="w-3 h-3" />
                        {{ appointment.date }}
                      </p>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="appointment.status === 'Completed'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        ">
                        {{ appointment.status }}
                      </span>
                      <div v-if="appointment.status === 'Upcoming'" class="flex gap-2">
                        <button
                          class="px-3 py-1.5 text-xs rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
                          View Details
                        </button>
                        <button
                          class="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Medications Tab -->
            <div v-else-if="selectedTab === 'medications'" class="space-y-4">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-white">Current Medications</h2>
                <button
                  class="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
                  <span class="flex items-center gap-2">
                    <PillIcon class="w-4 h-4" />
                    Add Medication
                  </span>
                </button>
              </div>
              <div class="grid gap-4">
                <div v-for="medication in medications" :key="medication.id"
                  class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-colors">
                  <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 class="font-semibold text-lg text-white">{{ medication.name }}</h3>
                      <p class="text-gray-300">{{ medication.dosage }} • {{ medication.frequency }}</p>
                      <p class="text-sm text-cyan-300 mt-1 flex items-center gap-1">
                        <ClockIcon class="w-3 h-3" />
                        Next dose: {{ medication.nextDose }}
                      </p>
                    </div>
                    <div class="flex gap-2">
                      <button
                        class="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors">
                        Edit
                      </button>
                      <button
                        class="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300">
                        Mark as Taken
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Health Tips Tab -->
            <div v-else-if="selectedTab === 'health-tips'" class="space-y-4">
              <h2 class="text-xl font-semibold text-white">Personalized Health Tips</h2>
              <div class="grid gap-4">
                <div v-for="(tip, index) in healthTips" :key="index"
                  class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-all duration-300 hover:border-cyan-500/30">
                  <div class="flex items-start gap-4">
                    <div class="relative">
                      <div class="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                      <div
                        class="relative w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <TrendingUpIcon class="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <p class="text-gray-200 leading-relaxed">{{ tip }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import {
  User as UserIcon,
  Heart as HeartIcon,
  Calendar as CalendarIcon,
  Pill as PillIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Activity as ActivityIcon,
  Droplet as DropletIcon,
  Footprints as FootprintsIcon,
  Clock as ClockIcon
} from 'lucide-vue-next'
const authUser = useAuthStore();




// Mock data
const healthMetrics = ref({
  heartRate: {
    current: 72,
    normal: '60-100',
    status: 'Normal'
  },
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    status: 'Normal'
  },
  bloodSugar: {
    current: 95,
    normal: '70-140',
    status: 'Normal'
  },
  weight: {
    current: 68,
    target: 65,
    unit: 'kg'
  },
  steps: {
    today: 8432,
    goal: 10000
  },
  sleep: {
    hours: 7.5,
    quality: 'Good'
  }
})

const recentAppointments = ref([
  {
    id: 1,
    type: 'General Checkup',
    doctor: 'Smith',
    date: '2024-01-15',
    status: 'Completed'
  },
  {
    id: 2,
    type: 'Follow-up',
    doctor: 'Johnson',
    date: '2024-01-22',
    status: 'Upcoming'
  }
])

const medications = ref([
  {
    id: 1,
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    nextDose: '2:00 PM'
  },
  {
    id: 2,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    nextDose: '8:00 AM'
  }
])

const healthTips = ref([
  "Stay hydrated - drink at least 8 glasses of water today",
  "Take a 10-minute walk after meals to help digestion",
  "Remember to take your medications at scheduled times",
  "Get at least 7-8 hours of sleep for optimal recovery"
])

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Appointments', value: 'appointments' },
  { label: 'Medications', value: 'medications' },
  { label: 'Health Tips', value: 'health-tips' }
]

const selectedTab = ref('overview')
</script>

<style scoped>
/* Animations */
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

/* Tab content transition */
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