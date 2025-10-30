import { Component, Input } from '@angular/core';
import { Well } from '../../models/well.model';

@Component({
  selector: 'app-well-card',
  templateUrl: './well-card.component.html',
  styleUrls: ['./well-card.component.scss']
})
export class WellCardComponent {
  @Input() well!: Well;

  getStatusColor(status: string): string {
    switch (status) {
      case 'valid':
        return '#4caf50';
      case 'action-needed':
        return '#ff9800';
      case 'invalid':
        return '#f44336';
      default:
        return '#757575';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'valid':
        return 'Valid';
      case 'action-needed':
        return 'Action needed';
      case 'invalid':
        return 'Invalid';
      default:
        return status;
    }
  }
}
