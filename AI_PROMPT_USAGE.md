# AI Prompt使用指南和示例

## 📋 目录
1. [快速开始](#快速开始)
2. [Prompt配置](#prompt配置)
3. [API集成示例](#api集成示例)
4. [使用示例](#使用示例)
5. [组件类型说明](#组件类型说明)

## 🚀 快速开始

### 1. 配置AI服务

编辑 `src/app/services/ai.service.ts`：

```typescript
private apiUrl = 'https://api.openai.com/v1/chat/completions'; // 替换为你的AI API
private apiKey = 'your-api-key-here'; // 替换为你的API密钥
```

### 2. 启用真实API调用

在 `ai.service.ts` 的 `getAIResponse` 方法中，取消注释真实API调用代码：

```typescript
getAIResponse(userMessage: string, conversationHistory: AIMessage[] = []): Observable<AIMessage> {
  const prompt = this.buildPrompt(userMessage, conversationHistory);
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.apiKey}`
  });

  const body = {
    messages: this.buildMessages(conversationHistory, userMessage),
    temperature: 0.7,
    response_format: { type: 'json_object' } // 强制返回JSON格式
  };

  return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
    map(response => this.parseAIResponse(response, userMessage)),
    catchError(error => {
      console.error('AI API Error:', error);
      return of(this.getFallbackResponse(userMessage));
    })
  );
}
```

## 📝 Prompt配置

Prompt模板位于 `src/app/services/ai-prompt.config.ts`，已经为你配置好了：

- ✅ 详细的组件类型说明
- ✅ 组件选择指南
- ✅ 数据格式要求
- ✅ 示例数据结构

## 🔌 API集成示例

### 示例1: 使用OpenAI API

```typescript
// 在 ai.service.ts 中配置
private apiUrl = 'https://api.openai.com/v1/chat/completions';
private apiKey = 'sk-...';

// 请求体格式
const body = {
  model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content: AI_PROMPT_TEMPLATE
    },
    {
      role: 'user',
      content: userMessage
    }
  ],
  temperature: 0.7,
  response_format: { type: 'json_object' }
};
```

### 示例2: 使用自定义API

```typescript
// 如果你的后端已经处理了Swagger接口调用
private apiUrl = 'https://your-backend.com/api/chat';

const body = {
  message: userMessage,
  history: conversationHistory,
  includeComponent: true // 要求返回组件数据
};

return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
  map(response => {
    // 假设你的API已经返回了正确的格式
    return {
      role: 'assistant',
      content: response.content,
      component: response.component,
      timestamp: new Date()
    };
  })
);
```

## 💡 使用示例

### 示例1: 查询所有井的状态

**用户输入**: "显示所有井的状态"

**AI应该返回**:
```json
{
  "content": "以下是所有井的状态汇总：",
  "component": {
    "type": "table",
    "data": {
      "title": "井状态汇总",
      "headers": ["井名", "状态", "警报数", "风险评分"],
      "rows": [
        ["Well-001", "运行中", "2", "9.3"],
        ["Well-002", "运行中", "1", "7.8"],
        ["Well-003", "运行中", "3", "8.5"]
      ]
    }
  }
}
```

### 示例2: 查询活动警报

**用户输入**: "有多少个活动警报？显示警报列表"

**AI应该返回**:
```json
{
  "content": "当前有3个活动警报：",
  "component": {
    "type": "list",
    "data": {
      "title": "活动警报",
      "items": [
        {
          "title": "异常吊重",
          "description": "Well-001",
          "icon": "warning",
          "status": "High"
        },
        {
          "title": "异常井眼清洁指数",
          "description": "Well-002",
          "icon": "warning",
          "status": "Medium"
        }
      ]
    }
  }
}
```

### 示例3: 查询性能趋势

**用户输入**: "显示钻井性能趋势图"

**AI应该返回**:
```json
{
  "content": "这是近期的钻井性能趋势：",
  "component": {
    "type": "chart",
    "data": {
      "type": "bar",
      "title": "钻井性能对比",
      "data": [
        {"label": "Well-001", "value": 92},
        {"label": "Well-002", "value": 78},
        {"label": "Well-003", "value": 85}
      ]
    }
  }
}
```

### 示例4: 普通问答

**用户输入**: "什么是Packoff风险？"

**AI应该返回**:
```json
{
  "content": "Packoff风险是指钻井过程中，由于井眼清洁不良、钻井液性能不当等原因，导致钻屑和钻井液在环空中堆积，可能造成卡钻等严重事故的风险。风险评分范围是0-10分，分数越高风险越大。"
}
```

## 🎨 组件类型说明

### Table组件
**适用场景**:
- 多行多列数据
- 需要对比的数据
- 统计汇总数据

**数据格式**:
```typescript
{
  type: 'table',
  data: {
    title: string,
    headers: string[],
    rows: string[][]
  }
}
```

### List组件
**适用场景**:
- 警报列表
- 任务清单
- 带状态的项目列表

**数据格式**:
```typescript
{
  type: 'list',
  data: {
    title: string,
    items: Array<{
      title: string,
      description?: string,
      icon?: 'warning' | 'check_circle' | 'info' | 'error',
      status?: string
    }>
  }
}
```

### Chart组件
**适用场景**:
- 数据可视化
- 趋势对比
- 性能分析

**数据格式**:
```typescript
{
  type: 'chart',
  data: {
    type: 'bar' | 'line' | 'pie',
    title: string,
    data: Array<{
      label: string,
      value: number
    }>
  }
}
```

## 🔧 测试方法

### 方法1: 使用预设问题

在聊天窗口中点击预设问题按钮：
- "显示所有井的状态表格" → 测试table组件
- "显示活动警报列表" → 测试list组件  
- "显示钻井性能趋势图表" → 测试chart组件

### 方法2: 自定义输入

在输入框中输入：
- "显示表格" → 返回table组件
- "显示列表" → 返回list组件
- "显示图表" → 返回chart组件

## 📌 注意事项

1. **JSON格式**: AI必须返回纯JSON，不要包含markdown代码块标记（```json）
2. **组件类型**: 必须使用预定义的组件类型（table, list, chart, json, text）
3. **数据格式**: 组件数据必须符合对应的数据结构定义
4. **错误处理**: 如果AI返回格式错误，系统会显示错误信息

## 🚀 下一步

1. 配置你的AI API密钥和URL
2. 测试不同的查询场景
3. 根据实际需求调整Prompt模板
4. 添加更多组件类型（如卡片、地图等）

现在你可以在聊天窗口中测试了！输入"显示表格"、"显示列表"或"显示图表"来查看不同的组件渲染效果。
