import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WellService } from './services/well.service';
import { Well } from './models/well.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OdinEye';
  wells: Well[] = [];
  isChatVisible: boolean = true;
  isChatPage: boolean = false;

  constructor(
    private wellService: WellService,
    private router: Router
  ) {
    // 监听路由变化
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isChatPage = event.urlAfterRedirects === '/chatwithodin' || event.url === '/chatwithodin';
    });
  }

  ngOnInit(): void {
    // 检查当前路由
    this.isChatPage = this.router.url === '/chatwithodin';
    if (!this.isChatPage) {
      this.loadWells();
    }
  }

  loadWells(): void {
    this.wellService.getWells().subscribe({
      next: (wells) => {
        this.wells = wells;
      },
      error: (error) => {
        console.error('Error loading wells:', error);
      }
    });
  }

  onChatHide(): void {
    this.isChatVisible = false;
  }

  onChatClose(): void {
    this.isChatVisible = false;
  }

  showChat(): void {
    this.isChatVisible = true;
  }
}