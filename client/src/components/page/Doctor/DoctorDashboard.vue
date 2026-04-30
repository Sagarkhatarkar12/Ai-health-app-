<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#eef2ff]">
    <NavBar />

    <main class="flex-1 p-4 md:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto space-y-6 md:space-y-8">

        <!-- Header Section with Glass Effect -->
        <div
          class="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl border border-white/50 p-6">
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full -mr-16 -mt-16 blur-3xl">
          </div>
          <div class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 text-sm font-medium">
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span class="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Welcome back,
                  Dr. {{ doctorName }}</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold mt-1">
                <span class="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Doctor
                  Dashboard</span>
              </h1>
              <p class="text-gray-500 mt-1 flex items-center gap-1">
                <Calendar class="w-4 h-4 text-primary/70" />
                {{ formattedDate }} • Manage appointments & patient data
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                class="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all border border-white">
                <Bell class="w-5 h-5 text-gray-600" />
              </button>
              <button
                class="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all border border-white">
                <Settings class="w-5 h-5 text-gray-600" />
              </button>
              <div
                class="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-2 py-1 shadow-md border border-white/50">
                <div class="flex flex-col items-end">
                  <span class="text-xs font-semibold text-gray-700">Dr. {{ doctorName }}</span>
                  <span class="text-xs text-primary/80">{{ specialization }}</span>
                </div>
                <div
                  class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-white font-semibold shadow-inner">
                  {{ initials }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards – Glassmorphism + Hover Lift -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="stat in statsCards" :key="stat.label"
            class="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl shadow-md border border-white/50 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/80">
            <div
              class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <div class="relative flex items-start justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
                <p class="text-3xl font-bold text-gray-800 mt-1">{{ stat.value }}</p>
                <p v-if="stat.trend" class="text-xs font-medium mt-2 flex items-center gap-1"
                  :class="stat.trendColorClass">
                  <TrendingUpIcon v-if="stat.trend.includes('+')" class="w-3 h-3" />
                  {{ stat.trend }}
                </p>
              </div>
              <div
                :class="['w-12 h-12 rounded-xl flex items-center justify-center shadow-inner transition-all group-hover:scale-110', stat.iconBgClass]">
                <component :is="stat.icon" :class="['w-6 h-6', stat.iconColorClass]" />
              </div>
            </div>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent">
            </div>
          </div>
        </div>

        <!-- Main Tabs – Elegant Card with Depth -->
        <div class="rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl border border-white/50 overflow-hidden">
          <!-- Tab Navigation -->
          <div
            class="flex items-center border-b border-white/40 overflow-x-auto scrollbar-hide px-4 bg-gradient-to-r from-white/30 to-transparent">
            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
              class="group relative px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap"
              :class="activeTab === tab.value ? 'text-primary' : 'text-gray-500 hover:text-gray-700'">
              <span class="flex items-center gap-2">
                <component :is="tab.icon" class="w-4 h-4 transition-transform group-hover:scale-110" />
                {{ tab.label }}
                <span v-if="tab.badge"
                  class="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-primary/20 text-primary font-semibold backdrop-blur-sm">
                  {{ tab.badge }}
                </span>
              </span>
              <span v-if="activeTab === tab.value"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-indigo-500 rounded-t-full shadow-sm"></span>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <Transition name="fade-slide" mode="out-in">
              <div :key="activeTab">
                <!-- Appointments Tab -->
                <!-- Appointments Tab -->
                <div v-if="activeTab === 'appointments'" class="space-y-5">
                  <div class="flex justify-between items-center">
                    <div>
                      <h2 class="text-xl font-semibold text-gray-800">Today's Schedule</h2>
                      <p class="text-sm text-gray-500 mt-0.5">Your upcoming appointments</p>
                    </div>
                    <button
                      class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all hover:scale-105">
                      + New Appointment
                    </button>
                  </div>

                  <!-- Loading & Empty States -->
                  <!-- <div v-if="loading.appointments" class="text-center py-8 text-gray-500">
    Loading appointments...
  </div>
  <div v-else-if="appointments.length === 0" class="text-center py-8 text-gray-500">
    No appointments found.
  </div> -->

                  <!-- Appointments List -->
                  <div class="grid gap-3">

                    <div v-for="appt in appointments" :key="appt.id"
                      class="group flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/80 transition-all">

                      <!-- Left: Avatar + Details -->
                      <div class="flex items-center gap-4">
                        <div class="relative">
                          <div
                            class="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all">
                          </div>
                          <div
                            class="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-indigo-100 flex items-center justify-center text-primary font-semibold text-sm border border-white/50">
                            {{ appt.patientId?.email?.charAt(0) || appt.patientId?.firstName?.charAt(0) || 'P' }}
                          </div>
                        </div>
                        <div>
                          <!-- {{ appt }} -->
                          <h3 class="font-semibold text-gray-800">{{ appt.patientId?.firstName }} {{
                            appt.patientId?.lastName }}</h3>
                          <p class="text-sm text-gray-500">{{ new Date(appt.appointmentDate) || "date" }}</p>
                          <p class="text-sm text-gray-500">{{ appt.type || 'Consultation' }} • {{
                            appt.timeSlot?.startTime || '--:--' }} - {{ appt.timeSlot?.endTime || '--:--'
                            }}</p>
                          <p class="text-xs text-gray-400 mt-1">{{ appt?.patientId?.phoneNumber || 'phone number' }}</p>

                          <p class="text-xs text-gray-600 mt-1 italic" v-if="appt.symptoms"> 🩺 Symptoms: {{
                            appt.symptoms }}</p>
                          <p class="text-xs text-gray-400 mt-1 italic" v-else> No symptoms recorded </p>
                        </div>
                      </div>


                      <!-- Right: Status Badge + Action Buttons (if pending) -->
                      <div class="flex items-center gap-3">
                        <!-- Status Badge -->
                        <span :class="getStatusBadgeClass(appt.patientId?.status)">{{ appt.status }}</span>
                        <!-- {{ appt }} -->
                        <!-- Video Call Button (always visible for non-cancelled appointments) -->
                        <button v-if="appt.status?.toLowerCase() !== 'cancelled'" @click="startVideoCall(appt)"
                          class="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md hover:scale-105 transition-all"
                          title="Start Video Call">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <!-- Accept / Reject Buttons (only for pending) -->
                        <div v-if="appt.status?.toLowerCase() === 'pending'" class="flex gap-2">
                          <button @click="handleAccept(appt)"
                            class="px-3 py-1.5 text-xs rounded-lg bg-green-100/80 text-green-700 font-medium hover:bg-green-200/80 transition-all backdrop-blur-sm border border-green-200 shadow-sm hover:shadow">
                            Accept
                          </button>
                          <button @click="handleReject(appt)"
                            class="px-3 py-1.5 text-xs rounded-lg bg-red-100/80 text-red-700 font-medium hover:bg-red-200/80 transition-all backdrop-blur-sm border border-red-200 shadow-sm hover:shadow">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Patients Tab -->
                <div v-else-if="activeTab === 'patients'" class="space-y-5">
                  <div class="flex justify-between items-center">
                    <div>
                      <h2 class="text-xl font-semibold text-gray-800">My Patients</h2>
                      <p class="text-sm text-gray-500 mt-0.5">Recently visited patients</p>
                    </div>
                    <button class="text-sm text-primary font-medium hover:underline">View All</button>
                  </div>
                  <div class="grid gap-3">
                    <div v-for="patient in recentPatients" :key="patient.id"
                      class="flex items-center gap-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/80 transition-all">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-100 flex items-center justify-center font-semibold text-indigo-700 text-sm shadow-inner">
                        {{ patient.initials }}
                      </div>
                      <div class="flex-1">
                        <h3 class="font-medium text-gray-800">{{ patient.name }}</h3>
                        <p class="text-xs text-gray-500">{{ patient.lastVisit }} • {{ patient.condition }}</p>
                      </div>
                      <button class="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                        <ChevronRight class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Availability Tab -->
                <div v-else-if="activeTab === 'availability'" class="space-y-2">
                  <AvailabilityManager :doctorId="doctorId" />
                </div>

                <!-- Lab Results Tab -->
                <div v-else-if="activeTab === 'labs'" class="space-y-5">
                  <div class="flex justify-between items-center">
                    <div>
                      <h2 class="text-xl font-semibold text-gray-800">Pending Lab Results</h2>
                      <p class="text-sm text-gray-500 mt-0.5">Results waiting for review</p>
                    </div>
                    <button class="text-sm text-primary font-medium hover:underline">View All</button>
                  </div>
                  <div class="grid gap-3">
                    <div v-for="lab in pendingLabs" :key="lab.id"
                      class="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/80 transition-all">
                      <div>
                        <h3 class="font-medium text-gray-800">{{ lab.testName }}</h3>
                        <p class="text-sm text-gray-500">{{ lab.patientName }}</p>
                      </div>
                      <button
                        class="px-4 py-2 text-sm rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors backdrop-blur-sm">
                        Review
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Messages Tab -->
                <div v-else-if="activeTab === 'messages'" class="space-y-5">
                  <div>
                    <h2 class="text-xl font-semibold text-gray-800">Inbox</h2>
                    <p class="text-sm text-gray-500 mt-0.5">Unread messages from patients</p>
                  </div>
                  <div class="grid gap-3">
                    <div v-for="msg in messages" :key="msg.id"
                      class="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/80 transition-all cursor-pointer">
                      <div class="flex items-start justify-between">
                        <div class="flex-1">
                          <h3 class="font-medium text-gray-800">{{ msg.subject }}</h3>
                          <p class="text-sm text-gray-500">From: {{ msg.from }}</p>
                          <p class="text-xs text-gray-400 mt-1 line-clamp-1">{{ msg.preview }}</p>
                        </div>
                        <span class="text-xs text-gray-400 ml-4">{{ msg.timeAgo }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import NavBar from '../../page/NavBar.vue'
import AvailabilityManager from '../AvailabilityManger/Availablity.vue'
import {
  Calendar, Clock, Users, FileText, Stethoscope, Bell, Settings,
  ChevronRight, MessageCircle, TrendingUp
} from 'lucide-vue-next'
import { appointmentService } from "../../../services/appointmentService"
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore();


const doctorName = computed(() => {
  const user = authStore.user
  console.log(user)
  return user ? `${user.profile.firstName} ${user.profile.lastName}` : 'Emily Carter'
})

const doctorId = computed(() => authStore.user?._id || '69df6aa3d7ce10ea2bdc80ff')
const specialization = computed(() => authStore.user?.specialization || 'Cardiology')
const initials = computed(() => doctorName.value.split(' ').map(n => n[0]).join('').toUpperCase())


const tabs = [
  { value: 'appointments', label: 'Appointments', icon: Calendar },
  { value: 'patients', label: 'Patients', icon: Users },
  { value: 'availability', label: 'Availability', icon: Clock },
  { value: 'labs', label: 'Lab Results', icon: FileText },
  { value: 'messages', label: 'Messages', icon: MessageCircle, badge: '3' }
]

const activeTab = ref('appointments')
// console.log(appointments);

const appointments = ref([

  { id: 1, patientName: 'Emily Rodriguez', type: 'Follow-up', time: '09:00 AM', status: 'Confirmed', initials: 'ER' },
  { id: 2, patientName: 'Michael Chen', type: 'Consultation', time: '10:30 AM', status: 'Confirmed', initials: 'MC' },
])

const recentPatients = ref([
  { id: 1, name: 'Olivia Martinez', initials: 'OM', lastVisit: '2 days ago', condition: 'Hypertension' },
  { id: 2, name: 'James Wilson', initials: 'JW', lastVisit: '3 days ago', condition: 'Diabetes' },
])

const pendingLabs = ref([
  { id: 1, testName: 'CBC', patientName: 'John Doe' },
  { id: 2, testName: 'Lipid Panel', patientName: 'Anna Smith' },
])

const messages = ref([
  { id: 1, subject: 'Prescription refill request', from: 'John Doe', preview: 'I need a refill...', timeAgo: '2h ago' },
  { id: 2, subject: 'Lab result question', from: 'Anna Smith', preview: 'Can you explain...', timeAgo: '5h ago' },
  { id: 3, subject: 'Appointment reschedule', from: 'Mark Lee', preview: 'I need to change...', timeAgo: '1d ago' },
])

const formattedDate = computed(() => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

const statsCards = computed(() => [
  { label: 'Today\'s Appointments', value: 8, trend: '+2 from yesterday', icon: Calendar, iconBgClass: 'bg-primary/20 backdrop-blur-sm', iconColorClass: 'text-primary', trendColorClass: 'text-green-600' },
  { label: 'New Patients', value: 3, trend: 'This week', icon: Users, iconBgClass: 'bg-emerald-100/50', iconColorClass: 'text-emerald-600', trendColorClass: 'text-emerald-600' },
  { label: 'Pending Reports', value: 12, trend: '4 need review', icon: FileText, iconBgClass: 'bg-amber-100/50', iconColorClass: 'text-amber-600', trendColorClass: 'text-amber-600' },
  { label: 'Upcoming Surgeries', value: 2, trend: 'This week', icon: Stethoscope, iconBgClass: 'bg-blue-100/50', iconColorClass: 'text-blue-600', trendColorClass: 'text-blue-600' },
])

function startVideoCall(appt: any) {
  console.log(appt.roomId)
  if (appt.roomId) {

    router.push(`/call/${appt.roomId}`);
  } else {
    alert('No video room assigned yet.')
  }
}
const getStatusBadgeClass = (status: string) => {
  return status === 'Confirmed' ? 'text-xs px-3 py-1 rounded-full bg-green-100/80 text-green-700 font-medium backdrop-blur-sm border border-green-200' : 'text-xs px-3 py-1 rounded-full bg-yellow-100/80 text-yellow-700 font-medium backdrop-blur-sm border border-yellow-200'
}
// ========== Accept / Reject Handlers ==========
const handleAccept = async (appt: any) => {
  console.log("✅ Accept clicked for:", appt)
  // TODO: Call API to update status to 'confirmed'
  // Example: await appointmentService.updateStatus(appt.id, 'confirmed')
  // alert(`Accept appointment for ${appt.patientId?.email || appt.patientName}?`)
  try {
    await appointmentService.updateAppointmentStatus(appt._id, 'confirmed');
    // Refresh list
    fetchAppointments();
    alert("Appointment confirmed");
  } catch (error) {
    console.error(error);
    alert("Failed to accept");
  }
}

const handleReject = async (appt: any) => {
  console.log("❌ Reject clicked for:", appt)
  // TODO: Call API to update status to 'cancelled'
  // alert(`Reject appointment for ${appt.patientId?.email || appt.patientName}?`)
  try {
    await appointmentService.updateAppointmentStatus(appt._id, 'cancelled');
    fetchAppointments();
    alert("Appointment cancelled");
  } catch (error) {
    console.error(error);
    alert("Failed to reject");
  }
}

// fetch appointment request 
const fetchAppointments = async () => {
  const res = await appointmentService.getDoctorAppointments();
  appointments.value = res.appointments;
  console.log(res)

}



// 👇 MAIN LOGIC
watch(activeTab, (newTab) => {
  console.log("Tab changed:", newTab);

  if (newTab === "appointments") {
    fetchAppointments();
  }
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>