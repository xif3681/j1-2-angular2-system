import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { PromptEmitService} from '../prompt-emit/index';
import {TranslateService} from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
// import { WindowService } from "../../windowserver";

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * 获取容器及服务
 */


@Injectable()
export class NameListService {
  constructor(private http: Http,public promptEmitService:PromptEmitService,private translate: TranslateService) {
  }

  /**
   * 获取容器
   */
  getContainer(): Promise<string[]> {
    return this.http.get(`/v1/containers`)
        .toPromise()
        .then(
          (res: Response) => {
            if(res.status == 200){
              return res.json() || { };
            }else if(res.status == 202){
              this.promptEmitService.change.emit(this.translate.instant('提示：获取容器信息失败,错误原因：')+this.translate.instant(res.json().code.toString()));
            }
          }
        )
        .catch(this.handleError);
  }
  /**
   * 获取服务
   */

  getServer(): Promise<string[]> {

    return this.http.get(`/v1/allservices`)
        .toPromise()
        .then(
          (res: Response) => {
            if(res.status == 200){
              return res.json() || { };
            }else if(res.status == 202){
              this.promptEmitService.change.emit(this.translate.instant('提示：获取服务信息失败,错误原因：')+this.translate.instant(res.json().code.toString()));
            }
          }
        )
        .catch(this.handleError);
  }
  /**
    * 错误处理
    */
  private handleError(error: any): Promise<any> {
    // alert('Server error')
    // console.error('An error occurred', error); // for demo purposes only
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }
}

