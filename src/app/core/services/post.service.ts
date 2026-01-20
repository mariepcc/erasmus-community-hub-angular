import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);

  constructor(private authService: AuthService) {
    this.initializeMockPosts();
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  getPostsByCommunity(communityId: string): Observable<Post[]> {
    return this.postsSubject
      .asObservable()
      .pipe(map((posts) => posts.filter((p) => p.communityId === communityId)));
  }

  createPost(content: string, communityId: string, tags: string[] = []): void {
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'User',
      content,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      community: communityId,
      communityId: communityId,
      tags: tags,
      likedBy: [],
    };

    this.posts.unshift(newPost);
    this.postsSubject.next([...this.posts]);
  }

  likePost(postId: string): void {}

  private initializeMockPosts(): void {
    this.posts = [
      {
        id: '1',
        author: 'User',
        content:
          'Just arrived in Madrid! Any recommendations for the best tapas places? 🇪🇸',
        timestamp: new Date(Date.now() - 3600000),
        likes: 12,
        comments: [],
        community: 'Madrid',
        communityId: 'es-mad',
        tags: ['Advice'],
        likedBy: [],
      },
    ];
    this.postsSubject.next(this.posts);
  }
}
