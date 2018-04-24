import { Component, Input ,Injectable } from '@angular/core';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,NgForm } from '@angular/forms';
import {TranslateService} from 'ng2-translate';

import { Http, Response } from '@angular/http';
import { RaidCanUsedListService } from '../../server/index';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 *
 */

@Injectable()
export class AddRollService {
  public i: number = 0;

  constructor(private http: Http, public promptEmitService: PromptEmitService,private translate: TranslateService) {

  }

  /**
   *
   */
  addRoll(obj): Promise<string[]> {
    const url = `/v1/lv/create`;
    return this.http
      .post(url,JSON.stringify(obj))
      .toPromise()
      .then(
        (res: Response) => {
          if (res.status == 200) {
            return res.json() || {};
          } else if (res.status == 202) {
            this.promptEmitService.change.emit(this.translate.instant(res.json().code.toString()+'lvcreate'));
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
  selector: 'ar-modal-content-new-roll',
  templateUrl: 'modal-content-new-roll.component.html',
  styleUrls: ['modal-content-new-roll.component.css'],
  // providers: [NgForm],
  directives:[NgForm],
  input: ['title','body']
})


export class ModalContentNewRoll {
  license:any;
  error:any;
  content:any;
  createRollModel:any;
  licenseErrmsg:Array;
  constructor(public activeModal: NgbActiveModal,
              private addRollService:AddRollService,public promptEmitService: PromptEmitService,
              public raidCanUsedListService:RaidCanUsedListService,private translate: TranslateService

  ) {

  }
  ngOnInit() {
    this.createRollModel = {
      'lv_name': '',
      'lv_type': 'data',
      'vir_drv_id': '',
      'lv_capacity': '',
      'lv_capacity_num': '',
      'lv_capacity_unit': 'GB'
    };
    this.getRaidListAll();
  }
  tNewRoll = [
    '',
    'RAID名称',
    'RAID类型',
    '容量',
    '可用空间'
  ];
  raidListAll:any;
  bigSize='';
  inputType='';
  promptContent:any;
  checkCapacityFlag:any;
  bigSizeNum:any;
  checkCapacityContent:any;
  promptContentSubmit:any;
  rollCapacity:string[]=['GB','TB'];
  rollType=[{
    name:this.translate.instant('数据卷'),
    enName:'data'
  }];
  /**
   * 获取RAID列表信息
   * @param start 开始数
   * @param limit 每页显示的条数
   */
  getRaidListAll(): void {
    this.promptContent='正在获取RAID信息';
    var me = this;
    this.raidCanUsedListService.getRaidCanUsedList()
      .then(
        raidListAll => {
          me.raidListAll = raidListAll;
          if(!raidListAll.length){
            this.promptContent='当前无空闲RAID';
          }else{
            this.promptContent='';
          }
        },
        error => {
          this.error = error;
        }
      );
  }
  onKeyup(type){
    this.inputType = type;
    this.checkCapacityContent = '';
  }
  addRollItem(item){
    this.createRollModel.vir_drv_id=item.vir_drv_id;
    if(item.vgfree==null){
      this.bigSize=this.translate.instant('可用最大容量')+item.raid_size;
      this.bigSizeNum=item.raid_size;
    }else if (item.vgfree!==null){
      this.bigSize=this.translate.instant('可用最大容量')+item.vgfree;
      this.bigSizeNum=item.vgfree;
    }
  }


  checkCapacity(){
    this.createRollModel.lv_capacity = this.createRollModel.lv_capacity_num +this.createRollModel.lv_capacity_unit;
    // 可用最大容量
    let bigSizeArrNumChange;
    let bigSizeArr = this.bigSizeNum.split(' ');
    let bigSizeArrNum = bigSizeArr[0];
    let bigSizeArrUnit = bigSizeArr[1];
    if(bigSizeArrUnit == 'GB'){
      bigSizeArrNumChange = bigSizeArrNum*1024;
    }else if (bigSizeArrUnit == 'MB'){
      bigSizeArrNumChange = bigSizeArrNum;
    }else if (bigSizeArrUnit == 'TB'){
      bigSizeArrNumChange = bigSizeArrNum*1024*1024;
    }else if (bigSizeArrUnit == 'KB'){
      bigSizeArrNumChange = bigSizeArrNum/1024;
    }


    //用户输入的值
    let lv_capacity_num_change;
    if(this.createRollModel.lv_capacity_unit == 'GB'){
      lv_capacity_num_change = this.createRollModel.lv_capacity_num*1024;
    }else if (this.createRollModel.lv_capacity_unit == 'MB'){
      lv_capacity_num_change = this.createRollModel.lv_capacity_num;
    }else if (this.createRollModel.lv_capacity_unit == 'TB'){
      lv_capacity_num_change = this.createRollModel.lv_capacity_num*1024*1024;
    }else if (this.createRollModel.lv_capacity_unit == 'KB'){
      lv_capacity_num_change = this.createRollModel.lv_capacity_num/1024;
    }

    if(lv_capacity_num_change<=0||lv_capacity_num_change>bigSizeArrNumChange){
      this.checkCapacityContent = this.translate.instant('卷容量必须大于0小于等于')+this.bigSizeNum;
      this.checkCapacityFlag = 1;
      return;
    }
    this.checkCapacityFlag = 0;
  }

  onRollSubmit() {
    this.createRollModel.lv_capacity = this.createRollModel.lv_capacity_num +this.createRollModel.lv_capacity_unit;
    let me = this;
    me.checkCapacity();
    if(me.checkCapacityFlag!=1){
      this.promptContentSubmit = 1;
      this.addRollService.addRoll(me.createRollModel)
        .then(
          diskRaidInfoList => {
            if(diskRaidInfoList!=undefined){
              if(diskRaidInfoList.lv_created == 0){
                this.promptEmitService.change.emit(this.translate.instant('提示：添加Roll失败'));
                me.activeModal.close('fail');
                return;
              }else if(diskRaidInfoList.lv_created == 1){
                // this.promptEmitService.change.emit('提示：添加Roll成功');

                me.activeModal.close({status:'success',name:this.createRollModel.lv_name});
                return;
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



}
