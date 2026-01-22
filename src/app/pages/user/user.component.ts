import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  MapPin,
  Calendar,
  MessageSquare,
  UserPlus,
  Heart,
  MessageCircle,
  Share2,
  Activity,
  Layout,
  Send,
  X,
} from 'lucide-angular';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly MessageIcon = MessageSquare;
  readonly UserPlusIcon = UserPlus;
  readonly ActivityIcon = Activity;
  readonly PostsIcon = Layout;
  readonly SendIcon = Send;
  readonly CloseIcon = X;

  activeTab = 'activity';
  isFollowing = false;
  user: any;
  activeChatUser: any = null;
  newMessageContent: string = '';

  chatMessages: any[] = [
    {
      id: 'm1',
      content: 'Hey! I saw your activity in the Madrid group. Welcome!',
      isMine: false,
      timestamp: new Date(),
    },
    {
      id: 'm2',
      content: 'Thanks! Happy to be here.',
      isMine: true,
      timestamp: new Date(),
    },
  ];

  activities = [
    {
      text: 'liked a post in Spain Community',
      date: '2 hours ago',
      icon: Heart,
    },
    {
      text: 'commented on "Best Tapas in Madrid"',
      date: '5 hours ago',
      icon: MessageCircle,
    },
    { text: 'joined the Erasmus Italy group', date: 'Yesterday', icon: Share2 },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const state = window.history.state;
    if (state && state.userData) {
      this.user = state.userData;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('uid');
    this.user = {
      id: id,
      name: this.user.username,
      location: this.user.country,
      avatar: this.user.avatarUrl,
      joinedDate: this.user.joinedDate,
    };
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  openChat(): void {
    this.activeChatUser = this.user;
    this.newMessageContent = '';
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
}
