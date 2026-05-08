<script setup lang="ts">
import { useCartStore } from "../stores/cart";

const cart = useCartStore();

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

function handleCheckout() {
  window.alert("Demo checkout ✅");
}
</script>

<template>
  <!-- NavBar REMOVED -->
  <!-- Because App.vue already has Navbar -->

  <main class="mx-auto max-w-6xl px-4 py-8">

    <!-- Single Headline -->
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-slate-900 dark:text-white">
        Your Cart
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Review your selected products and continue checkout.
      </p>
    </div>

    <!-- Empty Cart -->
    <div
      v-if="cart.items.length === 0"
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="text-slate-700 dark:text-gray-200">
        Cart is empty 🛒
      </p>

      <router-link
        to="/"
        class="mt-4 inline-block rounded-lg bg-amber-400 px-5 py-2 font-semibold text-slate-900 hover:bg-amber-300"
      >
        Go Shopping
      </router-link>
    </div>

    <!-- Cart Items -->
    <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-3">

      <!-- Left Side -->
      <div
        class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="space-y-4">

          <div
            v-for="it in cart.items"
            :key="it.product.id"
            class="flex gap-4 rounded-xl border border-slate-200 p-4 dark:border-gray-700"
          >
            <img
              :src="it.product.thumbnail"
              :alt="it.product.title"
              class="h-24 w-28 rounded-lg object-cover bg-slate-50"
            />

            <div class="flex-1">
              <h2 class="font-semibold text-slate-900 dark:text-white">
                {{ it.product.title }}
              </h2>

              <p class="mt-1 text-sm text-gray-500">
                Price: {{ money(it.product.price) }}
              </p>

              <!-- Qty -->
              <div class="mt-4 flex flex-wrap items-center justify-between gap-3">

                <div class="flex items-center gap-2">
                  <button
                    class="h-9 w-9 rounded-md border hover:bg-gray-100"
                    @click="cart.decrease(it.product.id)"
                  >
                    -
                  </button>

                  <div class="w-10 text-center font-bold">
                    {{ it.quantity }}
                  </div>

                  <button
                    class="h-9 w-9 rounded-md border hover:bg-gray-100"
                    @click="cart.increase(it.product.id)"
                  >
                    +
                  </button>
                </div>

                <button
                  class="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                  @click="cart.removeFromCart(it.product.id)"
                >
                  Remove
                </button>
              </div>

              <p class="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                Item total: {{ money(it.product.price * it.quantity) }}
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- Summary -->
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          Bill Summary
        </h2>

        <div class="mt-5 space-y-3 text-sm">

          <div class="flex justify-between">
            <span>Items</span>
            <span class="font-semibold">{{ cart.itemCount }}</span>
          </div>

          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-bold">{{ money(cart.subtotal) }}</span>
          </div>

          <div class="border-t pt-3 flex justify-between text-base font-bold">
            <span>Total</span>
            <span>{{ money(cart.subtotal) }}</span>
          </div>

        </div>

        <button
          class="mt-5 w-full rounded-lg bg-amber-400 px-4 py-3 font-bold text-slate-900 hover:bg-amber-300"
          @click="handleCheckout"
        >
          Checkout
        </button>

        <button
          class="mt-3 w-full rounded-lg border px-4 py-3 font-semibold hover:bg-gray-50"
          @click="cart.clearCart()"
        >
          Clear Cart
        </button>
      </div>

    </div>
  </main>
</template>