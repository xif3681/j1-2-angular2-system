import { Component, Input ,Injectable, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent,ModalContentNewRoll,PaginationAdvanced,QRCodeComponent,ModalContentConfigRoll } from '../../../../shared/index';
import { RollListService,DeleteRollService,ItemRollService,PromptEmitService} from '../../../../server/index';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'ar-roll',
  templateUrl: 'roll.component.html',
  styleUrls: ['roll.component.css'],
  directives: [QRCodeComponent],
  providers: [NgbAlertConfig,ModalContent,ModalContentNewRoll,ModalContentConfigRoll,
    NgbActiveModal,PaginationAdvanced]
})

export class RollComponent {
  tHeadLicenceListNames = [
    '卷名称',
    '使用率',
    '容量',
    '可用空间',
    '所属设备',
    '卷类型',
    '状态',
    '操作'
  ];
  error:any;
  unAddRoll:any;
  rollListAll:any[]=[];
  prompt:any;
  refreshFlag:any;
  PendingServerRollListAll:any;
  PendingServerRollListAllRefresh:any;

  constructor(public activeModal: NgbActiveModal,
              public rollListService: RollListService,public modalService: NgbModal,
              public deleteRollService:DeleteRollService,public itemRollService:ItemRollService,
              public promptEmitService:PromptEmitService,private translate: TranslateService
) {
    setInterval(()=>{ this.refresh()},300000)
  }

  /**
   * 初始的时候获取信息
   */

  ngOnInit() {
    this.getRollListAll();
  }

  refresh():any{
    if(this.PendingServerRollListAllRefresh==1){
      this.refreshFlag = true;
      this.getRollListAll();
    }
  }
  /**
   * 获取单条列表信息
   */
  getRollListItem(item,lv_name_config): void {
    let me = this;
    this.itemRollService.infoItemRoll(lv_name_config)
      .then(
        itemRoll => {
          if(itemRoll!==undefined) {
            item.lv_name = itemRoll.lv_name;
            item.lv_avalible_capacity = itemRoll.lv_avalible_capacity;
            item.lv_capacity = itemRoll.lv_capacity;
            item.raid_name = itemRoll.raid_name;
            item.lv_type = itemRoll.lv_type;
            item.lv_status = itemRoll.lv_status;
            item.lv_used_percent = itemRoll.lv_used_percent;
            item.has_raid_recon = itemRoll.has_raid_recon;
          }
        },
        error => {
          me.error = error;
        }
      )
  }

  /**
   * 获取列表信息
   */
  getRollListAll(): void {
    if(this.refreshFlag){
      this.PendingServerRollListAll = 1;
      this.PendingServerRollListAllRefresh = 0;
    }else {
      this.PendingServerRollListAll = 0;
      this.PendingServerRollListAllRefresh = 1;
    }
    this.rollListService.getRollList()
      .then(
        rollListAll => {
          if(rollListAll!==undefined){
            this.rollListAll = rollListAll;
            this.PendingServerRollListAll = 1;
            this.PendingServerRollListAllRefresh = 1;
            if(rollListAll.length&&rollListAll[0].has_raid_recon == 1){
              this.unAddRoll = 1;
            }else{
              this.unAddRoll = 0;
            }
          }
        },
        error => {
            this.error = error;
        }
      );
  }

  /**
   * 添加Roll
   */
  addRoll() {
    let modalRef1 = this.modalService.open(ModalContentNewRoll);
    modalRef1.componentInstance.title = '创建卷';
    modalRef1.result.then((result) => {
      if(result.status == 'success'){

        let me = this;
        this.itemRollService.infoItemRoll(result.name)
          .then(
            itemRoll => {
              me.rollListAll.push(itemRoll);
            },
            error => {
              me.error = error;
            }
          );

      }
    }, (reason) => {
    });
  }

  /**
   * 配置卷
   */
  configRoll(item) {
    let modalRef3 = this.modalService.open(ModalContentConfigRoll);
    modalRef3.componentInstance.title = '配置卷';
    modalRef3.componentInstance.body = item;
    modalRef3.result.then((result) => {
      //点击添加按钮，重新获取列表信息
      if(result){
        if(result.status=='success'){
          let me = this;
          me.getRollListItem(item,result.lv_name_config);
        }
      }
    }, (reason) => {
    });
  }
  /**
   * 删除卷
   */
  delRoll(item,i) {
    //1，弹框提示
    let modalDelRoll = this.modalService.open(ModalContent);
    modalDelRoll.componentInstance.title = '删除卷';
    modalDelRoll.componentInstance.body = '删除卷将导数数据无法恢复。您确定要执行此操作吗？';
    modalDelRoll.result.then((result) => {
      //点击确定按钮的时候，发送删除请求
      if(result){
        this.deleteRollService.deleteRoll(item.lv_name)
          .then(
            deleteRaidMe => {
              let me = this;
              if(deleteRaidMe.lv_deleted == 1){
                me.rollListAll.splice(i, 1);
              }else if(deleteRaidMe.lv_deleted == 0){
                this.promptEmitService.change.emit(this.translate.instant('提示：删除卷失败'));
              }
            },
            error => {
              this.error = error;
            }
          );
      }
    }, (reason) => {
      return;
    });
  }



}
