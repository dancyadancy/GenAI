import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WellService } from './services/well.service';
import { Well } from './models/well.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'OdinEye';
  wells: Well[] = [];
  isChatVisible: boolean = true;
  isChatPage: boolean = false;
  private wellsSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(
    private wellService: WellService,
    private router: Router
  ) {
    // 监听路由变化
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.isChatPage = event.url === '/chatwithodin';
      this.manageWellSubscription();
    });
  }

  ngOnInit(): void {
    // 检查当前路由
    this.isChatPage = this.router.url === '/chatwithodin';
    this.manageWellSubscription();
  }

  ngOnDestroy(): void {
    this.wellsSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  loadWells(): void {
    if (this.wellsSubscription) {
      return;
    }

    this.wellsSubscription = this.wellService.getWells().subscribe({
      next: (wells) => {
        this.wells = wells;
      },
      error: (error) => {
        console.error('Error loading wells:', error);
      }
    });
  }

  private manageWellSubscription(): void {
    if (this.isChatPage) {
      this.wellsSubscription?.unsubscribe();
      this.wellsSubscription = undefined;
      return;
    }

    this.loadWells();
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