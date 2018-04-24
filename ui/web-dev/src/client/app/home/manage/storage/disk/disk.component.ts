import { Component} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../../../../shared/index';
import { DiskListService,ServerPanelService,OperateDiskService,ItemDiskService,PromptEmitService} from '../../../../server/index';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Http, Headers, Response } from '@angular/http';
import {MonitoringService} from '../../../../monitoring.service';
@Component({
  moduleId: module.id,
  selector: 'ar-disk',
  templateUrl: 'disk.component.html',
  styleUrls: ['disk.component.css'],
  providers: [NgbAlertConfig,ModalContent,NgbActiveModal]
})

export class DiskComponent {
  tHeadLicenceListNames = [
    '槽位号',
    '序列号',
    '所属RAID',
    '容量',
    '型号',
    '温度',
    '状态',
    '操作'
  ];
  error:any;
  // diskListAll:any[] = [];
  diskListAll = [];
  prompt:any;
  diskContent='';
  selectNum:any;
  serverPanel:any[] = [];
  active:any;
  /**
   * pending...变量用来标记发送请求状态
   */
  PendingDiskStatus:any;
  PendingServerPanelAllInfo:any;
  PendingServerPanelAllInfoRefresh:any;
  PendingDiskAllInfo:any;
  PendingDiskAllInfoRefresh:any;
  refreshFlag:any;
  PendingServerError:any;
  constructor(public activeModal: NgbActiveModal,
              public diskListService: DiskListService,public modalService: NgbModal,
              private serverPanelService: ServerPanelService,private operateDiskService:OperateDiskService,
              private itemDiskService: ItemDiskService,public promptEmitService:PromptEmitService,
              private http: Http,private monitoring:MonitoringService
      ) {
              setInterval(()=>{ this.refresh()},600000)
  }
  /**
   * 初始的时候获取信息
   */

  ngOnInit() {
    this.getServerPanelAll();
  }
  /**
   * 点击刷新按钮
   */
  refresh():any{
    if(this.PendingServerPanelAllInfoRefresh==1&&this.PendingDiskAllInfoRefresh==1){
      this.refreshFlag = true;
      this.getServerPanelAll();
    }
  }

