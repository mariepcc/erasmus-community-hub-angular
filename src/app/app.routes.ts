import { Routes } from "@angular/router";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { CountrySelectorComponent } from "./pages/selector/country-selector/country-selector.component";

export const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "country-selector",
    component: CountrySelectorComponent,
  },
];
