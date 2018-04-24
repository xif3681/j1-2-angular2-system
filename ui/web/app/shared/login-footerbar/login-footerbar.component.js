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
var index_1 = require('../../server/index');
var ng2_translate_1 = require('ng2-translate');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var LoginFooterbarComponent = (function () {
    function LoginFooterbarComponent(productInfoServer, versionInfoService, translate) {
        var _this = this;
        this.productInfoServer = productInfoServer;
        this.versionInfoService = versionInfoService;
        this.translate = translate;
        this.productInfo = {};
        productInfoServer.change.subscribe(function (value) {
            _this.productInfo = value;
        });
        var myDate = new Date();
        this.fullYear = myDate.getFullYear();
        this.getproductInfoMsg();
        this.getVersionInfo();
    }
    LoginFooterbarComponent.prototype.getproductInfoMsg = function () {
        var _this = this;
        this.productInfoServer.getLoginProductInfo()
            .then(function (productInfo) {
            if (productInfo.productName) {
                _this.productInfo = productInfo;
            }
            else {
                _this.productInfoErr = productInfo;
            }
        }, function (error) {
            _this.error = error;
        });
    };
    LoginFooterbarComponent.prototype.getVersionInfo = function () {
        var _this = this;
        var me = this;
        this.versionInfoService.getVersion()
            .then(function (versionInfo) {
            me.versionInfo = versionInfo;
        }, function (error) {
            _this.error = error;
        });
    };
    LoginFooterbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ab-login-footerbar',
            templateUrl: 'login-footerbar.component.html',
            styleUrls: ['login-footerbar.component.css'],
            providers: [ng_bootstrap_1.NgbAlertConfig]
        }), 
        __metadata('design:paramtypes', [index_1.ProductInfoServer, index_1.VersionInfoService, ng2_translate_1.TranslateService])
    ], LoginFooterbarComponent);
    return LoginFooterbarComponent;
}());
exports.LoginFooterbarComponent = LoginFooterbarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbG9naW4tZm9vdGVyYmFyL2xvZ2luLWZvb3RlcmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCxzQkFBb0Qsb0JBQW9CLENBQUMsQ0FBQTtBQUN6RSw4QkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0MsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQUVyQyw2QkFBNkIsNEJBQTRCLENBQUMsQ0FBQTtBQVkxRDtJQU9FLGlDQUFvQixpQkFBb0MsRUFBUyxrQkFBc0MsRUFBUyxTQUEyQjtRQVA3SSxpQkFzREM7UUEvQ3FCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFOM0ksZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFRZixpQkFBaUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBYTtZQUMvQyxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFLRCxtREFBaUIsR0FBakI7UUFBQSxpQkFlQztRQWRDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRTthQUN6QyxJQUFJLENBQ0gsVUFBQSxXQUFXO1lBQ1QsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztZQUNwQyxDQUFDO1FBQ0gsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FDRixDQUFBO0lBRUwsQ0FBQztJQUtELGdEQUFjLEdBQWQ7UUFBQSxpQkFXQztRQVZDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7YUFDakMsSUFBSSxDQUNILFVBQUEsV0FBVztZQUNULEVBQUUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQ0YsQ0FBQTtJQUNMLENBQUM7SUE3REg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztZQUM1QyxTQUFTLEVBQUUsQ0FBQyw2QkFBYyxDQUFDO1NBQzVCLENBQUM7OytCQUFBO0lBd0RGLDhCQUFDO0FBQUQsQ0F0REEsQUFzREMsSUFBQTtBQXREWSwrQkFBdUIsMEJBc0RuQyxDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvbG9naW4tZm9vdGVyYmFyL2xvZ2luLWZvb3RlcmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQcm9kdWN0SW5mb1NlcnZlciwgVmVyc2lvbkluZm9TZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2ZXIvaW5kZXgnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcbmltcG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbi8qKlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIHRoZSB0b29sYmFyIGNvbXBvbmVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYWItbG9naW4tZm9vdGVyYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICdsb2dpbi1mb290ZXJiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbG9naW4tZm9vdGVyYmFyLmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbTmdiQWxlcnRDb25maWddXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Gb290ZXJiYXJDb21wb25lbnQge1xuICBwcm9kdWN0SW5mbyA9IHt9O1xuICBwcm9kdWN0SW5mb0VycjogYW55O1xuICBlcnJvcjogYW55O1xuICBmdWxsWWVhcjogYW55O1xuICB2ZXJzaW9uSW5mbzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvZHVjdEluZm9TZXJ2ZXI6IFByb2R1Y3RJbmZvU2VydmVyLCBwdWJsaWMgdmVyc2lvbkluZm9TZXJ2aWNlOiBWZXJzaW9uSW5mb1NlcnZpY2UsIHB1YmxpYyB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcblxuICAgIHByb2R1Y3RJbmZvU2VydmVyLmNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBudW1iZXIpPT4ge1xuICAgICAgdGhpcy5wcm9kdWN0SW5mbyA9IHZhbHVlO1xuICAgIH0pO1xuICAgIGxldCBteURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuZnVsbFllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKTsgLy/ojrflj5blrozmlbTnmoTlubTku70oNOS9jSwxOTcwLT8/Pz8pXG4gICAgLy/liJ3lp4vljJbnmoTml7blgJnojrflj5bkv6Hmga9cbiAgICB0aGlzLmdldHByb2R1Y3RJbmZvTXNnKCk7XG4gICAgdGhpcy5nZXRWZXJzaW9uSW5mbygpO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluS6p+WTgeS/oeaBr1xuICAgKi9cbiAgZ2V0cHJvZHVjdEluZm9Nc2coKTogdm9pZCB7XG4gICAgdGhpcy5wcm9kdWN0SW5mb1NlcnZlci5nZXRMb2dpblByb2R1Y3RJbmZvKClcbiAgICAgIC50aGVuKFxuICAgICAgICBwcm9kdWN0SW5mbyA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3RJbmZvLnByb2R1Y3ROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RJbmZvID0gcHJvZHVjdEluZm87XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEluZm9FcnIgPSBwcm9kdWN0SW5mbztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIClcblxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPlueJiOacrOS/oeaBr1xuICAgKi9cbiAgZ2V0VmVyc2lvbkluZm8oKTogdm9pZCB7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICB0aGlzLnZlcnNpb25JbmZvU2VydmljZS5nZXRWZXJzaW9uKClcbiAgICAgIC50aGVuKFxuICAgICAgICB2ZXJzaW9uSW5mbyA9PiB7XG4gICAgICAgICAgbWUudmVyc2lvbkluZm8gPSB2ZXJzaW9uSW5mbztcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG59XG5cbiJdfQ==
