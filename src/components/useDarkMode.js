import { ref, watch } from 'vue'

const isDark = ref(false)

watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

export function useDarkMode() {
  return { isDark }
}
