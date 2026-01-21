import { Injectable, inject } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  get currentUserProfile$(): Observable<User | null> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user.uid);
        return docData(ref) as Observable<User>;
      }),
    );
  }

  addUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
