import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Search,
  Bell,
  MessageCircle,
  Plus,
  Menu,
  ChevronDown,
  Moon,
  Sun,
  LogOut,
} from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { Observable, take } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  private userService = inject(UserService);

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleChat = new EventEmitter<void>();
  @Output() toggleNotifications = new EventEmitter<void>();
  @Output() createPost = new EventEmitter<void>();

  @Input() isChatOpen = false;
  @Input() isNotificationsOpen = false;

  readonly SearchIcon = Search;
  readonly BellIcon = Bell;
  readonly MessageCircleIcon = MessageCircle;
  readonly PlusIcon = Plus;
  readonly MenuIcon = Menu;
  readonly ChevronDownIcon = ChevronDown;
  readonly MoonIcon = Moon;
  readonly SunIcon = Sun;
  readonly LogOutIcon = LogOut;

  currentUser$: Observable<User | null> = this.userService.currentUserProfile$;
  notificationCount = 2;
  isProfileOpen = false;
  isDarkMode = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('user');
    }
    if (this.isDarkMode) document.body.classList.add('dark-mode');
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onToggleChat(): void {
    this.toggleChat.emit();
  }

  onToggleNotifications(): void {
    this.toggleNotifications.emit();
  }

  onCreatePost(): void {
    this.createPost.emit();
  }

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
    this.currentUser$.pipe(take(1)).subscribe((user) => {
      console.log('Dane użytkownika:', user);
      console.log('URL awatara:', user?.avatarUrl);
    });
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.isProfileOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isProfileOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.isProfileOpen = false;
    }
  }
}
