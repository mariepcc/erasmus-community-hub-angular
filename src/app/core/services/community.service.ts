import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { City } from '../models/community.model';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private cities: City[] = [
    {
      id: 'madrid',
      name: 'Madrid',
      country: 'Spain',
      memberCount: 2450,
      description:
        'The vibrant heart of Spain. Experience amazing tapas, Retiro Park, and an endless nightlife. Perfect for Erasmus students!',
      bannerGradient:
        'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
    },
    {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      memberCount: 1820,
      description:
        'The city of lights and love. Study in world-class universities and enjoy the artistic atmosphere of Montmartre.',
      bannerGradient: 'linear-gradient(135deg, #5D87FF 0%, #3b82f6 100%)',
    },
  ];

  getCityById(id: string): Observable<City | undefined> {
    return of(this.cities.find((c) => c.id === id.toLowerCase()));
  }
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);

  constructor(private authService: AuthService) {
    this.initializeMockPosts();
  }

  getPostsByCommunity(communityId: string): Observable<Post[]> {
    return new Observable((subscriber) => {
      this.postsSubject.subscribe((allPosts) => {
        const filtered = allPosts.filter((p) => p.communityId === communityId);
        subscriber.next(filtered);
      });
    });
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
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

  likePost(postId: string): void {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      const index = 1;
      if (index > -1) {
        post.likedBy.splice(index, 1);
        post.likes--;
      } else {
        post.likedBy.push();
        post.likes++;
      }
      this.postsSubject.next([...this.posts]);
    }
  }

  private initializeMockPosts(): void {
    this.postsSubject.next(this.posts);
  }
}
