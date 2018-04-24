import { Component, Input ,Injectable, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent,ModalContentNewRaid,ModalContentConfigRaid,ModalContentRebuildRaid,PaginationAdvanced } from '../../../../shared/index';
import { RaidListService,DeleteRaidService,ItemRaidService,PromptEmitService} from '../../../../server/index';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'ar-raid',
  templateUrl: 'raid.component.html',
  styleUrls: ['raid.component.css'],
  providers: [NgbAlertConfig,ModalContent,ModalContentNewRaid,ModalContentConfigRaid,ModalContentRebuildRaid,
    NgbActiveModal,PaginationAdvanced]
})

export class RaidComponent {
  tHeadRaidListNames = [
    '',
    'RAID名称',
    'RAID级别',
    '容量',
    '状态',
    '操作'
  ];
  error:any;
  rebuildRaidFlag:any;
  raidListAll:any[]=[];
  prompt:any;
  refreshFlag:any;
  PendingServerRaidListAll:any;
  PendingServerRaidListAllRefresh:any;
  PendingServerRaidListAllError:any;
  PendingServerRaidListAllErrorFlag:any;

  constructor(public activeModal: NgbActiveModal,
              public raidListService: RaidListService,public modalService: NgbModal,
              public deleteRaidService:DeleteRaidService,public itemRaidService:ItemRaidService,
              public promptEmitService:PromptEmitService,private translate: TranslateService

  ) {
    setInterval(()=>{ this.refresh()},600000)
  }
  /**
   * 初始的时候获取信息
   */

  ngOnInit() {
    this.getRaidListAll();
  }
  /**
   * 点击刷新按钮
   */
  refresh():any{
    if(this.PendingServerRaidListAllRefresh==1){
      this.refreshFlag = true;
      this.getRaidListAll();
    }
  }
  /**
   * 获取单条列表信息
   */
  getRaidListItem(item,id): void {
    this.itemRaidService.infoItemRaid(id)
      .then(
        itemRaid => {
          item.raid_name = itemRaid.raid_name;
          item.raid_level = itemRaid.raid_level;
          item.raid_size = itemRaid.raid_size;
          item.raid_state = itemRaid.raid_state;
          item.physdrvs = itemRaid.physdrvs;
          item.strpsz = itemRaid.strpsz;
          item.recon_completed = itemRaid.recon_completed;
          let me = this;
          if(item.raid_state == 1){
            me.rebuildRaidFlag = 1;
          }else {
            me.rebuildRaidFlag = 0;
          }
        },
        error => {
          this.error = error;
        }
      )
  }
  /**
   * 获取列表信息
   */
  getRaidListAll(): void {
    if(this.refreshFlag){
      this.PendingServerRaidListAll = 1;
      this.PendingServerRaidListAllRefresh = 0;
    }else {
      this.PendingServerRaidListAll = 0;
      this.PendingServerRaidListAllRefresh = 1;
      this.PendingServerRaidListAllError = '正在获取RAID信息';
      this.PendingServerRaidListAllErrorFlag = 0;
    }
    this.raidListService.getRaidList()
      .then(
        raidListAll => {
          if(raidListAll !== undefined){
            if(raidListAll.code == 3759079425){
              this.PendingServerRaidListAllError = '未发现RAID信息';
              this.PendingServerRaidListAllErrorFlag = 1;
              this.PendingServerRaidListAll = 1;
              this.PendingServerRaidListAllRefresh = 1;
            }else if(raidListAll.code == 3759079434){
              this.PendingServerRaidListAllError = 'RAID正在重建中...';
              this.PendingServerRaidListAllErrorFlag = 1;
              this.PendingServerRaidListAll = 1;
              this.PendingServerRaidListAllRefresh = 1;
            }else{
              let me = this;
              raidListAll.map(function(obj){
                obj.licenceDetail = 'hide';
                obj.faCaretType = 'fa-caret-right';

                if(obj.raid_state == 1){
                  me.rebuildRaidFlag = 1;
                }else {
                  me.rebuildRaidFlag = 0;
                }
              });
              this.PendingServerRaidListAllError = '';
              this.PendingServerRaidListAllErrorFlag = 0;
              this.raidListAll = raidListAll;
              if(!raidListAll.length){
                this.PendingServerRaidListAllError = '暂无RAID信息';
                this.PendingServerRaidListAllErrorFlag = 0;
              }
              this.PendingServerRaidListAll = 1;
              this.PendingServerRaidListAllRefresh = 1;
            }
          }
        },
        error => {
            this.error = error;
        }
      );
  }

