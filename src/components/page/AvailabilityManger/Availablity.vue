<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">Set Your Availability</h3>
        <p class="text-sm text-gray-500">Define when patients can book appointments</p>
      </div>
      <button @click="openAddSlotModal"
        class="px-4 py-2 rounded-xl bg-primary text-black text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2">
        <PlusIcon class="w-4 h-4" />
        Add Slots
      </button>
    </div>

    <!-- Date Picker -->
    <div class="flex items-center gap-3">
      <div class="relative flex-1">
        <CalendarIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="date" v-model="selectedDate" @change="fetchAvailability" :min="today"
          class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
      </div>
      <button @click="fetchAvailability"
        class="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" title="Refresh">
        <RefreshCwIcon class="w-4 h-4" :class="{ 'animate-spin': loading }" />
      </button>
    </div>

    <!-- Slots Display -->
    <div v-if="loading" class="text-center py-8">
      <RefreshCwIcon class="w-6 h-6 animate-spin mx-auto text-primary" />
      <p class="text-sm text-gray-500 mt-2">Loading slots...</p>
    </div>

    <div v-else-if="slots.length === 0"
      class="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-gray-200">
      <CalendarIcon class="w-10 h-10 mx-auto mb-3 text-gray-400" />
      <p>No availability set for {{ formatDate(selectedDate) }}</p>
      <button @click="openAddSlotModal"
        class="mt-4 px-4 py-2 text-sm rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
        Add slots for this day
      </button>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div v-for="slot in slots" :key="slot.startTime" class="relative group">
        <div class="p-3 rounded-xl border text-center transition-all" :class="slot.isBooked
          ? 'bg-red-50 border-red-200 text-red-700'
          : 'bg-gray-50 border-gray-200 hover:border-primary/30 hover:bg-white'">
          <p class="font-medium">{{ slot.startTime }} - {{ slot.endTime }}</p>
          <p class="text-xs mt-1" :class="slot.isBooked ? 'text-red-600' : 'text-green-600'">
            {{ slot.isBooked ? 'Booked' : 'Available' }}
          </p>
        </div>
        <button v-if="!slot.isBooked" @click="removeSlot(slot)"
          class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          title="Remove slot">
          <XIcon class="w-3 h-3 text-white" />
        </button>
      </div>
    </div>

    <!-- Modal for Adding Slots -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal"
          class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click.self="closeModal">
          <div
            class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-800">
                Set Availability for {{ formatDate(modalDate) }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <XIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Date Selection -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" v-model="modalDate" :min="today"
                class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <!-- Slot Generator -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Generate Slots</label>
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="text-xs text-gray-500">Start Time</label>
                  <input type="time" v-model="startTime"
                    class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm" />
                </div>
                <div>
                  <label class="text-xs text-gray-500">End Time</label>
                  <input type="time" v-model="endTime"
                    class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm" />
                </div>
              </div>
              <div class="flex items-center gap-2 mb-3">
                <label class="text-xs text-gray-500">Duration (minutes)</label>
                <select v-model="slotDuration"
                  class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm">
                  <option :value="15">15 min</option>
                  <option :value="30">30 min</option>
                  <option :value="45">45 min</option>
                  <option :value="60">60 min</option>
                </select>
              </div>
              <button @click="generateSlots"
                class="w-full py-2 text-sm rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                Generate Slots
              </button>
            </div>

            <!-- Generated Slots Preview -->
            <div v-if="generatedSlots.length > 0" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Slots to add ({{ generatedSlots.length }})
              </label>
              <div class="max-h-48 overflow-y-auto space-y-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <div v-for="(slot, idx) in generatedSlots" :key="idx"
                  class="flex items-center justify-between text-sm text-gray-700 py-1 px-2 hover:bg-gray-100 rounded">
                  <span>{{ slot.startTime }} - {{ slot.endTime }}</span>
                  <button @click="removeGeneratedSlot(idx)" class="text-red-500 hover:text-red-700">
                    <XIcon class="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end gap-3">
              <button @click="closeModal"
                class="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button @click="saveAvailability" :disabled="generatedSlots.length === 0 || saving"
                class="px-6 py-2 rounded-xl bg-primary text-black bg-gray-100 cursor-pointer font-medium disabled:opacity-50 transition-colors">
                {{ saving ? 'Saving...' : 'Save Availability' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Calendar as CalendarIcon, Plus as PlusIcon, X as XIcon, RefreshCw as RefreshCwIcon } from 'lucide-vue-next'
import api from '../../../services/api'

// ==================== PROPS ====================
const props = defineProps<{
  doctorId: string
}>()

// ==================== REACTIVE STATE ====================
const today = new Date().toISOString().split('T')[0]
const selectedDate = ref(today)
const loading = ref(false)

// Slot interface
interface Slot {
  startTime: string
  endTime: string
  isBooked?: boolean
}

const slots = ref<Slot[]>([])

// Modal state
const showModal = ref(false)
const modalDate = ref(today)
const startTime = ref('09:00')
const endTime = ref('17:00')
const slotDuration = ref(30)
const generatedSlots = ref<Slot[]>([])
const saving = ref(false)

// ==================== API FUNCTIONS ====================

/**
 * Fetch availability slots for the selected date
 */
// token
const token = localStorage.getItem("token");

async function fetchAvailability() {
  // Guard: ensure doctorId is provided
  console.log(props.doctorId)
  if (!props.doctorId) {
    console.warn('AvailabilityManager: No doctorId provided')
    slots.value = []
    return
  }

  loading.value = true
  try {
    const response = await api.get(`/api/avail/doctors/${props.doctorId}/slots`, {
      params: { date: selectedDate.value }
    })
    slots.value = response.data?.slots || []

  } catch (error: any) {
    console.error('Failed to fetch availability:', error.response?.status, error.response?.data || error.message)
    slots.value = []
    // Optionally show a user-friendly message
    if (error.response?.status === 404) {
      // No availability set yet – that's fine, slots will be empty
    }
  } finally {
    loading.value = false
  }
}

/**
 * Format a date string for display
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// ==================== MODAL FUNCTIONS ====================

function openAddSlotModal() {
  modalDate.value = selectedDate.value
  generatedSlots.value = []
  startTime.value = '09:00'
  endTime.value = '17:00'
  slotDuration.value = 30
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  generatedSlots.value = []
}

/**
 * Generate time slots based on start, end, and duration
 */
function generateSlots() {
  const newSlots: Slot[] = []
  const start = new Date(`2000-01-01T${startTime.value}`)
  const end = new Date(`2000-01-01T${endTime.value}`)
  const duration = slotDuration.value * 60 * 1000 // milliseconds

  let current = new Date(start)
  while (current < end) {
    const next = new Date(current.getTime() + duration)
    if (next <= end) {
      newSlots.push({
        startTime: current.toTimeString().slice(0, 5),
        endTime: next.toTimeString().slice(0, 5)
      })
    }
    current = next
  }
  generatedSlots.value = newSlots
}

function removeGeneratedSlot(index: number) {
  generatedSlots.value.splice(index, 1)
}

/**
 * Save the generated slots to the backend
 */
async function saveAvailability() {
  if (generatedSlots.value.length === 0) return

  saving.value = true
  try {
    await api.post('http://localhost:3000/api/avail/doctors/availability', {
      date: modalDate.value,
      slots: generatedSlots.value
    }
    ,{ headers: {
      Authorization: `Bearer ${token}` // 🔥 MUST
    }
    
    
  })
    closeModal()
    // Refresh the display if the saved date matches the currently selected date
    if (selectedDate.value === modalDate.value) {
      await fetchAvailability()
    }
  } catch (error: any) {
    console.error('Failed to save availability:', error)
    alert('Failed to save availability: ' + (error.response?.data?.message || error.message))
  } finally {
    saving.value = false
  }
}

// ==================== SLOT REMOVAL ====================

/**
 * Remove a single unbooked slot from the current day
 */
async function removeSlot(slot: Slot) {
  // Filter out the slot to remove
  const updatedSlots = slots.value.filter(s => !(s.startTime === slot.startTime && !s.isBooked))

  try {
    await api.post('/api/doctors/availability', {
      date: selectedDate.value,

      slots: updatedSlots.filter(s => !s.isBooked) // Send only unbooked slots
    })
    await fetchAvailability()
  } catch (error: any) {
    console.error('Failed to remove slot:', error)
    alert('Failed to remove slot: ' + (error.response?.data?.message || error.message))
  }
}

// ==================== LIFECYCLE ====================

onMounted(() => {
  fetchAvailability()
})

// Watch for doctorId changes (if the prop updates after mount)
watch(() => props.doctorId, (newId) => {
  if (newId) {
    fetchAvailability()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>