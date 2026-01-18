// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/main-page/main-page.component').then(m => m.MainPageComponent)
  },
  {
    path: 'my-profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'friends',
    loadComponent: () => import('./pages/friends/friends.component').then(m => m.FriendsComponent)
  },
  // NOWA TRASA MUSI BYĆ TUTAJ (przed **)
  {
    path: 'user/:id',
    loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];