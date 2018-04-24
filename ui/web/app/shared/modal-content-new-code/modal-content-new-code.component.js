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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var AddLicenseService = (function () {
    function AddLicenseService(http) {
        this.http = http;
    }
    AddLicenseService.prototype.addLicense = function (serial) {
        var url = "/manager/license";
        return this.http
            .post(url, JSON.stringify({ "serial": serial }))
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
    AddLicenseService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    AddLicenseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AddLicenseService);
    return AddLicenseService;
}());
exports.AddLicenseService = AddLicenseService;
var ModalContentNewCode = (function () {
    function ModalContentNewCode(activeModal, addLicenseService) {
        this.activeModal = activeModal;
        this.addLicenseService = addLicenseService;
    }
    ModalContentNewCode.prototype.addModalLicense = function (newLicense) {
        var me = this;
        me.licenseNullErrmsg = null;
        me.licenseErrmsg = null;
        if (newLicense.trim() == '') {
            this.licenseNullErrmsg = '请输入授权码';
            return;
        }
        var errorArr = [];
        var newLicenseArr = newLicense.split("\n");
        var i = 0;
        var j = 0;
        newLicenseArr.map(function (obj) {
            var _this = this;
            if (obj.trim() !== '') {
                me.addLicenseService.addLicense(obj.trim())
                    .then(function (license) {
                    if (license.status == 200) {
                        j++;
                        if (i == j) {
                            me.activeModal.close(true);
                        }
                    }
                    else if (license.code) {
                        var errObj = {
                            name: obj,
                            errmsg: license.code.toString() + 'newcode'
                        };
                        errorArr.push(errObj);
                        return;
                    }
                }, function (error) {
                    _this.error = error;
                });
                i++;
            }
        });
        this.licenseErrmsg = errorArr;
    };
    ModalContentNewCode = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-new-code',
            templateUrl: 'modal-content-new-code.component.html',
            styleUrls: ['modal-content-new-code.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, AddLicenseService])
    ], ModalContentNewCode);
    return ModalContentNewCode;
}());
exports.ModalContentNewCode = ModalContentNewCode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1uZXctY29kZS9tb2RhbC1jb250ZW50LW5ldy1jb2RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBRTdELDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRy9ELHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUkvQyxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBUXJDO0lBRUUsMkJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQzlCLENBQUM7SUFJRCxzQ0FBVSxHQUFWLFVBQVcsTUFBYTtRQUN0QixJQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQzthQUM3QyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTdCLENBQUM7SUFLTyx1Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBRTVC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QXNDLENBQUM7WUFFbkQsVUFBVSxFQUFDLENBQUMsY0FBTSxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7MkJBQUE7SUErREYsMEJBQUM7QUFBRCxDQTVEQSxBQTREQyxJQUFBO0FBNURZLDJCQUFtQixzQkE0RC9CLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LW5ldy1jb2RlL21vZGFsLWNvbnRlbnQtbmV3LWNvZGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ2JBY3RpdmVNb2RhbCB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4vLyBpbXBvcnQgeyBMaWNlbmNlTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWcvbGljZW5jZS1saXN0L2luZGV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBmb3IgZGVidWdnaW5nXG5cbi8qKlxuICpcbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWRkTGljZW5zZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xuICB9XG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYWRkTGljZW5zZShzZXJpYWw6c3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAvbWFuYWdlci9saWNlbnNlYDtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsIEpTT04uc3RyaW5naWZ5KHtcInNlcmlhbFwiOiBzZXJpYWx9KSlcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSAyMDIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHsgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIOmUmeivr+WkhOeQhlxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhci1tb2RhbC1jb250ZW50LW5ldy1jb2RlJyxcbiAgdGVtcGxhdGVVcmw6ICdtb2RhbC1jb250ZW50LW5ldy1jb2RlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21vZGFsLWNvbnRlbnQtbmV3LWNvZGUuY29tcG9uZW50LmNzcyddLFxuICAvLyBwcm92aWRlcnM6IFtOZ0Zvcm1dLFxuICBkaXJlY3RpdmVzOltOZ0Zvcm1dLFxuICBpbnB1dDogWyd0aXRsZScsJ2JvZHknXVxufSlcblxuXG5leHBvcnQgY2xhc3MgTW9kYWxDb250ZW50TmV3Q29kZSB7XG4gIGxpY2Vuc2U6YW55O1xuICBlcnJvcjphbnk7XG4gIGNvbnRlbnQ6YW55O1xuICBsaWNlbnNlTnVsbEVycm1zZzphbnk7XG4gIGxpY2Vuc2VFcnJtc2c6QXJyYXk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwscHJpdmF0ZSBhZGRMaWNlbnNlU2VydmljZTpBZGRMaWNlbnNlU2VydmljZSkge1xuXG4gIH1cblxuICBhZGRNb2RhbExpY2Vuc2UobmV3TGljZW5zZTpzdHJpbmcpOnZvaWR7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICBtZS5saWNlbnNlTnVsbEVycm1zZyA9IG51bGw7XG4gICAgbWUubGljZW5zZUVycm1zZyA9IG51bGw7XG5cblxuICAgIGlmKG5ld0xpY2Vuc2UudHJpbSgpID09ICcnKXtcbiAgICAgIHRoaXMubGljZW5zZU51bGxFcnJtc2cgPSAn6K+36L6T5YWl5o6I5p2D56CBJztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIGxldCBlcnJvckFyciA9IFtdO1xuICAgIC8vIGxldCB0cnVlQXJyID0gW107XG4gICAgbGV0IG5ld0xpY2Vuc2VBcnIgPSBuZXdMaWNlbnNlLnNwbGl0KFwiXFxuXCIpO1xuICAgIC8v5L6d5qyh5re75Yqg5aSa5Liq5o6I5p2D56CBXG4gICAgbGV0IGk9MDtcbiAgICBsZXQgaj0wO1xuXG4gICAgbmV3TGljZW5zZUFyci5tYXAoZnVuY3Rpb24ob2JqKXtcbiAgICAgIC8v5Y675o6J5aSa5Liq5o2i6KGM56ymXG4gICAgICAgaWYob2JqLnRyaW0oKSAhPT0gJycpe1xuICAgICAgICAgbWUuYWRkTGljZW5zZVNlcnZpY2UuYWRkTGljZW5zZShvYmoudHJpbSgpKVxuICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICBsaWNlbnNlID0+IHtcbiAgICAgICAgICAgICAgIGlmKGxpY2Vuc2Uuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgaWYoaSA9PSBqKXtcblxuICAgICAgICAgICAgICAgICAgIG1lLmFjdGl2ZU1vZGFsLmNsb3NlKHRydWUpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9ZWxzZSBpZihsaWNlbnNlLmNvZGUpe1xuICAgICAgICAgICAgICAgICBsZXQgZXJyT2JqID0ge1xuICAgICAgICAgICAgICAgICAgIG5hbWU6b2JqLFxuICAgICAgICAgICAgICAgICAgIGVycm1zZzpsaWNlbnNlLmNvZGUudG9TdHJpbmcoKSsnbmV3Y29kZSdcbiAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgZXJyb3JBcnIucHVzaChlcnJPYmopO1xuICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICApO1xuICAgICAgICAgaSsrXG4gICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubGljZW5zZUVycm1zZyA9IGVycm9yQXJyO1xuICB9XG5cbn1cbiJdfQ==
