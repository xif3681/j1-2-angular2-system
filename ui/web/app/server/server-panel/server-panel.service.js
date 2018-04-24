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
var ServerPanelService = (function () {
    function ServerPanelService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    ServerPanelService.prototype.getServerPanel = function () {
        var _this = this;
        var url = "/v1/pd/serverpanel";
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
                    _this.promptEmitService.change.emit(res.json().code.toString() + 'pdserverpanel');
                }
            }
        })
            .catch(this.handleError);
    };
    ServerPanelService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ServerPanelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ServerPanelService);
    return ServerPanelService;
}());
exports.ServerPanelService = ServerPanelService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvc2VydmVyLXBhbmVsL3NlcnZlci1wYW5lbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0QsZUFBZSxDQUFDLENBQUE7QUFDbEUsc0JBQWlDLHNCQUFzQixDQUFDLENBQUE7QUFDeEQsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBRS9DLHFCQUF5QyxlQUFlLENBQUMsQ0FBQTtBQUd6RCxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBUXJDO0lBRUUsNEJBQW9CLElBQVUsRUFBUSxpQkFBbUMsRUFBUyxTQUEyQjtRQUF6RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVEsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBRHRHLE1BQUMsR0FBVSxDQUFDLENBQUM7SUFFcEIsQ0FBQztJQUlELDJDQUFjLEdBQWQ7UUFBQSxpQkFtQkM7UUFsQkMsSUFBTSxHQUFHLEdBQUcsb0JBQW9CLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNSLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDO1lBQzNCLENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUMxQixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFFLFVBQVUsSUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFFLFVBQVUsQ0FBQyxDQUFBLENBQUM7b0JBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDO2dCQUMzQixDQUFDO2dCQUFBLElBQUksQ0FBQyxDQUFDO29CQUNMLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUNGO2FBQ0EsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBSU8sd0NBQVcsR0FBbkIsVUFBb0IsS0FBVTtRQUc1QixJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTztZQUMxQyxLQUFLLENBQUMsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFdBQU0sS0FBSyxDQUFDLFVBQVksR0FBRyxjQUFjLENBQUM7UUFDMUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBdENIO1FBQUMsaUJBQVUsRUFBRTs7MEJBQUE7SUF1Q2IseUJBQUM7QUFBRCxDQXRDQSxBQXNDQyxJQUFBO0FBdENZLDBCQUFrQixxQkFzQzlCLENBQUEiLCJmaWxlIjoiYXBwL3NlcnZlci9zZXJ2ZXItcGFuZWwvc2VydmVyLXBhbmVsLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsSW5qZWN0YWJsZSxFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb21wdEVtaXRTZXJ2aWNlfSBmcm9tICcuLi9wcm9tcHQtZW1pdC9pbmRleCc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyAgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBmb3IgZGVidWdnaW5nXG5cbi8qKlxuICog6I635Y+W6K645Y+v6K+B57uf6K6h5L+h5oGvXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclBhbmVsU2VydmljZSB7XG4gIHB1YmxpYyBpOm51bWJlciA9IDA7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6UHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5YiX6KGo5L+h5oGvXG4gICAqL1xuICBnZXRTZXJ2ZXJQYW5lbCgpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gYC92MS9wZC9zZXJ2ZXJwYW5lbGA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldCh1cmwpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHsgfTtcbiAgICAgICAgICB9ZWxzZSBpZihyZXMuc3RhdHVzID09IDIwMil7XG4gICAgICAgICAgICBpZihyZXMuanNvbigpLmNvZGU9PTM3NTg0MjQwNjV8fHJlcy5qc29uKCkuY29kZT09Mzc1OTA3OTQzNCl7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHsgfTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSsncGRzZXJ2ZXJwYW5lbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cbiJdfQ==
