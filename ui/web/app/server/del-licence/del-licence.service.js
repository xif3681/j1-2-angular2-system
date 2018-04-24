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
var DelLicenceService = (function () {
    function DelLicenceService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
    }
    DelLicenceService.prototype.delLicence = function (serial) {
        var _this = this;
        var url = "/manager/license/" + serial;
        return this.http
            .delete(url)
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
                _this.promptEmitService.change.emit(res.json().code.toString() + 'dellicence');
            }
        })
            .catch(this.handleError);
    };
    DelLicenceService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    DelLicenceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], DelLicenceService);
    return DelLicenceService;
}());
exports.DelLicenceService = DelLicenceService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvZGVsLWxpY2VuY2UvZGVsLWxpY2VuY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBQ2xFLHNCQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBeUMsZUFBZSxDQUFDLENBQUE7QUFHekQsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUNFLDJCQUFvQixJQUFVLEVBQVEsaUJBQW1DLEVBQVMsU0FBMkI7UUFBekYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFRLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUM3RyxDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLE1BQU07UUFBakIsaUJBb0JDO1FBbkJDLElBQUksR0FBRyxHQUFHLHNCQUFvQixNQUFRLENBQUM7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQVk7WUFDWCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUEsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDWixDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDO2dCQUMzQixDQUFDO1lBQ0gsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUUsQ0FBQztRQUNILENBQUMsQ0FDRjthQUNBLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUlPLHVDQUFXLEdBQW5CLFVBQW9CLEtBQVU7UUFHNUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU87WUFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxXQUFNLEtBQUssQ0FBQyxVQUFZLEdBQUcsY0FBYyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQXBDSDtRQUFDLGlCQUFVLEVBQUU7O3lCQUFBO0lBcUNiLHdCQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsSUFBQTtBQXBDWSx5QkFBaUIsb0JBb0M3QixDQUFBIiwiZmlsZSI6ImFwcC9zZXJ2ZXIvZGVsLWxpY2VuY2UvZGVsLWxpY2VuY2Uuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCxJbmplY3RhYmxlLEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4uL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XG5cbmltcG9ydCB7ICBIZWFkZXJzLCBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcblxuLyoqXG4gKiDliJfooajmnI3liqFcbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVsTGljZW5jZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAscHVibGljIHByb21wdEVtaXRTZXJ2aWNlOlByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gIH1cblxuICBkZWxMaWNlbmNlKHNlcmlhbCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBsZXQgdXJsID0gYC9tYW5hZ2VyL2xpY2Vuc2UvJHtzZXJpYWx9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZGVsZXRlKHVybClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6UmVzcG9uc2UpPT57XG4gICAgICAgICAgaWYocmVzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgICAgaWYocmVzLl9ib2R5ID09ICcnKXtcbiAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9ZWxzZSBpZihyZXMuc3RhdHVzID09IDIwMil7XG4gICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHJlcy5qc29uKCkuY29kZS50b1N0cmluZygpKydkZWxsaWNlbmNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgfVxuICAvKipcbiAgICog6ZSZ6K+v5aSE55CGXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgLy8gY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICBsZXQgZXJyTXNnID0gKGVycm9yLm1lc3NhZ2UpID8gZXJyb3IubWVzc2FnZSA6XG4gICAgICBlcnJvci5zdGF0dXMgPyBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0fWAgOiAnU2VydmVyIGVycm9yJztcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyTXNnKTtcbiAgfVxufVxuXG4iXX0=
