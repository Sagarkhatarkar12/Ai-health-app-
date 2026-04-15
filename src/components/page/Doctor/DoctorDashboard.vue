<!-- src/components/page/doctorDashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b1120] relative overflow-hidden">
    <!-- Animated background orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[130px] animate-float-slow"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] animate-float-slower"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[200px] animate-pulse-slow"></div>
    </div>

    <!-- Grid pattern -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0 L30 60 M0 30 L60 30\' stroke=\'rgba(255,255,255,0.03)\' stroke-width=\'0.5\' /%3E%3C/svg%3E\')] opacity-30"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="absolute inset-0 bg-purple-400/30 rounded-full blur-md"></div>
              <div class="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                <StethoscopeIcon class="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent">
                Doctor Dashboard
              </h1>
              <p class="text-gray-400 mt-1">Welcome back, <span class="text-purple-300 font-medium">{{ doctor.name }}</span></p>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="hidden md:flex items-center gap-2 text-sm">
              <div class="flex items-center gap-1.5">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span class="text-gray-300">Online</span>
              </div>
              <span class="text-gray-500">|</span>
              <span class="text-gray-400">Last sync: {{ lastSync }}</span>
            </div>
            <div class="relative">
              <div class="absolute inset-0 bg-cyan-400/30 rounded-full blur-md"></div>
              <div class="relative w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <UserIcon class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Today's Appointments"
          :value="todayAppointments.length"
          :subvalue="`${upcomingAppointmentsCount} upcoming`"
          icon="calendar"
          color="purple"
          :trend="appointmentTrend"
        />
        <StatCard
          title="Pending Lab Results"
          :value="pendingLabs.length"
          subvalue="Review needed"
          icon="activity"
          color="blue"
        />
        <StatCard
          title="Unread Messages"
          :value="unreadMessages"
          :subvalue="`${totalMessages} total`"
          icon="message"
          color="green"
        />
        <StatCard
          title="Patients Online"
          :value="onlinePatients"
          subvalue="Active now"
          icon="users"
          color="teal"
          :pulse="true"
        />
      </div>

      <!-- Main Tabs -->
      <div class="space-y-6">
        <!-- Tab Navigation -->
        <div class="flex border-b border-white/10 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="selectedTab = tab.value"
            class="relative px-6 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            :class="selectedTab === tab.value ? 'text-cyan-300' : 'text-gray-400 hover:text-gray-200'"
          >
            <span class="flex items-center gap-2">
              <component :is="tab.icon" class="w-4 h-4" />
              {{ tab.label }}
              <span v-if="tab.badge" class="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {{ tab.badge }}
              </span>
            </span>
            <span
              v-if="selectedTab === tab.value"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400"
            ></span>
          </button>
        </div>

        <!-- Tab Content -->
        <Transition name="fade-slide" mode="out-in">
          <div :key="selectedTab">
            <!-- Appointments Tab -->
            <div v-if="selectedTab === 'appointments'" class="space-y-4">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 class="text-xl font-semibold text-white">Today's Schedule</h2>
                <div class="flex gap-3">
                  <button class="group relative px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-all">
                    <span class="flex items-center gap-2">
                      <FilterIcon class="w-4 h-4" />
                      Filter
                    </span>
                  </button>
                  <button
                    @click="openScheduleModal"
                    class="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-sm font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                  >
                    <span class="flex items-center gap-2">
                      <CalendarIcon class="w-4 h-4" />
                      New Appointment
                    </span>
                  </button>
                </div>
              </div>

              <div class="grid gap-4">
                <div
                  v-for="appt in todayAppointments"
                  :key="appt.id"
                  class="group bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div class="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div class="flex items-start gap-4">
                      <div class="relative">
                        <div class="absolute inset-0 bg-purple-400/20 rounded-full blur-md"></div>
                        <div class="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <span class="text-white font-semibold">{{ appt.time.split(' ')[0] }}</span>
                        </div>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg text-white">{{ appt.type }}</h3>
                        <p class="text-gray-300">{{ appt.patientName }}</p>
                        <p class="text-sm text-gray-400 mt-1 flex items-center gap-1">
                          <ClockIcon class="w-3 h-3" />
                          {{ appt.time }}
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                        :class="
                          appt.status === 'Upcoming'
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                        "
                      >
                        {{ appt.status }}
                      </span>
                      <div class="flex gap-2">
                        <button
                          v-if="appt.status === 'Upcoming'"
                          @click="startVideoCall(appt)"
                          class="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-1"
                        >
                          <VideoIcon class="w-3 h-3" />
                          Start Call
                        </button>
                        <button class="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Patients Tab -->
            <div v-if="selectedTab === 'patients'" class="space-y-4">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 class="text-xl font-semibold text-white">My Patients</h2>
                <div class="relative w-full sm:w-64">
                  <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="patientSearch"
                    type="text"
                    placeholder="Search patients..."
                    class="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>

              <div class="grid gap-4">
                <div
                  v-for="patient in filteredPatients"
                  :key="patient.id"
                  class="group bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="relative">
                        <div class="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                        <div class="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                          <UserIcon class="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 class="font-semibold text-white">{{ patient.name }}</h3>
                        <p class="text-sm text-gray-400">{{ patient.age }} yrs • {{ patient.gender }}</p>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button
                        @click="openPatientModal(patient)"
                        class="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                  <!-- Quick health summary -->
                  <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-xs">
                    <div class="text-gray-400">Last Visit: <span class="text-gray-300">{{ patient.lastVisit }}</span></div>
                    <div class="text-gray-400">Next Appt: <span class="text-gray-300">{{ patient.nextAppointment || 'None' }}</span></div>
                    <div class="text-gray-400">Condition: <span class="text-cyan-300">{{ patient.primaryCondition }}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lab Results Tab -->
            <div v-if="selectedTab === 'labs'" class="space-y-4">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-white">Pending Lab Results</h2>
                <button class="px-4 py-2 text-sm rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">
                  View All
                </button>
              </div>

              <div class="grid gap-4">
                <div
                  v-for="lab in pendingLabs"
                  :key="lab.id"
                  class="group bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:bg-white/10 hover:border-blue-500/30 transition-all"
                >
                  <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div class="flex items-start gap-3">
                      <div class="p-2 rounded-lg bg-blue-500/20">
                        <ActivityIcon class="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 class="font-semibold text-white">{{ lab.testName }}</h3>
                        <p class="text-sm text-gray-400">{{ lab.patientName }}</p>
                        <p class="text-xs text-gray-500 mt-1">Ordered: {{ lab.orderedDate }}</p>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button
                        @click="reviewLab(lab)"
                        class="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                      >
                        Review Results
                      </button>
                      <button class="px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10">
                        <DownloadIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Messages Tab -->
            <div v-if="selectedTab === 'messages'" class="space-y-4">
              <h2 class="text-xl font-semibold text-white">Inbox</h2>
              <div class="grid gap-4">
                <div
                  v-for="msg in messages"
                  :key="msg.id"
                  class="group bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-all cursor-pointer"
                  :class="{ 'border-l-4 border-l-cyan-500': !msg.read }"
                  @click="openMessage(msg)"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex items-start gap-4">
                      <div class="relative">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                          <MessageSquareIcon class="w-5 h-5 text-white" />
                        </div>
                        <span v-if="!msg.read" class="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full border-2 border-slate-900"></span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-white">{{ msg.subject }}</h3>
                        <p class="text-sm text-gray-400">From: {{ msg.from }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ msg.preview }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="text-xs text-gray-500">{{ msg.timeAgo }}</span>
                      <div class="mt-2">
                        <button class="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10">
                          Reply
                        </button>
                      </div>
                    </div>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  User as UserIcon,
  Calendar as CalendarIcon,
  Activity as ActivityIcon,
  MessageSquare as MessageSquareIcon,
  Users as UserCheckIcon,
  Stethoscope as StethoscopeIcon,
  Clock as ClockIcon,
  Video as VideoIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from 'lucide-vue-next'

