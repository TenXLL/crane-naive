<template>
  <n-card style="width: 1200px">
    <CraneForm
      :schema="schema"
      mode="default"
      :form-props="formProps"
      :form-data="formData"
    />
  </n-card>
</template>

<script setup lang="ts">
import CraneForm from '~/components/CraneForm/src/CraneForm.vue';
import { provide, ref } from 'vue';
import { CraneSchema } from '~/components/CraneForm/types/crane-form.types.ts';
import { FormProps } from 'naive-ui';

const formProps = ref<FormProps>({
  labelPlacement: 'left'
});

const formData = ref({
  radio: true
});

provide('configForm', {
  action: 'https://server.caijiwang.cc/api/v1.0/file/upload'
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
    upload: {
      type: 'array',
      title: '上传',
      ui: {
        widget: 'upload'
      }
    }
  },
  required: ['radio']
});
</script>

<style scoped></style>
