import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import {provide} from '@angular/core';
import {Http,XHRBackend,RequestOptions} from '@angular/http';
import {AppComponent} from './app.component';
import {CustomHttp} from './http.custom';
import {MonitoringService} from './monitoring.service';
import {TranslateModule,TranslateLoader,TranslateStaticLoader} from "ng2-translate";


import { SharedModule } from './shared/shared.module';
import { ServerModule } from './server/server.module';
import { HomeModule } from './home/home.module';
import { WindowRef } from './windowserver';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CustomHttp} from './http.custom';
import {MonitoringService} from './monitoring.service';
import { LicenseSystemModule } from './home/config/license-system/license-system.module';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule,
    RouterModule.forRoot(routes),HomeModule,LicenseSystemModule,CookieModule.forRoot(),
    SharedModule.forRoot(),ServerModule.forRoot(),NgbModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
    ],
  declarations: [AppComponent,LoginComponent,HomeComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent],
  providers: [
    WindowRef ,MonitoringService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, monitory:MonitoringService) => {
        return new CustomHttp(backend, defaultOptions, monitory)
      },
      deps: [XHRBackend, RequestOptions, MonitoringService]
    }
  ]
})

export class AppModule { }

