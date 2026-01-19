import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Clock, Flame, Check, Plus, Info, Shield, Calendar, Inbox } from 'lucide-angular';
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
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  city?: City;
  posts$?: Observable<Post[]>;
  isJoined = false;
  sortBy: 'new' | 'best' = 'new';
  isCreateModalOpen = false;

  readonly ClockIcon = Clock; readonly FlameIcon = Flame; readonly CheckIcon = Check;
  readonly PlusIcon = Plus; readonly InfoIcon = Info; readonly ShieldIcon = Shield;
  readonly CalendarIcon = Calendar; readonly InboxIcon = Inbox;

  constructor(
    private route: ActivatedRoute, 
    private communityService: CommunityService, 
    public postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadCommunityData(params['id']);
    });
  }

  loadCommunityData(cityId: string) {
    this.communityService.getCityById(cityId).subscribe(data => {
      this.city = data;
      if (this.city) {
        this.posts$ = this.postService.getPostsByCommunity(this.city.id);
      }
    });
  }

  toggleJoin() { this.isJoined = !this.isJoined; }
  setSort(type: 'new' | 'best') { this.sortBy = type; }
  openCreateModal() { this.isCreateModalOpen = true; }
  closeCreateModal(event: any) { this.isCreateModalOpen = false; }
}