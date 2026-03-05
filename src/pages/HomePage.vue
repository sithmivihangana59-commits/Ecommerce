<script setup lang="ts">
import { onMounted, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";
import CategoryFilter from "../components/CategoryFilter.vue";
import ProductGrid from "../components/ProductGrid.vue";
import type { Product } from "../types/product";
import { getCategories, getProducts, getProductsByCategory, searchProducts } from "../api/dummyjson";

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const loading = ref<boolean>(false);
const error = ref<string>("");

const searchText = ref<string>("");
const selectedCategory = ref<string>("");

async function loadCategories() {
  try {
    categories.value = await getCategories();
  } catch {
    // categories are optional; ignore if fails
  }
}

async function loadDefaultProducts() {
  loading.value = true;
  error.value = "";
  try {
    const data = await getProducts(24, 0);
    products.value = data.products;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Something went wrong";
  } finally {
    loading.value = false;
  }
}

async function applyFilters() {
  loading.value = true;
  error.value = "";
  try {
    if (searchText.value.trim().length > 0) {
      const data = await searchProducts(searchText.value, 24, 0);
      products.value = data.products;
      return;
    }

    if (selectedCategory.value) {
      const data = await getProductsByCategory(selectedCategory.value, 24, 0);
      products.value = data.products;
      return;
    }

    const data = await getProducts(24, 0);
    products.value = data.products;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Something went wrong";
  } finally {
    loading.value = false;
  }
}

function onSearchSubmit() {
  selectedCategory.value = "";
  applyFilters();
}

function onSearchClear() {
  selectedCategory.value = "";
  applyFilters();
}

function onCategoryChange(v: string) {
  selectedCategory.value = v;
  searchText.value = "";
  applyFilters();
}

onMounted(async () => {
  await loadCategories();
  await loadDefaultProducts();
});
</script>

<template>
  <NavBar />

  <main class="mx-auto max-w-6xl px-4 py-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchBar v-model="searchText" @submit="onSearchSubmit" @clear="onSearchClear" />
        <CategoryFilter
          :categories="categories"
          :selected="selectedCategory"
          @update:selected="onCategoryChange"
        />
      </div>

      <div class="mt-3 text-xs text-slate-500">
        Tip: Search by keyword (phone/laptop/perfume) or filter by category.
      </div>
    </div>

    <div v-if="error" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </div>

    <div class="mt-6">
      <ProductGrid :products="products" :loading="loading" />
    </div>
  </main>
</template>