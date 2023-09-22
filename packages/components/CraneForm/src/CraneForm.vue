<template>
  <n-form :inline="mode === 'inline'" label-placement="left">
    <template v-for="(property, key) in schema!.properties" :key="key">
      <n-form-item :label="property.title" :path="key.toString()">
        <template v-if="property.ui?.widget === 'radio'">
          <n-switch
            v-model:value="data.formData[key]"
            v-bind="property.ui?.switchProp"
            :size="property.ui?.size"
          />
        </template>
        <template v-if="property.ui?.widget === 'select' && property.enum">
          <n-select
            v-model:value="data.formData[key]"
            v-bind="property.ui?.selectProps"
            :options="property.enum"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-if="property.ui?.widget === 'date'">
          <n-date-picker
            v-model:formatted-value="data.formData[key]"
            :value-format="
              property?.valueFormat
                ? property.valueFormat
                : 'yyyy-MM-dd HH:mm:ss'
            "
            :type="property?.format ? property?.format : 'datetime'"
            v-bind="property.ui?.dateProps"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-if="property.ui?.widget === 'number'">
          <n-input-number
            v-model:value="data.formData[key]"
            v-bind="property.ui?.numberProps"
            :placeholder="property.ui?.placeholder"
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
  rules: {} as { [key: string]: any }
});

defineProps({
  mode: {
    type: String as PropType<'default' | 'inline'>,
    default: 'default'
  },
  schema: {
    type: Object as PropType<CraneSchema>,
    required: true
  }
});
</script>

<style scoped lang="less"></style>
