import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CountrySelectorComponent } from './pages/selector/country-selector/country-selector.component';
import { CitySelectorComponent } from './pages/selector/city-selector/city-selector.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'country-selector',
    component: CountrySelectorComponent,
  },
  {
    path: 'city-selector',
    component: CitySelectorComponent,
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent,
      ),
  },
  {
    path: 'my-profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },
  {
    path: 'friends',
    loadComponent: () =>
      import('./pages/friends/friends.component').then(
        (m) => m.FriendsComponent,
      ),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./pages/user/user.component').then((m) => m.UserComponent),
  },
  {
    path: 'community/:id',
    loadComponent: () =>
      import('./pages/community/community.component').then(
        (m) => m.CommunityComponent,
      ),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
