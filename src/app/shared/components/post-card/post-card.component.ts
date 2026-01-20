import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../core/models/post.model';
import {
  LucideAngularModule,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  BookmarkCheck,
} from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() viewComments = new EventEmitter<Post>();

  readonly HeartIcon = Heart;
  readonly MessageCircleIcon = MessageCircle;
  readonly Share2Icon = Share2;
  readonly BookmarkIcon = Bookmark;
  readonly BookmarkCheckIcon = BookmarkCheck;

  isSaved: boolean = false;

  constructor(private authService: AuthService) {}

  get isLiked(): boolean {
    return false;
  }

  toggleLike(): void {}

  toggleSave(): void {
    this.isSaved = !this.isSaved;
    console.log('Post save status:', this.isSaved);
  }

  openComments(): void {
    this.viewComments.emit(this.post);
  }

  sharePost(): void {
    console.log('Share post:', this.post?.id);
  }
}
