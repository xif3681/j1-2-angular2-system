import { Component, Input ,Injectable } from '@angular/core';
import { ProductInfoServer,VersionInfoService } from '../../server/index';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'ab-footerbar',
  templateUrl: 'footerbar.component.html',
  styleUrls: ['footerbar.component.css']
})

export class FooterbarComponent {
  productInfo = {
  };
  error:any;
  fullYear:any;
  versionInfo:any;
  constructor(private productInfoServer:ProductInfoServer,public versionInfoService:VersionInfoService) {
    productInfoServer.change.subscribe((value:number)=>{
      this.productInfo = value;
    });
    //初始化的时候获取信息
    this.getproductInfoMsg();
    this.getVersionInfo();
    let myDate = new Date();
    this.fullYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  }
  getproductInfoMsg():void{
    this.productInfoServer.getproductInfo()
      .then(
        productInfo => {
          this.productInfo = productInfo;
        },
        error => {
          this.error = error;
        }
      )

  }
  /**
   * 获取版本信息信息
   */
  getVersionInfo():void{
    let me = this;
    this.versionInfoService.getVersion()
      .then(
        versionInfo => {
          me.versionInfo = versionInfo;
        },
        error => {
          this.error = error;
        }
      )
  }
}