// StatCard component defined inline for simplicity
const StatCard = {
  props: ['title', 'value', 'subvalue', 'icon', 'color', 'trend', 'pulse'],
  template: `
    <div class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10" :class="\`hover:border-\${color}-500/30\`">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-medium text-gray-300">{{ title }}</h3>
        <component :is="iconComponent" class="w-5 h-5" :class="\`text-\${color}-400\`" />
      </div>
      <div>
        <p class="text-3xl font-bold text-white">{{ value }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ subvalue }}</p>
        <div class="mt-3 flex items-center gap-2">
          <span v-if="trend" class="inline-flex items-center text-xs" :class="trend > 0 ? 'text-green-400' : 'text-red-400'">
            <component :is="trend > 0 ? TrendingUpIcon : TrendingDownIcon" class="w-3 h-3 mr-0.5" />
            {{ Math.abs(trend) }}%
          </span>
          <span v-if="pulse" class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>
    </div>
  `,
  computed: {
    iconComponent() {
      const icons = {
        calendar: CalendarIcon,
        activity: ActivityIcon,
        message: MessageSquareIcon,
        users: UserCheckIcon
      }
      return icons[this.icon] || ActivityIcon
    }
  }
}

const router = useRouter()

// Mock data
const doctor = ref({ name: 'Emily Carter', id: 42 })
const lastSync = ref('just now')

