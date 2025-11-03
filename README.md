# OdinEye

OdinEye 是一个基于 AI 的钻井数据监控仪表盘，集成了智能聊天功能，可以通过自然语言查询来调用 Swagger API 接口。

## 项目概述

这个项目包含：


- **左侧 Dashboard**：展示多个井（Well）的实时监控数据
  - 井的基本信息（名称、活动状态、测量深度）
  - 活动警报列表
  - Packoff 风险仪表盘（圆形进度条）
  - 工作流状态列表
  - 到达总深度的剩余天数

- **右侧聊天窗口**：AI 驱动的对话界面
  - AI 助手头像（带光晕效果）
  - 预设问题按钮
  - 消息输入和发送功能
  - 深色主题设计

## 技术栈

- **框架**：Angular 17
- **样式**：SCSS（深色主题）
- **字体**：Roboto（Google Fonts）
- **图标**：Material Icons

## 安装和运行

### 前置要求

- Node.js (推荐 v18 或更高版本)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm start
```

应用将在 `http://localhost:4200` 运行。

### 构建生产版本

```bash
npm run build
```

构建产物将保存在 `dist/odin-eye` 目录。

## 项目结构

```
src/
├── app/
│   ├── components/
│   │   ├── well-card/          # 井信息卡片组件
│   │   ├── packoff-risk-meter/ # Packoff风险仪表盘组件
│   │   └── chat-window/        # 聊天窗口组件
│   ├── models/
│   │   └── well.model.ts       # 数据模型定义
│   ├── services/
│   │   └── well.service.ts     # 数据服务（模拟数据）
│   ├── app.component.ts        # 主组件
│   └── app.module.ts           # 根模块
├── styles.scss                  # 全局样式
└── index.html                   # HTML 入口
```

## 功能特性

### Dashboard 功能

- ✅ 2x2 网格布局展示井信息
- ✅ 实时警报显示（红色指示器）
- ✅ Packoff 风险可视化（圆形进度条）
- ✅ 工作流状态标签（不同颜色表示不同状态）
- ✅ 响应式设计（移动端适配）

### 聊天功能

- ✅ AI 助手头像和动画效果
- ✅ 预设问题快速访问
- ✅ 消息发送和接收
- ✅ 窗口最小化/最大化
- ✅ 深色主题界面

## 下一步开发

1. **集成 AI SDK**：连接后端 API，实现实际的 AI 对话功能
2. **Swagger 集成**：实现自动分析和调用 Swagger API 接口
3. **实时数据更新**：连接 WebSocket 或轮询 API 获取实时数据
4. **更多图表**：添加更多数据可视化组件
5. **用户认证**：添加登录和权限管理

## 样式主题

项目使用深色主题，主要颜色：

- **背景色**：`#0a0e27`（深蓝黑）
- **卡片背景**：`#16213e` 到 `#0f3460`（渐变）
- **成功色**：`#4caf50`（绿色）
- **警告色**：`#ff9800`（橙色）
- **错误色**：`#f44336`（红色）
- **主色调**：`#2196f3`（蓝色）

## 许可证

MIT License
