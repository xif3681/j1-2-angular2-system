import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { DiskComponent } from './disk/index';
import { RaidComponent } from './raid/index';
import { RollComponent } from './roll/index';
import { TranslateModule } from "ng2-translate";

@NgModule({
  imports: [TranslateModule,CommonModule,SharedModule,NgbModule],
  declarations: [
    DiskComponent,RaidComponent,RollComponent
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class StorageModule { }
