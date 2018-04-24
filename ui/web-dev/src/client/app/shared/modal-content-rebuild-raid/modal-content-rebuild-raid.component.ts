import { Component, Input ,Injectable } from '@angular/core';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { FormGroup, FormControl,NgForm } from '@angular/forms';
import { CreateRaid }    from './create-raid';
import {TranslateService} from 'ng2-translate';
import { Http, Response } from '@angular/http';
import { DiskRaidInfoListService } from '../../server/index';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

/**
 *
 */

@Injectable()
export class RebulidRAIDService {
  public i: number = 0;

  constructor(private http: Http, public promptEmitService: PromptEmitService,private translate: TranslateService) {
  }

  /**
   *
   */
  rebulidRaid(obj): Promise<string[]> {
    const url = '/v1/raid/reconstruct';
    return this.http
      .post(url,obj)
      .toPromise()
      .then(
        (res: Response) => {
          if (res.status == 200) {
            return res.json() || {};
          } else if (res.status == 202) {
            this.promptEmitService.change.emit(this.translate.instant(res.json().code.toString()+'raidreconstruct'));
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
  selector: 'ar-modal-content-rebuild-raid',
  templateUrl: 'modal-content-rebuild-raid.component.html',
  styleUrls: ['modal-content-rebuild-raid.component.css'],
  // providers: [NgForm],
  directives:[NgForm],
  input: ['title','body']
})


export class ModalContentRebuildRaid {
  @Input() body:any;
  license:any;
  error:any;
  content:any;
  slot_numbers1:any[]=[];
  diskRaidInfoList:any;
  rebulidRAID:any;
  promptContent:any;
  licenseErrmsg:Array;
  promptContentSubmit:any;
  constructor(public activeModal: NgbActiveModal,public diskRaidInfoListService:DiskRaidInfoListService,
              public rebulidRAIDService:RebulidRAIDService,public promptEmitService:PromptEmitService,private translate: TranslateService) {

  }
  ngOnInit() {
    this.rebulidRAID = {
      'vir_drv_id': '',
      'slot_numbers': ''
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
    this.slot_numbers1.push(Number(slot_number))
  }
  /**
   * 点击单个checkbox
   * @param slot_number
   */
  delDiskItem(slot_number){
    for(var i=0; i<this.slot_numbers1.length; i++) {
      if(this.slot_numbers1[i] == slot_number) {
        this.slot_numbers1.splice(i, 1);
      }
    }
  }
  /**
   * 点击全选按钮
   * @param flag
   */
  addDiskAll(flag){
    var me = this;
    me.slot_numbers1 = [];
    if(flag){
      me.diskRaidInfoList.map(function (obj) {
        me.slot_numbers1.push(Number(obj.slot_number))
      })
    }else {
      me.slot_numbers1 = [];
    }
  }
  onSubmit() {
    this.rebulidRAID.vir_drv_id = this.body.vir_drv_id;
    this.rebulidRAID.slot_numbers = '('+this.slot_numbers1+')';
    let me = this;
    this.promptContentSubmit = 1;
    this.rebulidRAIDService.rebulidRaid(me.rebulidRAID)
      .then(
        resultRaid => {
          if(resultRaid!=undefined){
            if(resultRaid.reconstruct == 0){
              this.promptEmitService.change.emit(this.translate.instant('提示：重建RAID失败'));
              me.activeModal.close('fail');
              return;
            }else if(resultRaid.reconstruct == 1){
              // this.promptEmitService.change.emit('提示：重建RAID成功');
              me.activeModal.close('success');
              return;
            }
          }
          this.promptContentSubmit = 0;
        },
        error => {
          this.error = error;
        }
      );
    // this.activeModal.close(true);

  }
}
