import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  user$ = this.authService.user$;

  ngOnInit(): void {}

  async signOut() {
    try {
      await this.authService.logout();
      console.log('User signed out');
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error('Sign out error:', error);
      // Handle the error appropriately, e.g., show a message to the user
    }
  }
}
