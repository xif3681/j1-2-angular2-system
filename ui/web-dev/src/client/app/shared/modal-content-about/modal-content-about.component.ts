import { Component, Input ,Injectable } from '@angular/core';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,NgForm } from '@angular/forms';


import { Http, Response } from '@angular/http';
// import { LicenceListService } from '../../config/licence-list/index';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 *
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


@Component({
  moduleId: module.id,
  selector: 'ar-modal-content-about',
  templateUrl: 'modal-content-about.component.html',
  styleUrls: ['modal-content-about.component.css'],
  // providers: [NgForm],
  directives:[NgForm],
  input: ['title','body']
})


export class ModalContentAbout {
  license:any;
  error:any;
  content:any;
  versionInfo:Array;
  private fullYear:any

  constructor(public activeModal: NgbActiveModal,public versionInfoService:VersionInfoService) {
    this.getVersionInfo();
    let myDate = new Date();
    this.fullYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  }
  ngOnInit() {

  }
  /**
   * 获取版本信息信息
   */
  getVersionInfo():void{
    let me = this;
    this.versionInfoService.getVersion()
      .then(
        versionInfo => {
          me.versionInfo = versionInfo;
        },
        error => {
          this.error = error;
        }
      )
  }
}
