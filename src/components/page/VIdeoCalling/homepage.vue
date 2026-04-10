"<template>
  <div class="home">
    <h1 class="text-3xl font-bold mb-4">Welcome to Video Call App</h1>
    <p class="text-lg text-gray-600 mb-6">
      This is a Vue.js video call application built with Vite.
    </p>
    <router-link to="/call" class="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      Start a Call
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  text-align: center;
  padding: 4rem;
}
</style>
"