<script setup>
import { useRouter } from "vue-router"
import { useCartStore } from "../stores/cart"
import { useDarkMode } from "../composables/useDarkMode"

const router = useRouter()
const cart = useCartStore()
const { isDark } = useDarkMode()

function goCart() {
  router.push("/cart")
}
function goLogin() {
  router.push("/login")
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-slate-900 text-white dark:bg-gray-900">
    <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
      <!-- Store title එක එකම වරක් -->
      <div class="hidden sm:block text-sm text-white/70">
        Online Store • DummyJSON
      </div>

      <!-- Right side buttons -->
      <div class="ml-auto flex gap-2 items-center">
        <!-- Cart Button -->
        <button
          class="relative rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          @click="goCart"
        >
          🛒 Cart
          <span
            v-if="cart.itemCount > 0"
            class="ml-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900"
          >
            {{ cart.itemCount }}
          </span>
        </button>

        <!-- Login Button -->
        <button
          class="rounded-md bg-blue-500 px-3 py-2 text-sm hover:bg-blue-600"
          @click="goLogin"
        >
          Login
        </button>

        <!-- Dark mode toggle (single button only) -->
        <button
          @click="isDark = !isDark"
          class="rounded-md bg-gray-700 px-3 py-2 text-sm hover:bg-gray-600"
        >
          {{ isDark ? '🌙 Dark' : '☀️ Light' }}
        </button>
      </div>
    </div>
  </header>
</template>
