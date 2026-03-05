<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "submit"): void;
  (e: "clear"): void;
}>();

const local = ref(props.modelValue);

watch(
  () => props.modelValue,
  (v) => {
    local.value = v;
  }
);

function submit() {
  emit("update:modelValue", local.value);
  emit("submit");
}

function clear() {
  local.value = "";
  emit("update:modelValue", "");
  emit("clear");
}
</script>

<template>
  <div class="flex w-full items-center gap-2">
    <input
      v-model="local"
      class="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
      placeholder="Search products (e.g., phone, laptop, perfume)..."
      @keyup.enter="submit"
    />
    <button class="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300" @click="submit">
      Search
    </button>
    <button class="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50" @click="clear">
      Clear
    </button>
  </div>
</template>