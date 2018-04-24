import { Component } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
import { ModalContentAbout,EditPassword} from '../../shared/index';
import { UserLoginService,ItemUserService} from '../../server/index';
import {WindowRef} from '../../windowserver';
import {TranslateService} from 'ng2-translate';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent {
  select:any;
  token:any;
  userId:any;
  loginName:any;
  error:any;
  curLang:any;
  constructor(private winRef: WindowRef, public modalService: NgbModal,
              public userLoginService:UserLoginService,public itemUserService:ItemUserService,
              private translate: TranslateService,private _cookieService:CookieService){
    this.select = 'manage';

  }
  ngOnInit() {
    // let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    let currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
    this.token = currentUser && currentUser.token;
    this.userId = currentUser && currentUser.userId;
    // this.getUserItem(this.winRef.nativeWindow.window.userId);
    this.getUserItem(this.userId);
    this.curLang  = this.winRef.nativeWindow.window.localStorage.lang || 'ch';
  }


  /**
   * 获取用户的显示名
   */
  getUserItem(id) {
     let me = this;
     this.itemUserService.infoItemUser(id)
       .then(
         itemUser => {
           this.loginName = itemUser.displayName;
         },
         error => {
           me.error = error;
         }
       )
  }
  setAbout():any {
    let modalRef1 = this.modalService.open(ModalContentAbout);
    modalRef1.componentInstance.title = '关于AnyRobot';
  }
  editPassWorld():any {
    let modalRef1 = this.modalService.open(EditPassword);
    modalRef1.componentInstance.title = '修改密码';
    // modalRef1.componentInstance.passWord = this.passWord;
    modalRef1.componentInstance.userId = this.userId;
  }
  /**
   * 设置当前的语言，放在localStorage里面
   * @param lang
   */
  setCurrentLang(lang){
    this.curLang = lang;
    this.translate.use(this.curLang);
    this.winRef.nativeWindow.window.localStorage.lang = this.curLang;
    if (lang == 'tw') {
      document.title = '恒大 AnyRobot';
    } else if (lang == 'en'){
      document.title = 'HengDa AnyRobot';
    }else if (lang == 'ch'){
      document.title = '恒大 AnyRobot';
    }
  }

}
