import { Component } from '@angular/core';
import {LicenceListComponent} from '../licence-list/licence-list.component';
import { ProductInfoServer} from '../../../../server/index';
/**
 * This class represents the lazy loaded LicenceComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ar-licence',
  templateUrl: 'licence.component.html',
  styleUrls: ['licence.component.css'],
  directives: [LicenceListComponent]
})
export class LicenceComponent {
  b:any;
  PendStatus:any;
  onCarChange(a):void{
    this.b = a;

  }

  constructor(public productInfoServer:ProductInfoServer ) {
  }
  ngOnInit() {
    this.getProductInfoMe();
  }

  /**
   * 发这条消息用来测试manage服务是否可以使用
   * 给界面这条提示信息 “manage 容器异常，请到容器与服务页面重启”
   */
  getProductInfoMe():void{
    this.PendStatus = 1;
    this.productInfoServer.getproductInfo()
      .then(
        overviews => {
          this.PendStatus = 0;
        },
        error => {
        }
      )
  }
}
