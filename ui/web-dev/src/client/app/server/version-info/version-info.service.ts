import { Component,Injectable,EventEmitter } from '@angular/core';
import { PromptEmitService} from '../prompt-emit/index';


import {  Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * 获取许可证统计信息
 */

@Injectable()
export class VersionInfoService {
  public i: number = 0;
  // private host = 'http://192.168.84.140:10000';
  constructor(private http: Http, public promptEmitService: PromptEmitService) {
  }

  /**
   *
   */
  getVersion(): Promise<string[]> {
    // const url = `${this.host}/v1/version`;
    const url = `/v1/version`;
    return this.http
      .get(url)
      .toPromise()
      .then(
        (res: Response) => {
          if (res.status == 200) {
            return res.json() || {};
          } else if (res.status == 202) {
            this.promptEmitService.change.emit('提示：无法获取版本信息,错误原因：' + res.json().message);
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
