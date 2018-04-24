import { Component, Input ,Injectable,EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { PromptEmitService } from '../prompt-emit/index';
import {TranslateService} from 'ng2-translate';
// import 'rxjs/add/operator/do';  // for debugging
/**
 * 获取产品信息服务
 */
@Injectable()
export class ProductInfoServer {
  change: EventEmitter<any>;
  constructor(private http: Http,public promptEmitService:PromptEmitService,
              private translate: TranslateService) {
    this.change = new EventEmitter();
  }
  /**
   *获取产品信息
   */
  getproductInfo(): Promise<string[]> {
    const url = `/manager/productInfo`;
    return this.http
      .get(url)
      .toPromise()
      .then((res:Response)=>{
        if(res.status == 200){
          return res.json() || {}
        }else if (res.status == 202){
          this.promptEmitService.change.emit(res.json().code.toString()+'productInfo');
        }
      })
      .catch(this.handleError);
  }
  getLoginProductInfo(): Promise<string[]> {
    const url = `/manager/productInfo`;
    return this.http
      .get(url)
      .toPromise()
      .then((res:Response)=>{
        if(res.status == 200){
          return res.json() || {}
        }else if (res.status == 202){
          if(res.json().code.toString() == '3758358534'){
            return res.json().code.toString()+'loginProductInfo';
          }else {
            this.promptEmitService.change.emit(res.json().code.toString()+'productInfo');
          }
        }
      })
      .catch(this.handleError);
  }
  /**
   * 错误处理
   */
  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }
}

