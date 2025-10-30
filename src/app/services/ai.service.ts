import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AIMessage, ComponentData } from '../models/ai-message.model';
import { AI_PROMPT_TEMPLATE } from './ai-prompt.config';

export interface APIResponse {
  content?: string;
  component?: ComponentData;
}

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = 'YOUR_AI_API_URL'; // 替换为你的AI API地址
  private apiKey = 'YOUR_API_KEY'; // 替换为你的API密钥

  constructor(private http: HttpClient) { }

  /**
   * 调用AI API获取响应
   * @param userMessage 用户消息
   * @param conversationHistory 对话历史
   */
  getAIResponse(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Observable<AIMessage> {
    this.apiUrl = "http://localhost:3000/api/chat/agentscope";
    // 构建prompt
    const prompt = this.buildPrompt(userMessage, conversationHistory);

    // 如果有真实的AI API，取消注释以下代码
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    // const body = {
    //   messages: this.buildMessages(conversationHistory, userMessage),
    //   temperature: 0.7,
    //   response_format: { type: 'json_object' } // 如果需要JSON格式
    // };

    const body = {
      message: userMessage,
      sessionId: "aqvulekek"
    }

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => this.parseAIResponse(response, userMessage)),
      catchError(error => {
        console.error('AI API Error:', error);
        return of(this.getFallbackResponse(userMessage));
      })
    );

    // 模拟响应（用于开发和测试）
    return of(this.simulateAIResponse(userMessage));
  }

  /**
   * 构建Prompt
   */
  private buildPrompt(userMessage: string, history: AIMessage[]): string {
    let prompt = AI_PROMPT_TEMPLATE.replace('{{USER_QUESTION}}', userMessage);

    // 添加对话历史上下文
    if (history.length > 0) {
      const historyContext = history
        .slice(-5) // 只保留最近5条消息
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      prompt += `\n\n## 对话历史\n${historyContext}`;
    }

    return prompt;
  }

  /**
   * 构建OpenAI格式的消息数组
   */
  private buildMessages(history: AIMessage[], userMessage: string): any[] {
    const messages = [
      {
        role: 'system',
        content: AI_PROMPT_TEMPLATE.replace('{{USER_QUESTION}}', '')
      }
    ];

    // 添加历史消息
    history.forEach(msg => {
      if (msg.content) {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      }
    });

    // 添加当前用户消息
    messages.push({
      role: 'user',
      content: userMessage
    });

    return messages;
  }

  /**
   * 解析AI响应
   */
  private parseAIResponse(response: any, userMessage: string): AIMessage {
    try {
      let content: string | undefined;
      let component: ComponentData | undefined;

      // 如果AI返回的是JSON字符串
      if (typeof response.choices?.[0]?.message?.content === 'string') {
        const jsonStr = response.choices[0].message.content;
        const parsed = JSON.parse(jsonStr);
        content = parsed.content;
        component = parsed.component;
      }
      // 如果AI直接返回JSON对象
      else if (response.content || response.component) {
        content = response.content;
        component = response.component;
      }
      // 如果只是文本
      else {
        content = response.choices?.[0]?.message?.content || response.content || 'I understand your question.';
      }

      return {
        role: 'assistant',
        content,
        component,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Parse AI response error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  /**
   * 模拟AI响应（用于测试）
   */
  private simulateAIResponse(userMessage: string): AIMessage {
    const lowerMessage = userMessage.toLowerCase();

    // 根据关键词返回不同的组件类型
    if (lowerMessage.includes('table') || lowerMessage.includes('表格') || lowerMessage.includes('列表数据')) {
      return {
        role: 'assistant',
        content: '这是井的状态数据表格：',
        component: {
          type: 'table',
          data: {
            headers: ['井名', '状态', '警报数', '风险评分'],
            rows: [
              ['Well-001', '运行中', '2', '9.3'],
              ['Well-002', '运行中', '1', '7.8'],
              ['Well-003', '运行中', '3', '8.5'],
              ['Well-004', '运行中', '0', '6.2']
            ],
            title: '井状态汇总'
          }
        },
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('list') || lowerMessage.includes('清单') || lowerMessage.includes('警报')) {
      return {
        role: 'assistant',
        content: '这是活动警报列表：',
        component: {
          type: 'list',
          data: {
            title: '活动警报',
            items: [
              { title: '异常吊重', description: 'Well-001', icon: 'warning', status: 'High' },
              { title: '异常井眼清洁指数', description: 'Well-002', icon: 'warning', status: 'Medium' },
              { title: '钻杆完整性检查', description: 'Well-003', icon: 'check_circle', status: 'Valid' },
              { title: '扭矩异常', description: 'Well-001', icon: 'error', status: 'High' }
            ]
          }
        },
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('chart') || lowerMessage.includes('图表') || lowerMessage.includes('趋势')) {
      return {
        role: 'assistant',
        content: '这是钻井性能趋势图表：',
        component: {
          type: 'chart',
          data: {
            type: 'bar',
            title: '钻井性能对比',
            data: [
              { label: 'Well-001', value: 92 },
              { label: 'Well-002', value: 78 },
              { label: 'Well-003', value: 85 },
              { label: 'Well-004', value: 88 }
            ]
          }
        },
        timestamp: new Date()
      };
    } else {
      return {
        role: 'assistant',
        content: '我已理解您的问题。我将分析并调用相应的API接口来获取所需信息。',
        timestamp: new Date()
      };
    }
  }

  /**
   * 降级响应（API失败时使用）
   */
  private getFallbackResponse(userMessage: string): AIMessage {
    return {
      role: 'assistant',
      content: '抱歉，AI服务暂时不可用。请稍后再试。',
      timestamp: new Date()
    };
  }
}