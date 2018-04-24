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
var index_1 = require('../index');
var index_2 = require('../../server/prompt-emit/index');
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var QrcodeService = (function () {
    function QrcodeService(http, promptEmitService) {
        this.http = http;
        this.promptEmitService = promptEmitService;
    }
    QrcodeService.prototype.getQrcode = function () {
        var _this = this;
        var url = "/manager/machineCode";
        return this.http
            .get(url)
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit('提示：无法获取机器码,错误原因：' + res.json().code);
            }
        })
            .catch(this.handleError);
    };
    QrcodeService.prototype.extractData = function (res) {
        var data = res.json();
        return data || {};
    };
    QrcodeService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    QrcodeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_2.PromptEmitService])
    ], QrcodeService);
    return QrcodeService;
}());
exports.QrcodeService = QrcodeService;
var ModalContentQrcode = (function () {
    function ModalContentQrcode(activeModal, qrcodeService) {
        this.activeModal = activeModal;
        this.qrcodeService = qrcodeService;
        this.getQrcode();
    }
    ModalContentQrcode.prototype.getQrcode = function () {
        var _this = this;
        this.qrcodeService.getQrcode()
            .then(function (qrcode) {
            _this.qrcode = qrcode;
        }, function (error) {
            _this.error = error;
        });
    };
    ModalContentQrcode = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-qrcode',
            directives: [index_1.QRCodeComponent],
            templateUrl: 'modal-content-qrcode.component.html',
            styleUrls: ['modal-content-qrcode.component.css'],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, QrcodeService])
    ], ModalContentQrcode);
    return ModalContentQrcode;
}());
exports.ModalContentQrcode = ModalContentQrcode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1xcmNvZGUvbW9kYWwtY29udGVudC1xcmNvZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFFN0QsNkJBQStCLDRCQUE0QixDQUFDLENBQUE7QUFDNUQsc0JBQWdDLFVBQVUsQ0FBQyxDQUFBO0FBQzNDLHNCQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRW5FLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUcvQyxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBUXJDO0lBRUUsdUJBQW9CLElBQVUsRUFBUSxpQkFBbUM7UUFBckQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFRLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDekUsQ0FBQztJQUlELGlDQUFTLEdBQVQ7UUFBQSxpQkFjQztRQWJDLElBQU0sR0FBRyxHQUFHLHNCQUFzQixDQUFDO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQyxHQUFZO1lBQ2pCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUE7WUFDekIsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RSxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUU3QixDQUFDO0lBS08sbUNBQVcsR0FBbkIsVUFBb0IsR0FBYTtRQUMvQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFHLENBQUM7SUFFckIsQ0FBQztJQUlPLG1DQUFXLEdBQW5CLFVBQW9CLEtBQVU7UUFFNUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU87WUFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxXQUFNLEtBQUssQ0FBQyxVQUFZLEdBQUcsY0FBYyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQXpDSDtRQUFDLGlCQUFVLEVBQUU7O3FCQUFBO0lBMENiLG9CQUFDO0FBQUQsQ0F6Q0EsQUF5Q0MsSUFBQTtBQXpDWSxxQkFBYSxnQkF5Q3pCLENBQUE7QUFZRDtJQUdFLDRCQUFtQixXQUEyQixFQUFTLGFBQTJCO1FBQS9ELGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQ2hGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0Qsc0NBQVMsR0FBVDtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7YUFDM0IsSUFBSSxDQUNILFVBQUEsTUFBTTtZQUNKLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQ0YsQ0FBQTtJQUNMLENBQUM7SUF6Qkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsVUFBVSxFQUFFLENBQUMsdUJBQWUsQ0FBQztZQUM3QixXQUFXLEVBQUUscUNBQXFDO1lBQ2xELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1lBQ2pELEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7MEJBQUE7SUFtQkYseUJBQUM7QUFBRCxDQWpCQSxBQWlCQyxJQUFBO0FBakJZLDBCQUFrQixxQkFpQjlCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LXFyY29kZS9tb2RhbC1jb250ZW50LXFyY29kZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0ICxJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgUVJDb2RlQ29tcG9uZW50IH0gZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2ZXIvcHJvbXB0LWVtaXQvaW5kZXgnO1xuXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcblxuLyoqXG4gKiDojrflj5borrjlj6/or4Hnu5/orqHkv6Hmga9cbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXJjb2RlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLHB1YmxpYyBwcm9tcHRFbWl0U2VydmljZTpQcm9tcHRFbWl0U2VydmljZSkge1xuICB9XG4gIC8qKlxuICAgKiDngrnlh7vlkK/liqjvvIzph43lkK/vvIzlgZzmraLmjInpkq5cbiAgICovXG4gIGdldFFyY29kZSgpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gYC9tYW5hZ2VyL21hY2hpbmVDb2RlYDtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KHVybClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKHJlczpSZXNwb25zZSk9PntcbiAgICAgICAgaWYocmVzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9XG4gICAgICAgIH1lbHNlIGlmIChyZXMuc3RhdHVzID09IDIwMil7XG4gICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdCgn5o+Q56S677ya5peg5rOV6I635Y+W5py65Zmo56CBLOmUmeivr+WOn+WboO+8micrcmVzLmpzb24oKS5jb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICB9XG5cbiAgLyoqXG4gICAq6L+U5Zue5pWw5o2uXG4gICAqL1xuICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpIHtcbiAgICBsZXQgZGF0YSA9IHJlcy5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGEgfHwgeyB9O1xuXG4gIH1cbiAgLyoqXG4gICAqIOmUmeivr+WkhOeQhlxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1xcmNvZGUnLFxuICBkaXJlY3RpdmVzOiBbUVJDb2RlQ29tcG9uZW50XSxcbiAgdGVtcGxhdGVVcmw6ICdtb2RhbC1jb250ZW50LXFyY29kZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtb2RhbC1jb250ZW50LXFyY29kZS5jb21wb25lbnQuY3NzJ10sXG4gIGlucHV0OiBbJ3RpdGxlJywnYm9keSddXG59KVxuXG5leHBvcnQgY2xhc3MgTW9kYWxDb250ZW50UXJjb2RlIHtcbiAgcXJjb2RlOmFueTtcbiAgZXJyb3I6YW55O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsLHByaXZhdGUgcXJjb2RlU2VydmljZTpRcmNvZGVTZXJ2aWNlKSB7XG4gICAgdGhpcy5nZXRRcmNvZGUoKTtcbiAgfVxuICBnZXRRcmNvZGUoKTp2b2lke1xuICAgIHRoaXMucXJjb2RlU2VydmljZS5nZXRRcmNvZGUoKVxuICAgICAgLnRoZW4oXG4gICAgICAgIHFyY29kZSA9PiB7XG4gICAgICAgICAgdGhpcy5xcmNvZGUgPSBxcmNvZGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIClcbiAgfVxufVxuIl19
