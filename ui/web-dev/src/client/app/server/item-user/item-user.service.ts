import { Injectable,EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PromptEmitService } from '../prompt-emit/index';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {TranslateService} from 'ng2-translate';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * 获取许可证统计信息
 */

@Injectable()
export class ItemUserService {
  change: EventEmitter<any>;

  constructor(private http: Http,private promptEmitService:PromptEmitService,private translate: TranslateService) {
    this.change = new EventEmitter();
  }
  infoItemUser(id): Promise<string[]> {
    const url = `/manager/user/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then((res:Response)=>{
        if(res.status == 200){
          return res.json() || {}
        }else if (res.status == 202){
          this.promptEmitService.change.emit(res.json().code.toString()+'item');
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

