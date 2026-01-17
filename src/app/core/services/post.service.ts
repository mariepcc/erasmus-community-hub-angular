import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
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

  // Zaktualizowana metoda przyjmująca 3 parametry
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
      community: communityId === 'public' ? 'Public' : communityId, // Prosta logika nazwy
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
    if (!post) return;

    if (post.likedBy?.includes(currentUser.id)) {
      post.likedBy = post.likedBy.filter(id => id !== currentUser.id);
      post.likes--;
    } else {
      post.likedBy = [...(post.likedBy || []), currentUser.id];
      post.likes++;
    }

    this.postsSubject.next([...this.posts]);
  }

  private initializeMockPosts(): void {
  this.posts = [
    {
      id: '1',
      author: {
        id: '2',
        username: 'Sarah Johnson',
        email: 'sarah@example.com', // Dodane
        avatar: 'https://i.pravatar.cc/150?img=5',
        university: 'Complutense University', // Dodane
        country: 'Spain', // Dodane
        city: 'Madrid',
        isOnline: true
      },
      content: 'Just arrived in Madrid! Any recommendations for the best tapas places? 🇪🇸',
      timestamp: new Date(Date.now() - 3600000),
      likes: 12,
      comments: [],
      community: 'Madrid',
      communityId: 'es-mad',
      tags: ['Advice'],
      likedBy: []
    }
  ];
  this.postsSubject.next(this.posts);
}
}