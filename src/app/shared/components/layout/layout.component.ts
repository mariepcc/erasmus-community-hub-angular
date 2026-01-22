import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';
import { NotificationWidgetComponent } from '../notification-widget/notification-widget.component';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
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
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  private el = inject(ElementRef);

  isSidebarOpen = true;
  isChatOpen = false;
  isNotificationsOpen = false;
  isCreatePostOpen = false;

  ngOnInit(): void {
    this.updateSidebarState();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSidebarState();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (window.innerWidth <= 1024 && this.isSidebarOpen) {
      const target = event.target as HTMLElement;
      const sidebarElement = this.el.nativeElement.querySelector('app-sidebar');
      const menuButton = this.el.nativeElement.querySelector('.menu-toggle');

      if (
        sidebarElement &&
        !sidebarElement.contains(target) &&
        !menuButton?.contains(target)
      ) {
        this.isSidebarOpen = false;
      }
    }
  }

  private updateSidebarState(): void {
    if (window.innerWidth <= 1024) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
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
