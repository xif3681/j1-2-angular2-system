import { Component, Input ,Injectable } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeComponent } from '../index';
import { PromptEmitService } from '../../server/prompt-emit/index';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * 获取许可证统计信息
 */

@Injectable()
export class QrcodeService {

  constructor(private http: Http,public promptEmitService:PromptEmitService) {
  }
  /**
   * 点击启动，重启，停止按钮
   */
  getQrcode(): Promise<string[]> {
    const url = `/manager/machineCode`;
    return this.http
      .get(url)
      .toPromise()
      .then((res:Response)=>{
        if(res.status == 200){
          return res.json() || {}
        }else if (res.status == 202){
          this.promptEmitService.change.emit('提示：无法获取机器码,错误原因：'+res.json().code);
        }
      })
      .catch(this.handleError);

  }

  /**
   *返回数据
   */
  private extractData(res: Response) {
    let data = res.json();
    return data || { };

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


@Component({
  moduleId: module.id,
  selector: 'ar-modal-content-qrcode',
  directives: [QRCodeComponent],
  templateUrl: 'modal-content-qrcode.component.html',
  styleUrls: ['modal-content-qrcode.component.css'],
  input: ['title','body']
})

export class ModalContentQrcode {
  qrcode:any;
  error:any;
  constructor(public activeModal: NgbActiveModal,private qrcodeService:QrcodeService) {
    this.getQrcode();
  }
  getQrcode():void{
    this.qrcodeService.getQrcode()
      .then(
        qrcode => {
          this.qrcode = qrcode;
        },
        error => {
          this.error = error;
        }
      )
  }
}
