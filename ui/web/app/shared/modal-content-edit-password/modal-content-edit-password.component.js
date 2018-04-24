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
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var EditPasswordService = (function () {
    function EditPasswordService(http, promptEmitService) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.i = 0;
    }
    EditPasswordService.prototype.editPassword = function (obj, id) {
        var url = "/manager/user/" + id + "/password";
        return this.http
            .put(url, JSON.stringify(obj))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return true;
            }
            else if (res.status == 202) {
                return res.json().code.toString();
            }
        })
            .catch(this.handleError);
    };
    EditPasswordService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    EditPasswordService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService])
    ], EditPasswordService);
    return EditPasswordService;
}());
exports.EditPasswordService = EditPasswordService;
var EditPassword = (function () {
    function EditPassword(activeModal, editPasswordService, promptEmitService) {
        this.activeModal = activeModal;
        this.editPasswordService = editPasswordService;
        this.promptEmitService = promptEmitService;
        this.curPasswordError = '';
        this.newPasswordError = '';
        this.confPasswordError = '';
        this.inputType = '';
    }
    EditPassword.prototype.ngOnInit = function () {
        this.editPasswordModel = {
            "currentPassword": "",
            "newPassword": "",
            "newPasswordConfirm": ""
        };
    };
    EditPassword.prototype.onKeyup = function (value, type) {
        this.inputType = type;
        var valueTrm = value.trim();
        this.confPasswordError = '';
        var valueLen = unescape(encodeURIComponent(valueTrm)).length;
        if (type == 'new') {
            this.newPasswordError = "";
            if (valueLen < 6) {
                this.newPasswordError = "长度不能低于6位";
            }
            else if (valueLen > 50) {
                this.newPasswordError = "长度不能超过50位";
            }
        }
    };
    EditPassword.prototype.onRollSubmit = function () {
        var _this = this;
        var me = this;
        this.confPasswordError = '';
        if (this.editPasswordModel.newPassword == this.editPasswordModel.currentPassword) {
            this.confPasswordError = "新密码不能和旧密码相同";
        }
        else if (this.editPasswordModel.newPassword !== this.editPasswordModel.newPasswordConfirm) {
            this.confPasswordError = "两次输入的密码不一致";
        }
        else {
            this.editPasswordService.editPassword(this.editPasswordModel, this.userId)
                .then(function (returnResult) {
                if (returnResult !== true) {
                    _this.confPasswordError = returnResult;
                }
                else {
                    me.activeModal.close('success');
                }
            }, function (error) {
                _this.error = error;
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditPassword.prototype, "userId", void 0);
    EditPassword = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-edit-password',
            templateUrl: 'modal-content-edit-password.component.html',
            styleUrls: ['modal-content-edit-password.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'userId']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, EditPasswordService, index_1.PromptEmitService])
    ], EditPassword);
    return EditPassword;
}());
exports.EditPassword = EditPassword;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1lZGl0LXBhc3N3b3JkL21vZGFsLWNvbnRlbnQtZWRpdC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE2QyxlQUFlLENBQUMsQ0FBQTtBQUM3RCxzQkFBaUMsa0NBQWtDLENBQUMsQ0FBQTtBQUNwRSw2QkFBK0IsNEJBQTRCLENBQUMsQ0FBQTtBQUM1RCxzQkFBOEMsZ0JBQWdCLENBQUMsQ0FBQTtBQUcvRCxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFJL0MsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUVFLDZCQUFvQixJQUFVLEVBQVMsaUJBQW9DO1FBQXZELFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRHBFLE1BQUMsR0FBVyxDQUFDLENBQUM7SUFFckIsQ0FBQztJQUtELDBDQUFZLEdBQVosVUFBYSxHQUFHLEVBQUMsRUFBRTtRQUNqQixJQUFNLEdBQUcsR0FBRyxtQkFBaUIsRUFBRSxjQUFXLENBQUM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMs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QyxDQUFDO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDdEUsSUFBSSxDQUNILFVBQUEsWUFBWTtnQkFDVixFQUFFLENBQUEsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQztnQkFFeEMsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDSixFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztZQUNILENBQUMsRUFDRCxVQUFBLEtBQUs7Z0JBQ0gsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDckIsQ0FBQyxDQUNGLENBQUM7UUFDTixDQUFDO0lBQ0gsQ0FBQztJQXRERDtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFYVjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdDQUFnQztZQUMxQyxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFNBQVMsRUFBRSxDQUFDLDJDQUEyQyxDQUFDO1lBQ3hELFVBQVUsRUFBQyxDQUFDLGNBQU0sQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUMsUUFBUSxDQUFDO1NBQzFCLENBQUM7O29CQUFBO0lBK0RGLG1CQUFDO0FBQUQsQ0E1REEsQUE0REMsSUFBQTtBQTVEWSxvQkFBWSxlQTREeEIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGFsLWNvbnRlbnQtZWRpdC1wYXNzd29yZC9tb2RhbC1jb250ZW50LWVkaXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4vLi4vLi4vc2VydmVyL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCxOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cblxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFJhaWRMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZlci9pbmRleCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG4vKipcbiAqXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVkaXRQYXNzd29yZFNlcnZpY2Uge1xuICBwdWJsaWMgaTogbnVtYmVyID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlKSB7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGVkaXRQYXNzd29yZChvYmosaWQpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gYC9tYW5hZ2VyL3VzZXIvJHtpZH0vcGFzc3dvcmRgO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wdXQodXJsLEpTT04uc3RyaW5naWZ5KG9iaikpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXMgPT0gMjAyKXtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKTtcblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1lZGl0LXBhc3N3b3JkJyxcbiAgdGVtcGxhdGVVcmw6ICdtb2RhbC1jb250ZW50LWVkaXQtcGFzc3dvcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbW9kYWwtY29udGVudC1lZGl0LXBhc3N3b3JkLmNvbXBvbmVudC5jc3MnXSxcbiAgZGlyZWN0aXZlczpbTmdGb3JtXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCd1c2VySWQnXVxufSlcblxuXG5leHBvcnQgY2xhc3MgRWRpdFBhc3N3b3JkIHtcbiAgQElucHV0KCkgdXNlcklkO1xuICBlcnJvcjphbnk7XG4gIGN1clBhc3N3b3JkRXJyb3I9Jyc7XG4gIG5ld1Bhc3N3b3JkRXJyb3I9Jyc7XG4gIGNvbmZQYXNzd29yZEVycm9yPScnO1xuICBpbnB1dFR5cGU9Jyc7XG4gIGVkaXRQYXNzd29yZE1vZGVsOmFueTtcbiAgY29uc3RydWN0b3IocHVibGljIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlZGl0UGFzc3dvcmRTZXJ2aWNlOkVkaXRQYXNzd29yZFNlcnZpY2UscHVibGljIHByb21wdEVtaXRTZXJ2aWNlOiBQcm9tcHRFbWl0U2VydmljZSkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZWRpdFBhc3N3b3JkTW9kZWwgPSB7XG4gICAgICBcImN1cnJlbnRQYXNzd29yZFwiOiBcIlwiLFxuICAgICAgXCJuZXdQYXNzd29yZFwiOiBcIlwiLFxuICAgICAgXCJuZXdQYXNzd29yZENvbmZpcm1cIjogXCJcIlxuICAgIH1cbiAgfVxuICBvbktleXVwKHZhbHVlLHR5cGUpe1xuICAgIHRoaXMuaW5wdXRUeXBlID0gdHlwZTtcbiAgICBsZXQgdmFsdWVUcm0gPSB2YWx1ZS50cmltKCk7XG4gICAgdGhpcy5jb25mUGFzc3dvcmRFcnJvcj0nJztcbiAgICBsZXQgdmFsdWVMZW4gPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodmFsdWVUcm0pKS5sZW5ndGg7XG4gICAgaWYodHlwZSA9PSAnbmV3Jyl7XG4gICAgICB0aGlzLm5ld1Bhc3N3b3JkRXJyb3IgPSBcIlwiO1xuICAgICAgaWYodmFsdWVMZW48Nil7XG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmRFcnJvciA9IFwi6ZW/5bqm5LiN6IO95L2O5LqONuS9jVwiO1xuICAgICAgfWVsc2UgaWYodmFsdWVMZW4+NTApe1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkRXJyb3IgPSBcIumVv+W6puS4jeiDvei2hei/hzUw5L2NXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uUm9sbFN1Ym1pdCgpIHtcbiAgICBsZXQgbWUgPSB0aGlzO1xuICAgIHRoaXMuY29uZlBhc3N3b3JkRXJyb3I9Jyc7XG4gICAgaWYodGhpcy5lZGl0UGFzc3dvcmRNb2RlbC5uZXdQYXNzd29yZCA9PSB0aGlzLmVkaXRQYXNzd29yZE1vZGVsLmN1cnJlbnRQYXNzd29yZCl7XG4gICAgICB0aGlzLmNvbmZQYXNzd29yZEVycm9yID0gXCLmlrDlr4bnoIHkuI3og73lkozml6flr4bnoIHnm7jlkIxcIjtcbiAgICB9ZWxzZSBpZih0aGlzLmVkaXRQYXNzd29yZE1vZGVsLm5ld1Bhc3N3b3JkIT09dGhpcy5lZGl0UGFzc3dvcmRNb2RlbC5uZXdQYXNzd29yZENvbmZpcm0pe1xuICAgICAgdGhpcy5jb25mUGFzc3dvcmRFcnJvciA9IFwi5Lik5qyh6L6T5YWl55qE5a+G56CB5LiN5LiA6Ie0XCI7XG4gICAgfWVsc2Uge1xuICAgICAgdGhpcy5lZGl0UGFzc3dvcmRTZXJ2aWNlLmVkaXRQYXNzd29yZCh0aGlzLmVkaXRQYXNzd29yZE1vZGVsLHRoaXMudXNlcklkKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICByZXR1cm5SZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYocmV0dXJuUmVzdWx0ICE9PSB0cnVlKXtcbiAgICAgICAgICAgICAgdGhpcy5jb25mUGFzc3dvcmRFcnJvciA9IHJldHVyblJlc3VsdDtcbiAgICAgICAgICAgICAgLy8gdGhpcy5jb25mUGFzc3dvcmRFcnJvciA9ICfmj5DnpLrvvJrkv67mlLnlr4bnoIHlpLHotKUs6ZSZ6K+v5Y6f5Zug77yaJytyZXR1cm5SZXN1bHQ7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgbWUuYWN0aXZlTW9kYWwuY2xvc2UoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG5cblxuXG59XG4iXX0=
