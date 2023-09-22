import { App } from 'vue';

import components from './components/components';

import * as CraneFormTypes from './components/CraneForm/types/crane-form.types';
import * as CraneUITypes from './components/CraneForm/types/crane-ui.types';
import './common.less';

// 所有组件
export * from './components/components';

// 完整引入组件
const install = (app: App) => {
  components.forEach((component) => {
    app.use(component as unknown as { install: () => any });
  });
};

export default {
  install,
  ...CraneFormTypes,
  ...CraneUITypes
};
