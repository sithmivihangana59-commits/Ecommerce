<script setup lang="ts">
import type { Product } from "../types/product";
import ProductCard from "./ProductCard.vue";

defineProps<{
  products: Product[];
  loading: boolean;
}>();
</script>

<template>
  <div v-if="loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div v-for="i in 8" :key="i" class="h-64 animate-pulse rounded-xl border border-slate-200 bg-slate-50"></div>
  </div>

  <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </div>
</template>