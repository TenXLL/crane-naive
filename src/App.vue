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

provide('configForm', {
  action: 'https://server.caijiwang.cc/api/v1.0/file/upload'
});

const formData = ref({
  upload: [
    {
      id: '9178e3be6f5eb403066c01c174018e8b',
      name: '我是自带url的图片.png',
      status: 'finished',
      url: 'https://server.caijiwang.cc/api/v1.0/file/preview/9178e3be6f5eb403066c01c174018e8b'
    }
  ]
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
        widget: 'upload',
        uploadProps: {
          multiple: true
        }
      }
    }
  },
  required: ['radio']
});
</script>

<style scoped></style>
