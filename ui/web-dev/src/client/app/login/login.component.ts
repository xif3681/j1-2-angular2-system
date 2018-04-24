import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
import {UserLoginService, KittencupService} from '../server/index';
import {WindowRef} from './../windowserver';
import {TranslateService} from 'ng2-translate';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  loginHeight: any;
  error = '';
  curLang = '';

  constructor(private router: Router,
              private userLoginService: UserLoginService,
              private kittencupService: KittencupService,
              private http: Http,
              private winRef: WindowRef,
              private translate: TranslateService) {
    // this.loginHeight = winRef.nativeWindow.window.screen.clientHeight +'px';
    // this.loginHeight = document.body.scrollHeight+'px';
    this.curLang = this.winRef.nativeWindow.window.localStorage.lang || 'ch';

  }

  ngOnInit() {

    this.userLoginService.logout();
  }

  onKeydown(event: any) {
    if (event.keyCode !== 13) {
      this.error = '';
    }
  }
  login() {
    this.error = '';
    this.loading = true;
    this.userLoginService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = result;
          this.loading = false;
        }
      });
  }


  /**
   * 设置当前的语言，放在localStorage里面
   * @param lang
   */
  setCurrentLang(lang) {
    this.curLang = lang;
    this.translate.use(this.curLang);
    this.winRef.nativeWindow.window.localStorage.lang = this.curLang;
    if (lang == 'tw') {
      document.title = '恒大 AnyRobot';
    } else if (lang == 'en') {
      document.title = 'HengDa AnyRobot';
    } else if (lang == 'ch') {
      document.title = '恒大 AnyRobot';
    }
  }
}
