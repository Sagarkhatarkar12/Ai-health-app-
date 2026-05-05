<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 hidden md:block">
      <div class="p-5 border-b dark:border-gray-700">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Healthcare Platform</p>
      </div>
      
      <nav class="p-4 space-y-2">
        <a href="#" @click.prevent="activeTab = 'dashboard'" 
           :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-all', activeTab === 'dashboard' ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700']">
          <span class="text-xl">📊</span> Dashboard
        </a>
        <a href="#" @click.prevent="activeTab = 'doctors'" 
           :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-all', activeTab === 'doctors' ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700']">
          <span class="text-xl">👨‍⚕️</span> Doctors
        </a>
        <a href="#" @click.prevent="activeTab = 'users'" 
           :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-all', activeTab === 'users' ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700']">
          <span class="text-xl">👥</span> Users
        </a>
        <a href="#" @click.prevent="activeTab = 'appointments'" 
           :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-all', activeTab === 'appointments' ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700']">
          <span class="text-xl">📅</span> Appointments
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Top Bar -->
      <div class="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <button @click="toggleSidebar" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <span class="text-2xl">☰</span>
        </button>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ pageTitle }}</h2>
        <div class="flex items-center gap-4">
          <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <span v-if="isDark" class="text-yellow-400 text-xl">🌙</span>
            <span v-else class="text-gray-600 text-xl">☀️</span>
          </button>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">A</div>
            <span class="hidden sm:inline text-gray-700 dark:text-gray-200">Admin</span>
          </div>
        </div>
      </div>

      <div class="p-6">
        <!-- ================= DASHBOARD TAB ================= -->
        <div v-if="activeTab === 'dashboard'">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
              <div class="flex justify-between items-start">
                <div><p class="text-gray-500 dark:text-gray-400 text-sm">Total Patients</p><p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ stats.totalPatients }}</p></div>
                <div class="bg-cyan-100 dark:bg-cyan-900/30 p-3 rounded-full group-hover:scale-110 transition"><span class="text-2xl">👥</span></div>
              </div>
              <div class="mt-4 text-xs text-green-500">↑ 12% from last month</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
              <div class="flex justify-between items-start">
                <div><p class="text-gray-500 dark:text-gray-400 text-sm">Total Doctors</p><p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ stats.totalDoctors }}</p></div>
                <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full group-hover:scale-110 transition"><span class="text-2xl">👨‍⚕️</span></div>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
              <div class="flex justify-between items-start">
                <div><p class="text-gray-500 dark:text-gray-400 text-sm">Appointments</p><p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ stats.totalAppointments }}</p></div>
                <div class="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full group-hover:scale-110 transition"><span class="text-2xl">📅</span></div>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
              <div class="flex justify-between items-start">
                <div><p class="text-gray-500 dark:text-gray-400 text-sm">Pending Verifications</p><p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ stats.pendingDoctors }}</p></div>
                <div class="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-hover:scale-110 transition"><span class="text-2xl">⏳</span></div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
              <div class="space-y-3">
                <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div class="flex-1"><p class="text-sm text-gray-600 dark:text-gray-300">New patient registered</p><p class="text-xs text-gray-400">2 minutes ago</p></div>
                </div>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Appointments Overview</h3>
              <canvas id="appointmentsChart"></canvas>
            </div>
          </div>
        </div>

        <!-- ================= DOCTORS TAB (Enhanced) ================= -->