const todayAppointments = ref([
  { id: 1, type: 'Consultation', patientName: 'John Doe', time: '09:30 AM', status: 'Upcoming', roomId: 'room-101' },
  { id: 2, type: 'Follow‑up', patientName: 'Anna Smith', time: '11:00 AM', status: 'Completed', roomId: 'room-102' },
  { id: 3, type: 'Physical Exam', patientName: 'Mark Lee', time: '02:15 PM', status: 'Upcoming', roomId: 'room-103' },
  { id: 4, type: 'Telemedicine', patientName: 'Sarah Johnson', time: '04:00 PM', status: 'Upcoming', roomId: 'room-104' }
])

const pendingLabs = ref([
  { id: 101, testName: 'Complete Blood Count (CBC)', patientName: 'John Doe', orderedDate: '2024-01-20' },
  { id: 102, testName: 'Lipid Panel', patientName: 'Anna Smith', orderedDate: '2024-01-21' },
  { id: 103, testName: 'HbA1c', patientName: 'Mark Lee', orderedDate: '2024-01-19' }
])

const messages = ref([
  { id: 201, subject: 'Prescription refill request', from: 'John Doe', preview: 'I need a refill for my blood pressure medication...', timeAgo: '2h ago', read: false },
  { id: 202, subject: 'Lab result question', from: 'Anna Smith', preview: 'Can you explain my recent cholesterol results?', timeAgo: '5h ago', read: false },
  { id: 203, subject: 'Appointment reschedule', from: 'Mark Lee', preview: 'I need to change my appointment to next week...', timeAgo: '1d ago', read: true }
])

const patients = ref([
  { id: 301, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-01-15', nextAppointment: '2024-01-28', primaryCondition: 'Hypertension' },
  { id: 302, name: 'Anna Smith', age: 32, gender: 'Female', lastVisit: '2024-01-10', nextAppointment: '2024-02-05', primaryCondition: 'Hyperlipidemia' },
  { id: 303, name: 'Mark Lee', age: 28, gender: 'Male', lastVisit: '2024-01-18', nextAppointment: null, primaryCondition: 'Type 2 Diabetes' }
])

const onlinePatients = ref(7)

const upcomingAppointmentsCount = computed(() => todayAppointments.value.filter(a => a.status === 'Upcoming').length)
const appointmentTrend = ref(12) // positive trend
const totalMessages = computed(() => messages.value.length)
const unreadMessages = computed(() => messages.value.filter(m => !m.read).length)

const selectedTab = ref('appointments')
const patientSearch = ref('')

const filteredPatients = computed(() => {
  const term = patientSearch.value.toLowerCase()
  return patients.value.filter(p => p.name.toLowerCase().includes(term))
})

const tabs = [
  { value: 'appointments', label: 'Appointments', icon: CalendarIcon, badge: upcomingAppointmentsCount.value || null },
  { value: 'patients', label: 'Patients', icon: UserCheckIcon },
  { value: 'labs', label: 'Lab Results', icon: ActivityIcon, badge: pendingLabs.value.length },
  { value: 'messages', label: 'Messages', icon: MessageSquareIcon, badge: unreadMessages.value || null }
]

// Actions
function startVideoCall(appointment) {
  // Generate or use existing roomId
  const roomId = appointment.roomId || `appt-${appointment.id}-${Date.now()}`
  router.push(`/call/${roomId}`)
}

function openScheduleModal() {
  // Implement modal logic
  console.log('Open schedule modal')
}

function openPatientModal(patient) {
  // Navigate to patient detail or open modal
  console.log('View patient:', patient)
}

function reviewLab(lab) {
  console.log('Review lab:', lab)
}

function openMessage(msg) {
  console.log('Open message:', msg)
  // Mark as read
  msg.read = true
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
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
.animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
.animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }

.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>