<script setup lang="ts">
import { onMounted, ref } from "vue"
import SearchBar from "../components/SearchBar.vue"
import CategoryFilter from "../components/CategoryFilter.vue"
import ProductGrid from "../components/ProductGrid.vue"
import type { Product } from "../types/product"
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts
} from "../api/dummyjson"
import { useRouter } from "vue-router"

const router = useRouter()

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const loading = ref<boolean>(false)
const error = ref<string>("")

const searchText = ref<string>("")
const selectedCategory = ref<string>("")

async function loadCategories() {
  try {
    categories.value = await getCategories()
  } catch {}
}

async function loadDefaultProducts() {
  loading.value = true
  error.value = ""
  try {
    const data = await getProducts(24, 0)
    products.value = data.products
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Something went wrong"
  } finally {
    loading.value = false
  }
}

async function applyFilters() {
  loading.value = true
  error.value = ""
  try {
    if (searchText.value.trim()) {
      const data = await searchProducts(searchText.value, 24, 0)
      products.value = data.products
      return
    }
    if (selectedCategory.value) {
      const data = await getProductsByCategory(selectedCategory.value, 24, 0)
      products.value = data.products
      return
    }
    const data = await getProducts(24, 0)
    products.value = data.products
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Something went wrong"
  } finally {
    loading.value = false
  }
}

function onSearchSubmit() {
  selectedCategory.value = ""
  applyFilters()
}
function onSearchClear() {
  searchText.value = ""
  selectedCategory.value = ""
  applyFilters()
}
function onCategoryChange(value: string) {
  selectedCategory.value = value
  searchText.value = ""
  applyFilters()
}
function goLogin() {
  router.push("/login")
}

onMounted(async () => {
  await loadCategories()
  await loadDefaultProducts()
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <!-- Banner -->
    <section class="relative bg-gradient-to-r from-pink-200 via-yellow-100 to-blue-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 p-8 text-center mb-8">
      <h2 class="text-3xl font-bold mb-2">🌸 Mother’s Day Specials 🌸</h2>
      <p class="mb-4 text-lg">Discover deals on fashion, electronics, and gifts for loved ones.</p>
      <button class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Shop Now</button>
    </section>

    <!-- Headline -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white">Welcome to E-Market</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Your one-stop online store.</p>
      </div>
      <button @click="goLogin" class="rounded-lg bg-blue-500 px-5 py-2 text-white hover:bg-blue-600">Login</button>
    </div>

    <!-- Search + Category -->
    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchBar v-model="searchText" @submit="onSearchSubmit" @clear="onSearchClear" />
        <CategoryFilter :categories="categories" :selected="selectedCategory" @update:selected="onCategoryChange" />
      </div>
      <p class="mt-3 text-xs text-slate-500 dark:text-gray-400">
        Tip: Search by keyword (phone/laptop/perfume) or filter by category.
      </p>
    </div>

    <!-- Error -->
    <div v-if="error" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
      {{ error }}
    </div>

    <!-- Products -->
    <div class="mt-8">
      <ProductGrid :products="products" :loading="loading" />
    </div>
  </main>
</template>
