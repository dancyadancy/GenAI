import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-packoff-risk-meter',
  templateUrl: './packoff-risk-meter.component.html',
  styleUrls: ['./packoff-risk-meter.component.scss']
})
export class PackoffRiskMeterComponent {
  @Input() score: number = 0;
  @Input() maxScore: number = 10;

  get percentage(): number {
    return (this.score / this.maxScore) * 100;
  }

  get color(): string {
    if (this.percentage >= 80) return '#f44336'; // red
    if (this.percentage >= 60) return '#ff9800'; // orange
    return '#4caf50'; // green
  }

  get strokeDasharray(): string {
    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (circumference * this.percentage / 100);
    return `${circumference} ${circumference}`;
  }

  get strokeDashoffset(): number {
    const circumference = 2 * Math.PI * 45;
    return circumference - (circumference * this.percentage / 100);
  }
}
