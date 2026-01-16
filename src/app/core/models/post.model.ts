import { User } from './user.model';

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  community: string;
  likedBy?: string[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
}