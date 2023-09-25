<template>
  <n-form
    ref="formRef"
    :inline="mode === 'inline'"
    v-bind="formProps"
    :rules="data.rules"
    :model="data.formData"
    @keyup.enter="submit"
  >
    <template v-for="(property, key) in schema!.properties" :key="key">
      <n-form-item :label="property.title" :path="key.toString()">
        <template v-if="property.ui?.widget === 'radio'">
          <n-switch
            v-model:value="data.formData[key]"
            v-bind="property.ui?.switchProp"
            :size="totalSize"
          />
        </template>
        <template v-else-if="property.ui?.widget === 'select' && property.enum">
          <n-select
            v-model:value="data.formData[key]"
            :size="totalSize"
            v-bind="property.ui?.selectProps"
            :options="property.enum"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template
          v-else-if="property.ui?.widget === 'select' && property.ui?.asyncData"
        >
          <n-select
            v-model:value="data.formData[key]"
            :size="totalSize"
            v-bind="property.ui?.selectProps"
            :options="data.options[key]"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-else-if="property.ui?.widget === 'date'">
          <n-date-picker
            v-model:formatted-value="data.formData[key]"
            :size="totalSize"
            v-bind="property.ui?.dateProps"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template v-else-if="property.ui?.widget === 'number'">
          <n-input-number
            v-model:value="data.formData[key]"
            :size="totalSize"
            v-bind="property.ui?.numberProps"
            :placeholder="property.ui?.placeholder"
          />
        </template>
        <template
          v-else-if="property.ui?.widget === 'tree-select' && property.enum"
        >
          <n-tree-select
            :options="property?.enum"
            :size="totalSize"
            :default-value="property.default"
            v-bind="property.ui?.treeSelectProps"
            :placeholder="property.ui?.placeholder"
            @update:value="
              (value: any, _option: any) => {
                data.formData[key] = value;
              }
            "
          />
        </template>
        <template
          v-else-if="
            property.ui?.widget === 'tree-select' && property.ui?.asyncData
          "
        >
          <n-tree-select
            :options="data.options[key]"
            :size="totalSize"
            :default-value="property.default"
            v-bind="property.ui?.treeSelectProps"
            :placeholder="property.ui?.placeholder"
            @update:value="
              (value: any, _option: any) => {
                data.formData[key] = value;
              }
            "
          />
        </template>
        <template v-else-if="property.ui?.widget === 'upload'">
          <n-upload
            :default-file-list="data.formData[key]"
            :action="injectConfig ? injectConfig?.action : '#'"
            show-preview-button
            v-bind="property.ui?.uploadProps"
            list-type="image-card"
            @finish="handleFinish($event, key as string)"
            @preview="handlePreview"
          >
            <n-icon size="30">
              <Add />
            </n-icon>
          </n-upload>
        </template>
        <template v-else>
          <n-input
            v-model:value="data.formData[key]"
            :size="totalSize"
            v-bind="property.ui?.inputProps"
            :placeholder="property.ui?.placeholder"
          />
        </template>
      </n-form-item>
    </template>
    <n-form-item>
      <n-button :size="totalSize" @click="reset">重置</n-button>
      <n-button
        :size="totalSize"
        style="margin-left: 8px"
        type="primary"
        @click="submit"
      >
        提交
      </n-button>
    </n-form-item>
  </n-form>

  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="预览"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <img :src="previewUrl" alt="" style="width: 100%; height: 100%" />
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { inject, onMounted, PropType, reactive, ref, watch } from 'vue';
import { CraneSchema, FormConfig, FormData } from '../types/crane-form.types';
import { FormProps, NForm, FormItemRule, UploadFileInfo } from 'naive-ui';
import {
  emailValidationStrategy,
  mobileValidationStrategy,
  ValidationStrategy
} from '~/components/CraneForm/design-patterns/validator-design-patterns.ts';
import {
  convertProxyToNormal,
  replaceEmptyValuesWithNull
} from '~/utils/formatValue.ts';
import { Add } from '@vicons/ionicons5';
import { fileToBase64 } from '~/utils/file.ts';

const previewUrl = ref('');
const showModal = ref(false);

