<template>
  <div>
    <label class="block text-sm font-medium text-gray-600 mb-1">{{ label }}</label>
    <input v-if="editing" :type="type" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <p v-else class="text-sm text-gray-800">{{ modelValue || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; modelValue: string; editing: boolean; type?: string }>()
defineEmits(['update:modelValue'])
</script>
