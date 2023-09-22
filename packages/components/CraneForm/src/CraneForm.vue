<template>
  <n-form
    ref="formRef"
    :inline="mode === 'inline'"
    v-bind="formProps"
    :rules="data.rules"
    :model="data.formData"
  >
    <template v-for="(property, key) in schema!.properties" :key="key">
      <n-form-item :label="property.title" :path="key.toString()">
        <template v-if="property.ui?.widget === 'radio'">
          <n-switch
            v-model:value="data.formData[key]"
            v-bind="property.ui?.switchProp"
            :size="property.ui?.size"
          />
        </template>
        <template v-else-if="property.ui?.widget === 'select' && property.enum">
          <n-select
            v-model:value="data.formData[key]"
            v-bind="property.ui?.selectProps"
            :options="property.enum"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-else-if="property.ui?.widget === 'date'">
          <n-date-picker
            v-model:formatted-value="data.formData[key]"
            v-bind="property.ui?.dateProps"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-else-if="property.ui?.widget === 'number'">
          <n-input-number
            v-model:value="data.formData[key]"
            v-bind="property.ui?.numberProps"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-else>
          <n-input
            v-model:value="data.formData[key]"
            v-bind="property.ui?.inputProps"
            :placeholder="property.ui?.placeholder"
          />
        </template>
      </n-form-item>
    </template>
    <n-form-item>
      <n-button @click="reset">重置</n-button>
      <n-button style="margin-left: 8px" type="primary" @click="submit">
        提交
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, reactive, ref } from 'vue';
import { CraneSchema } from '../types/crane-form.types';
import { FormProps, NForm } from 'naive-ui';

const formRef = ref(NForm);

const data = reactive({
  formData: {} as any,
  options: {} as Record<string, any>,
  rules: {} as { [key: string]: any }
});

const props = defineProps({
  mode: {
    type: String as PropType<'default' | 'inline'>,
    default: 'default'
  },
  formProps: {
    type: Object as PropType<FormProps>
  },
  schema: {
    type: Object as PropType<CraneSchema>,
    required: true
  }
});

onMounted(() => {
  prepareRules();
});

const prepareRules = () => {
  const map = new Map();
  props!.schema!.required!.forEach((key) => {
    map.set(key, true);
  });
  for (const key in props.schema!.properties) {
    data.rules[key] = [
      {
        required: map.get(key),
        message: `${props.schema!.properties[key].title}不能为空`
      }
    ];
  }
};

const submit = () => {
  formRef.value.validate((errors: any) => {
    if (!errors) {
      console.log(data.formData);
    }
  });
};

const reset = () => {
  formRef.value.restoreValidation();

  for (const key in props!.schema!.properties) {
    if (typeof data.formData[key] === 'undefined') {
      data.formData[key] = props!.schema!.properties[key].default;
    } else if (typeof data.formData[key] === 'string') {
      data.formData[key] = null;
    } else if (typeof data.formData[key] === 'number') {
      data.formData[key] = null;
    } else if (typeof data.formData[key] === 'boolean') {
      data.formData[key] = false;
    } else if (Array.isArray(data.formData[key])) {
      data.formData[key] = [];
    }
  }
};
</script>

<style scoped lang="less"></style>
