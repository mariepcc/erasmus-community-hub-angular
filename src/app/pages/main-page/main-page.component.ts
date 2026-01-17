import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { CommentsModalComponent } from '../../shared/components/comments-modal/comments-modal.component';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    CreatePostComponent,
    PostCardComponent,
    CommentsModalComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  selectedPostForComments: Post | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.isLoading = false;
      }
    });
  }
}