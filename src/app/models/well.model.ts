// 数据模型定义

export interface Alarm {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low';
}

export interface WorkflowStatus {
  name: string;
  status: 'valid' | 'action-needed' | 'invalid';
}

export interface Well {
  id: string;
  name: string;
  activity: string;
  measuredDepth: number;
  unit: 'ft' | 'm';
  activeAlarms: Alarm[];
  packoffRisk: {
    score: number;
    maxScore: number;
  };
  workflows: WorkflowStatus[];
  daysToTotalDepth: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
