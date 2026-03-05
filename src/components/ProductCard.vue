<script setup lang="ts">
import type { Product } from "../types/product";
import { useRouter } from "vue-router";

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();

function open() {
  router.push(`/product/${props.product.id}`);
}
</script>

<template>
  <button
    class="group flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm hover:shadow-md"
    @click="open"
  >
    <div class="aspect-[4/3] w-full overflow-hidden bg-slate-50">
      <img
        class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
      />
    </div>

    <div class="flex flex-1 flex-col gap-2 p-4">
      <div class="line-clamp-2 text-sm font-semibold text-slate-900">
        {{ product.title }}
      </div>

      <div class="text-xs text-slate-600 line-clamp-2">
        {{ product.description }}
      </div>

      <div class="mt-auto flex items-end justify-between">
        <div>
          <div class="text-lg font-extrabold text-slate-900">${{ product.price }}</div>
          <div class="text-xs text-slate-500">⭐ {{ product.rating }} • Stock: {{ product.stock }}</div>
        </div>
        <div class="rounded-md bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
          View
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>