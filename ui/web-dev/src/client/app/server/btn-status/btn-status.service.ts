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
export class BtnStatusService {

  constructor(private http: Http,public promptEmitService:PromptEmitService,private translate: TranslateService) {
  }
  /**
   * 点击启动，重启，停止按钮
   */
  btnStatusChange(alertDif: string,name: string,difStatus:string ,btnContainer:string): Promise<string[]> {
    const url = `/v1/${alertDif}/${name}/${difStatus}`;
      return this.http
        .post(url, JSON.stringify({"container": btnContainer}))
        .toPromise()
        .then(
          (res: Response) => {
            if(res.status == 200){
              return res.json() || { };
            }else if(res.status == 202){
              let hint = this.translate.instant('提示：');
              this.promptEmitService.change.emit(hint +name + this.translate.instant(difStatus) +
                this.translate.instant("失败,错误原因：")+this.translate.instant(res.json().code.toString()));
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

