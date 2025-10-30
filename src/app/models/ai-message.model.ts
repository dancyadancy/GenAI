// AI消息数据结构定义
export interface AIMessage {
  role: 'user' | 'assistant';
  content?: string; // 文本内容
  component?: ComponentData; // 组件数据
  timestamp: Date;
}

// 组件数据结构
export interface ComponentData {
  type: ComponentType; // 组件类型
  data: any; // 组件数据
  props?: { [key: string]: any }; // 额外的组件属性
}

// 支持的组件类型
export type ComponentType = 
  | 'text'           // 纯文本
  | 'table'          // 表格
  | 'chart'          // 图表
  | 'list'           // 列表
  | 'card'           // 卡片
  | 'alert'          // 警报列表
  | 'well-card'      // 井信息卡片
  | 'metric'         // 指标卡片
  | 'json'           // JSON数据展示
  | 'html';          // HTML内容

// 表格数据格式
export interface TableData {
  headers: string[];
  rows: any[][];
  title?: string;
}

// 图表数据格式
export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'donut';
  data: any[];
  labels?: string[];
  title?: string;
}

// 列表数据格式
export interface ListData {
  items: Array<{
    title: string;
    description?: string;
    icon?: string;
    status?: string;
  }>;
  title?: string;
}
