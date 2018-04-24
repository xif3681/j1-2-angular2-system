import { Route } from '@angular/router';
import { ManageComponent } from './index';
import { ContainerComponent } from './container/index';
import { StorageRoutes} from './storage/storage.routes';
import { ContainerRoutes} from './container/container.routes';
export const ManageRoutes: Route[] = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: '', redirectTo: 'storage', pathMatch: 'full' },
      ...StorageRoutes,
      { path: 'container', component: ContainerComponent },
    ]
  }
];
