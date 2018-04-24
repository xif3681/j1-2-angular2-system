
import { Component, Input ,Injectable } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,NgForm } from '@angular/forms';
import {TranslateService} from 'ng2-translate';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 *
 */

@Injectable()
export class ActiveLicenseServer {

  constructor(private http: Http,private translate: TranslateService) {
  }
  /**
   *
   */
  activeLicense(activeCode:string,serial:string): Promise<string[]> {
    const url = `/manager/license/${serial}/active`;
    return this.http
      .post(url, JSON.stringify({"activeCode": activeCode}))
      .toPromise()
      .then(
        (res: Response) => {
          if (res.status == 200) {
            return res;
          } else if (res.status == 202) {
            return res.json() || { };
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
  selector: 'ar-modal-content-active-code',
  templateUrl: 'modal-content-active-code.component.html',
  styleUrls: ['modal-content-active-code.component.css'],
  input: ['title','body']
})

export class ModalContentActiveCode {
  @Input() serial: string;
  @Input() machineCode: string;
  activeLicenseErrmsg:any;
  error:any;
  constructor(public activeModal: NgbActiveModal,private activeLicenseServer:ActiveLicenseServer,private translate: TranslateService) {
  }
  activeModalLicense(activeCode:string):void{
    if(activeCode.trim() == ''){
      this.activeLicenseErrmsg = '请输入激活码';
      return;
    }
    let me =this;
        this.activeLicenseServer.activeLicense(activeCode,this.serial)
          .then(
            activeLicense => {
              if(activeLicense.status == 200){
                  me.activeModal.close(true);
              }else if(activeLicense.code){
                this.activeLicenseErrmsg = activeLicense.code.toString()+'actcode';
                return;
              }
            },
            error => {
              this.error = error;
            }
          )

  }
}
