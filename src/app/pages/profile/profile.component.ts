import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Calendar, Mail, Edit, LayoutGrid, MessageSquare, Bookmark } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly MailIcon = Mail;
  readonly EditIcon = Edit;
  readonly PostsIcon = LayoutGrid;
  readonly CommentsIcon = MessageSquare;
  readonly SavedIcon = Bookmark;

  currentUser: any = null;
  activeTab: 'posts' | 'comments' | 'saved' = 'posts';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  setTab(tab: 'posts' | 'comments' | 'saved') {
    this.activeTab = tab;
  }
}