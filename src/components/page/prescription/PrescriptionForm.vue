<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 overflow-hidden transition-all">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 bg-white/40">
          <div>
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList class="w-5 h-5 text-primary" />
              {{ editData ? 'Edit Prescription' : 'New Prescription' }}
            </h2>
            <p v-if="appointment && !editData" class="text-sm text-gray-500 mt-0.5">
              For {{ appointment.patientId?.firstName || appointment.patientName || 'Patient' }}
            </p>
          </div>
          <button @click="close" class="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
            <X class="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          <!-- Diagnosis -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</label>
            <textarea
              v-model="diagnosis"
              rows="3"
              placeholder="Enter diagnosis (e.g., Viral fever, Hypertension)"
              class="w-full rounded-xl border border-gray-200 bg-white/60 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            ></textarea>
          </div>

          <!-- Medicines List -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-semibold text-gray-700">Medicines</label>
              <button
                @click="addMedicine"
                class="text-sm text-primary font-medium hover:underline flex items-center gap-1"
              >
                <PlusCircle class="w-4 h-4" /> Add Medicine
              </button>
            </div>

            <div v-for="(med, index) in medicines" :key="index" class="mb-3">
              <div class="grid grid-cols-12 gap-2 items-start">
                <div class="col-span-4">
                  <input v-model="med.name" placeholder="Medicine Name" class="w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none" />
                </div>
                <div class="col-span-2">
                  <input v-model="med.dosage" placeholder="500mg" class="w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 text-sm" />
                </div>
                <div class="col-span-2">
                  <input v-model="med.frequency" placeholder="1-0-1" class="w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 text-sm" />
                </div>
                <div class="col-span-2">
                  <input v-model="med.duration" placeholder="5 days" class="w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 text-sm" />
                </div>
                <div class="col-span-1 flex justify-center">
                  <button
                    @click="removeMedicine(index)"
                    v-if="medicines.length > 1"
                    class="text-red-500 hover:text-red-700 transition p-1"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="mt-2">
                <input v-model="med.instructions" placeholder="Special instructions (e.g., After meals)" class="w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          <!-- Overall Instructions (optional) -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Overall Instructions (optional)</label>
            <textarea
              v-model="instructions"
              rows="2"
              placeholder="Any special advice or precautions"
              class="w-full rounded-xl border border-gray-200 bg-white/60 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            ></textarea>
          </div>

        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-200/50 bg-white/40">
          <button @click="close" class="px-5 py-2.5 rounded-xl border border-gray-300 bg-white/60 text-gray-700 font-medium hover:bg-white transition">
            Cancel
          </button>
          <button @click="save('draft')" class="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
            Save Draft
          </button>
          <button @click="save('sent')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-500 text-white font-medium shadow-md hover:shadow-lg transition-all">
            Send to Patient
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ClipboardList, X, PlusCircle, Trash2 } from 'lucide-vue-next'
import { prescriptionService } from '../../../services/prescriptionService'

const props = defineProps<{
  visible: boolean
  appointment?: any
  editData?: any
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'saved', prescription: any): void
}>()

const diagnosis = ref('')
const medicines = ref([{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }])
const instructions = ref('')   // global instructions

// Reset form when visible or editData changes
watch([() => props.visible, () => props.editData], ([newVisible, newEdit]) => {
  if (newVisible) {
    if (newEdit) {
      diagnosis.value = newEdit.diagnosis || ''
      medicines.value = newEdit.medicines?.length
        ? newEdit.medicines.map((m: any) => ({ ...m }))
        : [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
      instructions.value = newEdit.instructions || ''
    } else {
      diagnosis.value = ''
      medicines.value = [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
      instructions.value = ''
    }
  }
})

function addMedicine() {
  medicines.value.push({ name: '', dosage: '', frequency: '', duration: '', instructions: '' })
}

function removeMedicine(index: number) {
  medicines.value.splice(index, 1)
}

async function save(status: 'draft' | 'sent') {
  try {
    // Determine patientId
    let patientId = null
    if (props.appointment?.patientId?._id) {
      patientId = props.appointment.patientId._id
    } else if (props.editData?.patientId) {
      // editData.patientId is populated object, get its _id
      patientId = props.editData.patientId._id || props.editData.patientId
    }

    if (!patientId) {
      alert('Patient information is missing. Please select an appointment first.')
      return
    }

    // Prepare payload
    const payload = {
      patientId,
      diagnosis: diagnosis.value,
      medicines: medicines.value.filter(m => m.name.trim() !== ''),
      appointmentId: props.appointment?._id || props.editData?.appointmentId || undefined,
      status,
      instructions: instructions.value
    }

    let result
    if (props.editData?._id) {
      // Update existing prescription
      result = await prescriptionService.update(props.editData._id, payload)
    } else {
      // Create new prescription
      result = await prescriptionService.create(payload)
    }

    emit('saved', result.data)
    close()
  } catch (error: any) {
    console.error('Prescription save error:', error)
    alert(error.response?.data?.message || 'Error saving prescription')
  }
}

function close() {
  emit('close')
}
</script>