const formRef = ref(NForm);
const emits = defineEmits(['formSubmit']);

const injectConfig = inject<FormConfig>('configForm');

const previewFileList = ref<UploadFileInfo[]>([
  {
    id: 'react',
    name: '我是react.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    id: 'vue',
    name: '我是vue.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  }
]);

const data = reactive({
  formData: {} as any,
  options: {} as Record<string, any[]>,
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
  },
  totalSize: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'small'
  },
  formData: {
    type: Object as PropType<FormData>
  }
});

onMounted(() => {
  prepareRules();
  prepareAsyncData();
  setFormData();
});

function setFormData() {
  if (!props.formData) {
    return;
  }
  console.log(props.formData);
  data.formData = convertProxyToNormal(props.formData);
}

watch(
  () => props.formData,
  (newFormData) => {
    if (newFormData) {
      data.formData = convertProxyToNormal(newFormData);
    }
  }
);

/**
 * 设置规则
 */
const prepareRules = () => {
  const map = new Map();
  props!.schema!.required!.forEach((key) => {
    map.set(key, true);
  });
  for (const key in props.schema!.properties) {
    data.rules[key] = [];

    if (props.schema!.properties[key].format) {
      prepareValidation(props.schema!.properties[key].format as string, key);
    }

    if (props.schema!.properties[key].pattern) {
      preparePattern(props.schema!.properties[key].pattern, key);
    }

    data.rules[key].push({
      required: map.get(key) ? map.get(key) : false,
      message:
        !props.schema!.properties[key].format &&
        !props.schema!.properties[key].pattern
          ? `${props.schema!.properties[key].title}不能为空`
          : ''
    });
  }
};

/**
 * 设置特定格式校验
 * @param type 校验类型
 * @param key key
 */
const prepareValidation = (type: string, key: string) => {
  const strategyMap: Record<string, ValidationStrategy> = {
    mobile: mobileValidationStrategy,
    email: emailValidationStrategy
  };

  const strategy = strategyMap[type];
  if (strategy) {
    data.rules[key].push({
      validator: (_rule: FormItemRule, value: string) =>
        strategy.validator(value),
      trigger: strategy.trigger
    });
  }
};

/**
 * 设置正则校验
 * @param pattern 正则
 * @param key key
 */
const preparePattern = (pattern: any, key: string) => {
  const rule = {
    validator: (value: string) => {
      const regExp = pattern;
      if (!value) {
        return new Error('手机号不能为空');
      }
      if (!regExp.test(value)) {
        return new Error('请输入正确的手机号');
      }
      return true;
    },
    trigger: ['input', 'blur']
  };
  data.rules[key].push(rule);
};

/**
 * 准备异步数据
 */
const prepareAsyncData = () => {
  for (const key in props.schema?.properties) {
    if (props.schema?.properties[key].ui) {
      const asyncData = props.schema?.properties[key].ui?.asyncData;
      if (asyncData) {
        asyncData
          .then((res) => {
            data.options[key] = res;
          })
          .catch((error) => {
            console.error(error); // 处理异步请求失败的情况
          });
      }
    }
  }
};

/**
 * 提交
 */
const submit = () => {
  formRef.value.validate((errors: any) => {
    if (!errors) {
      const keys = Object.keys(data.formData);
      const form: { [key: string]: any } = {};
      keys.forEach((key) => {
        form[key] = data.formData[key];
      });
      const normal = convertProxyToNormal(form);
      replaceEmptyValuesWithNull(normal);
      console.log(normal);
      emits('formSubmit', normal);
    }
  });
};

/**
 * 重置
 */
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

const handleFinish = (
  {
    file,
    event
  }: {
    file: UploadFileInfo;
    event?: ProgressEvent;
  },
  key: string
) => {
  if (!data.formData[key]) {
    data.formData[key] = [];
  }
  data.formData[key].push(
    JSON.parse((event?.target as XMLHttpRequest).response).data.id
  );
  return file;
};

function handlePreview(uploadFileInfo: UploadFileInfo) {
  const { file } = uploadFileInfo;
  fileToBase64(file as File).then((res) => {
    previewUrl.value = res;
    showModal.value = true;
  });
}
</script>

<style scoped lang="less"></style>
