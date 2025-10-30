import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WellCardComponent } from './components/well-card/well-card.component';
import { PackoffRiskMeterComponent } from './components/packoff-risk-meter/packoff-risk-meter.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { AITableComponent } from './components/ai-components/ai-table/ai-table.component';
import { AIListComponent } from './components/ai-components/ai-list/ai-list.component';
import { AIChartComponent } from './components/ai-components/ai-chart/ai-chart.component';
import { AIComponentRendererComponent } from './components/ai-components/ai-component-renderer/ai-component-renderer.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    WellCardComponent,
    PackoffRiskMeterComponent,
    ChatWindowComponent,
    ChatPageComponent,
    AITableComponent,
    AIListComponent,
    AIChartComponent,
    AIComponentRendererComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    ChatWindowComponent // 导出以便其他组件使用
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
