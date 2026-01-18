import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, MapPin, Calendar, MessageSquare, UserPlus, Heart, MessageCircle, Share2, Activity, Layout } from 'lucide-angular';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // Ikony
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly MessageIcon = MessageSquare;
  readonly UserPlusIcon = UserPlus;
  readonly ActivityIcon = Activity;
  readonly PostsIcon = Layout;

  activeTab = 'activity';
  isFollowing = false;
  user: any;

  activities = [
    { text: 'liked a post in Spain Community', date: '2 hours ago', icon: Heart },
    { text: 'commented on "Best Tapas in Madrid"', date: '5 hours ago', icon: MessageCircle },
    { text: 'joined the Erasmus Italy group', date: 'Yesterday', icon: Share2 }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.user = {
      id: id,
      name: id === '1' ? 'Sarah Johnson' : 'Erasmus Student',
      location: 'Madrid, Spain',
      avatar: `https://i.pravatar.cc/150?img=${id}`,
      email: 'student@erasmus.com'
    };
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }
}