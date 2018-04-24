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
var EditUserService = (function () {
    function EditUserService(http, promptEmitService) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.i = 0;
    }
    EditUserService.prototype.editUser = function (obj, userId) {
        var url = "/manager/user/" + userId;
        return this.http
            .put(url, JSON.stringify(obj))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                if (res._body == '') {
                    return '';
                }
                else {
                    return res.json() || {};
                }
            }
            else if (res.status == 202) {
                return res.json() || {};
            }
        })
            .catch(this.handleError);
    };
    EditUserService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    EditUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService])
    ], EditUserService);
    return EditUserService;
}());
exports.EditUserService = EditUserService;
var ModalContentEditUser = (function () {
    function ModalContentEditUser(activeModal, editUserService, promptEmitService, translate) {
        this.activeModal = activeModal;
        this.editUserService = editUserService;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.loginNameError = '';
        this.displayNameError = '';
        this.desError = '';
        this.subError = '';
        this.inputType = '';
    }
    ModalContentEditUser.prototype.ngOnInit = function () {
        this.createUserModel = {
            "loginName": this.body.loginName,
            "displayName": this.body.displayName,
            "email": this.body.email,
            "status": this.body.status,
            "description": this.body.description
        };
    };
    ModalContentEditUser.prototype.onKeyup = function (value, type) {
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
    ModalContentEditUser.prototype.onRollSubmit = function () {
        var _this = this;
        var me = this;
        this.editUserService.editUser(me.createUserModel, this.body.userId)
            .then(function (returnResult) {
            if (returnResult.code) {
                _this.subError = _this.translate.instant(returnResult.code.toString() + 'edit');
            }
            else {
                me.activeModal.close('success');
            }
        }, function (error) {
            _this.error = error;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalContentEditUser.prototype, "body", void 0);
    ModalContentEditUser = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-edit-user',
            templateUrl: 'modal-content-edit-user.component.html',
            styleUrls: ['modal-content-edit-user.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, EditUserService, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ModalContentEditUser);
    return ModalContentEditUser;
}());
exports.ModalContentEditUser = ModalContentEditUser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1lZGl0LXVzZXIvbW9kYWwtY29udGVudC1lZGl0LXVzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsc0JBQWlDLGtDQUFrQyxDQUFDLENBQUE7QUFDcEUsNkJBQStCLDRCQUE0QixDQUFDLENBQUE7QUFDNUQsc0JBQThDLGdCQUFnQixDQUFDLENBQUE7QUFDL0QsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBRS9DLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUkvQyxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBUXJDO0lBR0UseUJBQW9CLElBQVUsRUFBUyxpQkFBb0M7UUFBdkQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFGcEUsTUFBQyxHQUFXLENBQUMsQ0FBQztJQUdyQixDQUFDO0lBS0Qsa0NBQVEsR0FBUixVQUFTLEdBQUcsRUFBQyxNQUFNO1FBQ2pCLElBQU0sR0FBRyxHQUFHLG1CQUFpQixNQUFRLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUEsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDWixDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENB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QUM7WUFFcEQsVUFBVSxFQUFDLENBQUMsY0FBTSxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7NEJBQUE7SUFpRUYsMkJBQUM7QUFBRCxDQTlEQSxBQThEQyxJQUFBO0FBOURZLDRCQUFvQix1QkE4RGhDLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LWVkaXQtdXNlci9tb2RhbC1jb250ZW50LWVkaXQtdXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0ICxJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi8uLi8uLi9zZXJ2ZXIvcHJvbXB0LWVtaXQvaW5kZXgnO1xuaW1wb3J0IHsgTmdiQWN0aXZlTW9kYWwgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XG5cbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBSYWlkTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2ZXIvaW5kZXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcblxuLyoqXG4gKlxuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFZGl0VXNlclNlcnZpY2Uge1xuICBwdWJsaWMgaTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHB1YmxpYyBwcm9tcHRFbWl0U2VydmljZTogUHJvbXB0RW1pdFNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZWRpdFVzZXIob2JqLHVzZXJJZCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCB1cmwgPSBgL21hbmFnZXIvdXNlci8ke3VzZXJJZH1gO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wdXQodXJsLEpTT04uc3RyaW5naWZ5KG9iaikpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIGlmKHJlcy5fYm9keSA9PSAnJyl7XG4gICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfWVsc2UgaWYocmVzLnN0YXR1cyA9PSAyMDIpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkgfHwgeyB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1lZGl0LXVzZXInLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWNvbnRlbnQtZWRpdC11c2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21vZGFsLWNvbnRlbnQtZWRpdC11c2VyLmNvbXBvbmVudC5jc3MnXSxcbiAgLy8gcHJvdmlkZXJzOiBbTmdGb3JtXSxcbiAgZGlyZWN0aXZlczpbTmdGb3JtXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCdib2R5J11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudEVkaXRVc2VyIHtcbiAgQElucHV0KCkgYm9keTtcbiAgZXJyb3I6YW55O1xuICBjcmVhdGVVc2VyTW9kZWw6YW55O1xuICBsb2dpbk5hbWVFcnJvcj0nJztcbiAgZGlzcGxheU5hbWVFcnJvcj0nJztcbiAgZGVzRXJyb3I9Jyc7XG4gIHN1YkVycm9yPScnO1xuICBpbnB1dFR5cGU9Jyc7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWRpdFVzZXJTZXJ2aWNlOkVkaXRVc2VyU2VydmljZSxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlVXNlck1vZGVsID0ge1xuICAgICAgXCJsb2dpbk5hbWVcIjogdGhpcy5ib2R5LmxvZ2luTmFtZSxcbiAgICAgIFwiZGlzcGxheU5hbWVcIjogdGhpcy5ib2R5LmRpc3BsYXlOYW1lLFxuICAgICAgXCJlbWFpbFwiOiB0aGlzLmJvZHkuZW1haWwsXG4gICAgICBcInN0YXR1c1wiOiB0aGlzLmJvZHkuc3RhdHVzLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiB0aGlzLmJvZHkuZGVzY3JpcHRpb25cbiAgICB9XG4gIH1cbiAgb25LZXl1cCh2YWx1ZSx0eXBlKXtcbiAgICB0aGlzLmlucHV0VHlwZSA9IHR5cGU7XG4gICAgbGV0IHZhbHVlVHJtID0gdmFsdWUudHJpbSgpO1xuICAgIHRoaXMuc3ViRXJyb3I9Jyc7XG4gICAgbGV0IHZhbHVlTGVuID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlVHJtKSkubGVuZ3RoO1xuICAgIGlmKHR5cGUgPT0gJ2xvZ2luJyl7XG4gICAgICB0aGlzLmxvZ2luTmFtZUVycm9yID0gXCJcIjtcbiAgICAgIGlmKHZhbHVlTGVuPjEyOCl7XG4gICAgICAgIHRoaXMubG9naW5OYW1lRXJyb3IgPSBcIumVv+W6puS4jeiDvei2hei/hzEyOOS9jVwiO1xuICAgICAgfVxuXG4gICAgfWVsc2UgaWYodHlwZSA9PSAnZGlzcGxheScpe1xuICAgICAgdGhpcy5kaXNwbGF5TmFtZUVycm9yID0gXCJcIjtcbiAgICAgIGlmKHZhbHVlTGVuPjEyOCl7XG4gICAgICAgIHRoaXMuZGlzcGxheU5hbWVFcnJvciA9IFwi6ZW/5bqm5LiN6IO96LaF6L+HMTI45L2NXCI7XG4gICAgICB9XG4gICAgfWVsc2UgaWYodHlwZSA9PSAnZGVzJyl7XG4gICAgICB0aGlzLmRlc0Vycm9yID0gXCJcIjtcbiAgICAgIGlmKHZhbHVlTGVuPjUwKXtcbiAgICAgICAgdGhpcy5kZXNFcnJvciA9IFwi5o+P6L+w5LiN6IO96LaF6L+HNTDkuKrlrZfnrKZcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgb25Sb2xsU3VibWl0KCkge1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgdGhpcy5lZGl0VXNlclNlcnZpY2UuZWRpdFVzZXIobWUuY3JlYXRlVXNlck1vZGVsLHRoaXMuYm9keS51c2VySWQpXG4gICAgICAudGhlbihcbiAgICAgICAgcmV0dXJuUmVzdWx0ID0+IHtcbiAgICAgICAgICBpZihyZXR1cm5SZXN1bHQuY29kZSl7XG4gICAgICAgICAgICAvLyB0aGlzLnN1YkVycm9yID0gJ+aPkOekuu+8muS/ruaUueeUqOaIt+Wksei0pSzplJnor6/ljp/lm6DvvJonICsgcmV0dXJuUmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLnN1YkVycm9yID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXR1cm5SZXN1bHQuY29kZS50b1N0cmluZygpKydlZGl0Jyk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBtZS5hY3RpdmVNb2RhbC5jbG9zZSgnc3VjY2VzcycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==
