import { User } from './user.model';

export interface Post {
  id: string;
  author: string;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  community: string;
  likedBy: string[];
  communityId: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
}
