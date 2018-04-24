import { Component, Input ,Injectable } from '@angular/core';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,NgForm } from '@angular/forms';
import {TranslateService} from 'ng2-translate';

import { Http, Response } from '@angular/http';
import { RaidListService } from '../../server/index';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 *
 */

@Injectable()
export class AddUserService {
  public i: number = 0;

  constructor(private http: Http, public promptEmitService: PromptEmitService) {
  }

  /**
   *
   */
  addUser(obj): Promise<string[]> {
    const url = `/manager/user`;
    return this.http
      .post(url,JSON.stringify(obj))
      .toPromise()
      .then(
        (res: Response) => {
          if (res.status == 200) {
            return res.json() || {};
          } else if (res.status == 202) {
            return res.json() || {};
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
  selector: 'ar-modal-content-new-user',
  templateUrl: 'modal-content-new-user.component.html',
  styleUrls: ['modal-content-new-user.component.css'],
  directives:[NgForm],
  input: ['title','body']
})


export class ModalContentNewUser {
  error:any;
  createUserModel:any;
  loginNameError='';
  displayNameError='';
  desError='';
  subError='';
  inputType='';
  constructor(public activeModal: NgbActiveModal,
              private addUserService:AddUserService,
              public promptEmitService: PromptEmitService,
              private translate: TranslateService) {
  }
  ngOnInit() {
    this.createUserModel = {
      "loginName": "",
      "displayName": "",
      "password": "123456",
      "email": "",
      "status": 1,
      "description": ""
    }
  }
  onKeyup(value,type){
    this.inputType = type;
    let valueTrm = value.trim();
    this.subError='';
    let valueLen = unescape(encodeURIComponent(valueTrm)).length;
    if(type == 'login'){
      this.loginNameError = "";
      if(valueLen>128){
        this.loginNameError = "长度不能超过128位";
      }

    }else if(type == 'display'){
      this.displayNameError = "";
      if(valueLen>128){
        this.displayNameError = "长度不能超过128位";
      }
    }else if(type == 'des'){
      this.desError = "";
      if(valueLen>50){
        this.desError = "描述不能超过50个字符";
      }
    }
  }
  onRollSubmit(){
    this.subError='';
    let me = this;
    this.addUserService.addUser(me.createUserModel)
      .then(
        returnResult => {
          if(returnResult.code){
            // this.subError = '提示：添加用户失败,错误原因：' + returnResult.code.toString();
            this.subError = returnResult.code.toString()+'new';
            // this.subError = this.translate.instant(returnResult.code.toString()+'new');
          }else if(returnResult.userId){
            me.activeModal.close('success');
          }
        },
        error => {
          this.error = error;
        },
      );
  }
}
