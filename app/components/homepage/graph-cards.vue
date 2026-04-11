<template>
  <div class="w-full bg-white dark:bg-slate-800 rounded-xl  shadow-md p-6">
    <div class="flex justify-between items-start mb-6">
      <h2 class="text-gray-900 dark:text-white font-bold text-lg">Learning Progress (Leitner Boxes)</h2>
      <div class="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
        <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 text-amber-500" />
        <span>Done: {{ doneCount }}</span>
      </div>
    </div>

    <div class="flex flex-col items-center w-full">

      <div class="w-full overflow-x-auto pb-4 hide-scrollbar">
        <div class="flex justify-between items-end h-48 min-w-[300px] gap-2 sm:gap-4 px-2">

          <div v-for="(box, index) in boxes" :key="index" class="flex flex-col items-center flex-1 group h-full">
            <div
              class="relative w-10 sm:w-12 flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg flex flex-col justify-end overflow-hidden">

              <span class="absolute top-2 left-0 right-0 text-center text-xs font-medium text-slate-400 dark:text-slate-300 z-10">
                {{ box.count }}
              </span>

              <div
                class="w-full bg-amber-500 rounded-b-lg transition-all duration-700 ease-out hover:bg-amber-600 relative"
                :style="{ height: `${calculateHeight(box.count)}%` }"></div>
            </div>

            <span class="mt-3 text-xs font-bold text-gray-500 group-hover:text-amber-600 transition-colors">
              {{ box.label }}
            </span>
          </div>

        </div>
      </div>

      <p class="text-xs sm:text-sm text-gray-400 mt-4 text-center">
        Cards move to higher categories as you answer correctly.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BoxData {
  label: string;
  count: number;
}

const props = defineProps<{
  boxes?: BoxData[];
  doneCount?: number;
}>();

const boxes = computed(() => props.boxes);
const maxScale = computed(() => {
  if (!props.boxes || props.boxes.length === 0) return 10;
  return Math.max(...props.boxes.map(b => b.count)) * 1.2;
});

const calculateHeight = (val: number) => {
  if (val === 0) return 4; 
  const percentage = (val / maxScale.value) * 100;
  return Math.max(percentage, 8);
};
</script>