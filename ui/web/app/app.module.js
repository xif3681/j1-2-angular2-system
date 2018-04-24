"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var ngx_cookie_1 = require('ngx-cookie');
var app_component_1 = require('./app.component');
var index_1 = require('./login/index');
var index_2 = require('./home/index');
var app_routes_1 = require('./app.routes');
var http_2 = require('@angular/http');
var http_custom_1 = require('./http.custom');
var monitoring_service_1 = require('./monitoring.service');
var ng2_translate_1 = require("ng2-translate");
var shared_module_1 = require('./shared/shared.module');
var server_module_1 = require('./server/server.module');
var home_module_1 = require('./home/home.module');
var windowserver_1 = require('./windowserver');
var forms_1 = require('@angular/forms');
var http_3 = require('@angular/http');
var license_system_module_1 = require('./home/config/license-system/license-system.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, http_3.JsonpModule,
                router_1.RouterModule.forRoot(app_routes_1.routes), home_module_1.HomeModule, license_system_module_1.LicenseSystemModule, ngx_cookie_1.CookieModule.forRoot(),
                shared_module_1.SharedModule.forRoot(), server_module_1.ServerModule.forRoot(), ng_bootstrap_1.NgbModule.forRoot(),
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, '/assets/i18n', '.json'); },
                    deps: [http_2.Http]
                })
            ],
            declarations: [app_component_1.AppComponent, index_1.LoginComponent, index_2.HomeComponent],
            providers: [{
                    provide: common_1.APP_BASE_HREF,
                    useValue: '/'
                }],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                windowserver_1.WindowRef, monitoring_service_1.MonitoringService,
                {
                    provide: http_2.Http,
                    useFactory: function (backend, defaultOptions, monitory) {
                        return new http_custom_1.CustomHttp(backend, defaultOptions, monitory);
                    },
                    deps: [http_2.XHRBackend, http_2.RequestOptions, monitoring_service_1.MonitoringService]
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBb0MsZUFBZSxDQUFDLENBQUE7QUFDcEQsaUNBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDZCQUEwQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3ZELDJCQUE2QixZQUFZLENBQUMsQ0FBQTtBQUMxQyw4QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUMvQyxzQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msc0JBQThCLGNBQWMsQ0FBQyxDQUFBO0FBRTdDLDJCQUF1QixjQUFjLENBQUMsQ0FBQTtBQUd0QyxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFFN0QsNEJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLG1DQUFnQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3ZELDhCQUFvRSxlQUFlLENBQUMsQ0FBQTtBQUdwRiw4QkFBNkIsd0JBQXdCLENBQUMsQ0FBQTtBQUN0RCw4QkFBNkIsd0JBQXdCLENBQUMsQ0FBQTtBQUN0RCw0QkFBMkIsb0JBQW9CLENBQUMsQ0FBQTtBQUNoRCw2QkFBMEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUMzQyxzQkFBZ0QsZ0JBQWdCLENBQUMsQ0FBQTtBQUNqRSxxQkFBNEIsZUFBZSxDQUFDLENBQUE7QUFJNUMsc0NBQW9DLG9EQUFvRCxDQUFDLENBQUE7QUE4QnpGO0lBQUE7SUFBeUIsQ0FBQztJQTVCMUI7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxnQ0FBYSxFQUFFLG1CQUFXLEVBQUUsMkJBQW1CLEVBQUUsaUJBQVUsRUFBRSxrQkFBVztnQkFDaEYscUJBQVksQ0FBQyxPQUFPLENBQUMsbUJBQU0sQ0FBQyxFQUFDLHdCQUFVLEVBQUMsMkNBQW1CLEVBQUMseUJBQVksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xGLDRCQUFZLENBQUMsT0FBTyxFQUFFLEVBQUMsNEJBQVksQ0FBQyxPQUFPLEVBQUUsRUFBQyx3QkFBUyxDQUFDLE9BQU8sRUFBRTtnQkFDakUsK0JBQWUsQ0FBQyxPQUFPLENBQUM7b0JBQ3RCLE9BQU8sRUFBRSwrQkFBZTtvQkFDeEIsVUFBVSxFQUFFLFVBQUMsSUFBVSxJQUFLLE9BQUEsSUFBSSxxQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxFQUF4RCxDQUF3RDtvQkFDcEYsSUFBSSxFQUFFLENBQUMsV0FBSSxDQUFDO2lCQUNiLENBQUM7YUFDRDtZQUNILFlBQVksRUFBRSxDQUFDLDRCQUFZLEVBQUMsc0JBQWMsRUFBQyxxQkFBYSxDQUFDO1lBQ3pELFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxzQkFBYTtvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUIsQ0FBQztZQUNGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsU0FBUyxFQUFFO2dCQUNULHdCQUFTLEVBQUUsc0NBQWlCO2dCQUM1QjtvQkFDRSxPQUFPLEVBQUUsV0FBSTtvQkFDYixVQUFVLEVBQUUsVUFBQyxPQUFtQixFQUFFLGNBQThCLEVBQUUsUUFBMEI7d0JBQzFGLE1BQU0sQ0FBQyxJQUFJLHdCQUFVLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQTtvQkFDMUQsQ0FBQztvQkFDRCxJQUFJLEVBQUUsQ0FBQyxpQkFBVSxFQUFFLHFCQUFjLEVBQUUsc0NBQWlCLENBQUM7aUJBQ3REO2FBQ0Y7U0FDRixDQUFDOztpQkFBQTtJQUV1QixnQkFBQztBQUFELENBQXpCLEFBQTBCLElBQUE7QUFBYixpQkFBUyxZQUFJLENBQUEiLCJmaWxlIjoiYXBwL2FwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBBUFBfQkFTRV9IUkVGIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBDb29raWVNb2R1bGUgfSBmcm9tICduZ3gtY29va2llJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vbG9naW4vaW5kZXgnO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vaG9tZS9pbmRleCc7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9hcHAucm91dGVzJztcblxuaW1wb3J0IHtwcm92aWRlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cCxYSFJCYWNrZW5kLFJlcXVlc3RPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tICcuL2h0dHAuY3VzdG9tJztcbmltcG9ydCB7TW9uaXRvcmluZ1NlcnZpY2V9IGZyb20gJy4vbW9uaXRvcmluZy5zZXJ2aWNlJztcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlLFRyYW5zbGF0ZUxvYWRlcixUcmFuc2xhdGVTdGF0aWNMb2FkZXJ9IGZyb20gXCJuZzItdHJhbnNsYXRlXCI7XG5cblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBTZXJ2ZXJNb2R1bGUgfSBmcm9tICcuL3NlcnZlci9zZXJ2ZXIubW9kdWxlJztcbmltcG9ydCB7IEhvbWVNb2R1bGUgfSBmcm9tICcuL2hvbWUvaG9tZS5tb2R1bGUnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi93aW5kb3dzZXJ2ZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEpzb25wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gJy4vaHR0cC5jdXN0b20nO1xuaW1wb3J0IHtNb25pdG9yaW5nU2VydmljZX0gZnJvbSAnLi9tb25pdG9yaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGljZW5zZVN5c3RlbU1vZHVsZSB9IGZyb20gJy4vaG9tZS9jb25maWcvbGljZW5zZS1zeXN0ZW0vbGljZW5zZS1zeXN0ZW0ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0Jyb3dzZXJNb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBIdHRwTW9kdWxlLCBKc29ucE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpLEhvbWVNb2R1bGUsTGljZW5zZVN5c3RlbU1vZHVsZSxDb29raWVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFNoYXJlZE1vZHVsZS5mb3JSb290KCksU2VydmVyTW9kdWxlLmZvclJvb3QoKSxOZ2JNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgIHVzZUZhY3Rvcnk6IChodHRwOiBIdHRwKSA9PiBuZXcgVHJhbnNsYXRlU3RhdGljTG9hZGVyKGh0dHAsICcvYXNzZXRzL2kxOG4nLCAnLmpzb24nKSxcbiAgICAgIGRlcHM6IFtIdHRwXVxuICAgIH0pXG4gICAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50LExvZ2luQ29tcG9uZW50LEhvbWVDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogQVBQX0JBU0VfSFJFRixcbiAgICB1c2VWYWx1ZTogJzwlPSBBUFBfQkFTRSAlPidcbiAgfV0sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFdpbmRvd1JlZiAsTW9uaXRvcmluZ1NlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogSHR0cCxcbiAgICAgIHVzZUZhY3Rvcnk6IChiYWNrZW5kOiBYSFJCYWNrZW5kLCBkZWZhdWx0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIG1vbml0b3J5Ok1vbml0b3JpbmdTZXJ2aWNlKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQ3VzdG9tSHR0cChiYWNrZW5kLCBkZWZhdWx0T3B0aW9ucywgbW9uaXRvcnkpXG4gICAgICB9LFxuICAgICAgZGVwczogW1hIUkJhY2tlbmQsIFJlcXVlc3RPcHRpb25zLCBNb25pdG9yaW5nU2VydmljZV1cbiAgICB9XG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG5cbiJdfQ==