  /**
   * 创建RAID
   */
  addRaid() {
    let modalAddRaid = this.modalService.open(ModalContentNewRaid);
    modalAddRaid.componentInstance.title = '创建RAID';
    modalAddRaid.result.then((result) => {
      if(result.status == 'success'){
        this.itemRaidService.infoItemRaid(result.id)
          .then(
            itemRaid => {
              itemRaid.licenceDetail = 'hide';
              itemRaid.faCaretType = 'fa-caret-right';
              this.raidListAll.push(itemRaid);
              this.PendingServerRaidListAllError = '';
              this.PendingServerRaidListAllErrorFlag = 0;
            },
            error => {
              this.error = error;
            }
          )
      }
    }, (reason) => {
    });
  }

  /**
   * 删除RAID
   */
  delRAID(item,i) {
    //1，弹框提示
    let modalDelRAID = this.modalService.open(ModalContent);
    modalDelRAID.componentInstance.title = '删除RAID';
    modalDelRAID.componentInstance.body = '删除RAID将同步删除该RAID组中磁盘的数据。您确定要执行此操作吗？';
    modalDelRAID.result.then((result) => {
      //点击确定按钮的时候，发送删除请求
      if(result){
        this.deleteRaidService.deleteRaid(item.vir_drv_id)
          .then(
            deleteRaidMe => {
              if(deleteRaidMe !== undefined){
                let me = this;
                if(deleteRaidMe.delete == 1){
                  me.raidListAll.splice(i, 1);
                  if(!this.raidListAll.length){
                    this.PendingServerRaidListAllError = '暂无RAID信息';
                    this.PendingServerRaidListAllErrorFlag = 0;
                  }
                }else if(deleteRaidMe.delete == 0){
                  this.PendingServerRaidListAllError = '';
                  this.PendingServerRaidListAllErrorFlag = 0;
                  this.promptEmitService.change.emit(this.translate.instant('提示：删除RAID失败'));
                }
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
  /**
   * 配置RAID
   */
  configRAID(item) {
    let modalConfigRaid = this.modalService.open(ModalContentConfigRaid);
    modalConfigRaid.componentInstance.title = '配置RAID';
    modalConfigRaid.componentInstance.body = item;
    modalConfigRaid.result.then((result) => {
      //点击添加按钮，重新获取列表信息
      if(result =='success'){
        let me = this;
        me.getRaidListItem(item,item.vir_drv_id)
      }
    }, (reason) => {
    });
  }
  /**
   * 重建RAID
   */
  rebuildRaid(item) {
    let modalRebuildRaid = this.modalService.open(ModalContentRebuildRaid);
    modalRebuildRaid.componentInstance.title = '重建RAID';
    modalRebuildRaid.componentInstance.body = item;
    modalRebuildRaid.result.then((result) => {
      //点击添加按钮，重新获取列表信息
      if(result=='success'){
        let me = this;
        me.getRaidListItem(item,item.vir_drv_id);
      }
    }, (reason) => {
    });
  }

  /**
   * 点击出现详情信息
   */
  toggleLicenceDetail(item){
    if(item.faCaretType == 'fa-caret-down'||item.faCaretType == undefined){
      item.faCaretType = 'fa-caret-right'
    }else {
      item.faCaretType = 'fa-caret-down'
    }
    if(item.licenceDetail == 'show'||item.licenceDetail == undefined){
      item.licenceDetail = 'hide'
    }else{
      item.licenceDetail = 'show'
    }
  }

}
