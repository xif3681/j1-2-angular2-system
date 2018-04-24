import { Component,Injectable,EventEmitter } from '@angular/core';
import { PromptEmitService} from '../prompt-emit/index';
import {TranslateService} from 'ng2-translate';

import {  Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * 获取许可证统计信息
 */

@Injectable()
export class DiskRaidInfoListService {
  public i:number = 0;
  constructor(private http: Http,public promptEmitService:PromptEmitService,private translate: TranslateService) {
  }
  /**
   * 获取列表信息
   */
  getDiskRaidInfoList(): Promise<string[]> {
    const url = `/v1/pd/canbeused`;
    return this.http
      .get(url)
      .toPromise()
      .then(
        (res: Response) => {
          if(res.status == 200){
            return res.json() || { };
          }else if(res.status == 202){
            this.promptEmitService.change.emit(res.json().code.toString()+'pdcanbeused');
          }
        }
      )
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

