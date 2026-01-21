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
      username: 'Sarah Johnson',
      country: 'Spain',
      university: 'UAM',
    },
    {
      uid: '2',
      username: 'Mike Chen',
      country: 'Spain',
      university: 'UB',
    },
    {
      uid: '3',
      username: 'Emma Wilson',
      country: 'France',
      university: 'Sorbonne',
    },
    {
      uid: '4',
      username: 'Alex Martinez',
      country: 'Italy',
      university: 'Sapienza',
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
    console.log('Opening chat with:', user.username); // Debugging
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

  navigateToProfile(friendId?: string): void {
    if (friendId) this.router.navigate(['/user', friendId]);
  }
}
