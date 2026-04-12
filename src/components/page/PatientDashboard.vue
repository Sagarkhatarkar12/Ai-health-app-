<template>
  <main class="flex-1 p-6 space-y-6">
    <h1 class="text-3xl font-bold text-primary">Patient Dashboard</h1>

    <!-- Medicine lookup -->
    <div class="max-w-md">
      <input
        type="text"
        placeholder="Enter medicine name..."
        v-model="medicine"
        class="w-full p-2 border rounded"
      />
      <MedicineInfo :name="medicine" />
  
      <!-- console.log(medicine.value); -->
    </div>

    <!-- Video call placeholder -->
    <VideoCall />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MedicineInfo from './MedicineInfo.vue'
import VideoCall from './videoCall.vue'

const medicine = ref('')
</script>