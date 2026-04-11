<template>
  <div class="flex flex-col gap-4">
    <UProgress v-model="progress" class="w-full" />
    <div class="flex items-center justify-between w-full">
      <span class="text-lg font-semibold text-gray-400 dark:text-gray-200">
        Question {{ currentCard + 1 }} of {{ cards.length }}
      </span>
    </div>

    <div class="flip-card-scene h-128 w-full perspective-1000">
      <div
        class="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d rounded-lg shadow-sm border border-gray-300/30"
        :class="{ 'is-flipped': isFlipped }"
      >
        <div class="flip-card-face flip-card-front absolute inset-0 bg-white dark:bg-gray-900 p-8 flex flex-col justify-between items-center rounded-lg backface-hidden">
          <div class="flex flex-col gap-4 pt-24 items-center text-center">
            <span class="text-xl font-bold text-gray-400 uppercase tracking-wider">
              Question
            </span>
            <span class="font-extrabold text-3xl text-gray-800 dark:text-gray-100">
              {{ cards[currentCard]?.question }}
            </span>
          </div>
          <UButton
            color="primary"
            size="xl"
            class="w-full md:w-auto"
            @click="isFlipped = true"
          >
            Show Answer
          </UButton>
        </div>

        <div class="flip-card-face flip-card-back absolute inset-0 bg-primary-50 dark:bg-gray-800 p-8 flex flex-col justify-between items-center rounded-lg backface-hidden rotate-y-180">
          <div class="flex flex-col gap-4 pt-24 items-center text-center">
            <span class="text-xl font-bold text-primary-500 dark:text-primary-400 uppercase tracking-wider">
              Answer
            </span>
            <span class="font-extrabold text-2xl text-gray-800 dark:text-gray-100">
              {{ cards[currentCard]?.answer }}
            </span>
            <UBadge v-if="cards[currentCard]?.tag" size="xl" color="primary" variant="subtle" class="mt-2">
               {{ cards[currentCard]?.tag }}
             </UBadge>
          </div>
          
          <div class="flex gap-4 w-full">
             <UButton
              color="error"
              variant="soft"
              size="xl"
              block
              icon="i-lucide-x-circle"
              @click="handleNextCard(false)"
            >
              Incorrect
            </UButton>
             <UButton
              color="primary"
              size="xl"
              block
              icon="i-lucide-check-circle"
              @click="handleNextCard(true)"
            >
              Correct
            </UButton>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Card } from '~/types';
import confetti from 'canvas-confetti'; 

const props = defineProps<{
  cards: Card[];
}>();

const currentCard = ref(0);
const isFlipped = ref(false);
const { answerCard } = useCards();

const progress = computed(() => {
  if (props.cards.length === 0) return 0;
  return (currentCard.value / props.cards.length) * 100;
});

const triggerEmojiConfetti = () => {
  const scalar = 3;
  const graduation = confetti.shapeFromText({ text: '🎁', scalar });
  const star = confetti.shapeFromText({ text: '❄️', scalar });
  const party = confetti.shapeFromText({ text: '🎄', scalar });

  confetti({
    particleCount: 50,
    scalar: scalar,
    spread: 100,
    origin: { y: 0.6 },
    shapes: [graduation, star, party],
    
    
    flat: true,
    gravity: 1.65,
    startVelocity: 40,
    ticks: 4000,
    drift: 0,
  });
};

const handleNextCard = async (wasCorrect: boolean) => {
  console.log(`Card ${currentCard.value + 1} marked as: ${wasCorrect ? 'Correct' : 'Incorrect'}`);

  if (currentCard.value < props.cards.length) {
     const card = props.cards[currentCard.value];
     if (card) {
       await answerCard(card.id, wasCorrect);
     }
  }

  if (currentCard.value < props.cards.length - 1) {
     isFlipped.value = false;
     setTimeout(() => {
        currentCard.value++;
     }, 300);
  } else {
    triggerEmojiConfetti();
    emit('ended');
    currentCard.value = 0;
    isFlipped.value = false;   
  }
};

const emit = defineEmits<{
  (e: 'ended'): void;
}>();

</script>
<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
  transform: rotateX(0deg); 
}

.is-flipped {
  transform: rotateY(180deg);
}

.rotate-y-180 {
    transform: rotateY(180deg);
}
</style>