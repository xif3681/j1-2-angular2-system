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
var BtnStatusService = (function () {
    function BtnStatusService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
    }
    BtnStatusService.prototype.btnStatusChange = function (alertDif, name, difStatus, btnContainer) {
        var _this = this;
        var url = "/v1/" + alertDif + "/" + name + "/" + difStatus;
        return this.http
            .post(url, JSON.stringify({ "container": btnContainer }))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                var hint = _this.translate.instant('提示：');
                _this.promptEmitService.change.emit(hint + name + _this.translate.instant(difStatus) +
                    _this.translate.instant("失败,错误原因：") + _this.translate.instant(res.json().code.toString()));
            }
        })
            .catch(this.handleError);
    };
    BtnStatusService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    BtnStatusService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], BtnStatusService);
    return BtnStatusService;
}());
exports.BtnStatusService = BtnStatusService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvYnRuLXN0YXR1cy9idG4tc3RhdHVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUMzQyxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msc0JBQWlDLHNCQUFzQixDQUFDLENBQUE7QUFFeEQsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUNuQyxRQUFPLDZCQUE2QixDQUFDLENBQUE7QUFZckM7SUFFRSwwQkFBb0IsSUFBVSxFQUFRLGlCQUFtQyxFQUFTLFNBQTJCO1FBQXpGLFNBQUksR0FBSixJQUFJLENBQU07UUFBUSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDN0csQ0FBQztJQUlELDBDQUFlLEdBQWYsVUFBZ0IsUUFBZ0IsRUFBQyxJQUFZLEVBQUMsU0FBZ0IsRUFBRSxZQUFtQjtRQUFuRixpQkFpQkM7UUFoQkMsSUFBTSxHQUFHLEdBQUcsU0FBTyxRQUFRLFNBQUksSUFBSSxTQUFJLFNBQVcsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxXQUFXLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQzthQUN0RCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUcsQ0FBQztZQUMzQixDQUFDO1lBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDMUIsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRSxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO29CQUMvRSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzRixDQUFDO1FBQ0gsQ0FBQyxDQUNGO2FBQ0EsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBSU8sc0NBQVcsR0FBbkIsVUFBb0IsS0FBVTtRQUU1QixJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTztZQUN4QyxLQUFLLENBQUMsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFdBQU0sS0FBSyxDQUFDLFVBQVksR0FBRyxjQUFjLENBQUM7UUFDNUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBbkNIO1FBQUMsaUJBQVUsRUFBRTs7d0JBQUE7SUFvQ2IsdUJBQUM7QUFBRCxDQW5DQSxBQW1DQyxJQUFBO0FBbkNZLHdCQUFnQixtQkFtQzVCLENBQUEiLCJmaWxlIjoiYXBwL3NlcnZlci9idG4tc3RhdHVzL2J0bi1zdGF0dXMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vcHJvbXB0LWVtaXQvaW5kZXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG5cblxuXG5cbi8qKlxuICog6I635Y+W54K55Ye75ZCv5Yqo77yM6YeN5ZCv77yM5YGc5q2i5oyJ6ZKu5pyN5YqhXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJ0blN0YXR1c1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6UHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuICAvKipcbiAgICog54K55Ye75ZCv5Yqo77yM6YeN5ZCv77yM5YGc5q2i5oyJ6ZKuXG4gICAqL1xuICBidG5TdGF0dXNDaGFuZ2UoYWxlcnREaWY6IHN0cmluZyxuYW1lOiBzdHJpbmcsZGlmU3RhdHVzOnN0cmluZyAsYnRuQ29udGFpbmVyOnN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCB1cmwgPSBgL3YxLyR7YWxlcnREaWZ9LyR7bmFtZX0vJHtkaWZTdGF0dXN9YDtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeSh7XCJjb250YWluZXJcIjogYnRuQ29udGFpbmVyfSkpXG4gICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYocmVzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7IH07XG4gICAgICAgICAgICB9ZWxzZSBpZihyZXMuc3RhdHVzID09IDIwMil7XG4gICAgICAgICAgICAgIGxldCBoaW50ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgn5o+Q56S677yaJyk7XG4gICAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQoaGludCArbmFtZSArIHRoaXMudHJhbnNsYXRlLmluc3RhbnQoZGlmU3RhdHVzKSArXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUuaW5zdGFudChcIuWksei0pSzplJnor6/ljp/lm6DvvJpcIikrdGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gIH1cbiAgLyoqXG4gICAqIOmUmeivr+WkhOeQhlxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgICAgZXJyb3Iuc3RhdHVzID8gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dH1gIDogJ1NlcnZlciBlcnJvcic7XG4gICAgY29uc29sZS5lcnJvcihlcnJNc2cpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVyck1zZyk7XG4gIH1cbn1cblxuIl19
