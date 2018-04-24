
import { Component,Output,EventEmitter } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';


import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';  // for debugging

@Component({
  moduleId: module.id,
  selector: 'ar-pagination-advanced',
  templateUrl: 'pagination-advanced.component.html',
  styleUrls: ['pagination-advanced.component.css'],
  inputs: ['toLicenseCountMe'],
})

export class PaginationAdvanced {
  @Output() changCurPageNum;
  @Output() changCurPage;
  @Output() changPage;
  curPage: string='1';
  page: string='1';
  curPageNum: string='10';
  changCurPageNum = new EventEmitter();
  changCurPage = new EventEmitter();
  changPage = new EventEmitter();
  pageChanged(num):void{
    this.page = num;
    this.curPage = num;
    this.changPage.emit(num);
  }
  setCurPageNum(num):void{
    this.curPageNum = num;
    this.changCurPageNum.emit(num);
  }
  jumpPageKeyUp(e,num): void {
    if (e.keyCode == 13) {
      this.page = num;
      this.curPage = num;
    }
  }
  pageNumList:string[]=['10','15','20','30','40','50'];
  error:any;
  licenseCountMe:any;
  constructor(public config: NgbPaginationConfig) {
  }
}
