// ===================================== 
// src/app/app.component.ts
// =====================================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
//import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
//import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
//import { ChatWidgetComponent } from './shared/components/chat-widget/chat-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    //SidebarComponent,
    //TopBarComponent,
    //ChatWidgetComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarOpen = false;
  isChatOpen = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  isAuthPage(): boolean {
    return this.router.url === '/' ||
           this.router.url === '/login' || 
           this.router.url === '/register' || 
           this.router.url === '/forgot-password';
  }
}