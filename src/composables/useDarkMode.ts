import { ref, watch } from "vue";

const isDark = ref<boolean>(false);

export function useDarkMode() {
  // initialize from localStorage
  isDark.value = localStorage.getItem("theme") === "dark";

  watch(isDark, (val) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return { isDark };
}
