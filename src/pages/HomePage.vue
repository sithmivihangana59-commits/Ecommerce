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

// Banner carousel state
const currentBannerIndex = ref<number>(0)
const banners = ref([
  {
    id: 1,
    title: "🌸 Mother's Day Specials 🌸",
    description: "Discover deals on fashion, electronics, and gifts for loved ones.",
    image: "/assets/banner1.jpg"
  },
  {
    id: 2,
    title: "🎁 Father's Day Deals 🎁",
    description: "Save on gifts for Dad - Electronics, Fashion, Home & More!",
    image: "/assets/banner2.jpg"
  },
  {
    id: 3,
    title: "⚡ Summer Sale ⚡",
    description: "Get up to 50% off on selected items. Don't miss out!",
    image: "/assets/banner3.jpg"
  },
  {
    id: 4,
    title: "🛍️ New Arrivals 🛍️",
    description: "Check out the latest products added to our store.",
    image: "/assets/banner4.jpg"
  }
])

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

function goToBanner(index: number) {
  currentBannerIndex.value = index
}

onMounted(async () => {
  await loadCategories()
  await loadDefaultProducts()

  // Banner carousel interval - auto slide every 3 seconds
  setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length
  }, 3000)
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <!-- Banner Carousel -->
    <section class="relative mb-10 overflow-hidden rounded-2xl shadow-xl">
      <div class="relative h-64 md:h-80">
        <transition name="fade" mode="out-in">
          <div
            :key="currentBannerIndex"
            class="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700"
            :style="{
              backgroundImage: `url(${banners[currentBannerIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }"
          >
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>

            <div class="relative z-10 p-6">
              <h2 class="text-3xl md:text-5xl font-extrabold mb-3 text-white drop-shadow-lg">
                {{ banners[currentBannerIndex].title }}
              </h2>
              <p class="mb-6 text-base md:text-lg text-gray-100 max-w-xl mx-auto">
                {{ banners[currentBannerIndex].description }}
              </p>
              <button class="px-8 py-3 bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                Shop Now
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Banner Navigation Dots -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        <button
          v-for="(banner, index) in banners"
          :key="banner.id"
          @click="goToBanner(index)"
          :class="`w-3 h-3 rounded-full transition-all ${
            index === currentBannerIndex
              ? 'bg-pink-500 w-8'
              : 'bg-gray-300 hover:bg-gray-400'
          }`"
        ></button>
      </div>
    </section>

    <!-- Headline -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white">Welcome to E-Market</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Your one-stop online store.</p>
      </div>
      <button @click="goLogin" class="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 shadow-md transition">
        Login
      </button>
    </div>

    <!-- Search + Category -->
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar v-model="searchText" @submit="onSearchSubmit" @clear="onSearchClear" />
        <CategoryFilter :categories="categories" :selected="selectedCategory" @update:selected="onCategoryChange" />
      </div>
      <p class="mt-3 text-sm text-slate-500 dark:text-gray-400 italic">
        Tip: Search by keyword (phone/laptop/perfume) or filter by category.
      </p>
    </div>

    <!-- Error -->
    <div v-if="error" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
      {{ error }}
    </div>

    <!-- Products -->
    <div class="mt-10">
      <ProductGrid :products="products" :loading="loading" />
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
