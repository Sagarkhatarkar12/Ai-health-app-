<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <NavBar />
    
    <main class="flex-1 p-4 md:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-sm font-medium text-primary/80 mb-1">
              <span class="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span>Welcome back, Dr. Sarah</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Doctor Dashboard
            </h1>
            <p class="text-muted-foreground mt-1 flex items-center gap-1">
              <Calendar class="w-4 h-4" />
              {{ formattedDate }} • Manage appointments & patient data
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button class="p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
              <Bell class="w-5 h-5 text-gray-600" />
            </button>
            <button class="p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
              <Settings class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex items-center gap-3 bg-white rounded-full pl-3 pr-2 py-1 shadow-sm border border-gray-100">
              <div class="flex flex-col items-end">
                <span class="text-xs font-semibold text-gray-700">Dr. Sarah Johnson</span>
                <span class="text-xs text-gray-500">Cardiology</span>
              </div>
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold shadow-md">
                SJ
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards Grid (dynamically generated) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="stat in statsCards" :key="stat.label" 
               class="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 font-medium">{{ stat.label }}</p>
                <p class="text-3xl font-bold text-gray-800 mt-1">{{ stat.value }}</p>
                <p v-if="stat.trend" class="text-xs" :class="stat.trendColorClass">
                  {{ stat.trend }}
                </p>
              </div>
              <div :class="['w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-colors', stat.iconBgClass]">
                <component :is="stat.icon" :class="['w-6 h-6', stat.iconColorClass]" />
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          <!-- Left Column: Appointments List -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Upcoming Appointments Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar class="w-5 h-5 text-primary" />
                    Upcoming Appointments
                  </h2>
                  <p class="text-xs text-gray-500 mt-1">Today's schedule and upcoming consultations</p>
                </div>
                <button class="text-sm text-primary font-medium hover:underline">View All</button>
              </div>
              
              <div class="divide-y divide-gray-100">
                <div v-for="appointment in appointments" :key="appointment.id" 
                     class="p-4 hover:bg-gray-50 transition-colors group">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-semibold text-primary">
                      {{ appointment.initials }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between flex-wrap gap-2">
                        <h3 class="font-medium text-gray-800">{{ appointment.patientName }}</h3>
                        <span :class="getStatusBadgeClass(appointment.status)">
                          {{ appointment.status }}
                        </span>
                      </div>
                      <div class="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                        <span class="flex items-center gap-1">
                          <Clock class="w-3 h-3" />
                          {{ appointment.time }}
                        </span>
                        <span class="flex items-center gap-1">
                          <Stethoscope class="w-3 h-3" />
                          {{ appointment.type }}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button @click="() => handleJoinCall(appointment)" class="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                        <Video class="w-4 h-4" />
                      </button>
                      <button @click="() => handleReschedule(appointment)" class="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                        <MoreHorizontal class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="px-5 py-3 bg-gray-50/50 border-t border-gray-100">
                <button class="w-full text-center text-sm text-primary font-medium py-2 hover:bg-primary/5 rounded-xl transition-colors">
                  + Schedule New Appointment
                </button>
              </div>
            </div>

            <!-- Weekly Patient Visits Chart (dynamic heights) -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <Activity class="w-5 h-5 text-primary" />
                    Weekly Patient Visits
                  </h2>
                  <p class="text-xs text-gray-500 mt-1">Last 7 days activity</p>
                </div>
                <select class="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div class="flex items-end gap-2 md:gap-4 h-48">
                <div v-for="visit in weeklyVisits" :key="visit.day" class="flex-1 flex flex-col items-center gap-2">
                  <div class="w-full bg-gradient-to-t from-primary/20 to-primary/10 rounded-lg relative group cursor-pointer" 
                       :style="{ height: `${getBarHeight(visit.value)}px` }">
                    <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {{ visit.value }} patients
                    </div>
                  </div>
                  <span class="text-xs text-gray-500 font-medium">{{ visit.day }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Recent Patients & Quick Actions -->
          <div class="space-y-6">
            <!-- Recent Patients Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                  <Users class="w-5 h-5 text-primary" />
                  Recent Patients
                </h2>
                <button class="text-sm text-primary font-medium hover:underline">View All</button>
              </div>
              <div class="divide-y divide-gray-100">
                <div v-for="patient in recentPatients" :key="patient.id" class="p-4 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center font-semibold text-indigo-600">
                      {{ patient.initials }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-medium text-gray-800">{{ patient.name }}</h3>
                      <p class="text-xs text-gray-500">{{ patient.lastVisit }} • {{ patient.condition }}</p>
                    </div>
                    <button @click="() => viewPatient(patient)" class="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                      <ChevronRight class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Video Call Card -->
            <div class="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-5 text-white">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Video class="w-6 h-6" />
                </div>
                <span class="text-xs bg-white/20 px-2 py-1 rounded-full">Live</span>
              </div>
              <h3 class="text-xl font-bold mb-1">Video Consultation</h3>
              <p class="text-white/80 text-sm mb-4">Connect with patients in real-time</p>
              <button @click="startVideoCall" class="w-full bg-white text-primary font-semibold py-2.5 rounded-xl hover:bg-white/90 transition-all transform hover:scale-105 shadow-md">
                Start Video Call
              </button>
              <div class="mt-4 pt-4 border-t border-white/20">
                <p class="text-xs text-white/70 flex items-center gap-2">
                  <MessageCircle class="w-3 h-3" />
                  Next call: 3:00 PM with James Wilson
                </p>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 class="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <Clipboard class="w-5 h-5 text-primary" />
                Quick Actions
              </h2>
              <div class="grid grid-cols-2 gap-3">
                <button v-for="action in quickActions" :key="action.label" 
                        class="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors group">
                  <component :is="action.icon" class="w-5 h-5 text-gray-600 group-hover:text-primary" />
                  <span class="text-xs font-medium text-gray-600 group-hover:text-primary">{{ action.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from './NavBar.vue'
import { 
  Calendar, 
  Users, 
  FileText, 
  Stethoscope, 
  Bell, 
  Settings, 
  TrendingUp, 
  Clock, 
  Video, 
  MoreHorizontal, 
  Activity,
  ChevronRight,
  MessageCircle,
  Clipboard,
  FilePlus,
  CalendarPlus,
  Download,
  Mail
} from 'lucide-vue-next'

// ==================== TYPES ====================
interface Appointment {
  id: number
  patientName: string
  initials: string
  time: string
  type: string
  status: 'Confirmed' | 'Pending' | 'Completed'
}

interface Patient {
  id: number
  name: string
  initials: string
  lastVisit: string
  condition: string
}

interface StatCard {
  label: string
  value: number
  trend?: string
  icon: any
  iconBgClass: string
  iconColorClass: string
  trendColorClass?: string
}

// ==================== CONSTANTS ====================
const APPOINTMENTS_DATA: Appointment[] = [
  { id: 1, patientName: 'Emily Rodriguez', initials: 'ER', time: '09:00 AM', type: 'Follow-up', status: 'Confirmed' },
  { id: 2, patientName: 'Michael Chen', initials: 'MC', time: '10:30 AM', type: 'Consultation', status: 'Confirmed' },
  { id: 3, patientName: 'Sarah Johnson', initials: 'SJ', time: '11:45 AM', type: 'Check-up', status: 'Pending' },
  { id: 4, patientName: 'David Williams', initials: 'DW', time: '02:00 PM', type: 'Emergency', status: 'Confirmed' },
  { id: 5, patientName: 'Lisa Anderson', initials: 'LA', time: '03:30 PM', type: 'Follow-up', status: 'Confirmed' },
]

const RECENT_PATIENTS_DATA: Patient[] = [
  { id: 1, name: 'Olivia Martinez', initials: 'OM', lastVisit: '2 days ago', condition: 'Hypertension' },
  { id: 2, name: 'James Wilson', initials: 'JW', lastVisit: '3 days ago', condition: 'Diabetes Type 2' },
  { id: 3, name: 'Emma Thompson', initials: 'ET', lastVisit: '5 days ago', condition: 'Asthma' },
  { id: 4, name: 'Robert Garcia', initials: 'RG', lastVisit: '1 week ago', condition: 'Arthritis' },
]

const WEEKLY_VISITS_DATA = [
  { day: 'Mon', value: 12 },
  { day: 'Tue', value: 19 },
  { day: 'Wed', value: 15 },
  { day: 'Thu', value: 22 },
  { day: 'Fri', value: 27 },
  { day: 'Sat', value: 18 },
  { day: 'Sun', value: 10 },
]

const QUICK_ACTIONS = [
  { label: 'New Prescription', icon: FilePlus },
  { label: 'Schedule', icon: CalendarPlus },
  { label: 'Reports', icon: Download },
  { label: 'Message', icon: Mail },
]

// ==================== REACTIVE DATA ====================
const appointments = ref<Appointment[]>(APPOINTMENTS_DATA)
const recentPatients = ref<Patient[]>(RECENT_PATIENTS_DATA)
const weeklyVisits = ref(WEEKLY_VISITS_DATA)

// ==================== COMPUTED ====================
const formattedDate = computed(() => 
  new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
)

// Dynamic max value for chart scaling (max bar height = 120px)
const maxVisits = computed(() => 
  Math.max(...weeklyVisits.value.map(v => v.value), 1)
)

const getBarHeight = (value: number): number => {
  // Scale to max 120px, min 20px
  return Math.max(20, (value / maxVisits.value) * 120)
}

// Stats cards configuration
const statsCards = computed<StatCard[]>(() => [
  { 
    label: 'Today\'s Appointments', 
    value: 8, 
    trend: '+2 from yesterday',
    icon: Calendar,
    iconBgClass: 'bg-primary/10',
    iconColorClass: 'text-primary',
    trendColorClass: 'text-green-600'
  },
  { 
    label: 'New Patients', 
    value: 3, 
    trend: 'This week',
    icon: Users,
    iconBgClass: 'bg-emerald-50',
    iconColorClass: 'text-emerald-600',
    trendColorClass: 'text-emerald-600'
  },
  { 
    label: 'Pending Reports', 
    value: 12, 
    trend: '4 need review',
    icon: FileText,
    iconBgClass: 'bg-amber-50',
    iconColorClass: 'text-amber-600',
    trendColorClass: 'text-amber-600'
  },
  { 
    label: 'Upcoming Surgeries', 
    value: 2, 
    trend: 'This week',
    icon: Stethoscope,
    iconBgClass: 'bg-blue-50',
    iconColorClass: 'text-blue-600',
    trendColorClass: 'text-blue-600'
  }
])

const quickActions = ref(QUICK_ACTIONS)

// ==================== HELPERS ====================
const getStatusBadgeClass = (status: Appointment['status']): string => {
  const base = 'text-xs px-2 py-1 rounded-full font-medium'
  switch (status) {
    case 'Confirmed': return `${base} bg-green-100 text-green-700`
    case 'Pending': return `${base} bg-yellow-100 text-yellow-700`
    default: return `${base} bg-gray-100 text-gray-700`
  }
}

// ==================== EVENT HANDLERS ====================
const handleJoinCall = (appointment: Appointment) => {
  console.log(`Joining call with ${appointment.patientName}`)
  alert(`Starting video call with ${appointment.patientName}`)
}

const handleReschedule = (appointment: Appointment) => {
  console.log(`Rescheduling appointment with ${appointment.patientName}`)
  alert(`Reschedule appointment with ${appointment.patientName}`)
}

const viewPatient = (patient: Patient) => {
  console.log(`Viewing patient: ${patient.name}`)
  alert(`Viewing patient record for ${patient.name}`)
}

const startVideoCall = () => {
  console.log('Starting video consultation')
  alert('Initiating video consultation...')
}
</script>

<style scoped>
/* Smooth fade-in animation for all groups */
.group {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>