import { CraneUISchemaItem } from './crane-ui.types';

export interface CraneSchemaEnum {
  [key: string]: any;
  /** 是否禁用状态 */
  disabled?: boolean;
  /** 文本 */
  label?: string;
  /** 文本 */
  title?: string;
  /** 值 */
  value?: any;
  /**
   * 主键，适用部分小部件数据键名，例如：`tree-select`
   */
  key?: any;
  /** 是否选中 */
  checked?: boolean;
  /**
   * 组名，适用部分允许组列表的小部件，例如：`select`
   * - 组对应的文本为 `label`
   * - `children` 为子项
   */
  group?: boolean;
  isLeaf?: boolean;
  /** 组对应的子类 */
  children?: CraneSchemaEnum[];
}

export declare type CraneSchemaType =
  | 'number'
  | 'integer'
  | 'string'
  | 'boolean'
  | 'object'
  | 'array';
export declare type CraneSchemaEnumType =
  | CraneSchemaEnum
  | number
  | string
  | boolean;

export interface CraneSchema {
  [key: string]: any;
  /**
   * 数据类型，支持 JavaScript 基础类型；注意项：
   *
   * - `integer` 表示整型，`number` 表示浮点型
   * - JSON 中 `date` 等同 `string` 类型
   * - 指定 `format` 标准参数可以自动适配渲染小部件
   * - 指定 `widget` 参数强制渲染小部件
   */
  type?: CraneSchemaType;
  /**
   * 枚举，静态数据源，例如：`radio`、`checkbox` 等
   *
   * - `disabled` 属性表示：禁用状态
   * - `label` 属性表示：文本
   * - `value` 属性表示：返回值
   * - 基础数据类型数组会自动转化成 `SFSchemaEnum` 数组格式
   */
  enum?: CraneSchemaEnumType[];
  /**
   * 最小值
   */
  minimum?: number;
  /**
   * 约束是否包括 `minimum` 值
   */
  exclusiveMinimum?: boolean;
  /**
   * 最大值
   */
  maximum?: number;
  /**
   * 约束是否包括 `maximum` 值
   */
  exclusiveMaximum?: boolean;
  /**
   * 倍数
   */
  multipleOf?: number;
  /**
   * 定义字符串的最大长度
   */
  maxLength?: number;
  /**
   * 定义字符串的最小长度
   */
  minLength?: number;
  /**
   * 验证输入字段正则表达式字符串
   */
  pattern?: string;
  /**
   * 约束数组最小的元素个数
   * - `type="array"` 时有效
   */
  minItems?: number;
  /**
   * 约束数组最大的元素个数
   * - `type="array"` 时有效
   */
  maxItems?: number;
  /**
   * 约束数组每个元素都不相同
   * - `type="array"` 时有效
   */
  uniqueItems?: boolean;
  /**
   * 数组额外元素的校验规则
   */
  additionalItems?: CraneSchema;
  /**
   * 最大属性个数，必须是非负整数
   */
  maxProperties?: number;
  /**
   * 最小属性个数，必须是非负整数
   */
  minProperties?: number;
  /**
   * 必填项属性
   */
  required?: string[];
  /**
   * 定义属性
   */
  properties?: {
    [key: string]: CraneSchema;
  };
  /**
   * 条件验证
   * - 必须包含 `properties` 节点
   *  - 键名必须是当前节点 `properties` 值之一
   *  - 利用 `enum` 属性表示条件值，支持 `$ANY$` 表示任意值
   * - 不支持跨 Schema 节点
   * - 当条件成功会执行 `then` 否则执行 `else`
   * - `if`和`then` 是必须同时出现，`else` 可选项
   */
  if?: CraneSchema;
  format?: string;
  /**
   * 属性描述，相当于 `label` 值，按以下规则展示：
   * - 当值为 `null`、`undefined` 时使用 `key` 替代
   * - 当值为 `''` 空字符串表示不展示 `label` 部分，例如：`checkbox` 可能需要
   */
  title?: string | null;
  /**
   * 属性目的性解释
   */
  description?: string;
  /**
   * 默认值
   */
  default?: any;
  /**
   * 是否只读状态
   */
  readOnly?: boolean;
  /**
   * 是否加载中...
   */
  isLoading?: boolean;
  /** **唯一非标准：** 指定UI配置信息，优先级高于 `sf` 组件 `ui` 属性值 */
  ui?: CraneUISchemaItem;
}
