<template>
  <n-card style="width: 600px">
    <CraneForm :schema="schema" mode="inline" />
  </n-card>
</template>

<script setup lang="ts">
import CraneForm from '~/components/CraneForm/src/CraneForm.vue';
import { ref } from 'vue';
import { CraneSchema } from '~/components/CraneForm/types/crane-form.types.ts';

const schema = ref<CraneSchema>({
  properties: {
    radio: {
      type: 'boolean',
      title: '是否',
      ui: {
        widget: 'radio',
        switchProp: {
          round: false
        }
      }
    },
    select: {
      type: 'string',
      title: '选择',
      enum: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        }
      ],
      ui: {
        widget: 'select',
        selectProps: {
          clearable: true
        }
      }
    },
    number: {
      type: 'number',
      title: '数字',
      ui: {
        widget: 'number'
      }
    }
  }
});
</script>

<style scoped></style>
