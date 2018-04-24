import {Component, Input, Injectable} from '@angular/core';
import {ProductInfoServer, VersionInfoService} from '../../server/index';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'ab-login-footerbar',
  templateUrl: 'login-footerbar.component.html',
  styleUrls: ['login-footerbar.component.css'],
  providers: [NgbAlertConfig]
})

export class LoginFooterbarComponent {
  productInfo = {};
  productInfoErr: any;
  error: any;
  fullYear: any;
  versionInfo: any;

  constructor(private productInfoServer: ProductInfoServer, public versionInfoService: VersionInfoService, public translate: TranslateService) {

    productInfoServer.change.subscribe((value: number)=> {
      this.productInfo = value;
    });
    let myDate = new Date();
    this.fullYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    //初始化的时候获取信息
    this.getproductInfoMsg();
    this.getVersionInfo();
  }

  /**
   * 获取产品信息
   */
  getproductInfoMsg(): void {
    this.productInfoServer.getLoginProductInfo()
      .then(
        productInfo => {
          if (productInfo.productName) {
            this.productInfo = productInfo;
          } else {
            this.productInfoErr = productInfo;
          }
        },
        error => {
          this.error = error;
        }
      )

  }

  /**
   * 获取版本信息
   */
  getVersionInfo(): void {
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

