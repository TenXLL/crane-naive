import { App } from 'vue';

import CraneForm from './src/CraneForm.vue';

CraneForm.install = (app: App) => {
  // 组件注册，按需引入
  app.component('CraneForm', CraneForm);
  return app;
};

export default CraneForm;
