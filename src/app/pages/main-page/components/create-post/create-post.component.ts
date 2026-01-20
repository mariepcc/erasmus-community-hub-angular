import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../../core/services/post.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postContent = '';
  isExpanded = false;
  currentUser: any = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  expandEditor(): void {
    this.isExpanded = true;
  }

  createPost(): void {
    const trimmed = this.postContent.trim();
    if (trimmed) {
      this.postService.createPost(trimmed, 'public', []);
      this.postContent = '';
    }
  }

  cancel(): void {
    this.resetEditor();
  }

  private resetEditor(): void {
    this.postContent = '';
    this.isExpanded = false;
  }
}
