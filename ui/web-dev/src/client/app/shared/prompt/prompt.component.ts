import { Component,Injectable,EventEmitter } from '@angular/core';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { PromptEmitService} from '../../server/index';
import {TranslateService} from 'ng2-translate';
import { Router } from '@angular/router';
/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'my-prompt',
  templateUrl: 'prompt.component.html',
  styleUrls: ['prompt.component.css'],
  providers: [NgbAlertConfig]
})

export class PromptComponent {
  change: EventEmitter<number>;
  promptShow:boolean;
  prompt:any;
  constructor(promptEmitService:PromptEmitService,private translate: TranslateService,
              private router: Router){

    this.promptShow = true;
    let errorArr = [];
    let logOutFlag = false;
    promptEmitService.change.subscribe((value)=>{
      if(value.substring(0,10) == '3758358534'){
        logOutFlag = true;
      }
      if(logOutFlag){
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },3000);
      }
      errorArr.push(value);
    });
    this.prompt = errorArr;
    // setInterval(()=>{ this.prompt.splice(0, 1);},2000)
}

/**
 * 点击prompt提示信息关闭
 */
  public closePrompt(i) {
    if(this.prompt[i].substring(0,10) == '3758358534'){
      this.router.navigate(['/login']);
    }
    this.prompt.splice(i, 1);
  }
}

