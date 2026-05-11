<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      @click.self="close"
    >
      <div
        class="w-full max-w-3xl bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 overflow-hidden transition-all"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 bg-white/40"
        >
          <div>
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList class="w-5 h-5 text-primary" />
              Prescription Details
            </h2>
            <p class="text-sm text-gray-500 mt-0.5">
              For {{ prescription.patientName || 'Patient' }}
            </p>
          </div>
          <button
            @click="close"
            class="p-2 rounded-full hover:bg-gray-200/50 transition-colors"
          >
            <X class="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <span class="text-sm font-semibold text-gray-600">Date:</span>
            <span class="ml-2 text-gray-800">{{ prescription.date }}</span>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Status:</span>
            <span
              class="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
              :class="prescription.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
            >
              {{ prescription.status === 'sent' ? 'Sent' : 'Draft' }}
            </span>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-600">Diagnosis:</span>
            <p class="mt-1 text-gray-800 bg-white/50 rounded-lg p-3 border border-gray-100">
              {{ prescription.diagnosis || 'N/A' }}
            </p>
          </div>

          <!-- Medicines Table -->
          <div>
            <h3 class="text-sm font-semibold text-gray-600 mb-2">Medicines</h3>
            <div class="overflow-x-auto rounded-lg border border-gray-200">
              <table class="min-w-full divide-y divide-gray-200 text-sm">
                <thead class="bg-gray-50/50">
                  <tr>
                    <th class="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-600">Dosage</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-600">Frequency</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-600">Duration</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-600">Instructions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(med, idx) in prescription.medicines" :key="idx">
                    <td class="px-4 py-2 text-gray-800">{{ med.name }}</td>
                    <td class="px-4 py-2 text-gray-800">{{ med.dosage }}</td>
                    <td class="px-4 py-2 text-gray-800">{{ med.frequency }}</td>
                    <td class="px-4 py-2 text-gray-800">{{ med.duration }}</td>
                    <td class="px-4 py-2 text-gray-800">{{ med.instructions || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Additional Notes (if any) -->
          <div v-if="prescription.instructions">
            <span class="text-sm font-semibold text-gray-600">Special Instructions:</span>
            <p class="mt-1 text-gray-800 bg-white/50 rounded-lg p-3 border border-gray-100">
              {{ prescription.instructions }}
            </p>
          </div>
        </div>

        <!-- Footer with actions -->
        <div
          class="flex justify-end gap-3 px-6 py-4 border-t border-gray-200/50 bg-white/40"
        >
          <button
            @click="downloadPDF"
            class="px-5 py-2.5 rounded-xl border border-gray-300 bg-white/60 text-gray-700 font-medium hover:bg-white transition flex items-center gap-2"
          >
            <Download class="w-4 h-4" /> Download PDF
          </button>
          <button
            @click="$emit('edit', prescription)"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-500 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Pencil class="w-4 h-4" /> Edit
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ClipboardList, X, Download, Pencil } from 'lucide-vue-next'

const props = defineProps<{
  visible: boolean
  prescription: any
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'edit', prescription: any): void
}>()

function close() {
  emit('close')
}

function downloadPDF() {
  // Printable window approach – will open a clean print dialog (user can save as PDF)
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow pop-ups for this feature.')
    return
  }

  const rx = props.prescription
  const medRows = rx.medicines
    .map(
      (m: any) => `
      <tr>
        <td>${m.name}</td>
        <td>${m.dosage}</td>
        <td>${m.frequency}</td>
        <td>${m.duration}</td>
        <td>${m.instructions || '-'}</td>
      </tr>`
    )
    .join('')

  const html = `
    <html>
      <head>
        <title>Prescription - ${rx.patientName}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; }
          h1 { color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
          th { background: #f1f5f9; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          .sent { background: #dcfce7; color: #166534; }
          .draft { background: #fef9c3; color: #854d0e; }
        </style>
      </head>
      <body>
        <h1>E-Prescription</h1>
        <p><strong>Patient:</strong> ${rx.patientName}</p>
        <p><strong>Date:</strong> ${rx.date}</p>
        <p><strong>Status:</strong> <span class="badge ${rx.status}">${rx.status === 'sent' ? 'Sent' : 'Draft'}</span></p>
        <p><strong>Diagnosis:</strong> ${rx.diagnosis}</p>
        <h2>Medicines</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Dosage</th><th>Frequency</th><th>Duration</th><th>Instructions</th></tr>
          </thead>
          <tbody>${medRows}</tbody>
        </table>
        ${rx.instructions ? `<p><strong>Instructions:</strong> ${rx.instructions}</p>` : ''}
        <p style="margin-top: 40px; text-align: right; color: #64748b;">
          Generated by AI Health Care
        </p>
        <script>window.onload = () => window.print();</scr` + `ipt>
      </body>
    </html>
  `

  printWindow.document.write(html)
  printWindow.document.close()
}
</script>