import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { SMTPConfigComponent } from './index';
//import { SMTPComponent } from './user/index';
import { TranslateModule } from 'ng2-translate';
@NgModule({
  imports: [TranslateModule,CommonModule,SharedModule,NgbModule],
  declarations: [
    SMTPConfigComponent
  ],
  exports: [TranslateModule,SMTPConfigComponent],
})
export class SMTPConfigModule { }
