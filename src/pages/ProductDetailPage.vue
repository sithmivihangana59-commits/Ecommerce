<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";
import type { Product } from "../types/product";
import { getProductById } from "../api/dummyjson";
import { useCartStore } from "../stores/cart";

const route = useRoute();
const router = useRouter();
const cart = useCartStore();

const loading = ref(false);
const error = ref("");
const product = ref<Product | null>(null);
const selectedImage = ref("");

const id = computed(() => Number(route.params.id));

async function load() {
  loading.value = true;
  error.value = "";
  try {
    const data = await getProductById(id.value);
    product.value = data;
    selectedImage.value = data.images?.[0] ?? data.thumbnail;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Something went wrong";
  } finally {
    loading.value = false;
  }
}

function back() {
  router.push("/");
}

function addToCart() {
  if (!product.value) return;
  cart.addToCart(product.value);
  router.push("/cart");
}

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

onMounted(load);
</script>

<template>
  <NavBar />

  <main class="mx-auto max-w-6xl px-4 py-6">
    <button class="mb-4 rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50" @click="back">
      ← Back
    </button>

    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="h-8 w-2/3 animate-pulse rounded bg-slate-100"></div>
      <div class="mt-4 h-72 animate-pulse rounded bg-slate-100"></div>
    </div>

    <div v-else-if="product" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
            <img class="h-full w-full object-cover" :src="selectedImage" :alt="product.title" />
          </div>

          <div class="mt-3 flex gap-2 overflow-x-auto">
            <button
              v-for="img in product.images"
              :key="img"
              class="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border"
              :class="img === selectedImage ? 'border-slate-900' : 'border-slate-200'"
              @click="selectedImage = img"
            >
              <img class="h-full w-full object-cover" :src="img" :alt="product.title" />
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h1 class="text-2xl font-extrabold text-slate-900">{{ product.title }}</h1>
          <div class="text-sm text-slate-600">{{ product.description }}</div>

          <div class="mt-2 flex items-end justify-between gap-4">
            <div>
              <div class="text-3xl font-extrabold text-slate-900">{{ money(product.price) }}</div>
              <div class="text-sm text-slate-600">⭐ {{ product.rating }} • Stock: {{ product.stock }}</div>
            </div>

            <button
              class="rounded-md bg-amber-400 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-amber-300"
              @click="addToCart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>