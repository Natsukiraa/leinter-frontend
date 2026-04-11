<template>
  <div>
    <UTable :columns="columns" :data="cards" />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { Card } from '~/types';

const props = defineProps<{
  cards: Card[];
}>();

const UBadge = resolveComponent('UBadge');
const columns: TableColumn<Card>[] = [
  {
    accessorKey: 'question',
    header: 'Question',
  },
  {
    accessorKey: 'answer',
    header: 'Answer',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      let colorClass = '';
      switch (row.original.category) {
        case 'FIRST':
          colorClass = 'primary';
          break;
        case 'SECOND':
          colorClass = 'success';
          break;
        case 'THIRD':
          colorClass = 'info';
          break;
        default:
          colorClass = 'warning';
      }

      return h(UBadge, {
          variant: 'subtle',
          color: colorClass,
        }, () => {
          return row.original.category;
        },
      )
    },
  },
  {
    accessorKey: 'tag',
    header: 'Tag',    
    cell: ({ row }) => {
      return h(UBadge, {
          variant: 'subtle',
          color: 'neutral',
        }, () => {
          return row.original.tag;
        },
      )
    },
  },
];
</script>