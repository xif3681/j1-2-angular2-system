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
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var ng2_translate_1 = require('ng2-translate');
var OperateDiskService = (function () {
    function OperateDiskService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.change = new core_1.EventEmitter();
    }
    OperateDiskService.prototype.setHotSpare = function (slot_number) {
        var _this = this;
        var url = '/v1/pd/sethotspare';
        return this.http
            .post(url, JSON.stringify({ "slot_number": slot_number }))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(res.json().code.toString() + 'pdsethotspare');
            }
        })
            .catch(this.handleError);
    };
    ;
    OperateDiskService.prototype.cancelHotSpare = function (slot_number) {
        var _this = this;
        var url = '/v1/pd/unsethotspare';
        return this.http
            .post(url, JSON.stringify({ "slot_number": slot_number }))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(res.json().code.toString() + 'pdunsethotspare');
            }
        })
            .catch(this.handleError);
    };
    ;
    OperateDiskService.prototype.initHotSpare = function (slot_number) {
        var _this = this;
        var url = '/v1/pd/init';
        return this.http
            .post(url, JSON.stringify({ "slot_number": slot_number }))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(res.json().code.toString() + 'pdinit');
            }
        })
            .catch(this.handleError);
    };
    ;
    OperateDiskService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    OperateDiskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], OperateDiskService);
    return OperateDiskService;
}());
exports.OperateDiskService = OperateDiskService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvb3BlcmF0ZS1kaXNrL29wZXJhdGUtZGlzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBRS9DLHNCQUFrQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3pELFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUNuQyxRQUFPLDZCQUE2QixDQUFDLENBQUE7QUFDckMsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBUS9DO0lBR0UsNEJBQW9CLElBQVUsRUFBUyxpQkFBbUMsRUFBUyxTQUEyQjtRQUExRixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzVHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUNELHdDQUFXLEdBQVgsVUFBWSxXQUFXO1FBQXZCLGlCQWNDO1FBYkMsSUFBTSxHQUFHLEdBQUcsb0JBQW9CLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsYUFBYSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7YUFDdkQsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUMsR0FBWTtZQUNqQixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFBO1lBQ3pCLENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUMzQixLQUFJLENBQUMsaUJB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aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSxFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFByb21wdEVtaXRTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvbXB0LWVtaXQvaW5kZXgnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcblxuLyoqXG4gKiDojrflj5borrjlj6/or4Hnu5/orqHkv6Hmga9cbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3BlcmF0ZURpc2tTZXJ2aWNlIHtcbiAgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAscHJpdmF0ZSBwcm9tcHRFbWl0U2VydmljZTpQcm9tcHRFbWl0U2VydmljZSxwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgIHRoaXMuY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB9XG4gIHNldEhvdFNwYXJlKHNsb3RfbnVtYmVyKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHVybCA9ICcvdjEvcGQvc2V0aG90c3BhcmUnO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCwgSlNPTi5zdHJpbmdpZnkoe1wic2xvdF9udW1iZXJcIjogc2xvdF9udW1iZXJ9KSlcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKHJlczpSZXNwb25zZSk9PntcbiAgICAgICAgaWYocmVzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9XG4gICAgICAgIH1lbHNlIGlmIChyZXMuc3RhdHVzID09IDIwMil7XG4gICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSsncGRzZXRob3RzcGFyZScpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gIH07XG4gIGNhbmNlbEhvdFNwYXJlKHNsb3RfbnVtYmVyKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHVybCA9ICcvdjEvcGQvdW5zZXRob3RzcGFyZSc7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeSh7XCJzbG90X251bWJlclwiOiBzbG90X251bWJlcn0pKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbigocmVzOlJlc3BvbnNlKT0+e1xuICAgICAgICBpZihyZXMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkgfHwge31cbiAgICAgICAgfWVsc2UgaWYgKHJlcy5zdGF0dXMgPT0gMjAyKXtcbiAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHJlcy5qc29uKCkuY29kZS50b1N0cmluZygpKydwZHVuc2V0aG90c3BhcmUnKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICB9O1xuXG4gIC8qKlxuICAgKiDliJ3lp4vljJZcbiAgICogQHBhcmFtIHNsb3RfbnVtYmVyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueXx7fT59XG4gICAqL1xuICBpbml0SG90U3BhcmUoc2xvdF9udW1iZXIpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gJy92MS9wZC9pbml0JztcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsIEpTT04uc3RyaW5naWZ5KHtcInNsb3RfbnVtYmVyXCI6IHNsb3RfbnVtYmVyfSkpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKChyZXM6UmVzcG9uc2UpPT57XG4gICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7fVxuICAgICAgICB9ZWxzZSBpZiAocmVzLnN0YXR1cyA9PSAyMDIpe1xuICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQocmVzLmpzb24oKS5jb2RlLnRvU3RyaW5nKCkrJ3BkaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9O1xuICAvKipcbiAgICog6ZSZ6K+v5aSE55CGXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpOyAvLyBmb3IgZGVtbyBwdXJwb3NlcyBvbmx5XG4gICAgbGV0IGVyck1zZyA9IChlcnJvci5tZXNzYWdlKSA/IGVycm9yLm1lc3NhZ2UgOlxuICAgICAgZXJyb3Iuc3RhdHVzID8gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dH1gIDogJ1NlcnZlciBlcnJvcic7XG4gICAgY29uc29sZS5lcnJvcihlcnJNc2cpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVyck1zZyk7XG4gIH1cbn1cblxuIl19
