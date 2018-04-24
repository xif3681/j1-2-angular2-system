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
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var index_1 = require('../server/index');
var windowserver_1 = require('./../windowserver');
var ng2_translate_1 = require('ng2-translate');
var LoginComponent = (function () {
    function LoginComponent(router, userLoginService, kittencupService, http, winRef, translate) {
        this.router = router;
        this.userLoginService = userLoginService;
        this.kittencupService = kittencupService;
        this.http = http;
        this.winRef = winRef;
        this.translate = translate;
        this.model = {};
        this.loading = false;
        this.error = '';
        this.curLang = '';
        this.curLang = this.winRef.nativeWindow.window.localStorage.lang || 'ch';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.userLoginService.logout();
    };
    LoginComponent.prototype.onKeydown = function (event) {
        if (event.keyCode !== 13) {
            this.error = '';
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.error = '';
        this.loading = true;
        this.userLoginService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/']);
            }
            else {
                _this.error = result;
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.setCurrentLang = function (lang) {
        this.curLang = lang;
        this.translate.use(this.curLang);
        this.winRef.nativeWindow.window.localStorage.lang = this.curLang;
        if (lang == 'tw') {
            document.title = '愛數 AnyRobot';
        }
        else if (lang == 'en') {
            document.title = 'Eisoo AnyRobot';
        }
        else if (lang == 'ch') {
            document.title = '爱数 AnyRobot';
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.UserLoginService, index_1.KittencupService, http_1.Http, windowserver_1.WindowRef, ng2_translate_1.TranslateService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCx1QkFBcUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN2QyxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFDdEQsc0JBQWlELGlCQUFpQixDQUFDLENBQUE7QUFDbkUsNkJBQXdCLG1CQUFtQixDQUFDLENBQUE7QUFDNUMsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBTy9DO0lBT0Usd0JBQW9CLE1BQWMsRUFDZCxnQkFBa0MsRUFDbEMsZ0JBQWtDLEVBQ2xDLElBQVUsRUFDVixNQUFpQixFQUNqQixTQUEyQjtRQUwzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBWC9DLFVBQUssR0FBUSxFQUFFLENBQUM7UUFDaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQVVYLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBRTNFLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBRUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbEIsQ0FBQztJQUNILENBQUM7SUFDRCw4QkFBSyxHQUFMO1FBQUEsaUJBWUM7UUFYQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2xFLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDZixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztnQkFDcEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU9ELHVDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsUUFBUSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztRQUNwQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBaEVIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1NBQ25DLENBQUM7O3NCQUFBO0lBNkRGLHFCQUFDO0FBQUQsQ0E1REEsQUE0REMsSUFBQTtBQTVEWSxzQkFBYyxpQkE0RDFCLENBQUEiLCJmaWxlIjoiYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtIdHRwLCBIZWFkZXJzLCBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7VXNlckxvZ2luU2VydmljZSwgS2l0dGVuY3VwU2VydmljZX0gZnJvbSAnLi4vc2VydmVyL2luZGV4JztcclxuaW1wb3J0IHtXaW5kb3dSZWZ9IGZyb20gJy4vLi4vd2luZG93c2VydmVyJztcclxuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcclxuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiAnbG9naW4uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWydsb2dpbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBtb2RlbDogYW55ID0ge307XHJcbiAgbG9hZGluZyA9IGZhbHNlO1xyXG4gIGxvZ2luSGVpZ2h0OiBhbnk7XHJcbiAgZXJyb3IgPSAnJztcclxuICBjdXJMYW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VyTG9naW5TZXJ2aWNlOiBVc2VyTG9naW5TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUga2l0dGVuY3VwU2VydmljZTogS2l0dGVuY3VwU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHAsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSB3aW5SZWY6IFdpbmRvd1JlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgLy8gdGhpcy5sb2dpbkhlaWdodCA9IHdpblJlZi5uYXRpdmVXaW5kb3cud2luZG93LnNjcmVlbi5jbGllbnRIZWlnaHQgKydweCc7XHJcbiAgICAvLyB0aGlzLmxvZ2luSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQrJ3B4JztcclxuICAgIHRoaXMuY3VyTGFuZyA9IHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdy53aW5kb3cubG9jYWxTdG9yYWdlLmxhbmcgfHwgJ2NoJztcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB0aGlzLnVzZXJMb2dpblNlcnZpY2UubG9nb3V0KCk7XHJcbiAgfVxyXG5cclxuICBvbktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgIT09IDEzKSB7XHJcbiAgICAgIHRoaXMuZXJyb3IgPSAnJztcclxuICAgIH1cclxuICB9XHJcbiAgbG9naW4oKSB7XHJcbiAgICB0aGlzLmVycm9yID0gJyc7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy51c2VyTG9naW5TZXJ2aWNlLmxvZ2luKHRoaXMubW9kZWwudXNlcm5hbWUsIHRoaXMubW9kZWwucGFzc3dvcmQpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3IgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOiuvue9ruW9k+WJjeeahOivreiogO+8jOaUvuWcqGxvY2FsU3RvcmFnZemHjOmdolxyXG4gICAqIEBwYXJhbSBsYW5nXHJcbiAgICovXHJcbiAgc2V0Q3VycmVudExhbmcobGFuZykge1xyXG4gICAgdGhpcy5jdXJMYW5nID0gbGFuZztcclxuICAgIHRoaXMudHJhbnNsYXRlLnVzZSh0aGlzLmN1ckxhbmcpO1xyXG4gICAgdGhpcy53aW5SZWYubmF0aXZlV2luZG93LndpbmRvdy5sb2NhbFN0b3JhZ2UubGFuZyA9IHRoaXMuY3VyTGFuZztcclxuICAgIGlmIChsYW5nID09ICd0dycpIHtcclxuICAgICAgZG9jdW1lbnQudGl0bGUgPSAn5oSb5pW4IEFueVJvYm90JztcclxuICAgIH0gZWxzZSBpZiAobGFuZyA9PSAnZW4nKSB7XHJcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gJ0Vpc29vIEFueVJvYm90JztcclxuICAgIH0gZWxzZSBpZiAobGFuZyA9PSAnY2gnKSB7XHJcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gJ+eIseaVsCBBbnlSb2JvdCc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
