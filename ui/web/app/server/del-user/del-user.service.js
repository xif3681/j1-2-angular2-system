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
var DeleteUserService = (function () {
    function DeleteUserService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    DeleteUserService.prototype.deleteUser = function (id) {
        var _this = this;
        var url = "/manager/user/" + id;
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
                _this.promptEmitService.change.emit(res.json().code.toString() + 'del');
            }
        })
            .catch(this.handleError);
    };
    DeleteUserService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    DeleteUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], DeleteUserService);
    return DeleteUserService;
}());
exports.DeleteUserService = DeleteUserService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvZGVsLXVzZXIvZGVsLXVzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBQ2xFLHNCQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBeUMsZUFBZSxDQUFDLENBQUE7QUFHekQsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUVFLDJCQUFvQixJQUFVLEVBQVEsaUJBQW1DLEVBQVMsU0FBMkI7UUFBekYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFRLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUR0RyxNQUFDLEdBQVUsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFJRCxzQ0FBVSxHQUFWLFVBQVcsRUFBRTtRQUFiLGlCQW1CQztRQWxCQyxJQUFNLEdBQUcsR0FBRyxtQkFBaUIsRUFBSSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUM7b0JBQ2xCLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ1osQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDSixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUcsQ0FBQztnQkFDM0IsQ0FBQztZQUNILENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUMxQixLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7UUFDSCxDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFJTyx1Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBRzVCLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPO1lBQzFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sV0FBTSxLQUFLLENBQUMsVUFBWSxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUF0Q0g7UUFBQyxpQkFBVSxFQUFFOzt5QkFBQTtJQXVDYix3QkFBQztBQUFELENBdENBLEFBc0NDLElBQUE7QUF0Q1kseUJBQWlCLG9CQXNDN0IsQ0FBQSIsImZpbGUiOiJhcHAvc2VydmVyL2RlbC11c2VyL2RlbC11c2VyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsSW5qZWN0YWJsZSxFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb21wdEVtaXRTZXJ2aWNlfSBmcm9tICcuLi9wcm9tcHQtZW1pdC9pbmRleCc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyAgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBmb3IgZGVidWdnaW5nXG5cbi8qKlxuICog6I635Y+W6K645Y+v6K+B57uf6K6h5L+h5oGvXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlbGV0ZVVzZXJTZXJ2aWNlIHtcbiAgcHVibGljIGk6bnVtYmVyID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLHB1YmxpYyBwcm9tcHRFbWl0U2VydmljZTpQcm9tcHRFbWl0U2VydmljZSxwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bliJfooajkv6Hmga9cbiAgICovXG4gIGRlbGV0ZVVzZXIoaWQpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gYC9tYW5hZ2VyL3VzZXIvJHtpZH1gO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5kZWxldGUodXJsKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZihyZXMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICBpZihyZXMuX2JvZHkgPT0gJycpe1xuICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkgfHwgeyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXMgPT0gMjAyKXtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQocmVzLmpzb24oKS5jb2RlLnRvU3RyaW5nKCkrJ2RlbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cbiJdfQ==
