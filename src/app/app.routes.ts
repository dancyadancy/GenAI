import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { RealtimeMonitoringPageComponent } from './pages/realtime-monitoring-page/realtime-monitoring-page.component';

export const routes: Routes = [
  { path: 'chatwithodin', component: ChatPageComponent },
  { path: 'realtime-monitoring', component: RealtimeMonitoringPageComponent },
  { path: '**', redirectTo: '' }
];
