import { User } from './user.model';

export interface Message {
  id: string;
  sender: User;
  recipient: User;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  user: User;
  lastMessage: Message;
  unreadCount: number;
}