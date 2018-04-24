import { Route } from '@angular/router';
import { LicenseSystemComponent } from './license-system/index';
import { UserSystemComponent } from './user-system/index';
import { SMTPConfigComponent } from './smtp-config/index';
import { ConfigComponent } from './index';

export const ConfigRoutes: Route[] = [
  {
    path: 'config',
    component: ConfigComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: UserSystemComponent },
      { path: 'licence', component: LicenseSystemComponent },
      { path: 'smtp', component: SMTPConfigComponent },
    ]
  }
];
