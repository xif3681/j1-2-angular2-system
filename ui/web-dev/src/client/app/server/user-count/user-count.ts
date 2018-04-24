import { Component,Injectable,EventEmitter } from '@angular/core';
import { PromptEmitService} from '../prompt-emit/index';


import {  Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * 服务
 */

@Injectable()
export class UserCountService {
  constructor(private http: Http,public promptEmitService:PromptEmitService) {
  }
  /**
   * 获取授权码总数
   */
  getUserCount(): Promise<string[]> {
    const url = `/manager/user/count`;
    return this.http
      .get(url)
      .toPromise()
      .then( (res: Response) => {
        if(res.status == 200){
          return res.json() || { };
        }else if(res.status == 202){
          this.promptEmitService.change.emit('提示：无法获取用户总数,错误原因：'+res.json().errmsg);
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

