import { Route } from '@angular/router';
import { HomeComponent } from './index';
import { AuthGuard } from './../guards/index';
import { ConfigRoutes } from './config/index';
import { ManageRoutes } from './manage/index';
export const HomeRoutes: Route[] = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'manage', pathMatch: 'full' },
      ...ManageRoutes,
      ...ConfigRoutes
    ]
  },
];
