import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Auto-login mock user for testing
    this.autoLogin();
  }

  private autoLogin(): void {
    const mockUser: User = {
      id: '1',
      username: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      university: 'University of Technology',
      country: 'Spain',
      city: 'Barcelona',
      isOnline: true
    };
    this.currentUserSubject.next(mockUser);
    this.isAuthenticatedSubject.next(true);
  }

  login(email: string, password: string): void {
    const mockUser: User = {
      id: '1',
      username: 'John Doe',
      email: email,
      avatar: 'https://i.pravatar.cc/150?img=1',
      university: 'University of Technology',
      country: 'Spain',
      city: 'Barcelona',
      isOnline: true
    };
    this.currentUserSubject.next(mockUser);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}