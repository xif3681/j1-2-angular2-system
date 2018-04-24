import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { PromptEmitService} from '../prompt-emit/index';
import { Observable } from 'rxjs/Observable';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging





/**
 * 获取点击启动，重启，停止按钮服务
 */

@Injectable()
export class UserStatusService {

  constructor(private http: Http,public promptEmitService:PromptEmitService,private translate: TranslateService) {
  }
  /**
   * 点击启动，重启，停止按钮
   */
  userStatusChange(id,state): Promise<string[]> {
    const url = `/manager/user/${id}/${state}`;
      return this.http
        .put(url)
        .toPromise()
        .then(
          (res: Response) => {
            if(res.status == 200){
              if(res._body == ''){
                return '';
              }else{
                return res.json() || { };
              }
            }else if(res.status == 202){
              this.promptEmitService.change.emit(res.json().code.toString()+'state');
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

