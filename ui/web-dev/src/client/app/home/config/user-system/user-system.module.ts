import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { UserSystemComponent } from './index';
import { UserComponent } from './user/index';
import { TranslateModule } from 'ng2-translate';
@NgModule({
  imports: [TranslateModule,CommonModule,SharedModule,NgbModule],
  declarations: [
    UserSystemComponent,UserComponent
  ],
  exports: [TranslateModule,UserSystemComponent,UserComponent],
})
export class UserSystemModule { }
