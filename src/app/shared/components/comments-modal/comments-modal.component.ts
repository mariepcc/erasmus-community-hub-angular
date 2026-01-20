import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'; // Dodaj OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  X,
  Send,
  MessageCircle,
  Heart,
} from 'lucide-angular';
import { Post, Comment } from '../../../core/models/post.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-comments-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
})
export class CommentsModalComponent implements OnInit {
  @Input() post!: Post;
  @Output() close = new EventEmitter<void>();

  readonly XIcon = X;
  readonly SendIcon = Send;
  readonly MessageIcon = MessageCircle;
  readonly HeartIcon = Heart;

  newCommentText = '';
  currentUser: any = null;

  ngOnInit(): void {}

  onClose(): void {
    this.close.emit();
  }

  addComment(): void {
    if (!this.newCommentText.trim() || !this.currentUser) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: this.currentUser,
      content: this.newCommentText,
      timestamp: new Date(),
      likes: 0,
    };

    if (!this.post.comments) {
      this.post.comments = [];
    }

    this.post.comments.push(newComment);
    this.newCommentText = '';
  }
}
