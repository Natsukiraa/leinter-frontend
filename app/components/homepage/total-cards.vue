<template>
  <div
    class="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 flex flex-col items-center justify-center"
  >
    <div class="bg-amber-500/30 w-12 h-12 flex items-center" :class="`p-3 rounded-full `">
      <UIcon name="i-lucide-archive" class="w-8 h-8 text-black-600" />
    </div>

    <div class="text-3xl font-bold text-gray-800 dark:text-gray-200">
      {{ amount }}
    </div>
    <div class="text-gray-600 dark:text-gray-400">Total Cards</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  amount: number;
}>();
</script>