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
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var ng2_translate_1 = require('ng2-translate');
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var ActiveLicenseServer = (function () {
    function ActiveLicenseServer(http, translate) {
        this.http = http;
        this.translate = translate;
    }
    ActiveLicenseServer.prototype.activeLicense = function (activeCode, serial) {
        var url = "/manager/license/" + serial + "/active";
        return this.http
            .post(url, JSON.stringify({ "activeCode": activeCode }))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res;
            }
            else if (res.status == 202) {
                return res.json() || {};
            }
        })
            .catch(this.handleError);
    };
    ActiveLicenseServer.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ActiveLicenseServer = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_translate_1.TranslateService])
    ], ActiveLicenseServer);
    return ActiveLicenseServer;
}());
exports.ActiveLicenseServer = ActiveLicenseServer;
var ModalContentActiveCode = (function () {
    function ModalContentActiveCode(activeModal, activeLicenseServer, translate) {
        this.activeModal = activeModal;
        this.activeLicenseServer = activeLicenseServer;
        this.translate = translate;
    }
    ModalContentActiveCode.prototype.activeModalLicense = function (activeCode) {
        var _this = this;
        if (activeCode.trim() == '') {
            this.activeLicenseErrmsg = '请输入激活码';
            return;
        }
        var me = this;
        this.activeLicenseServer.activeLicense(activeCode, this.serial)
            .then(function (activeLicense) {
            if (activeLicense.status == 200) {
                me.activeModal.close(true);
            }
            else if (activeLicense.code) {
                _this.activeLicenseErrmsg = activeLicense.code.toString() + 'actcode';
                return;
            }
        }, function (error) {
            _this.error = error;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalContentActiveCode.prototype, "serial", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalContentActiveCode.prototype, "machineCode", void 0);
    ModalContentActiveCode = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-active-code',
            templateUrl: 'modal-content-active-code.component.html',
            styleUrls: ['modal-content-active-code.component.css'],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, ActiveLicenseServer, ng2_translate_1.TranslateService])
    ], ModalContentActiveCode);
    return ModalContentActiveCode;
}());
exports.ModalContentActiveCode = ModalContentActiveCode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1hY3RpdmUtY29kZS9tb2RhbC1jb250ZW50LWFjdGl2ZS1jb2RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBRTdELDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBRTVELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFHL0MsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUVFLDZCQUFvQixJQUFVLEVBQVMsU0FBMkI7UUFBOUMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ2xFLENBQUM7SUFJRCwyQ0FBYSxHQUFiLFVBQWMsVUFBaUIsRUFBQyxNQUFhO1FBQzNDLElBQU0sR0FBRyxHQUFHLHNCQUFvQixNQUFNLFlBQVMsQ0FBQztRQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQzthQUNyRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTdCLENBQUM7SUFNTyx5Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBRTVCLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPO1lBQzFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sV0FBTSxLQUFLLENBQUMsVUFBWSxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFwQ0g7UUFBQyxpQkFBVSxFQUFFOzsyQkFBQTtJQXFDYiwwQkFBQztBQUFELENBcENBLEFBb0NDLElBQUE7QUFwQ1ksMkJBQW1CLHNCQW9DL0IsQ0FBQTtBQVdEO0lBS0UsZ0NBQW1CLFdBQTJCLEVBQVMsbUJBQXVDLEVBQVMsU0FBMkI7UUFBL0csZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ2xJLENBQUM7SUFDRCxtREFBa0IsR0FBbEIsVUFBbUIsVUFBaUI7UUFBcEMsaUJBcUJDO1FBcEJDLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUM7WUFDcEMsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksRUFBRSxHQUFFLElBQUksQ0FBQztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDM0QsSUFBSSxDQUNILFVBQUEsYUFBYTtZQUNYLEVBQUUsQ0FBQSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsU0FBUyxDQUFDO2dCQUNuRSxNQUFNLENBQUM7WUFDVCxDQUFDO1FBQ0gsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FDRixDQUFBO0lBRVQsQ0FBQztJQTNCRDtRQUFDLFlBQUssRUFBRTs7MERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7K0RBQUE7SUFWVjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxXQUFXLEVBQUUsMENBQTBDO1lBQ3ZELFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO1lBQ3RELEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7OEJBQUE7SUErQkYsNkJBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBO0FBN0JZLDhCQUFzQix5QkE2QmxDLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LWFjdGl2ZS1jb2RlL21vZGFsLWNvbnRlbnQtYWN0aXZlLWNvZGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0ICxJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCxOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcblxuLyoqXG4gKlxuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3RpdmVMaWNlbnNlU2VydmVyIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuICAvKipcbiAgICpcbiAgICovXG4gIGFjdGl2ZUxpY2Vuc2UoYWN0aXZlQ29kZTpzdHJpbmcsc2VyaWFsOnN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCB1cmwgPSBgL21hbmFnZXIvbGljZW5zZS8ke3NlcmlhbH0vYWN0aXZlYDtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsIEpTT04uc3RyaW5naWZ5KHtcImFjdGl2ZUNvZGVcIjogYWN0aXZlQ29kZX0pKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuc3RhdHVzID09IDIwMikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkgfHwgeyB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICBsZXQgZXJyTXNnID0gKGVycm9yLm1lc3NhZ2UpID8gZXJyb3IubWVzc2FnZSA6XG4gICAgICBlcnJvci5zdGF0dXMgPyBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0fWAgOiAnU2VydmVyIGVycm9yJztcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyTXNnKTtcbiAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FyLW1vZGFsLWNvbnRlbnQtYWN0aXZlLWNvZGUnLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWNvbnRlbnQtYWN0aXZlLWNvZGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbW9kYWwtY29udGVudC1hY3RpdmUtY29kZS5jb21wb25lbnQuY3NzJ10sXG4gIGlucHV0OiBbJ3RpdGxlJywnYm9keSddXG59KVxuXG5leHBvcnQgY2xhc3MgTW9kYWxDb250ZW50QWN0aXZlQ29kZSB7XG4gIEBJbnB1dCgpIHNlcmlhbDogc3RyaW5nO1xuICBASW5wdXQoKSBtYWNoaW5lQ29kZTogc3RyaW5nO1xuICBhY3RpdmVMaWNlbnNlRXJybXNnOmFueTtcbiAgZXJyb3I6YW55O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsLHByaXZhdGUgYWN0aXZlTGljZW5zZVNlcnZlcjpBY3RpdmVMaWNlbnNlU2VydmVyLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gIH1cbiAgYWN0aXZlTW9kYWxMaWNlbnNlKGFjdGl2ZUNvZGU6c3RyaW5nKTp2b2lke1xuICAgIGlmKGFjdGl2ZUNvZGUudHJpbSgpID09ICcnKXtcbiAgICAgIHRoaXMuYWN0aXZlTGljZW5zZUVycm1zZyA9ICfor7fovpPlhaXmv4DmtLvnoIEnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgbWUgPXRoaXM7XG4gICAgICAgIHRoaXMuYWN0aXZlTGljZW5zZVNlcnZlci5hY3RpdmVMaWNlbnNlKGFjdGl2ZUNvZGUsdGhpcy5zZXJpYWwpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBhY3RpdmVMaWNlbnNlID0+IHtcbiAgICAgICAgICAgICAgaWYoYWN0aXZlTGljZW5zZS5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgICAgICAgIG1lLmFjdGl2ZU1vZGFsLmNsb3NlKHRydWUpO1xuICAgICAgICAgICAgICB9ZWxzZSBpZihhY3RpdmVMaWNlbnNlLmNvZGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTGljZW5zZUVycm1zZyA9IGFjdGl2ZUxpY2Vuc2UuY29kZS50b1N0cmluZygpKydhY3Rjb2RlJztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG5cbiAgfVxufVxuIl19
