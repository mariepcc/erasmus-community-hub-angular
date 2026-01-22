import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  Clock,
  Flame,
  Check,
  Plus,
  Info,
  Shield,
  Calendar,
  Inbox,
} from 'lucide-angular';
import { CommunityService } from '../../core/services/community.service';
import { PostService } from '../../core/services/post.service';
import { CommunityCreatePostComponent } from './components/community-create-post/community-create-post.component';
import { Observable } from 'rxjs';
import { City } from '../../core/models/community.model';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CommunityCreatePostComponent],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  city: Partial<City> = { name: '', country: 'Erasmus', id: '' };
  posts$?: Observable<Post[]>;
  isJoined = false;
  sortBy: 'new' | 'best' = 'new';
  isCreateModalOpen = false;

  readonly ClockIcon = Clock;
  readonly FlameIcon = Flame;
  readonly CheckIcon = Check;
  readonly PlusIcon = Plus;
  readonly InfoIcon = Info;
  readonly ShieldIcon = Shield;
  readonly CalendarIcon = Calendar;
  readonly InboxIcon = Inbox;

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    public postService: PostService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cityName = params.get('id');
      if (cityName) {
        const formattedName =
          cityName.charAt(0).toUpperCase() + cityName.slice(1);
        this.city = {
          name: formattedName,
          country: '',
          id: cityName,
        };

        this.communityService.getCityById(cityName).subscribe((data) => {
          if (data) {
            this.city = data;
            this.posts$ = this.postService.getPostsByCommunity(data.id);
          } else {
            this.posts$ = this.postService.getPostsByCommunity(cityName);
          }
        });
      }
    });
  }

  toggleJoin() {
    this.isJoined = !this.isJoined;
  }

  setSort(type: 'new' | 'best') {
    this.sortBy = type;
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(refresh: boolean) {
    this.isCreateModalOpen = false;
    if (refresh && this.city.id) {
      this.posts$ = this.postService.getPostsByCommunity(this.city.id);
    }
  }
}
