import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LicenseSystemComponent } from './license-system.component';
import { SharedModule } from '../../../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from 'ng2-translate';
// import { ConfigNavbarComponent } from './../config-navbar/config-navbar.component';
import { LicenceComponent } from './licence/licence.component';
import { LicenceListComponent } from './licence-list/licence-list.component';
// import { LicenceListComponent,LicenceListService } from './licence-list/licence-list.component';


@NgModule({
  imports: [TranslateModule,CommonModule,SharedModule,FormsModule,NgbModule.forRoot()/* RouterModule.forRoot(configRoutes),*//*, OtherModule, LicenceModule*/],
  declarations: [LicenseSystemComponent,LicenceComponent,LicenceListComponent,OverviewComponent/*ConfigNavbarComponent,LicenceComponent,OverviewComponent,LicenceListComponent/*, SharedModule,OtherModule,LicenceModule*/],
  exports: [TranslateModule,LicenseSystemComponent/*,OtherModule,LicenceModule*/]
})

export class LicenseSystemModule { }
