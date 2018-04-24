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
var http_1 = require('@angular/http');
var ngx_cookie_1 = require('ngx-cookie');
var index_1 = require('../prompt-emit/index');
var windowserver_1 = require('../../windowserver');
require('rxjs/add/operator/map');
var UserLoginService = (function () {
    function UserLoginService(http, promptEmitService, winRef, _cookieService) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.winRef = winRef;
        this._cookieService = _cookieService;
        var currentUser;
        if (this._cookieService.getObject('currentUser')) {
            currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
        }
        this.token = currentUser && currentUser.token;
        this.userId = currentUser && currentUser.userId;
    }
    UserLoginService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/manager/auth/login', JSON.stringify({ loginName: username, password: password }))
            .map(function (res) {
            if (res.status == 200) {
                var token = res.json() && res.json().token;
                var userId = res.json() && res.json().userId;
                if (token) {
                    _this.token = token;
                    _this.userId = userId;
                    _this.winRef.nativeWindow.userId = _this.userId;
                    _this._cookieService.putObject('currentUser', JSON.stringify({ loginName: username, token: token, userId: userId }));
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (res.status == 202) {
                return res.json().code.toString();
            }
        });
    };
    UserLoginService.prototype.logout = function () {
        this.token = null;
        this._cookieService.remove('currentUser');
    };
    UserLoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, windowserver_1.WindowRef, ngx_cookie_1.CookieService])
    ], UserLoginService);
    return UserLoginService;
}());
exports.UserLoginService = UserLoginService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvdXNlci1sb2dpbi91c2VyLWxvZ2luLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRCxlQUFlLENBQUMsQ0FBQTtBQUNsRSxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsMkJBQThCLFlBQVksQ0FBQyxDQUFBO0FBRzNDLHNCQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELDZCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBQzdDLFFBQU8sdUJBRVAsQ0FBQyxDQUY2QjtBQUc5QjtJQUdFLDBCQUFvQixJQUFVLEVBQVEsaUJBQW1DLEVBQVMsTUFBaUIsRUFBUyxjQUE0QjtRQUFwSCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVEsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBYztRQUV0SSxJQUFJLFdBQVcsQ0FBQztRQUNoQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDL0MsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2xELENBQUM7SUFFRCxnQ0FBSyxHQUFMLFVBQU0sUUFBZ0IsRUFBRSxRQUFnQjtRQUF4QyxpQkFzQkM7UUFyQkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3RHLEdBQUcsQ0FBQyxVQUFDLEdBQWE7WUFDakIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDM0MsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUVyQixLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQztvQkFDOUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFFbkgsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV0QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTVDLENBQUM7SUExQ0g7UUFBQyxpQkFBVSxFQUFFOzt3QkFBQTtJQTJDYix1QkFBQztBQUFELENBMUNBLEFBMENDLElBQUE7QUExQ1ksd0JBQWdCLG1CQTBDNUIsQ0FBQSIsImZpbGUiOiJhcHAvc2VydmVyL3VzZXItbG9naW4vdXNlci1sb2dpbi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LEluamVjdGFibGUsRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgS2l0dGVuY3VwU2VydmljZSxJdGVtVXNlclNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZlci9pbmRleCc7XG5pbXBvcnQgeyBQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vcHJvbXB0LWVtaXQvaW5kZXgnO1xuaW1wb3J0IHtXaW5kb3dSZWZ9IGZyb20gJy4uLy4uL3dpbmRvd3NlcnZlcic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJMb2dpblNlcnZpY2Uge1xuICBwdWJsaWMgdG9rZW46IHN0cmluZztcbiAgcHVibGljIHVzZXJJZDogc3RyaW5nO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAscHVibGljIHByb21wdEVtaXRTZXJ2aWNlOlByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWYscHJpdmF0ZSBfY29va2llU2VydmljZTpDb29raWVTZXJ2aWNlICkge1xuICAgIC8vIHNldCB0b2tlbiBpZiBzYXZlZCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgdmFyIGN1cnJlbnRVc2VyO1xuICAgIGlmKHRoaXMuX2Nvb2tpZVNlcnZpY2UuZ2V0T2JqZWN0KCdjdXJyZW50VXNlcicpKXtcbiAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZSh0aGlzLl9jb29raWVTZXJ2aWNlLmdldE9iamVjdCgnY3VycmVudFVzZXInKSk7XG4gICAgfVxuICAgIHRoaXMudG9rZW4gPSBjdXJyZW50VXNlciAmJiBjdXJyZW50VXNlci50b2tlbjtcbiAgICB0aGlzLnVzZXJJZCA9IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLnVzZXJJZDtcbiAgfVxuXG4gIGxvZ2luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9tYW5hZ2VyL2F1dGgvbG9naW4nLCBKU09OLnN0cmluZ2lmeSh7IGxvZ2luTmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCB9KSlcbiAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYocmVzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgIGxldCB0b2tlbiA9IHJlcy5qc29uKCkgJiYgcmVzLmpzb24oKS50b2tlbjtcbiAgICAgICAgICBsZXQgdXNlcklkID0gcmVzLmpzb24oKSAmJiByZXMuanNvbigpLnVzZXJJZDtcbiAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgICAgICAgICAgLy/orr7nva7lhajlsYDlj5jph49cbiAgICAgICAgICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdy51c2VySWQgPSB0aGlzLnVzZXJJZDtcbiAgICAgICAgICAgIHRoaXMuX2Nvb2tpZVNlcnZpY2UucHV0T2JqZWN0KCdjdXJyZW50VXNlcicsIEpTT04uc3RyaW5naWZ5KHsgbG9naW5OYW1lOiB1c2VybmFtZSwgdG9rZW46IHRva2VuICx1c2VySWQ6IHVzZXJJZH0pKTtcbiAgICAgICAgICAgIC8vIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJywgSlNPTi5zdHJpbmdpZnkoeyBsb2dpbk5hbWU6IHVzZXJuYW1lLCB0b2tlbjogdG9rZW4gLHVzZXJJZDogdXNlcklkfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXMgPT0gMjAyKXtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICB0aGlzLnRva2VuID0gbnVsbDtcbiAgICB0aGlzLl9jb29raWVTZXJ2aWNlLnJlbW92ZSgnY3VycmVudFVzZXInKTtcbiAgICAvLyBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpO1xuICB9XG59XG4iXX0=
