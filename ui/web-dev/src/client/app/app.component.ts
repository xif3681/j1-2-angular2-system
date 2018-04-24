import { Component } from '@angular/core';
import { Config } from './shared/index';
import './operators';
import {Http} from '@angular/http';
import {MonitoringService} from './monitoring.service';
import {WindowRef} from './windowserver';
import {TranslateService} from 'ng2-translate';
/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (ManageComponent, ConfigComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styles:[`
    :host{
        display: block;
        height: inherit;
    }
  `],
})

export class AppComponent {
  constructor(private winRef: WindowRef, private monitoring:MonitoringService,private http:Http,private translate: TranslateService) {

    console.log('Environment config', Config);
    console.log('Window object', winRef.nativeWindow);
    let lang = winRef.nativeWindow.window.localStorage.lang || 'ch';
    winRef.nativeWindow.window.localStorage.lang = lang;
    translate.addLangs(["ch","tw", "en"]);
    translate.setDefaultLang(lang);
    translate.use(lang.match(/en|tw|ch/) ? lang : 'ch');



    // //localStorage.lang  来存储用户上一次选择的语言,如果用户是第一次登录,默认显示中文
    // var lang = window.localStorage.lang || 'zh-cn';
    // window.localStorage.lang = lang;
    // $translateProvider.preferredLanguage(lang);
    // $translateProvider.useLoader('$translatePartialLoader', {
    //   urlTemplate: '{part}/i18n/{lang}.json'
    // });
    // // Enable escaping of HTML
    // // $translateProvider.useSanitizeValueStrategy('sanitize');
    // $translateProvider.useSanitizeValueStrategy(null);
    // $translateProvider.fallbackLanguage('en-us');
  }
}
