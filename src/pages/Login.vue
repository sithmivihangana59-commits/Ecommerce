<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900 transition-all duration-300"
  >
    <div
      class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800"
    >
      <h2
        class="mb-5 text-3xl font-bold text-gray-900 dark:text-white"
      >
        Login
      </h2>

      <form @submit.prevent="handleLogin">

        <!-- Email -->
        <div class="mb-4">
          <label
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>

          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>

          <input
            v-model="password"
            type="password"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- Error -->
        <p
          v-if="errorMessage"
          class="mb-3 text-sm text-red-500"
        >
          {{ errorMessage }}
        </p>

        <!-- Button -->
        <button
          type="submit"
          class="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600 transition"
        >
          Login
        </button>

        <!-- Demo -->
        <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Demo Login: test@example.com / 123456
        </p>

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

function handleLogin() {
  if (
    email.value === "test@example.com" &&
    password.value === "123456"
  ) {
    localStorage.setItem("isAuthenticated", "true");
    router.push("/cart");
  } else {
    errorMessage.value = "Invalid email or password";
  }
}
</script>