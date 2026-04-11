<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 w-2/3">
      <h1 class="text-2xl font-bold">Cards</h1>
      <UInput v-model="search" placeholder="Search cards..." class="w-1/3" />
      </div>
      <UButton color="primary" variant="subtle" icon="i-lucide-plus" class="cursor-pointer" size="lg"
      @click="showCreatePanel = true"
      >
        New card
      </UButton>
      <CreateCardPanel v-model:open="showCreatePanel" />
    </div>
    <CardsTable :cards="cards" />
  </div>

</template>

<script setup lang="ts">
const { getCards, cards } = useCards();
const showCreatePanel = ref(false);
const search = ref('');
onMounted(async () => {
  await getCards();
});

watch(search, async (newSearch) => {
  const searchTerm = newSearch.trim();
  await getCards(searchTerm.split(' ').filter(term => term.length > 0));
});

</script>