  /**
   * 点击服务面板
   */
  getItemNum(item):any{
    this.selectNum = item.slot_number;
  }
  /**
   * 获取服务器面板信息
   */
  getServerPanelAll():any{
    if(this.refreshFlag){
      this.PendingServerPanelAllInfo = 1;
      this.PendingServerPanelAllInfoRefresh = 0;
      this.PendingDiskAllInfo = 1;
      this.PendingDiskAllInfoRefresh = 0;
    }else {
      this.PendingServerPanelAllInfo = 0;//获取服务器面板信息。0：开始；1：完成
      this.PendingServerPanelAllInfoRefresh = 1;
      this.PendingDiskAllInfo = 0;
      this.PendingDiskAllInfoRefresh = 1;
      this.diskContent = '正在获取磁盘列表信息';
      this.PendingServerError = '正在获取服务器面板信息';
    }
    this.serverPanelService.getServerPanel()
      .then(
        serverPanel => {
          if(serverPanel !== undefined){
            if(serverPanel.code == 3758424065){
              this.PendingServerError = '未发现服务器面板信息';
              this.PendingServerPanelAllInfo = 1;
              this.PendingServerPanelAllInfoRefresh = 1;
              this.getDiskListAll();
            }else if(serverPanel.code == 3759079434){
              this.PendingServerError = 'RAID正在重建中...';
              this.PendingServerPanelAllInfo = 1;
              this.PendingServerPanelAllInfoRefresh = 1;
              this.getDiskListAll();
            }else{
              this.PendingServerError = '';
              this.serverPanel = serverPanel;
              this.PendingServerPanelAllInfo = 1;
              this.PendingServerPanelAllInfoRefresh = 1;
              this.getDiskListAll();
            }
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
  getDiskListAll(): void {
    this.diskListService.getDiskList()
      .then(
        diskListAll => {
          if(diskListAll !== undefined){
            if(diskListAll.code == 3758424065){
              let me = this;
              me.diskContent = '未发现磁盘信息';
              me.PendingDiskAllInfo = 1;
              me.PendingDiskAllInfoRefresh = 1;
            }else if(diskListAll.code == 3759079434){
              let me = this;
              me.diskContent = 'RAID正在重建中...';
              me.PendingDiskAllInfo = 1;
              me.PendingDiskAllInfoRefresh = 1;
            }else{
              let me = this;
              me.PendingDiskAllInfo = 1;
              me.PendingDiskAllInfoRefresh = 1;
              this.diskContent = '';
              me.diskListAll = diskListAll;
              if(!diskListAll.length){
                me.diskContent = '暂无磁盘信息';
              }
            }
          }
        },
        error => {
          this.error = error;
        }
      );
  }

  /**
   * 初始化
   */
  initDisk(item){
    //1，弹框提示
    let modalInitDisk = this.modalService.open(ModalContent);
    modalInitDisk.componentInstance.title = '初始化';
    modalInitDisk.componentInstance.body = '初始化将丢失磁盘上的所有数据。您确定要执行此操作吗？';
    modalInitDisk.result.then((result) => {
      //点击确定按钮的时候，发送删除请求
      if(result){
        this.PendingDiskStatus = 0;
        this.operateDiskService.initHotSpare(item.slot_number)
          .then(
            initDisk => {
              if(initDisk.init_physdrv == 0){
                me.PendingDiskStatus = 1;
                this.promptEmitService.change.emit(this.translate.instant('提示：初始化全局热备盘失败'))
              }else if(initDisk.init_physdrv == 1){
                let me = this;
                me.itemDiskService.infoItemDisk(item.slot_number)
                  .then(
                    itemDisk => {
                      item.slot_number = itemDisk.slot_number;
                      item.wwn = itemDisk.wwn;
                      item.init = itemDisk.init;
                      item.raid = itemDisk.raid;
                      item.capacity = itemDisk.capacity;
                      item.type = itemDisk.type;
                      item.temperature = itemDisk.temperature;
                      item.state = itemDisk.state;
                      me.PendingDiskStatus = 1;
                    },
                    error => {
                      me.error = error;
                      me.PendingDiskStatus = 1;
                    }
                  )
              }

            }
          );
      }
    }, (reason) => {
      return;
    });
  }

  /**
   *设置全局热备盘
   */
  setDisk(item){

    //1，弹框提示
    let modalSetDisk = this.modalService.open(ModalContent);
    modalSetDisk.componentInstance.title = '设置全局热备盘';
    //if(热备盘容量不小于RAID组成员盘最大容量)
    modalSetDisk.componentInstance.body = '该磁盘将被设置为全局热备盘。您确认要执行此操作吗？';
    modalSetDisk.result.then((result) => {
      //点击确定按钮的时候，发送删除请求
      if(result){
        this.PendingDiskStatus = 0;
        this.operateDiskService.setHotSpare(item.slot_number)
          .then(
            setDisk => {
              if(setDisk.set_hotspare == 0){
                this.PendingDiskStatus = 1;
                this.promptEmitService.change.emit(this.translate.instant('提示：设置全局热备盘失败'))
              }else if(setDisk.set_hotspare == 1) {
                let me = this;
                this.itemDiskService.infoItemDisk(item.slot_number)
                  .then(
                    itemDisk => {
                      item.slot_number = itemDisk.slot_number;
                      item.wwn = itemDisk.wwn;
                      item.init = itemDisk.init;
                      item.raid = itemDisk.raid;
                      item.capacity = itemDisk.capacity;
                      item.type = itemDisk.type;
                      item.temperature = itemDisk.temperature;
                      item.state = itemDisk.state;
                      this.PendingDiskStatus = 1;

                    },
                    error => {
                      me.error = error;
                      this.PendingDiskStatus = 1;
                    }
                  )
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
   *取消全局热备盘
   */
  cancelDisk(item){
    //1，弹框提示
    let modalCancelDisk = this.modalService.open(ModalContent);
    modalCancelDisk.componentInstance.title = '取消全局热备盘';
    //if(热备盘容量不小于RAID组成员盘最大容量)
    modalCancelDisk.componentInstance.body = '取消热备盘将导致RAID无法快速重建。您确认要执行此操作吗？';
    modalCancelDisk.result.then((result) => {
      //点击确定按钮的时候，发送删除请求
      if(result){
        this.PendingDiskStatus = 0;
        this.operateDiskService.cancelHotSpare(item.slot_number)
          .then(
            cancelDisk => {
              if(cancelDisk.unset_hotspare == 0){
                this.PendingDiskStatus = 1;
                this.promptEmitService.change.emit(this.translate.instant('提示：取消全局热备盘失败'))
              }else if(cancelDisk.unset_hotspare == 1) {
                let me = this;
                this.itemDiskService.infoItemDisk(item.slot_number)
                  .then(
                    itemDisk => {
                      item.slot_number = itemDisk.slot_number;
                      item.wwn = itemDisk.wwn;
                      item.init = itemDisk.init;
                      item.raid = itemDisk.raid;
                      item.capacity = itemDisk.capacity;
                      item.type = itemDisk.type;
                      item.temperature = itemDisk.temperature;
                      item.state = itemDisk.state;
                      this.PendingDiskStatus = 1;
                    },
                    error => {
                      me.error = error;
                      this.PendingDiskStatus = 1;
                    }
                  )
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
