<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <!-- Root div එකට light + dark classes -->
  <div class="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
    <!-- Navbar එක එකම වරක් render වෙයි -->
    <NavBar />

    <!-- Page content -->
    <router-view />
  </div>
</template>
