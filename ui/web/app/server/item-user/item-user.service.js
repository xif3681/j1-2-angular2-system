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
var ItemUserService = (function () {
    function ItemUserService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.change = new core_1.EventEmitter();
    }
    ItemUserService.prototype.infoItemUser = function (id) {
        var _this = this;
        var url = "/manager/user/" + id;
        return this.http
            .get(url)
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(res.json().code.toString() + 'item');
            }
        })
            .catch(this.handleError);
    };
    ItemUserService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ItemUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ItemUserService);
    return ItemUserService;
}());
exports.ItemUserService = ItemUserService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvaXRlbS11c2VyL2l0ZW0tdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBRS9DLHNCQUFrQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3pELFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUNuQyxRQUFPLDZCQUE2QixDQUFDLENBQUE7QUFDckMsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBUS9DO0lBR0UseUJBQW9CLElBQVUsRUFBUyxpQkFBbUMsRUFBUyxTQUEyQjtRQUExRixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzVHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUNELHNDQUFZLEdBQVosVUFBYSxFQUFFO1FBQWYsaUJBY0M7UUFiQyxJQUFNLEdBQUcsR0FBRyxtQkFBaUIsRUFBSSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQyxHQUFZO1lBQ2pCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUE7WUFDekIsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsQ0FBQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUlPLHFDQUFXLEdBQW5CLFVBQW9CLEtBQVU7UUFFNUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU87WUFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxXQUFNLEtBQUssQ0FBQyxVQUFZLEdBQUcsY0FBYyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQS9CSDtRQUFDLGlCQUFVLEVBQUU7O3VCQUFBO0lBZ0NiLHNCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQS9CWSx1QkFBZSxrQkErQjNCLENBQUEiLCJmaWxlIjoiYXBwL3NlcnZlci9pdGVtLXVzZXIvaXRlbS11c2VyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2UgfSBmcm9tICcuLi9wcm9tcHQtZW1pdC9pbmRleCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG4vKipcbiAqIOiOt+WPluiuuOWPr+ivgee7n+iuoeS/oeaBr1xuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJdGVtVXNlclNlcnZpY2Uge1xuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxwcml2YXRlIHByb21wdEVtaXRTZXJ2aWNlOlByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgdGhpcy5jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cbiAgaW5mb0l0ZW1Vc2VyKGlkKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAvbWFuYWdlci91c2VyLyR7aWR9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KHVybClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKHJlczpSZXNwb25zZSk9PntcbiAgICAgICAgaWYocmVzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9XG4gICAgICAgIH1lbHNlIGlmIChyZXMuc3RhdHVzID09IDIwMil7XG4gICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSsnaXRlbScpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gIH1cbiAgLyoqXG4gICAqIOmUmeivr+WkhOeQhlxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cbiJdfQ==
