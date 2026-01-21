import { Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { setPersistence } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) {
    this.setSessionStoragePersistence();
    this.user$ = user(this.firebaseAuth);
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  register(
    email: string,
    username: string,
    password: string,
  ): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(async (response) => {
      await updateProfile(response.user, { displayName: username });
      return response;
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password));
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      sessionStorage.clear();
    });
    return from(promise);
  }
}
