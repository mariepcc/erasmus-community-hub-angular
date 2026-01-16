// ===================================== 
// src/app/shared/components/top-bar/top-bar.component.ts
// =====================================
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleChat = new EventEmitter<void>();
  
  currentUser: User | null = null;
  searchQuery: string = '';
  showProfileMenu = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onToggleChat(): void {
    this.toggleChat.emit();
  }

  toggleProfile(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout(): void {
    this.authService.logout();
    this.showProfileMenu = false;
  }
}