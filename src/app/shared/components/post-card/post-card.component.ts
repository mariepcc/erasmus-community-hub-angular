import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../core/models/post.model';
import { LucideAngularModule, Heart, MessageCircle, Share2 } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() viewComments = new EventEmitter<Post>();
  
  readonly HeartIcon = Heart;
  readonly MessageCircleIcon = MessageCircle;
  readonly Share2Icon = Share2;

  constructor(private authService: AuthService) {}

  get isLiked(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !this.post?.likedBy) return false;
    return this.post.likedBy.includes(currentUser.id);
  }

  toggleLike(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !this.post) return;
    
    if (!this.post.likedBy) {
      this.post.likedBy = [];
    }

    if (this.isLiked) {
      this.post.likedBy = this.post.likedBy.filter(id => id !== currentUser.id);
      this.post.likes = Math.max(0, (this.post.likes || 1) - 1);
    } else {
      this.post.likedBy.push(currentUser.id);
      this.post.likes = (this.post.likes || 0) + 1;
    }
  }

  openComments(): void {
    this.viewComments.emit(this.post);
  }

  sharePost(): void {
    console.log('Share post:', this.post?.id);
  }
}