<!-- ================= DOCTORS TAB (Enhanced) ================= -->
<div v-if="activeTab === 'doctors'">
  <!-- Toggle between Pending / All Doctors -->
  <div class="flex gap-3 mb-6">
    <button @click="doctorFilter = 'pending'" :class="doctorFilter === 'pending' ? 'bg-cyan-500 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'" class="px-5 py-2 rounded-xl transition-all">
      ⏳ Pending ({{ pendingDoctors.length }})
    </button>
    <button @click="doctorFilter = 'all'" :class="doctorFilter === 'all' ? 'bg-cyan-500 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'" class="px-5 py-2 rounded-xl transition-all">
      👨‍⚕️ All Doctors ({{ allDoctors.length }})
    </button>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
    <div class="p-6 border-b dark:border-gray-700 flex justify-between items-center">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ doctorFilter === 'pending' ? 'Doctor Verification Requests' : 'All Doctors' }}</h3>
    </div>
    <div v-if="displayDoctors.length === 0" class="p-12 text-center text-gray-500">
      {{ doctorFilter === 'pending' ? 'No pending verifications' : 'No doctors found' }}
    </div>
    <div v-else class="divide-y dark:divide-gray-700">
      <div v-for="doc in displayDoctors" :key="doc._id" class="p-6 flex flex-wrap justify-between items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">{{ (doc.firstName?.charAt(0) || 'D') }}</div>
          <div>
            <p class="font-semibold text-gray-800 dark:text-white">{{ doc.firstName }} {{ doc.lastName }}</p>
            <p class="text-sm text-gray-500">{{ doc.specialization }} • {{ doc.experience }} years exp</p>
            <p class="text-xs text-gray-400">{{ doc.phoneNumber || doc.email }}</p>
            <p class="text-xs mt-1">
              <span :class="doc.verificationStatus === 'approved' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'">
                {{ doc.verificationStatus === 'approved' ? '✓ Verified' : doc.verificationStatus === 'pending' ? '⏳ Pending' : '✗ Rejected' }}
              </span>
            </p>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="toggleDoctorVerification(doc._id, doc.verificationStatus !== 'approved')" 
            :class="doc.verificationStatus === 'approved' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'" 
            class="px-5 py-2 text-white rounded-xl transition shadow-md">
            {{ doc.verificationStatus === 'approved' ? '↺ Unverify' : '✓ Verify' }}
          </button>
          <button @click="deleteDoctor(doc._id)" class="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition">🗑 Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>
        <!-- ================= USERS TAB ================= -->
        <div v-if="activeTab === 'users'">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div class="p-6 border-b dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white">User Management</h3></div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-700/50">
                  <tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr>
                </thead>
                <tbody class="divide-y dark:divide-gray-700">
                  <tr v-for="user in allUsers" :key="user._id" class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                    <td class="px-6 py-4 text-gray-800 dark:text-gray-200">{{ user.email.split('@')[0] }}</td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">{{ user.email }}</td>
                    <td class="px-6 py-4 capitalize"><span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'" class="px-2 py-1 rounded-full text-xs font-semibold">{{ user.role }}</span></td>
                    <td class="px-6 py-4"><span :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded-full text-xs font-semibold">{{ user.isActive ? 'Active' : 'Inactive' }}</span></td>
                    <td class="px-6 py-4"><button v-if="user.role !== 'admin'" @click="toggleUserStatus(user._id, !user.isActive)" :class="user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'" class="px-3 py-1 text-white text-sm rounded-lg transition">{{ user.isActive ? 'Deactivate' : 'Activate' }}</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ================= APPOINTMENTS TAB ================= -->
         
        <div v-if="activeTab === 'appointments'">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center text-gray-500"><span class="text-4xl mb-2 block">📅</span> Appointments module coming soon</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import api from '../../../services/api';
import Chart from 'chart.js/auto';

// Refs
const activeTab = ref('dashboard');
const isDark = ref(false);
const stats = ref({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0, pendingDoctors: 0 });
const pendingDoctors = ref([]);
const allDoctors = ref([]);
const allUsers = ref([]);
const doctorFilter = ref('pending');
let chartInstance = null;

// Computed
const pageTitle = computed(() => {
  const titles = { dashboard: 'Dashboard', doctors: 'Doctors', users: 'Users', appointments: 'Appointments' };
  return titles[activeTab.value];
});
const displayDoctors = computed(() => {
  return doctorFilter.value === 'pending' ? pendingDoctors.value : allDoctors.value;
});

// Data fetching
const fetchData = async () => {
  try {
    const [statsRes, pendingRes, usersRes] = await Promise.all([
      api.get('/api/admin/stats'),
      api.get('/api/admin/pending-doctors'),
      api.get('/api/admin/users')
    ]);
    stats.value = { ...statsRes.data.data };
    pendingDoctors.value = [...(pendingRes.data.data || [])];
    allUsers.value = [...(usersRes.data.data || [])];
  } catch (err) { console.error(err); }
};

const fetchAllDoctors = async () => {
  try {
    const res = await api.get('/api/admin/all-doctors');
    allDoctors.value = res.data.data;
    console.log(allDoctors.value)
  } catch (err) { console.error(err); }
};

// Actions
const verifyDoctor = async (id, approve) => {

  await api.put(`/api/admin/verify-doctor/${id}`, { approve });
  await fetchData();
  await fetchAllDoctors();

};
const toggleDoctorVerification = async (id, newStatus) => {

  await api.put(`/api/admin/verify-doctor/${id}`, { approve: newStatus });


  await fetchData();
  await fetchAllDoctors();

};
const deleteDoctor = async (id) => {
  if (confirm('Are you sure you want to delete this doctor?')) {

    await api.delete(`/api/admin/delete-doctor/${id}`);
    await fetchData();
    await fetchAllDoctors();

  }
};
const toggleUserStatus = async (id, status) => {

  await api.put(`/api/admin/users/${id}/status`, { isActive: status });
  await fetchData();
  await fetchAllDoctors();

};

// UI helpers
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  renderChart();
};
const toggleSidebar = () => { /* implement if needed */ };

const renderChart = () => {
  const ctx = document.getElementById('appointmentsChart')?.getContext('2d');
  if (!ctx) return;
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'Appointments', data: [12, 19, 15, 17, 22, 30, 25], borderColor: '#06b6d4', tension: 0.4 }] },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: isDark.value ? '#fff' : '#333' } } } }
  });
};

watch(activeTab, (newTab) => { if (newTab === 'dashboard') setTimeout(renderChart, 100); });
onMounted(() => { fetchData(); fetchAllDoctors(); renderChart(); });
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
* { font-family: 'Inter', sans-serif; }
.dark { color-scheme: dark; }
canvas { max-height: 250px; }
</style>