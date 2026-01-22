import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Calendar,
} from 'lucide-angular';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'event';
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-notification-widget',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
})
export class NotificationWidgetComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  readonly BellIcon = Bell;
  readonly HeartIcon = Heart;
  readonly MessageCircleIcon = MessageCircle;
  readonly UserPlusIcon = UserPlus;
  readonly CalendarIcon = Calendar;

  notifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar:
          'https://label-magazine.com/images/article/2023/06-czerwiec/PORSCHExIGA_1.jpg',
      },
      message:
        'Sarah Johnson liked your post about Erasmus experience in Madrid',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar:
          'https://static0.cbrimages.com/wordpress/wp-content/uploads/2025/01/squid-game-season-2-thanos.JPG?w=1200&h=675&fit=crop',
      },
      message:
        'Mike Chen commented on your post: "This looks amazing! How long did you stay?"',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'follow',
      user: {
        name: 'Emma Wilson',
        avatar:
          'https://ocdn.eu/pulscms-transforms/1/EK_k9kuTURBXy8wMzlkMmNjMS1lODIwLTQzNjEtYWRjMy1kNmRjMzMyM2U2N2QuanBlZ5GVAs0EsADDw94AAaEwBQ',
      },
      message: 'Emma Wilson started following you',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'event',
      user: {
        name: 'Barcelona Community',
        avatar: 'https://hatscripts.github.io/circle-flags/flags/es.svg',
      },
      message:
        'New event in Barcelona: International Food Festival this weekend',
      time: '1 day ago',
      read: true,
    },
  ];

  markAsRead(id: string): void {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.notification-widget');
    const clickedButton = target.closest('.action-btn');

    if (this.isOpen && !clickedInside && !clickedButton) {
      this.close.emit();
    }
  }
}
