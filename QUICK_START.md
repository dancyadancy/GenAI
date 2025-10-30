# 🚀 AI Prompt使用示例

## 快速开始

### 1. 配置AI服务

打开 `src/app/services/ai.service.ts`，修改以下配置：

```typescript
private apiUrl = 'https://api.openai.com/v1/chat/completions'; // 你的AI API地址
private apiKey = 'sk-your-api-key'; // 你的API密钥
```

### 2. 启用真实API（可选）

目前使用模拟数据，要使用真实AI API：

1. 取消注释 `getAIResponse` 方法中的真实API调用代码
2. 注释掉模拟响应的代码

### 3. 测试

在聊天窗口输入以下内容测试：

- ✅ "显示表格" → 返回表格组件
- ✅ "显示列表" → 返回列表组件
- ✅ "显示图表" → 返回图表组件

## 📋 Prompt工作原理

### AI返回的数据格式

AI必须返回JSON格式：

```json
{
  "content": "这是说明文本",
  "component": {
    "type": "table",
    "data": {
      "title": "表格标题",
      "headers": ["列1", "列2"],
      "rows": [["值1", "值2"]]
    }
  }
}
```

### 组件类型选择

| 用户问题关键词 | 组件类型 | 示例 |
|------------|---------|------|
| "表格"、"列表数据" | table | 显示所有井的状态 |
| "警报"、"清单" | list | 显示活动警报 |
| "图表"、"趋势" | chart | 显示性能趋势 |
| "原始数据" | json | 显示API响应 |
| 普通问题 | text | 什么是Packoff风险？ |

## 💡 完整示例

### 示例1: 查询井状态

**用户**: "显示所有井的状态"

**AI Prompt中会自动包含**:
```
用户问题: 显示所有井的状态

请分析问题，调用相应的API，选择合适的组件类型，返回JSON格式的响应。
```

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
        ["Well-002", "运行中", "1", "7.8"]
      ]
    }
  }
}
```

### 示例2: 查询警报

**用户**: "有多少个活动警报？"

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
        }
      ]
    }
  }
}
```

## 🔧 自定义配置

### 修改Prompt模板

编辑 `src/app/services/ai-prompt.config.ts`，可以根据你的需求调整：

- 添加更多组件类型说明
- 修改组件选择规则
- 添加领域特定的指导

### 添加新的组件类型

1. 在 `src/app/models/ai-message.model.ts` 中添加新的组件类型
2. 创建对应的组件文件
3. 在 `ai-component-renderer.component.html` 中添加渲染逻辑
4. 在Prompt模板中添加说明

## 📝 注意事项

1. **JSON格式**: AI必须返回纯JSON，不要包含markdown标记
2. **组件类型**: 必须使用预定义的类型（table, list, chart, json, text）
3. **数据格式**: 必须符合组件的数据结构要求
4. **错误处理**: 如果格式错误，会显示错误信息

## 🎯 下一步

1. 配置你的AI API密钥
2. 测试不同的查询场景
3. 根据实际需求调整Prompt
4. 添加更多组件类型

详细文档请查看 `AI_PROMPT_USAGE.md`
