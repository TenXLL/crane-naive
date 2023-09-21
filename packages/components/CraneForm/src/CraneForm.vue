<template>
  <n-form>
    <template v-for="(property, key) in schema!.properties" :key="key">
      <n-form-item :label="property.title" :path="key.toString()">
        <template v-if="property.ui?.widget === 'radio'">
          <n-switch
            v-model:value="data.formData[key]"
            :loading="property?.isLoading"
            :size="property.ui?.size"
          />
        </template>
      </n-form-item>
    </template>
  </n-form>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue';
import { CraneSchema } from '../types/crane-form.types';

const data = reactive({
  formData: {} as any,
  options: {} as Record<string, any>,
  rules: {} as { [key: string]: any },
  file: []
});

defineProps({
  schema: {
    type: Object as PropType<CraneSchema>,
    required: true
  }
});
</script>

<style scoped lang="less"></style>
