import { Component, Input } from '@angular/core';
import { ComponentData, ChartData } from '../../../models/ai-message.model';

@Component({
  selector: 'app-ai-chart',
  templateUrl: './ai-chart.component.html',
  styleUrls: ['./ai-chart.component.scss']
})
export class AIChartComponent {
  @Input() data!: ChartData;

  get chartData(): ChartData {
    return this.data;
  }

  getMaxValue(): number {
    if (!this.chartData.data || this.chartData.data.length === 0) return 100;
    return Math.max(...this.chartData.data.map((item: any) => item.value || 0));
  }
}
