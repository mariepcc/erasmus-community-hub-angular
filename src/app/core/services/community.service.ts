import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class CommunityService {}
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);

  constructor(private authService: AuthService) {
    this.initializeMockPosts();
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  createPost(content: string, communityId: string, tags: string[] = []): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      community: communityId === 'public' ? 'Public Feed' : communityId,
      communityId: communityId,
      tags: tags,
      likedBy: []
    };

    this.posts.unshift(newPost);
    this.postsSubject.next([...this.posts]);
  }

  likePost(postId: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const post = this.posts.find(p => p.id === postId);
    if (post) {
      const index = post.likedBy.indexOf(currentUser.id);
      if (index > -1) {
        post.likedBy.splice(index, 1);
        post.likes--;
      } else {
        post.likedBy.push(currentUser.id);
        post.likes++;
      }
      this.postsSubject.next([...this.posts]);
    }
  }

  private initializeMockPosts(): void {
    // Przykładowe dane startowe
    this.postsSubject.next(this.posts);
  }
}