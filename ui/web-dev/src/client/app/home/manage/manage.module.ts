import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ManageComponent } from './manage.component';
import { NameListService } from '../../server/index';
import { PanelComponent } from "./container/panel/panel.component";
import { StatusComponent } from "./container/status/index";
import { ButtonGroupComponent } from "./container/button-group/index";
import { ManageNavbarComponent } from "./manage-navbar/index";
import { ContainerComponent } from './container/index';
import { StorageComponent } from './storage/index';
import { StorageModule } from './storage/storage.module';
import { StorageNavbarComponent } from './storage/storage-navbar/index';
import { AuthGuard } from './../../guards/index';
import { TranslateModule } from 'ng2-translate';
@NgModule({
  imports: [TranslateModule,CommonModule, SharedModule,NgbModule,StorageModule],
  declarations: [ManageComponent, PanelComponent,
    StatusComponent,ButtonGroupComponent,ManageNavbarComponent,
    ContainerComponent,StorageComponent,StorageNavbarComponent
],
  exports: [ManageComponent,TranslateModule],
  providers: [NameListService,AuthGuard]
})
export class ManageModule { }
