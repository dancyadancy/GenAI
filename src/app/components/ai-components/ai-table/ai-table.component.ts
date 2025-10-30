import { Component, Input } from '@angular/core';
import { ComponentData, TableData } from '../../../models/ai-message.model';

@Component({
  selector: 'app-ai-table',
  templateUrl: './ai-table.component.html',
  styleUrls: ['./ai-table.component.scss']
})
export class AITableComponent {
  @Input() data!: TableData;

  get tableData(): TableData {
    return this.data;
  }
}