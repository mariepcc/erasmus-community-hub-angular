import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";

export const routes: Routes = [
  {
    path: '',           // strona główna
    component: MainPageComponent
  },
  {
    path: 'login',      // osobna strona login
    component: LoginComponent,
  },
  {
    path: '**',         // catch-all, np. 404
    redirectTo: ''
  }
];
