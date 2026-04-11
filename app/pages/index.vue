<script setup lang="ts">
const { getCards, getQuizzCards } = useCards();
const simulatedDate = useSimulatedDate();

const quizCardsCount = ref(0);
const totalCardsCount = ref(0);
const boxes = ref<{ label: string; count: number }[]>([]);
const doneCount = ref(0);

const fetchData = async () => {
  const [allCards, quizCards] = await Promise.all([
    getCards(),
    getQuizzCards(simulatedDate.value)
  ]);

  if (allCards) {
    totalCardsCount.value = allCards.length;
    const categories = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH'];
    boxes.value = categories.map(cat => ({
      label: cat,
      count: allCards.filter(c => c.category === cat).length
    }));
    doneCount.value = allCards.filter(c => c.category === 'DONE').length;
  }

  if (quizCards) {
    quizCardsCount.value = quizCards.length;
  }
};

onMounted(() => {
  fetchData();
});

watch(simulatedDate, () => {
  fetchData();
});
</script>

<template>
  <div class="flex flex-col justify-start pt-32 mx-auto w-2/3 h-full">
    <div class="flex items-center w-full h-2/6 gap-4 mb-4">
      <WelcomeCard class=" w-3/4 h-full"
        :card-amount="quizCardsCount"
        :path="'/quiz'"
      />
      <TotalCards class="w-1/4 h-full" :amount="totalCardsCount"/>
    </div>
    <GraphCards class=" w-full h-fit"
      :boxes="boxes"
      :done-count="doneCount"
    />
  </div>
</template>