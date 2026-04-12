<script setup>
import PatientSignup from "./components/page/PationSignup.vue"
import socket from "./components/page/socket.vue";
import Home from "./components/page/Home.vue";
import NavBar from "./components/page/NavBar.vue";
</script>

<template>
  <!-- <PatientSignup /> -->
   <!-- <socket /> -->
    <NavBar/>
    
     <router-view />>
</template>