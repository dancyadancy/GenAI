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
      text: 'Show status table for all wells'
    },
    {
      icon: 'warning',
      text: 'Show active alerts list'
    },
    {
      icon: 'show_chart',
      text: 'Show drilling performance trend chart'
    }
  ];

  constructor(
    private router: Router,
    private aiService: AIService
  ) {}

  ngOnInit(): void {
    // Load conversation history here if needed
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
          content: 'Sorry, an error occurred while processing your request. Please try again later.',
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