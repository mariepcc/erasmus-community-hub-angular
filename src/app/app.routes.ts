import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CountrySelectorComponent } from './pages/selector/country-selector/country-selector.component';
import { CitySelectorComponent } from './pages/selector/city-selector/city-selector.component';
import { authGuard } from '../guards/auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { UserComponent } from './pages/user/user.component';
import { CommunityComponent } from './pages/community/community.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: MainPageComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'friends',
        component: FriendsComponent,
      },
      {
        path: 'user/:id',
        component: UserComponent,
      },
      {
        path: 'community/:id',
        component: CommunityComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'country-selector', component: CountrySelectorComponent },
      { path: 'city-selector', component: CitySelectorComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
