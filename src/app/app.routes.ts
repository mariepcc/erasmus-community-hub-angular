import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
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
  {
    path: 'user/:id',
    loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent)
  },
  { 
    path: 'community/:id', 
    loadComponent: () => import('./pages/community/community.component').then(m => m.CommunityComponent) 
  },
  { 
    path: '404', 
    component: NotFoundComponent 
  },
  { 
    path: '**', 
    redirectTo: '/404' 
  }
];