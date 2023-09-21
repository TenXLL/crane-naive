import { SwitchProps } from 'naive-ui';

export declare type CraneBuiltInWidgets =
  | 'text'
  | 'string'
  | 'number'
  | 'integer'
  | 'date'
  | 'time'
  | 'radio'
  | 'checkbox'
  | 'boolean'
  | 'textarea'
  | 'select'
  | 'tree-select'
  | 'tag'
  | 'upload'
  | 'transfer'
  | 'slider'
  | 'rate'
  | 'autocomplete'
  | 'cascader'
  | 'mention'
  | 'custom'
  | 'array'
  | 'object';

export interface ACLType {
  /**
   * 角色
   */
  role?: string[];
  /**
   * 权限点
   */
  ability?: number[] | string[];
  /**
   * Validated against, default: `oneOf`
   * - `allOf` the value validates against all the roles or abilities
   * - `oneOf` the value validates against exactly one of the roles or abilities
   */
  mode?: 'allOf' | 'oneOf';
  /**
   * 是否取反，即结果为 `true` 时表示未授权
   */
  except?: boolean;
  [key: string]: any;
}
export declare type ACLCanType =
  | number
  | number[]
  | string
  | string[]
  | ACLType;

export interface CraneUISchemaItem {
  [key: string]: any;
  /**
   * 指定采用什么小部件渲染，所有小部件名可[查阅文档](https://ng-alain.com/)
   */
  widget: CraneBuiltInWidgets | (string & {});
  /**
   * 元素组件大小
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 指定宽度，单位：`px`
   */
  width?: number;
  /**
   * 指定条件时才显示，但需要**注意**：
   * - 键值表示监听对象属性名
   * - JSON Schema 校验是各属性独立运行，监听对象属性每一次值变化都会重新做一次整个JSON结构计算
   *
   * 有效格式包括：
   * - `visibleIf: { shown: [ true ] }`：当 `shown: true` 时才显示当前属性
   * - `visibleIf: { shown: [ '$ANY$' ] }`：当 `shown` 包括任意值时
   * - `visibleIf: { shown: (value: any, property: FormProperty) => value > 0 }`：复杂表达式
   */
  visibleIf?: boolean;
  /**
   * ACL 配置
   */
  acl?: ACLCanType | null;

  /**
   * `label` 栅格占位格数，默认：`5`
   * - `0` 时相当于 `display: none`
   * - 限 `horizontal` 水平布局有效
   */
  spanLabel?: number | null;
  /**
   * `control` 栅格占位格数，默认：`19`
   * - `0` 时相当于 `display: none`
   * - 限 `horizontal` 水平布局有效
   */
  spanControl?: number | null;
  /**
   * `control` 栅格左侧的间隔格数，间隔内不可以有栅格
   * - 限 `horizontal` 水平布局有效
   */
  offsetControl?: number | null;
  /**
   * `label` 固定宽度
   * - 限 `horizontal` 水平布局有效
   */
  spanLabelFixed?: number | null;
  /**
   * switch的传参
   */
  switchProp?: SwitchProps;
}
