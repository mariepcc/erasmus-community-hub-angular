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

  createPost(content: string, imageUrl?: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      imageUrl,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      community: currentUser.city,
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
          email: 'sarah@example.com',
          avatar: 'https://i.pravatar.cc/150?img=5',
          university: 'Complutense University',
          country: 'Spain',
          city: 'Madrid',
          isOnline: true
        },
        content: 'Just arrived in Madrid! Any recommendations for the best tapas places? 🇪🇸',
        timestamp: new Date(Date.now() - 3600000),
        likes: 12,
        comments: [],
        community: 'Madrid',
        likedBy: []
      },
      {
        id: '2',
        author: {
          id: '3',
          username: 'Emma Wilson',
          email: 'emma@example.com',
          avatar: 'https://i.pravatar.cc/150?img=9',
          university: 'La Sapienza',
          country: 'Italy',
          city: 'Rome',
          isOnline: false
        },
        content: 'Weekend trip to Florence was absolutely breathtaking! 🏛️',
        imageUrl: 'https://images.unsplash.com/photo-1543429258-17e9c0e6e449?w=800',
        timestamp: new Date(Date.now() - 7200000),
        likes: 24,
        comments: [],
        community: 'Rome',
        likedBy: []
      },
      {
        id: '3',
        author: {
          id: '4',
          username: 'Lucas Schmidt',
          email: 'lucas@example.com',
          avatar: 'https://i.pravatar.cc/150?img=12',
          university: 'TU Berlin',
          country: 'Germany',
          city: 'Berlin',
          isOnline: true
        },
        content: 'Found an amazing coworking space near Alexanderplatz! Perfect for studying ☕',
        timestamp: new Date(Date.now() - 10800000),
        likes: 8,
        comments: [],
        community: 'Berlin',
        likedBy: []
      }
    ];
    
    this.postsSubject.next(this.posts);
  }
}