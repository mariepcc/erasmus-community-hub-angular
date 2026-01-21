import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  MapPin,
  Calendar,
  Mail,
  Edit,
  LayoutGrid,
  MessageSquare,
  Bookmark,
} from 'lucide-angular';
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);

  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly MailIcon = Mail;
  readonly EditIcon = Edit;
  readonly PostsIcon = LayoutGrid;
  readonly CommentsIcon = MessageSquare;
  readonly SavedIcon = Bookmark;

  userProfile$: Observable<User | null> = this.userService.currentUserProfile$;

  defaultAvatar =
    'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';

  activeTab: 'posts' | 'comments' | 'saved' = 'posts';

  ngOnInit(): void {}

  setTab(tab: 'posts' | 'comments' | 'saved') {
    this.activeTab = tab;
  }
}
