<template>

  <div class="flex flex-col items-center gap-4">
    <div class="bg-amber-500/30 w-48 h-48 flex justify-center items-center" :class="`p-3 rounded-full `">
      <UIcon name="i-lucide-graduation-cap" size="128" />
    </div>
    <span class="text-2xl font-bold text-gray-800 dark:text-gray-200">
      Ready to start your quiz?
    </span>
    <div class="flex items-center gap-1">
      <span class="text-gray-600 dark:text-gray-400">
        You have
      </span>
      <span class="font-bold text-amber-500 dark:text-gray-200">
        {{ cardsAmount }} cards
      </span>
      <span class="text-gray-600 dark:text-gray-400">
        to review.
      </span>
    </div>
   <UButton @click="$emit('start')" color="primary" size="xl" icon="i-lucide-play-circle" :disabled="cardsAmount === 0"
      :class="[
        'cursor-pointer transition-shadow',
        cardsAmount > 0
          ? 'shadow-[0px_6px_35px_7px_rgba(234,_179,_8,_0.4)]'
          : 'opacity-50 cursor-not-allowed',
      ]"
    >
      <span class="font-semibold">Start Quiz</span>
    </UButton>
    <span class="text-sm text-gray-500 dark:text-gray-400">
      Current selected date: {{ currentSelectedDate.toDateString() }}
    </span>
  </div>

</template>
<script setup lang="ts">
const props = defineProps<{
  cardsAmount: number;
  currentSelectedDate: Date;
}>();
const emit = defineEmits<{
  (e: 'start'): void;
}>();
</script>