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
var index_1 = require('./../../server/prompt-emit/index');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var forms_1 = require('@angular/forms');
var ng2_translate_1 = require('ng2-translate');
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var AddUserService = (function () {
    function AddUserService(http, promptEmitService) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.i = 0;
    }
    AddUserService.prototype.addUser = function (obj) {
        var url = "/manager/user";
        return this.http
            .post(url, JSON.stringify(obj))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                return res.json() || {};
            }
        })
            .catch(this.handleError);
    };
    AddUserService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    AddUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService])
    ], AddUserService);
    return AddUserService;
}());
exports.AddUserService = AddUserService;
var ModalContentNewUser = (function () {
    function ModalContentNewUser(activeModal, addUserService, promptEmitService, translate) {
        this.activeModal = activeModal;
        this.addUserService = addUserService;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.loginNameError = '';
        this.displayNameError = '';
        this.desError = '';
        this.subError = '';
        this.inputType = '';
    }
    ModalContentNewUser.prototype.ngOnInit = function () {
        this.createUserModel = {
            "loginName": "",
            "displayName": "",
            "password": "123456",
            "email": "",
            "status": 1,
            "description": ""
        };
    };
    ModalContentNewUser.prototype.onKeyup = function (value, type) {
        this.inputType = type;
        var valueTrm = value.trim();
        this.subError = '';
        var valueLen = unescape(encodeURIComponent(valueTrm)).length;
        if (type == 'login') {
            this.loginNameError = "";
            if (valueLen > 128) {
                this.loginNameError = "长度不能超过128位";
            }
        }
        else if (type == 'display') {
            this.displayNameError = "";
            if (valueLen > 128) {
                this.displayNameError = "长度不能超过128位";
            }
        }
        else if (type == 'des') {
            this.desError = "";
            if (valueLen > 50) {
                this.desError = "描述不能超过50个字符";
            }
        }
    };
    ModalContentNewUser.prototype.onRollSubmit = function () {
        var _this = this;
        this.subError = '';
        var me = this;
        this.addUserService.addUser(me.createUserModel)
            .then(function (returnResult) {
            if (returnResult.code) {
                _this.subError = returnResult.code.toString() + 'new';
            }
            else if (returnResult.userId) {
                me.activeModal.close('success');
            }
        }, function (error) {
            _this.error = error;
        });
    };
    ModalContentNewUser = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-new-user',
            templateUrl: 'modal-content-new-user.component.html',
            styleUrls: ['modal-content-new-user.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, AddUserService, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ModalContentNewUser);
    return ModalContentNewUser;
}());
exports.ModalContentNewUser = ModalContentNewUser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1uZXctdXNlci9tb2RhbC1jb250ZW50LW5ldy11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBQzdELHNCQUFpQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BFLDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9ELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFJL0MsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUdFLHdCQUFvQixJQUFVLEVBQVMsaUJBQW9DO1FBQXZELFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRnBFLE1BQUMsR0FBVyxDQUFDLENBQUM7SUFHckIsQ0FBQztJQUtELGdDQUFPLEdBQVAsVUFBUSxHQUFHO1FBQ1QsSUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJ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QUM7SUFDRCwwQ0FBWSxHQUFaO1FBQUEsaUJBa0JDO1FBakJDLElBQUksQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ2pCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUM7YUFDNUMsSUFBSSxDQUNILFVBQUEsWUFBWTtZQUNWLEVBQUUsQ0FBQSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUVwQixLQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsS0FBSyxDQUFDO1lBRXJELENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQzVCLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7UUFDSCxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBMUVIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7WUFDbkQsVUFBVSxFQUFDLENBQUMsY0FBTSxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7MkJBQUE7SUFvRUYsMEJBQUM7QUFBRCxDQWpFQSxBQWlFQyxJQUFBO0FBakVZLDJCQUFtQixzQkFpRS9CLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LW5ldy11c2VyL21vZGFsLWNvbnRlbnQtbmV3LXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4vLi4vLi4vc2VydmVyL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCxOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUmFpZExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBmb3IgZGVidWdnaW5nXG5cbi8qKlxuICpcbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWRkVXNlclNlcnZpY2Uge1xuICBwdWJsaWMgaTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHB1YmxpYyBwcm9tcHRFbWl0U2VydmljZTogUHJvbXB0RW1pdFNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYWRkVXNlcihvYmopOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gYC9tYW5hZ2VyL3VzZXJgO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCxKU09OLnN0cmluZ2lmeShvYmopKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9O1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSAyMDIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1uZXctdXNlcicsXG4gIHRlbXBsYXRlVXJsOiAnbW9kYWwtY29udGVudC1uZXctdXNlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtb2RhbC1jb250ZW50LW5ldy11c2VyLmNvbXBvbmVudC5jc3MnXSxcbiAgZGlyZWN0aXZlczpbTmdGb3JtXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCdib2R5J11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudE5ld1VzZXIge1xuICBlcnJvcjphbnk7XG4gIGNyZWF0ZVVzZXJNb2RlbDphbnk7XG4gIGxvZ2luTmFtZUVycm9yPScnO1xuICBkaXNwbGF5TmFtZUVycm9yPScnO1xuICBkZXNFcnJvcj0nJztcbiAgc3ViRXJyb3I9Jyc7XG4gIGlucHV0VHlwZT0nJztcbiAgY29uc3RydWN0b3IocHVibGljIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhZGRVc2VyU2VydmljZTpBZGRVc2VyU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHByb21wdEVtaXRTZXJ2aWNlOiBQcm9tcHRFbWl0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVVzZXJNb2RlbCA9IHtcbiAgICAgIFwibG9naW5OYW1lXCI6IFwiXCIsXG4gICAgICBcImRpc3BsYXlOYW1lXCI6IFwiXCIsXG4gICAgICBcInBhc3N3b3JkXCI6IFwiMTIzNDU2XCIsXG4gICAgICBcImVtYWlsXCI6IFwiXCIsXG4gICAgICBcInN0YXR1c1wiOiAxLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlwiXG4gICAgfVxuICB9XG4gIG9uS2V5dXAodmFsdWUsdHlwZSl7XG4gICAgdGhpcy5pbnB1dFR5cGUgPSB0eXBlO1xuICAgIGxldCB2YWx1ZVRybSA9IHZhbHVlLnRyaW0oKTtcbiAgICB0aGlzLnN1YkVycm9yPScnO1xuICAgIGxldCB2YWx1ZUxlbiA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZVRybSkpLmxlbmd0aDtcbiAgICBpZih0eXBlID09ICdsb2dpbicpe1xuICAgICAgdGhpcy5sb2dpbk5hbWVFcnJvciA9IFwiXCI7XG4gICAgICBpZih2YWx1ZUxlbj4xMjgpe1xuICAgICAgICB0aGlzLmxvZ2luTmFtZUVycm9yID0gXCLplb/luqbkuI3og73otoXov4cxMjjkvY1cIjtcbiAgICAgIH1cblxuICAgIH1lbHNlIGlmKHR5cGUgPT0gJ2Rpc3BsYXknKXtcbiAgICAgIHRoaXMuZGlzcGxheU5hbWVFcnJvciA9IFwiXCI7XG4gICAgICBpZih2YWx1ZUxlbj4xMjgpe1xuICAgICAgICB0aGlzLmRpc3BsYXlOYW1lRXJyb3IgPSBcIumVv+W6puS4jeiDvei2hei/hzEyOOS9jVwiO1xuICAgICAgfVxuICAgIH1lbHNlIGlmKHR5cGUgPT0gJ2Rlcycpe1xuICAgICAgdGhpcy5kZXNFcnJvciA9IFwiXCI7XG4gICAgICBpZih2YWx1ZUxlbj41MCl7XG4gICAgICAgIHRoaXMuZGVzRXJyb3IgPSBcIuaPj+i/sOS4jeiDvei2hei/hzUw5Liq5a2X56ymXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uUm9sbFN1Ym1pdCgpe1xuICAgIHRoaXMuc3ViRXJyb3I9Jyc7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICB0aGlzLmFkZFVzZXJTZXJ2aWNlLmFkZFVzZXIobWUuY3JlYXRlVXNlck1vZGVsKVxuICAgICAgLnRoZW4oXG4gICAgICAgIHJldHVyblJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYocmV0dXJuUmVzdWx0LmNvZGUpe1xuICAgICAgICAgICAgLy8gdGhpcy5zdWJFcnJvciA9ICfmj5DnpLrvvJrmt7vliqDnlKjmiLflpLHotKUs6ZSZ6K+v5Y6f5Zug77yaJyArIHJldHVyblJlc3VsdC5jb2RlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLnN1YkVycm9yID0gcmV0dXJuUmVzdWx0LmNvZGUudG9TdHJpbmcoKSsnbmV3JztcbiAgICAgICAgICAgIC8vIHRoaXMuc3ViRXJyb3IgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHJldHVyblJlc3VsdC5jb2RlLnRvU3RyaW5nKCkrJ25ldycpO1xuICAgICAgICAgIH1lbHNlIGlmKHJldHVyblJlc3VsdC51c2VySWQpe1xuICAgICAgICAgICAgbWUuYWN0aXZlTW9kYWwuY2xvc2UoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH0sXG4gICAgICApO1xuICB9XG59XG4iXX0=
