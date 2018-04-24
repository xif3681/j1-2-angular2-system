import { Component, Input ,Injectable } from '@angular/core';
import { PromptEmitService} from './../../server/prompt-emit/index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,NgForm } from '@angular/forms';
import {TranslateService} from 'ng2-translate';

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
export class ConfigRollService {
  public i: number = 0;

  constructor(private http: Http, public promptEmitService: PromptEmitService,private translate: TranslateService) {
  }

  /**
   *
   */
  configRoll(obj): Promise<string[]> {
    const url = `/v1/lv/config`;
    return this.http
      .post(url,JSON.stringify(obj))
      .toPromise()
      .then(
        (res: Response) => {
          if (res.status == 200) {
            return res.json() || {};
          } else if (res.status == 202) {
            this.promptEmitService.change.emit(this.translate.instant(res.json().code.toString()+'lvconfig'));
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
  selector: 'ar-modal-content-config-roll',
  templateUrl: 'modal-content-config-roll.component.html',
  styleUrls: ['modal-content-config-roll.component.css'],
  directives:[NgForm],
  input: ['title','body']
})


export class ModalContentConfigRoll {
  @Input() body;
  license:any;
  error:any;
  content:any;
  congigRollModel:any;
  checkCapacityContent:any;
  checkCapacityFlag:any;
  bigSize:any;
  licenseErrmsg:Array;
  promptContentSubmit:any;
  constructor(public activeModal: NgbActiveModal,public promptEmitService: PromptEmitService,
              public configRollService:ConfigRollService,private translate: TranslateService
  ) {

  }
  ngOnInit() {
    this.congigRollModel = {
      'lv_name': '',
      'lv_type': 'data',
      'lv_name_config': this.body.lv_name,
      'lv_capacity': '',
      'lv_capacity_num': '',
      'lv_capacity_unit': 'GB',
      'data_source':'/anyrobot/store/elasticsearch'
    };
    this.bigSize=this.translate.instant('当前用户的容量为')+this.body.lv_capacity+this.translate.instant(',您还有')+this.body.lv_vgfree+this.translate.instant('容量可使用');
    let lv_capacity = this.body.lv_capacity.split(' ');
    this.congigRollModel.lv_capacity_num = lv_capacity[0];
    this.congigRollModel.lv_capacity_unit =lv_capacity[1];


  }
  tNewRoll = [
    '',
    'RAID名称',
    'RAID类型',
    '容量',
    '可用空间'
  ];
  raidListAll:any;
  rollCapacity:string[]=['GB','TB'];
  rollType=[{
    name:this.translate.instant('数据卷'),
    enName:'data'
  }];
  dataSource=[
    '/anyrobot/store/elasticsearch'
  ];


  checkCapacity(){
    this.congigRollModel.lv_capacity = this.congigRollModel.lv_capacity_num +this.congigRollModel.lv_capacity_unit;
    // 可添加的最大容量
    let bigSizeArrNumChange;
    let bigSizeArr = this.body.lv_vgfree.split(' ');
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

    let lv_capacity_old = this.body.lv_capacity.split(' ');
    let lv_capacity_old_num = lv_capacity_old[0];
    let lv_capacity_old_unit =lv_capacity_old[1];
    // 可用最小容量，用户之前输入的，只能增加不能减小
    let lvCapacityNumChange;
    if(lv_capacity_old_unit == 'GB'){
      lvCapacityNumChange = lv_capacity_old_num*1024;
    }else if (lv_capacity_old_unit == 'MB'){
      lvCapacityNumChange = lv_capacity_old_num;
    }else if (lv_capacity_old_unit == 'TB'){
      lvCapacityNumChange = lv_capacity_old_num*1024*1024;
    }else if (lv_capacity_old_unit == 'KB'){
      lvCapacityNumChange = lv_capacity_old_num/1024;
    }



    //用户输入的值
    let lv_capacity_num_change;
    if(this.congigRollModel.lv_capacity_unit == 'GB'){
      lv_capacity_num_change = this.congigRollModel.lv_capacity_num*1024;
    }else if (this.congigRollModel.lv_capacity_unit == 'MB'){
      lv_capacity_num_change = this.congigRollModel.lv_capacity_num;
    }else if (this.congigRollModel.lv_capacity_unit == 'TB'){
      lv_capacity_num_change = this.congigRollModel.lv_capacity_num*1024*1024;
    }else if (this.congigRollModel.lv_capacity_unit == 'KB'){
      lv_capacity_num_change = this.congigRollModel.lv_capacity_num/1024;
    }
    if(lv_capacity_num_change<lvCapacityNumChange||lv_capacity_num_change>(bigSizeArrNumChange+lvCapacityNumChange)){
      this.checkCapacityContent = this.translate.instant('卷容量必须大于等于')+this.body.lv_size+this.translate.instant('小于等于')+(bigSizeArrNumChange+lvCapacityNumChange)/(1024*1024)+'TB';
      this.checkCapacityFlag = 1;
      return;
    }
    this.checkCapacityFlag = 0;
  }



  onRollSubmit() {
    this.congigRollModel.lv_name = this.body.lv_name;
    this.congigRollModel.lv_capacity = this.congigRollModel.lv_capacity_num +this.congigRollModel.lv_capacity_unit;
    let me = this;
    me.checkCapacity();
    if(me.checkCapacityFlag!=1) {
      this.promptContentSubmit = 1;
      this.configRollService.configRoll(me.congigRollModel)
        .then(
          diskRaidInfoList => {
            if (diskRaidInfoList != undefined) {
              if (diskRaidInfoList.config_lv == 0) {
                this.promptEmitService.change.emit(this.translate.instant('提示：配置Roll失败'));
                me.activeModal.close({status: 'fail'});
                return;
              } else if (diskRaidInfoList.config_lv == 1) {
                // this.promptEmitService.change.emit('提示：配置Roll成功');
                me.activeModal.close({status: 'success', lv_name_config: me.congigRollModel.lv_name_config});
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
