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
var index_1 = require('../prompt-emit/index');
var ng2_translate_1 = require('ng2-translate');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var NameListService = (function () {
    function NameListService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
    }
    NameListService.prototype.getContainer = function () {
        var _this = this;
        return this.http.get("/v1/containers")
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(_this.translate.instant('提示：获取容器信息失败,错误原因：') + _this.translate.instant(res.json().code.toString()));
            }
        })
            .catch(this.handleError);
    };
    NameListService.prototype.getServer = function () {
        var _this = this;
        return this.http.get("/v1/allservices")
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(_this.translate.instant('提示：获取服务信息失败,错误原因：') + _this.translate.instant(res.json().code.toString()));
            }
        })
            .catch(this.handleError);
    };
    NameListService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    NameListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], NameListService);
    return NameListService;
}());
exports.NameListService = NameListService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvbmFtZS1saXN0L25hbWUtbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFDM0MscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLHNCQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUkvQyxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBU3JDO0lBQ0UseUJBQW9CLElBQVUsRUFBUSxpQkFBbUMsRUFBUyxTQUEyQjtRQUF6RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVEsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQzdHLENBQUM7SUFLRCxzQ0FBWSxHQUFaO1FBQUEsaUJBYUM7UUFaQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7YUFDakMsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUNILFVBQUMsR0FBYTtZQUNaLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFHLENBQUM7WUFDM0IsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckksQ0FBQztRQUNILENBQUMsQ0FDRjthQUNBLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUtELG1DQUFTLEdBQVQ7UUFBQSxpQkFjQztRQVpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzthQUNsQyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUcsQ0FBQztZQUMzQixDQUFDO1lBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNySSxDQUFDO1FBQ0gsQ0FBQyxDQUNGO2FBQ0EsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBSU8scUNBQVcsR0FBbkIsVUFBb0IsS0FBVTtRQUc1QixJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTztZQUN4QyxLQUFLLENBQUMsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFdBQU0sS0FBSyxDQUFDLFVBQVksR0FBRyxjQUFjLENBQUM7UUFDNUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBbkRIO1FBQUMsaUJBQVUsRUFBRTs7dUJBQUE7SUFvRGIsc0JBQUM7QUFBRCxDQW5EQSxBQW1EQyxJQUFBO0FBbkRZLHVCQUFlLGtCQW1EM0IsQ0FBQSIsImZpbGUiOiJhcHAvc2VydmVyL25hbWUtbGlzdC9uYW1lLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vcHJvbXB0LWVtaXQvaW5kZXgnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuLy8gaW1wb3J0IHsgV2luZG93U2VydmljZSB9IGZyb20gXCIuLi8uLi93aW5kb3dzZXJ2ZXJcIjtcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG4vKipcbiAqIOiOt+WPluWuueWZqOWPiuacjeWKoVxuICovXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hbWVMaXN0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6UHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5blrrnlmahcbiAgICovXG4gIGdldENvbnRhaW5lcigpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC92MS9jb250YWluZXJzYClcbiAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgIChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZihyZXMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHsgfTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXMgPT0gMjAyKXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdCh0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCfmj5DnpLrvvJrojrflj5blrrnlmajkv6Hmga/lpLHotKUs6ZSZ6K+v5Y6f5Zug77yaJykrdGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacjeWKoVxuICAgKi9cblxuICBnZXRTZXJ2ZXIoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC92MS9hbGxzZXJ2aWNlc2ApXG4gICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYocmVzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7IH07XG4gICAgICAgICAgICB9ZWxzZSBpZihyZXMuc3RhdHVzID09IDIwMil7XG4gICAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQodGhpcy50cmFuc2xhdGUuaW5zdGFudCgn5o+Q56S677ya6I635Y+W5pyN5Yqh5L+h5oGv5aSx6LSlLOmUmeivr+WOn+WboO+8micpK3RoaXMudHJhbnNsYXRlLmluc3RhbnQocmVzLmpzb24oKS5jb2RlLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgICog6ZSZ6K+v5aSE55CGXG4gICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBhbGVydCgnU2VydmVyIGVycm9yJylcbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgICAgZXJyb3Iuc3RhdHVzID8gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dH1gIDogJ1NlcnZlciBlcnJvcic7XG4gICAgY29uc29sZS5lcnJvcihlcnJNc2cpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVyck1zZyk7XG4gIH1cbn1cblxuIl19
