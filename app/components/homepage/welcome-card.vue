<template>

<div class="shadow-sm w-full h-full rounded-lg bg-linear-to-l from-amber-500 via-amber-600 to-amber-700">
  <flex class="flex flex-col justify-center items-start h-full p-4 gap-4">
    <div class="text-white text-2xl font-bold">Ready to learn?</div>
    <div class="text-white text-center">{{ cardAmount }} Cards due today</div>
    <div class="bg-white " :class="`px-4 py-2 rounded-lg text-amber-700 font-bold hover:bg-amber-100 cursor-pointer flex items-center transition-all`">
      <UIcon name="i-lucide-play-circle" class="inline-block w-5 h-5 mr-2" />
      <NuxtLink :to="path">Start Reviewing</NuxtLink>
    </div>
  </flex>
</div>

</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
  cardAmount: number;
}>();
</script>