<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";

const router = useRouter();
const cart = useCartStore();

function goHome() {
  router.push("/");
}
function goCart() {
  router.push("/cart");
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-slate-900 text-white">
    <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
      <button class="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/10" @click="goHome">
        <span class="text-lg font-extrabold tracking-tight">E-Market</span>
        <span class="rounded bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">mini</span>
      </button>

      <div class="hidden sm:block text-sm text-white/70">Online Store • DummyJSON</div>

      <div class="ml-auto">
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
      </div>
    </div>
  </header>
</template>