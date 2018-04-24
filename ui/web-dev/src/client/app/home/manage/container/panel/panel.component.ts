import { Component, Input, OnInit } from '@angular/core';
import { StatusComponent } from '../status/index';
import { ButtonGroupComponent } from '../button-group/index';
import {NameListService} from '../../../../server/index';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'my-panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.css'],
  providers: [NameListService],
  inputs: ['Title','Names','tHeadNames']
})

export class PanelComponent{

   onBtnItemChange(item: any, value: any) {
     item.name = value.name;
     item.container = value.container;
     item.status = value.status;
     item.cpu_percent = value.cpu_percent;
     item.mem_percent = value.mem_percent;
  }
}
