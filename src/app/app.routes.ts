import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/main-page/main-page.component')
      .then(m => m.MainPageComponent),
    title: 'Home - Erasmus Community Hub'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];