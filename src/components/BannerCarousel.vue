<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// banners data
const banners = ref([
  {
    title: "Fashion Store",
    subtitle: "Discover Your Style",
    text: "Explore the latest trends in fashion. Free shipping on orders over $50.",
    button: "Shop Now",
    action: () => router.push("/") // go home
  },
  {
    title: "Kitchen Essentials",
    subtitle: "Under $50",
    text: "Affordable kitchen items for your home.",
    button: "Explore",
    action: () => router.push("/categories/kitchen")
  },
  {
    title: "Gaming Deals",
    subtitle: "Get Your Game On",
    text: "Latest consoles and accessories.",
    button: "Shop Now",
    action: () => router.push("/categories/gaming")
  }
])

const currentIndex = ref(0)
let intervalId: number

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % banners.value.length
  }, 3000) // every 3 seconds
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <section class="relative w-full h-64 overflow-hidden">
    <div
      v-for="(banner, index) in banners"
      :key="index"
      class="absolute inset-0 transition-opacity duration-700"
      :class="{ 'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index }"
    >
      <div class="flex h-full items-center justify-between bg-pink-200 px-8">
        <!-- Left side -->
        <div>
          <h2 class="text-2xl font-bold">{{ banner.title }}</h2>
          <h3 class="text-xl">{{ banner.subtitle }}</h3>
          <p class="mt-2 text-gray-700">{{ banner.text }}</p>
          <button
            @click="banner.action"
            class="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {{ banner.button }}
          </button>
        </div>
        <!-- Right side placeholder image -->
        <div>
          <img src="/assets/banner-placeholder.png" alt="Banner image" class="h-48" />
        </div>
      </div>
    </div>
  </section>
</template>
