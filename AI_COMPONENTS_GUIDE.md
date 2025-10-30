# AI组件动态渲染系统使用说明

## 概述

我已经为你创建了一个完整的AI组件动态渲染系统。当大模型返回数据时，系统会根据数据的**类型**自动选择合适的组件来展示。

## 工作原理

### 1. 数据结构定义

AI返回的消息格式：
```typescript
{
  role: 'assistant',
  content: '这是文本说明',  // 可选
  component: {              // 可选，如果有则渲染组件
    type: 'table' | 'list' | 'chart' | 'json' | ...,
    data: { ... },          // 组件所需的数据
    props: { ... }          // 额外的组件属性
  },
  timestamp: new Date()
}
```

### 2. 如何告诉AI使用什么组件？

**方法一：通过提示词（Prompt）**

在你的AI API调用中，可以这样提示：

```typescript
const prompt = `
用户问题: ${userMessage}

请根据问题返回结构化数据。如果数据适合用表格展示，返回：
{
  "component": {
    "type": "table",
    "data": {
      "headers": ["列1", "列2"],
      "rows": [["值1", "值2"]],
      "title": "表格标题"
    }
  }
}

如果适合用列表展示，返回：
{
  "component": {
    "type": "list",
    "data": {
      "title": "列表标题",
      "items": [
        {"title": "项目1", "description": "描述", "icon": "warning", "status": "High"}
      ]
    }
  }
}

如果适合用图表展示，返回：
{
  "component": {
    "type": "chart",
    "data": {
      "type": "bar",
      "title": "图表标题",
      "data": [{"label": "标签", "value": 100}]
    }
  }
}
`;
```

**方法二：通过工具调用（Tool Calling）**

如果你使用类似AI SDK的工具调用功能，可以定义工具：

```typescript
const tools = {
  displayTable: {
    description: 'Display data in a table format',
    parameters: {
      headers: ['string'],
      rows: [['string']],
      title: 'string'
    }
  },
  displayList: {
    description: 'Display data as a list',
    parameters: {
      items: [...],
      title: 'string'
    }
  },
  displayChart: {
    description: 'Display data as a chart',
    parameters: {
      type: 'bar' | 'line' | 'pie',
      data: [...],
      title: 'string'
    }
  }
};
```

### 3. 当前支持的组件类型

- **`table`**: 表格展示
- **`list`**: 列表展示（带图标和状态）
- **`chart`**: 图表展示（柱状图、折线图等）
- **`json`**: JSON数据展示
- **`text`**: 纯文本（默认）

### 4. 使用示例

在聊天窗口中，你可以尝试：

- "显示表格" 或 "show table" → 返回表格组件
- "显示列表" 或 "show list" → 返回列表组件  
- "显示图表" 或 "show chart" → 返回图表组件

## 下一步

1. **集成真实的AI API**：在 `handleAIResponse` 方法中替换模拟代码，调用你的AI API
2. **添加更多组件类型**：根据需求添加更多组件（如卡片、指标、地图等）
3. **优化图表**：集成Chart.js或ECharts等专业图表库
4. **类型安全**：完善TypeScript类型定义，确保AI返回的数据格式正确

现在系统已经可以工作了！你可以尝试在聊天中输入"显示表格"、"显示列表"或"显示图表"来测试不同的组件渲染。
