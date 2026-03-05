<script setup lang="ts">
const props = defineProps<{
  categories: string[];
  selected: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:selected", v: string): void;
}>();

function onChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value;
  emit("update:selected", v);
}
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-sm font-medium text-slate-700">Category</label>
    <select
      class="w-56 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      :disabled="loading"
      :value="selected"
      @change="onChange"
    >
      <option value="">All</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>
</template>