<script setup lang="ts">
import NavBar from "./components/NavBar.vue"
import { ref, onMounted } from "vue"

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem("theme", isDark.value ? "dark" : "light")
}

onMounted(() => {
  isDark.value = localStorage.getItem("theme") === "dark"
})
</script>

<template>
  <div :class="{ dark: isDark }" class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">
    <!-- Navbar -->
    <NavBar />

    <!-- Header -->
    <header class="p-4 flex justify-between items-center shadow-md bg-gray-100 dark:bg-gray-800">
      <h1 class="text-2xl font-bold">Online Store • DummyJSON</h1>
      <div class="flex gap-4">
        <button class="px-3 py-1 rounded border dark:border-gray-600">Cart</button>
        <button class="px-3 py-1 rounded border dark:border-gray-600">Login</button>
        <button @click="toggleDark" class="px-3 py-1 rounded border dark:border-gray-600">
          {{ isDark ? "Light Mode" : "Dark Mode" }}
        </button>
      </div>
    </header>

    <!-- Router outlet -->
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
