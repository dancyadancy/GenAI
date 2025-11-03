import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realtime-monitoring-page',
  templateUrl: './realtime-monitoring-page.component.html',
  styleUrls: ['./realtime-monitoring-page.component.scss']
})
export class RealtimeMonitoringPageComponent {
  constructor(private router: Router) {}

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
