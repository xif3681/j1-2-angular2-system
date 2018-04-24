import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';
import { UserSystemModule } from './user-system/user-system.module';
import { UserSystemComponent } from './user-system/user-system.component';
import { LicenseSystemComponent } from './license-system/license-system.component';
import { SMTPConfigComponent } from './smtp-config/smtp-config.component';
import { SMTPConfigModule } from './smtp-config/smtp-config.module';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from 'ng2-translate';
// import { OverviewComponent } from './license-system/overview/overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigNavbarComponent } from './config-navbar/config-navbar.component';
// import { LicenceComponent } from './license-system/licence/licence.component';
// import { LicenceListComponent } from './license-system/licence-list/licence-list.component';


@NgModule({
    imports: [TranslateModule,CommonModule,SharedModule,FormsModule,UserSystemModule,SMTPConfigModule,NgbModule.forRoot()],
    declarations: [ConfigComponent,ConfigNavbarComponent/*,LicenceComponent,OverviewComponent,LicenceListComponent*/],
    exports: [TranslateModule,ConfigComponent]
})

export class ConfigModule { }
