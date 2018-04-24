import { Routes } from '@angular/router';
import { LoginComponent} from './login/index';
import { HomeRoutes } from './home/index';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  ...HomeRoutes,
  { path: '**', redirectTo: '' }

];
