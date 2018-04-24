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
var DeleteRaidService = (function () {
    function DeleteRaidService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    DeleteRaidService.prototype.deleteRaid = function (vir_drv_id) {
        var _this = this;
        var url = "/v1/raid/" + vir_drv_id + "/delete";
        return this.http
            .delete(url)
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(res.json().code.toString() + 'raiddelete');
            }
        })
            .catch(this.handleError);
    };
    DeleteRaidService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    DeleteRaidService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], DeleteRaidService);
    return DeleteRaidService;
}());
exports.DeleteRaidService = DeleteRaidService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvZGVsLXJhaWQvZGVsLXJhaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBQ2xFLHNCQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBeUMsZUFBZSxDQUFDLENBQUE7QUFHekQsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUVFLDJCQUFvQixJQUFVLEVBQVEsaUJBQW1DLEVBQVMsU0FBMkI7UUFBekYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFRLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUR0RyxNQUFDLEdBQVUsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFJRCxzQ0FBVSxHQUFWLFVBQVcsVUFBVTtRQUFyQixpQkFlQztRQWRDLElBQU0sR0FBRyxHQUFHLGNBQVksVUFBVSxZQUFTLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDO1lBQzNCLENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUMxQixLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlFLENBQUM7UUFDSCxDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFJTyx1Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBRzVCLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPO1lBQzFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sV0FBTSxLQUFLLENBQUMsVUFBWSxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFsQ0g7UUFBQyxpQkFBVSxFQUFFOzt5QkFBQTtJQW1DYix3QkFBQztBQUFELENBbENBLEFBa0NDLElBQUE7QUFsQ1kseUJBQWlCLG9CQWtDN0IsQ0FBQSIsImZpbGUiOiJhcHAvc2VydmVyL2RlbC1yYWlkL2RlbC1yYWlkLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsSW5qZWN0YWJsZSxFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb21wdEVtaXRTZXJ2aWNlfSBmcm9tICcuLi9wcm9tcHQtZW1pdC9pbmRleCc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyAgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBmb3IgZGVidWdnaW5nXG5cbi8qKlxuICog6I635Y+W6K645Y+v6K+B57uf6K6h5L+h5oGvXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlbGV0ZVJhaWRTZXJ2aWNlIHtcbiAgcHVibGljIGk6bnVtYmVyID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLHB1YmxpYyBwcm9tcHRFbWl0U2VydmljZTpQcm9tcHRFbWl0U2VydmljZSxwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bliJfooajkv6Hmga9cbiAgICovXG4gIGRlbGV0ZVJhaWQodmlyX2Rydl9pZCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCB1cmwgPSBgL3YxL3JhaWQvJHt2aXJfZHJ2X2lkfS9kZWxldGVgO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5kZWxldGUodXJsKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZihyZXMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7IH07XG4gICAgICAgICAgfWVsc2UgaWYocmVzLnN0YXR1cyA9PSAyMDIpe1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSsncmFpZGRlbGV0ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cbiJdfQ==
