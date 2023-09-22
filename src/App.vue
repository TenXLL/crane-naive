<template>
  <n-card style="width: 600px">
    <CraneForm :schema="schema" mode="inline" :form-props="formProps" />
  </n-card>
</template>

<script setup lang="ts">
import CraneForm from '~/components/CraneForm/src/CraneForm.vue';
import { ref } from 'vue';
import { CraneSchema } from '~/components/CraneForm/types/crane-form.types.ts';
import { FormProps } from 'naive-ui';

const formProps = ref<FormProps>({
  labelPlacement: 'left'
});

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
    },
    date: {
      type: 'string',
      title: '日期',
      ui: {
        widget: 'date',
        dateProps: {
          clearable: true,
          type: 'datetime'
        }
      }
    }
  },
  required: ['radio']
});
</script>

<style scoped></style>
