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
  <div
    :class="{ dark: isDark }"
    class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300"
  >
    <!-- Navbar -->
    <NavBar />

    <!-- Header -->
    <header
      class="p-4 flex justify-between items-center shadow-md bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"
    >
      <h1 class="text-2xl font-extrabold tracking-wide text-gray-800 dark:text-gray-100">
        🛍️ Online Store • DummyJSON
      </h1>
      <div class="flex gap-4">
        <button
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white transition"
        >
          Cart
        </button>
        <button
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-green-500 hover:text-white transition"
        >
          Login
        </button>
        <button
          @click="toggleDark"
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-purple-500 hover:text-white transition"
        >
          {{ isDark ? "☀️ Light Mode" : "🌙 Dark Mode" }}
        </button>
      </div>
    </header>

    <!-- Hero Banner -->
    <section
      class="relative text-center py-12 bg-gradient-to-r from-pink-200 via-yellow-100 to-blue-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"
    >
      <h2 class="text-4xl font-bold mb-3">✨ New Arrivals ✨</h2>
      <p class="mb-6 text-lg max-w-xl mx-auto">
        Check out the latest products added to our store. Shop fashion,
        electronics, and more with exclusive deals.
      </p>
      <button
        class="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Shop Now
      </button>
    </section>

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
  font-family: "Segoe UI", Arial, Helvetica, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
