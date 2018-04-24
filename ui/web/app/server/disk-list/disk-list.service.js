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
var index_1 = require('../prompt-emit/index');
var ng2_translate_1 = require('ng2-translate');
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var DiskListService = (function () {
    function DiskListService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    DiskListService.prototype.getDiskList = function () {
        var _this = this;
        var url = "/v1/pd/allinfo";
        return this.http
            .get(url)
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                if (res.json().code == 3758424065 || res.json().code == 3759079434) {
                    return res.json() || {};
                }
                else {
                    _this.promptEmitService.change.emit(res.json().code.toString() + 'pdallinfo');
                }
            }
        })
            .catch(this.handleError);
    };
    DiskListService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    DiskListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], DiskListService);
    return DiskListService;
}());
exports.DiskListService = DiskListService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvZGlzay1saXN0L2Rpc2stbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0QsZUFBZSxDQUFDLENBQUE7QUFDbEUsc0JBQWlDLHNCQUFzQixDQUFDLENBQUE7QUFDeEQsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBRS9DLHFCQUF5QyxlQUFlLENBQUMsQ0FBQTtBQUd6RCxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBUXJDO0lBRUUseUJBQW9CLElBQVUsRUFBUSxpQkFBbUMsRUFDckQsU0FBMkI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFRLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDckQsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFGeEMsTUFBQyxHQUFVLENBQUMsQ0FBQztJQUdwQixDQUFDO0lBSUQscUNBQVcsR0FBWDtRQUFBLGlCQW1CQztRQWxCQyxJQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ1IsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUNILFVBQUMsR0FBYTtZQUNaLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFHLENBQUM7WUFDM0IsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUUsVUFBVSxJQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUUsVUFBVSxDQUFDLENBQUEsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFHLENBQUM7Z0JBQzNCLENBQUM7Z0JBQUEsSUFBSSxDQUFDLENBQUM7b0JBQ0wsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0UsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFJTyxxQ0FBVyxHQUFuQixVQUFvQixLQUFVO1FBRzVCLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPO1lBQzFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sV0FBTSxLQUFLLENBQUMsVUFBWSxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUF2Q0g7UUFBQyxpQkFBVSxFQUFFOzt1QkFBQTtJQXdDYixzQkFBQztBQUFELENBdkNBLEFBdUNDLElBQUE7QUF2Q1ksdUJBQWUsa0JBdUMzQixDQUFBIiwiZmlsZSI6ImFwcC9zZXJ2ZXIvZGlzay1saXN0L2Rpc2stbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LEluamVjdGFibGUsRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vcHJvbXB0LWVtaXQvaW5kZXgnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcblxuaW1wb3J0IHsgIEhlYWRlcnMsIEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG4vKipcbiAqIOiOt+WPluiuuOWPr+ivgee7n+iuoeS/oeaBr1xuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaXNrTGlzdFNlcnZpY2Uge1xuICBwdWJsaWMgaTpudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAscHVibGljIHByb21wdEVtaXRTZXJ2aWNlOlByb21wdEVtaXRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bliJfooajkv6Hmga9cbiAgICovXG4gIGdldERpc2tMaXN0KCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCB1cmwgPSBgL3YxL3BkL2FsbGluZm9gO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZihyZXMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7IH07XG4gICAgICAgICAgfWVsc2UgaWYocmVzLnN0YXR1cyA9PSAyMDIpe1xuICAgICAgICAgICAgaWYocmVzLmpzb24oKS5jb2RlPT0zNzU4NDI0MDY1fHxyZXMuanNvbigpLmNvZGU9PTM3NTkwNzk0MzQpe1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7IH07XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQocmVzLmpzb24oKS5jb2RlLnRvU3RyaW5nKCkrJ3BkYWxsaW5mbycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cbiJdfQ==
