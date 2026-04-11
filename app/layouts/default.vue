<template>
  <div class="flex h-screen">
    <CustomSidebar />
    
    <div class="flex-1 p-4 flex flex-col overflow-y-auto">
      <slot />
    </div>
  </div>
</template>