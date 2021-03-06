import { Component,Injectable,EventEmitter } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import {  Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

/*
by: luo.chunxiang
2017.03.01
 */
@Injectable()
export class OpenAPIResService {

  public i:number = 0;
  constructor(private http: Http,private translate: TranslateService) {
  }

  /* 参数说明
  * url:请求路径
  * name:错误码后面添加的识别符
  * errorForm：显示错误形式
  * * 1.没有参数默认以头部提示样式提示错误信息
  * * 2.有参数返回错误信息
  * body：post请求参数
   */

  /**
   * get请求
   */
  getPromise(url:string): Promise<string[]> {
    return this.http
      .get(url)
      .toPromise()
      .then(
        (res: Response) => {
          return res;
        }
      )
      .catch(this.handleError);
  }

  /**
   * delete请求
   */
   delPromise(url:string): Promise<string[]> {
    return this.http
      .delete(url)
      .toPromise()
      .then((res:Response)=>{
        return res;
      })
      .catch(this.handleError);

  }
  /**
   * put请求
   */
  putPromise(url:string,body:string): Promise<string[]> {
      const postBody = JSON.parse(body);
      return this.http
        .put(url,JSON.stringify(postBody))
        .toPromise()
        .then(
          (res: Response) => {
            return res;
          }
        )
        .catch(this.handleError);
  }

  /**
   * post请求
   */
  postPromise(url: string,body:string): Promise<string[]> {
    const postBody = JSON.parse(body);
      return this.http
        .post(url, JSON.stringify(postBody))
        .toPromise()
        .then(
          (res: Response) => {
            return res;
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

