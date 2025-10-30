import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AIMessage } from '../../models/ai-message.model';
import { AIService } from '../../services/ai.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  @Input() standaloneMode: boolean = false;
  @Output() hide = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  messages: AIMessage[] = [];
  inputMessage: string = '';
  isOpen: boolean = true;
  isLoading: boolean = false;

  presetQuestions = [
    {
      icon: 'description',
      text: '显示所有井的状态表格'
    },
    {
      icon: 'warning',
      text: '显示活动警报列表'
    },
    {
      icon: 'show_chart',
      text: '显示钻井性能趋势图表'
    }
  ];

  constructor(
    private router: Router,
    private aiService: AIService
  ) {}

  ngOnInit(): void {
    // 可以在这里加载历史消息
  }

  sendMessage(): void {
    if (!this.inputMessage.trim() || this.isLoading) return;

    // 添加用户消息
    const userMessage: AIMessage = {
      role: 'user',
      content: this.inputMessage,
      timestamp: new Date()
    };
    this.messages.push(userMessage);

    // 调用AI服务
    this.isLoading = true;
    this.aiService.getAIResponse(this.inputMessage, this.messages).subscribe({
      next: (response) => {
        this.messages.push(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error getting AI response:', error);
        this.messages.push({
          role: 'assistant',
          content: '抱歉，处理您的请求时出现错误。请稍后再试。',
          timestamp: new Date()
        });
        this.isLoading = false;
      }
    });

    this.inputMessage = '';
  }

  sendPresetQuestion(question: string): void {
    this.inputMessage = question;
    this.sendMessage();
  }

  toggleWindow(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.hide.emit();
    }
  }

  hideWindow(): void {
    this.isOpen = false;
    this.hide.emit();
  }

  closeWindow(): void {
    if (this.standaloneMode) {
      window.close();
      this.router.navigate(['/']);
    } else {
      this.close.emit();
    }
  }

  openInNewWindow(): void {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/chatwithodin']));
    window.open(url, '_blank');
  }
}