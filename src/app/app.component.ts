// ===================================== 
// src/app/app.component.ts
// =====================================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { ChatWidgetComponent } from './shared/components/chat-widget/chat-widget.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TopBarComponent,
    ChatWidgetComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarOpen = false;
  isChatOpen = false;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  // Funkcja do sprawdzania, czy jesteśmy na stronie login
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
