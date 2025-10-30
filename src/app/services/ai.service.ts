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
  private apiUrl = 'YOUR_AI_API_URL'; // Replace with your AI API URL
  private apiKey = 'YOUR_API_KEY'; // Replace with your API key

  constructor(private http: HttpClient) { }

  /**
   * Call AI API to get a response
   * @param userMessage The user's message
   * @param conversationHistory Conversation history
   */
  getAIResponse(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Observable<AIMessage> {
    this.apiUrl = "http://localhost:3000/api/chat/agentscope";
    // Build prompt
    const prompt = this.buildPrompt(userMessage, conversationHistory);

    // If you have a real AI API, uncomment the code below
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

    // Simulated response (for development and testing)
    return of(this.simulateAIResponse(userMessage));
  }

  /**
   * Build Prompt
   */
  private buildPrompt(userMessage: string, history: AIMessage[]): string {
    let prompt = AI_PROMPT_TEMPLATE.replace('{{USER_QUESTION}}', userMessage);

    // Append conversation history context
    if (history.length > 0) {
      const historyContext = history
        .slice(-5) // Keep only the last 5 messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      prompt += `\n\n## Conversation History\n${historyContext}`;
    }

    return prompt;
  }

  /**
   * Build messages in OpenAI format
   */
  private buildMessages(history: AIMessage[], userMessage: string): any[] {
    const messages = [
      {
        role: 'system',
        content: AI_PROMPT_TEMPLATE.replace('{{USER_QUESTION}}', '')
      }
    ];

    // Add history messages
    history.forEach(msg => {
      if (msg.content) {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      }
    });

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage
    });

    return messages;
  }

  /**
   * Parse AI response
   */
  private parseAIResponse(response: any, userMessage: string): AIMessage {
    try {
      let content: string | undefined;
      let component: ComponentData | undefined;

      // If AI returns a JSON string
      if (typeof response.choices?.[0]?.message?.content === 'string') {
        const jsonStr = response.choices[0].message.content;
        const parsed = JSON.parse(jsonStr);
        content = parsed.content;
        component = parsed.component;
      }
      // If AI returns a JSON object directly
      else if (response.content || response.component) {
        content = response.content;
        component = response.component;
      }
      // If response is plain text
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
   * Simulated AI response (for testing)
   */
  private simulateAIResponse(userMessage: string): AIMessage {
    const lowerMessage = userMessage.toLowerCase();

    // Return different component types based on keywords
    if (lowerMessage.includes('table') || lowerMessage.includes('tabular') || lowerMessage.includes('status')) {
      return {
        role: 'assistant',
        content: 'Here is the well status data table:',
        component: {
          type: 'table',
          data: {
            headers: ['Well', 'Status', 'Alerts', 'Risk Score'],
            rows: [
              ['Well-001', 'Running', '2', '9.3'],
              ['Well-002', 'Running', '1', '7.8'],
              ['Well-003', 'Running', '3', '8.5'],
              ['Well-004', 'Running', '0', '6.2']
            ],
            title: 'Well Status Summary'
          }
        },
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('list') || lowerMessage.includes('alerts')) {
      return {
        role: 'assistant',
        content: 'Here is the list of active alerts:',
        component: {
          type: 'list',
          data: {
            title: 'Active Alerts',
            items: [
              { title: 'Abnormal Hookload', description: 'Well-001', icon: 'warning', status: 'High' },
              { title: 'Abnormal Hole Cleaning Index', description: 'Well-002', icon: 'warning', status: 'Medium' },
              { title: 'Drillstring Integrity Check', description: 'Well-003', icon: 'check_circle', status: 'Valid' },
              { title: 'Torque Anomaly', description: 'Well-001', icon: 'error', status: 'High' }
            ]
          }
        },
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('chart') || lowerMessage.includes('trend')) {
      return {
        role: 'assistant',
        content: 'This is the drilling performance trend chart:',
        component: {
          type: 'chart',
          data: {
            type: 'bar',
            title: 'Drilling Performance Comparison',
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
        content: 'I understand your question. I will analyze it and call the appropriate APIs to retrieve the required information.',
        timestamp: new Date()
      };
    }
  }

  /**
   * Fallback response (used when API fails)
   */
  private getFallbackResponse(userMessage: string): AIMessage {
    return {
      role: 'assistant',
      content: 'Sorry, the AI service is temporarily unavailable. Please try again later.',
      timestamp: new Date()
    };
  }
}