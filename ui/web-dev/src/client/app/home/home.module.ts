import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from 'ng2-translate';
// import { ManageComponent } from './manage/index';
// import { ConfigComponent } from './config/index';
import { ConfigModule } from './config/config.module';
import { ManageModule } from './manage/manage.module';
@NgModule({
  imports: [CommonModule,SharedModule,NgbModule, ConfigModule, ManageModule,TranslateModule],
  declarations: [
    // ManageComponent,ConfigComponent
  ],
  exports: [TranslateModule],
})
export class HomeModule { }
