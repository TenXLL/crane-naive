<template>
  <CraneForm :schema="schema" />
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
          round: true
        }
      }
    }
  }
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
