import { Component, Input ,Injectable } from '@angular/core';

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
export class AddLicenseService {

  constructor(private http: Http) {
  }
  /**
   *
   */
  addLicense(serial:string): Promise<string[]> {
    const url = `/manager/license`;
    return this.http
      .post(url, JSON.stringify({"serial": serial}))
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
  selector: 'ar-modal-content-new-code',
  templateUrl: 'modal-content-new-code.component.html',
  styleUrls: ['modal-content-new-code.component.css'],
  // providers: [NgForm],
  directives:[NgForm],
  input: ['title','body']
})


export class ModalContentNewCode {
  license:any;
  error:any;
  content:any;
  licenseNullErrmsg:any;
  licenseErrmsg:Array;
  constructor(public activeModal: NgbActiveModal,private addLicenseService:AddLicenseService) {

  }

  addModalLicense(newLicense:string):void{
    let me = this;
    me.licenseNullErrmsg = null;
    me.licenseErrmsg = null;


    if(newLicense.trim() == ''){
      this.licenseNullErrmsg = '请输入授权码';
      return;
    }


    let errorArr = [];
    // let trueArr = [];
    let newLicenseArr = newLicense.split("\n");
    //依次添加多个授权码
    let i=0;
    let j=0;

    newLicenseArr.map(function(obj){
      //去掉多个换行符
       if(obj.trim() !== ''){
         me.addLicenseService.addLicense(obj.trim())
           .then(
             license => {
               if(license.status == 200){
                 j++;
                 if(i == j){

                   me.activeModal.close(true);
                 }
               }else if(license.code){
                 let errObj = {
                   name:obj,
                   errmsg:license.code.toString()+'newcode'
                 };
                 errorArr.push(errObj);
                 return;
               }
             },
             error => {
               this.error = error;
             }
           );
         i++
       }
    });
    this.licenseErrmsg = errorArr;
  }

}
