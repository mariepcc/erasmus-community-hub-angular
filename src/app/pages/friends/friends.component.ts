import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Users,
  UserPlus,
  Search,
  Eye,
  MessageSquare,
  Send,
  X,
} from 'lucide-angular';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  readonly UsersIcon = Users;
  readonly UserPlusIcon = UserPlus;
  readonly SearchIcon = Search;
  readonly EyeIcon = Eye;
  readonly MessageIcon = MessageSquare;
  readonly SendIcon = Send;
  readonly CloseIcon = X;

  friends: Partial<User>[] = [
    {
      uid: '1',
      username: 'Sara Piątek ',
      country: 'Poland',
      university: 'UAM',
      joinedDate: 'Dec 2025',

      avatarUrl:
        'https://label-magazine.com/images/article/2023/06-czerwiec/PORSCHExIGA_1.jpg',
    },
    {
      uid: '2',
      username: 'Mike Chen',
      country: 'China',
      university: 'UB',
      joinedDate: 'Feb 2024',
      avatarUrl:
        'https://static0.cbrimages.com/wordpress/wp-content/uploads/2025/01/squid-game-season-2-thanos.JPG?w=1200&h=675&fit=crop',
    },
    {
      uid: '3',
      username: 'Emma Wilson',
      country: 'France',
      university: 'Sorbonne',
      joinedDate: 'Jun 2024',

      avatarUrl:
        'https://ocdn.eu/pulscms-transforms/1/EK_k9kuTURBXy8wMzlkMmNjMS1lODIwLTQzNjEtYWRjMy1kNmRjMzMyM2U2N2QuanBlZ5GVAs0EsADDw94AAaEwBQ',
    },
    {
      uid: '4',
      username: 'Alex Martinez',
      country: 'Italy',
      university: 'Sapienza',
      joinedDate: 'Jan 2026',

      avatarUrl: 'https://pbs.twimg.com/media/EWtQHpMWsAQXp1T.jpg',
    },
  ];

  activeChatUser: Partial<User> | null = null;
  newMessageContent: string = '';

  chatMessages: any[] = [
    {
      id: 'm1',
      content: 'Hey! How are you?',
      isMine: false,
      timestamp: new Date(),
    },
    {
      id: 'm2',
      content: 'I am great, thanks!',
      isMine: true,
      timestamp: new Date(),
    },
  ];

  constructor(private router: Router) {}

  openChat(user: Partial<User>): void {
    this.activeChatUser = user;
    this.newMessageContent = '';
    console.log('Opening chat with:', user.username);
  }

  closeChat(): void {
    this.activeChatUser = null;
  }

  sendMessage(): void {
    if (!this.newMessageContent.trim()) return;

    this.chatMessages.push({
      id: Date.now().toString(),
      content: this.newMessageContent,
      isMine: true,
      timestamp: new Date(),
    });

    this.newMessageContent = '';
  }

  navigateToProfile(user: Partial<User>): void {
    console.log('Kliknięto użytkownika:', user);
    if (user && user.uid) {
      this.router.navigate(['/user', user.uid], {
        state: { userData: user },
      });
    }
  }
}
