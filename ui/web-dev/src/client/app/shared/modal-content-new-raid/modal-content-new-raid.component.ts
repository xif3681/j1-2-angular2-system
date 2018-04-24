import { Component, Input ,Injectable } from '@angular/core';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,NgForm } from '@angular/forms';
import {TranslateService} from 'ng2-translate';
import { Http, Response } from '@angular/http';
import { DiskRaidInfoListService } from '../../server/index';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 *添加RAID服务
 */

@Injectable()
export class AddRAIDService {
  public i: number = 0;

  constructor(private http: Http, public promptEmitService: PromptEmitService,private translate: TranslateService
) {
  }

  addRaid(obj): Promise<string[]> {
    const url = `/v1/raid/create`;
    return this.http
      .post(url,JSON.stringify(obj))
      .toPromise()
      .then(
        (res: Response) => {
          if (res.status == 200) {
            return res.json() || {};
          } else if (res.status == 202) {
            this.promptEmitService.change.emit(this.translate.instant(res.json().code.toString()+'raidcreate'));
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
  selector: 'ar-modal-content-new-raid',
  templateUrl: 'modal-content-new-raid.component.html',
  styleUrls: ['modal-content-new-raid.component.css'],
  // providers: [NgForm],
  directives:[NgForm],
  input: ['title','body']
})


export class ModalContentNewRaid {
  license:any;
  error:any;
  content:any;
  diskRaidInfoList:any[]=[];
  licenseErrmsg:Array;
  createRaidModel:any;
  promptContent:any;
  promptRaidContent:any;
  promptContentSubmit:any;
  constructor(public activeModal: NgbActiveModal,public diskRaidInfoListService:DiskRaidInfoListService,
              public addRAIDService:AddRAIDService,public promptEmitService: PromptEmitService,private translate: TranslateService) {

  }
  ngOnInit() {
    this.createRaidModel = {
      'raid_name': '',
      'raid_level': '5',
      'strip_size': '256',
      'slot_numbers1': [],
      'slot_numbers':''
    };
    this.getDiskRaidInfoList();
  }
  tNewRaid = [
    '槽位号',
    '型号',
    '容量'
  ];
  /**
   * 条带大小
   */
  stripeSizeList:string[]=['8','16','32','64','128','256','512','1024'];
  /**
   * RAID级别
   */
  RAIDRankList=[
    {
      "name": "RAID0",
      "raid_level": "0",
    },
    {
      "name": "RAID5",
      "raid_level": "5",
    }
  ];
  /**
   * 获取选择磁盘信息
   */
  getDiskRaidInfoList():void{
    this.promptContent='正在获取磁盘信息';
    let me = this;
    this.diskRaidInfoListService.getDiskRaidInfoList()
      .then(
        diskRaidInfoList => {
          me.diskRaidInfoList = diskRaidInfoList;
          if(!diskRaidInfoList.length){
            this.promptContent='暂无磁盘信息';
          }else{
            this.promptContent='';
          }
        },
        error => {
          this.error = error;
        }
      )
  }

  /**
   * 点击单个checkbox
   * @param slot_number
   */
  addDiskItem(slot_number){
    this.createRaidModel.slot_numbers1.push(Number(slot_number));
    this.handlePrompt();
  }
  /**
   * 点击单个checkbox
   * @param slot_number
   */
  delDiskItem(slot_number){
    for(var i=0; i<this.createRaidModel.slot_numbers1.length; i++) {
      if(this.createRaidModel.slot_numbers1[i] == slot_number) {
        this.createRaidModel.slot_numbers1.splice(i, 1);
      }
    }
    this.handlePrompt();
  }
  /**
   * 点击全选按钮
   * @param flag
   */
  addDiskAll(flag){
    var me = this;
    me.createRaidModel.slot_numbers1 = [];
    if(flag){
      me.diskRaidInfoList.map(function (obj) {
        me.createRaidModel.slot_numbers1.push(Number(obj.slot_number));
      })
    }else {
      me.createRaidModel.slot_numbers1 = [];
    }
    this.handlePrompt();
  }
  handlePrompt(){
    this.promptRaidContent = '';
    if(this.createRaidModel.raid_level == 5&&this.createRaidModel.slot_numbers1.length<3){
      this.promptRaidContent = '所选磁盘少于3块，无法创建RAID5';
      return;
    }else if(this.createRaidModel.raid_level == 0&&this.createRaidModel.slot_numbers1.length<2){
      this.promptRaidContent = '所选磁盘少于2块，无法创建RAID0';
      return;
    }
  }

  /**
   * 不知道为什么是相反的，
   * @param raid_level
   */
  handleSelectPrompt(raid_level){
    this.promptRaidContent = '';
    if(this.createRaidModel.slot_numbers1.length){
      if(raid_level == 5&&this.createRaidModel.slot_numbers1.length<2){
        this.promptRaidContent = '所选磁盘少于2块，无法创建RAID0';
        return;
      }else if(raid_level == 0&&this.createRaidModel.slot_numbers1.length<3){
        this.promptRaidContent = '所选磁盘少于3块，无法创建RAID5';
        return;
      }
    }

  }
  /**
   * 提交添加的RAID信息
   */
  onSubmit() {
    this.handlePrompt();
    let me = this;
    this.createRaidModel.slot_numbers = '('+this.createRaidModel.slot_numbers1+')';
    this.promptContentSubmit = 1;
    this.addRAIDService.addRaid(me.createRaidModel)
      .then(
        diskRaidInfoList => {
          if(diskRaidInfoList!=undefined){
            if(diskRaidInfoList.create == 0){
              this.promptEmitService.change.emit(this.translate.instant('提示：添加RAID失败'));
              me.activeModal.close('fail');
            }else if(diskRaidInfoList.create == 1){
              // this.promptEmitService.change.emit('提示：添加RAID成功');
              me.activeModal.close({status:'success',id:diskRaidInfoList.vir_drv_id});
            }
          }
          this.promptContentSubmit = 0;
        },
        error => {
          this.error = error;
        }
      );
  }




}
