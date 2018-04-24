import { Component, Input ,Injectable } from '@angular/core';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,NgForm } from '@angular/forms';


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
export class EditPasswordService {
  public i: number = 0;
  constructor(private http: Http, public promptEmitService: PromptEmitService) {
  }

  /**
   *
   */
  editPassword(obj,id): Promise<string[]> {
    const url = `/manager/user/${id}/password`;
    return this.http
      .put(url,JSON.stringify(obj))
      .toPromise()
      .then(
        (res: Response) => {
          if(res.status == 200){
            return true;
          }else if(res.status == 202){
            return res.json().code.toString();

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
  selector: 'ar-modal-content-edit-password',
  templateUrl: 'modal-content-edit-password.component.html',
  styleUrls: ['modal-content-edit-password.component.css'],
  directives:[NgForm],
  input: ['title','userId']
})


export class EditPassword {
  @Input() userId;
  error:any;
  curPasswordError='';
  newPasswordError='';
  confPasswordError='';
  inputType='';
  editPasswordModel:any;
  constructor(public activeModal: NgbActiveModal,
              private editPasswordService:EditPasswordService,public promptEmitService: PromptEmitService) {
  }
  ngOnInit() {
    this.editPasswordModel = {
      "currentPassword": "",
      "newPassword": "",
      "newPasswordConfirm": ""
    }
  }
  onKeyup(value,type){
    this.inputType = type;
    let valueTrm = value.trim();
    this.confPasswordError='';
    let valueLen = unescape(encodeURIComponent(valueTrm)).length;
    if(type == 'new'){
      this.newPasswordError = "";
      if(valueLen<6){
        this.newPasswordError = "长度不能低于6位";
      }else if(valueLen>50){
        this.newPasswordError = "长度不能超过50位";
      }
    }
  }
  onRollSubmit() {
    let me = this;
    this.confPasswordError='';
    if(this.editPasswordModel.newPassword == this.editPasswordModel.currentPassword){
      this.confPasswordError = "新密码不能和旧密码相同";
    }else if(this.editPasswordModel.newPassword!==this.editPasswordModel.newPasswordConfirm){
      this.confPasswordError = "两次输入的密码不一致";
    }else {
      this.editPasswordService.editPassword(this.editPasswordModel,this.userId)
        .then(
          returnResult => {
            if(returnResult !== true){
              this.confPasswordError = returnResult;
              // this.confPasswordError = '提示：修改密码失败,错误原因：'+returnResult;
            }else{
              me.activeModal.close('success');
            }
          },
          error => {
            this.error = error;
          },
        );
    }
  }




}
