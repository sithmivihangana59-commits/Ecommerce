<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import { useCartStore } from "../stores/cart";

const cart = useCartStore();

function money(n: number) {
  return `$${n.toFixed(2)}`;
}
</script>

<template>
  <NavBar />

  <main class="mx-auto max-w-6xl px-4 py-6">
    <h1 class="text-2xl font-extrabold text-slate-900">Your Cart</h1>

    <div v-if="cart.items.length === 0" class="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <p class="text-slate-700">Cart is empty 🛒</p>
      <router-link
        to="/"
        class="mt-3 inline-block rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-amber-300"
      >
        Go Shopping
      </router-link>
    </div>

    <div v-else class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Items -->
      <div class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4">
        <div class="space-y-4">
          <div v-for="it in cart.items" :key="it.product.id" class="flex gap-4 rounded-xl border border-slate-200 p-3">
            <img :src="it.product.thumbnail" :alt="it.product.title" class="h-20 w-24 rounded-lg object-cover bg-slate-50" />

            <div class="flex-1">
              <div class="font-semibold text-slate-900">{{ it.product.title }}</div>
              <div class="mt-1 text-sm text-slate-600">Price: {{ money(it.product.price) }}</div>

              <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <button class="h-9 w-9 rounded-md border border-slate-200 text-lg hover:bg-slate-50" @click="cart.decrease(it.product.id)">-</button>
                  <div class="w-10 text-center font-bold">{{ it.quantity }}</div>
                  <button class="h-9 w-9 rounded-md border border-slate-200 text-lg hover:bg-slate-50" @click="cart.increase(it.product.id)">+</button>
                </div>

                <button
                  class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                  @click="cart.removeFromCart(it.product.id)"
                >
                  Remove
                </button>
              </div>

              <div class="mt-2 text-sm text-slate-700">
                Item total: <span class="font-bold">{{ money(it.product.price * it.quantity) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 class="text-lg font-extrabold text-slate-900">Bill Summary</h2>

        <div class="mt-4 space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-600">Items</span>
            <span class="font-semibold">{{ cart.itemCount }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-slate-600">Subtotal</span>
            <span class="font-extrabold">{{ money(cart.subtotal) }}</span>
          </div>

          <div class="border-t border-slate-200 pt-3 flex justify-between text-base">
            <span class="font-bold">Total</span>
            <span class="font-extrabold">{{ money(cart.subtotal) }}</span>
          </div>
        </div>

        <button class="mt-4 w-full rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-amber-300" @click="alert('Demo checkout ✅')">
          Checkout (Demo)
        </button>

        <button class="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50" @click="cart.clearCart()">
          Clear Cart
        </button>
      </div>
    </div>
  </main>
</template>