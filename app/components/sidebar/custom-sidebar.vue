<template>
  <UDashboardSidebar>
    <template #header>
      <div class="flex items-center justify-between gap-2">
        <span
          class="bg-amber-500 text-white text-xl font-bold rounded-lg p-1 w-8 h-8 flex items-center justify-center">L</span>
        <div class="text-lg font-bold">Leitner system</div>
      </div>
    </template>
    <template #default>
      <UNavigationMenu 
        :items="items" 
        orientation="vertical" 
      />
    </template>
    <template #footer>
      <div class="flex flex-col gap-4 w-full pb-4 px-2">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">Theme</span>
          <UColorModeSwitch />
        </div>
        
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Simulate date</label>
          <UInput v-model="simulatedDate" type="date" size="sm" icon="i-lucide-calendar"/>
        </div>
      </div>
    </template>
  </UDashboardSidebar>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const simulatedDate = useSimulatedDate();

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Dashboard',
      icon: 'i-lucide-chart-pie',
      to: '/',
    },
    {
      label: 'Start quiz',
      icon: 'i-lucide-graduation-cap',
      to: '/quiz',
    },
    {
      label: 'Cards',
      icon: 'i-lucide-card-sim',
      to: '/cards',
    }
  ]
];
</script>