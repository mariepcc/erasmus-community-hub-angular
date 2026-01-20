import { Component } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';
import { NotificationWidgetComponent } from '../notification-widget/notification-widget.component';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    TopBarComponent,
    ChatWidgetComponent,
    NotificationWidgetComponent,
    CreatePostModalComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isSidebarOpen = false;
  isChatOpen = false;
  isNotificationsOpen = false;
  isCreatePostOpen = false;
  isAuthenticated = false;
  isNotFoundPage = false;

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
