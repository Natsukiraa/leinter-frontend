<template>
  <USlideover :title="'Create New Card'" :width="'md'" :closeable="true" v-model:open="open">
    <template #body>
    <UForm class="flex flex-col w-full gap-4" :state="state" :schema="schema" @submit="handleSubmit">
      <UFormField label="Question" name="question">
        <UInput v-model="state.question" placeholder="Enter the question" class="w-full"/>
      </UFormField>
      <UFormField label="Answer" name="answer">
        <UInput v-model="state.answer" placeholder="Enter the answer" class="w-full"/>
      </UFormField>
      <UFormField label="Tag" name="tag">
        <UInput v-model="state.tag" placeholder="Enter the tag" class="w-full"/>
      </UFormField>
      <div class="flex justify-end mt-4">
        <UButton icon="i-lucide-save" color="primary" type="submit" :loading="loading">Create Card</UButton>
      </div>
    </UForm>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui';

const open = defineModel('open', { type: Boolean, required: true });
const loading = ref(false);
const { createCard } = useCards();

const state = reactive({
  question: '',
  answer: '',
  tag: '',
});

const schema = v.object({
  question: v.pipe(v.string(),v.minLength(1, 'Question is required')),
  answer: v.pipe(v.string(),v.minLength(1, 'Answer is required')),
  tag: v.pipe(v.string(),v.minLength(1, 'Tag is required')),
});

function resetForm(){
  state.question = '';
  state.answer = '';
  state.tag = '';
}

type Schema = v.InferOutput<typeof schema>;

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true;
  
  console.log('Form submitted with data:', event.data);

  try {
    await createCard(event.data);
    resetForm();
    open.value = false;
  } catch (error) {
    console.error('Failed to create card', error);
  } finally {
    loading.value = false;
  }
};
</script>