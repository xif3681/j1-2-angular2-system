import { Component, EventEmitter } from '@angular/core';
import { BtnStatusService,PromptEmitService } from '../../../../server/index';

import { Code } from '../Code/index';
import { ModalContent } from '../../../../shared/index';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from 'ng2-translate';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'my-button-group',
  templateUrl: 'button-group.component.html',
  styleUrls: ['button-group.component.css'],
  providers: [BtnStatusService],
  inputs:['alertDif','btnItem'],
  outputs: ['changed']
})

export class ButtonGroupComponent {
  errorMessage:string;
  nowInf:any;
  prompt:string;
  PendStatus:any;
  PendStatusEn:any;
  constructor(private btnStatusService: BtnStatusService,public modalService: NgbModal,
              public promptEmitService:PromptEmitService,private translate: TranslateService) {

  }


  /**
   * 点击启动，重启，停止按钮
   */
  changed = new EventEmitter();
  btnstatus(alertDifMe: string,nameMe: string,difStatusMe: string,btnContainerMe: string): void {
    var me = this;

    let nameMeTrim = nameMe.trim();
    let alertDifMeTrim = alertDifMe.trim();
    let difStatusMeTrim= difStatusMe.trim();
    let btnContainerMeTrim = btnContainerMe?btnContainerMe.trim():'';
    // let difStatusToCh = this.statusToCh(difStatusMeTrim);
    let flag = true;
    if(difStatusMeTrim == 'stop'){
      if(alertDifMeTrim == 'services'){
        let modalSer = me.modalService.open(ModalContent);
        modalSer.componentInstance.title = '停止服务';
        modalSer.componentInstance.body = '停止服务运行存在系统无法正常使用的风险。您确定要停止该服务吗？';
        modalSer.result.then((result) => {
          flag = result;
          this.btnStatusServersChange(flag,alertDifMeTrim,nameMeTrim,difStatusMeTrim,btnContainerMeTrim);
          return;
        }, (reason) => {
        });

      }else if(alertDifMeTrim == 'containers'){
        const modalCon = me.modalService.open(ModalContent);
        modalCon.componentInstance.title = '停止容器';
        modalCon.componentInstance.body = '停止容器运行存在系统无法正常使用的风险。您确定要停止该容器吗？';
        modalCon.result.then((result) => {
          flag = result;
          this.btnStatusServersChange(flag,alertDifMeTrim,nameMeTrim,difStatusMeTrim,btnContainerMeTrim);
          return;
        }, (reason) => {
        });
      }
    }else{
      this.btnStatusServersChange(flag,alertDifMeTrim,nameMeTrim,difStatusMeTrim,btnContainerMeTrim);
    }
  }

  /**
   *
   * @param flag:弹框确定，取消，x按钮的点击
   * @param alertDifMeTrim
   * @param nameMeTrim
   * @param difStatusMeTrim
   * @param btnContainerMeTrim
   * 服务信息的交互
   */
  private btnStatusServersChange(flag,alertDifMeTrim,nameMeTrim,difStatusMeTrim,btnContainerMeTrim): void{

    this.PendStatusEn = difStatusMeTrim;
    if(flag){
      this.PendStatus = 1;
      this.btnStatusService.btnStatusChange(alertDifMeTrim,nameMeTrim,difStatusMeTrim,btnContainerMeTrim)
          .then(
              nowInf => {
                  //200 pid为-1 操作就不起作用了
                if(nowInf!=undefined){
                  this.PendStatus = 0;
                  if(nowInf.pid == -1){
                    let hint = this.translate.instant('提示：');
                    this.promptEmitService.change.emit(hint +nameMeTrim + this.translate.instant(difStatusMeTrim+'失败,') + this.translate.instant("请确保所在的容器处于运行状态"));
                  }else{
                    //终于成功
                    this.nowInf = nowInf;
                    this.changed.next(nowInf);
                    // this.promptEmitService.change.emit('提示：'+nameMeTrim + difStatusToCh +"成功");
                  }
                }else {
                  this.PendStatus = 0;
                }
              },
              error => {
                this.errorMessage = <any>error;
              }
          );
    }else{
    }
  }
}
