import { Component, Input } from '@angular/core';
import { ComponentData, ListData } from '../../../models/ai-message.model';

@Component({
  selector: 'app-ai-list',
  templateUrl: './ai-list.component.html',
  styleUrls: ['./ai-list.component.scss']
})
export class AIListComponent {
  @Input() data!: ListData;

  getStatusColor(status?: string): string {
    if (!status) return '#757575';
    switch (status.toLowerCase()) {
      case 'success':
      case 'valid':
        return '#4caf50';
      case 'warning':
      case 'action-needed':
        return '#ff9800';
      case 'error':
      case 'invalid':
        return '#f44336';
      default:
        return '#757575';
    }
  }
}
