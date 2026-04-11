<template>
  <div class="h-full flex flex-col items-center justify-center">
    <QuizWelcomeMessage v-if="!hasStarted" :cardsAmount="cardsAmount" :currentSelectedDate="currentSelectedDate"
      @start="hasStarted = true" />
    <div v-else class="w-full max-w-3xl flex flex-col gap-4">
      <QuizForm :cards="quizCards" @ended="handleQuizEnded" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Card } from '~/types';

const hasStarted = ref(false);
const { getQuizzCards } = useCards();
const simulatedDate = useSimulatedDate();

const currentSelectedDate = computed(() => {
    if (!simulatedDate.value) return new Date();
    return new Date(simulatedDate.value);
});

const quizCards = ref<Card[]>([]);

const fetchQuiz = async () => {
  quizCards.value = [];
  const data = await getQuizzCards(simulatedDate.value);
  if (data) quizCards.value = data;
};

onMounted(() => {
  fetchQuiz();
});

watch(simulatedDate, () => {
  fetchQuiz();
});

const cardsAmount = computed(() => quizCards.value.length);

const handleQuizEnded = async () => {
  hasStarted.value = false;
  await navigateTo('/');
};
</script>