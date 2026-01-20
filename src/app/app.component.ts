import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { ChatWidgetComponent } from './shared/components/chat-widget/chat-widget.component';
import { NotificationWidgetComponent } from './shared/components/notification-widget/notification-widget.component';
import { CreatePostModalComponent } from './shared/components/create-post-modal/create-post-modal.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TopBarComponent,
    ChatWidgetComponent,
    NotificationWidgetComponent,
    CreatePostModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isSidebarOpen = false;
  isChatOpen = false;
  isNotificationsOpen = false;
  isCreatePostOpen = false;
  isAuthenticated = false;
  isNotFoundPage = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth),
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isNotFoundPage = event.urlAfterRedirects === '/404';
      });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) this.isNotificationsOpen = false;
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) this.isChatOpen = false;
  }

  closeChat(): void {
    this.isChatOpen = false;
  }
  closeNotifications(): void {
    this.isNotificationsOpen = false;
  }
  openCreatePost(): void {
    this.isCreatePostOpen = true;
  }
  closeCreatePost(): void {
    this.isCreatePostOpen = false;
  }
}
