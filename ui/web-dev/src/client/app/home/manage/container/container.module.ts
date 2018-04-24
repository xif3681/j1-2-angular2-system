import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { ContainerComponent} from './container.component';
import { NameListService } from '../../../server/index';
import { PanelComponent } from "./panel/panel.component";
import { StatusComponent } from "./status/index";
import { ButtonGroupComponent } from "./button-group/index";
import { ManageNavbarComponent } from "./../manage-navbar/index";
import { TranslateModule } from "ng2-translate";
@NgModule({
  imports: [TranslateModule,CommonModule, SharedModule,NgbModule],
  declarations: [ContainerComponent, PanelComponent,
    StatusComponent,ButtonGroupComponent,ManageNavbarComponent],
  exports: [ContainerComponent,TranslateModule],
  providers: [NameListService]
})
export class ContainerModule { }
