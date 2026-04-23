<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" class="w-full border rounded px-3 py-2" required />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" class="w-full border rounded px-3 py-2" required />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mb-3">
          {{ errorMessage }}
        </p>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = () => {
  if (email.value === "test@example.com" && password.value === "123456") {
    localStorage.setItem("isAuthenticated", "true");
    router.push("/cart");
  } else {
    errorMessage.value = "Invalid email or password";
  }
};
</script>
