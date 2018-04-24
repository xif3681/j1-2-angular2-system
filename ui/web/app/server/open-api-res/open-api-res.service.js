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
var ng2_translate_1 = require('ng2-translate');
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var OpenAPIResService = (function () {
    function OpenAPIResService(http, translate) {
        this.http = http;
        this.translate = translate;
        this.i = 0;
    }
    OpenAPIResService.prototype.getPromise = function (url) {
        return this.http
            .get(url)
            .toPromise()
            .then(function (res) {
            return res;
        })
            .catch(this.handleError);
    };
    OpenAPIResService.prototype.delPromise = function (url) {
        return this.http
            .delete(url)
            .toPromise()
            .then(function (res) {
            return res;
        })
            .catch(this.handleError);
    };
    OpenAPIResService.prototype.putPromise = function (url, body) {
        var postBody = JSON.parse(body);
        return this.http
            .put(url, JSON.stringify(postBody))
            .toPromise()
            .then(function (res) {
            return res;
        })
            .catch(this.handleError);
    };
    OpenAPIResService.prototype.postPromise = function (url, body) {
        var postBody = JSON.parse(body);
        return this.http
            .post(url, JSON.stringify(postBody))
            .toPromise()
            .then(function (res) {
            return res;
        })
            .catch(this.handleError);
    };
    OpenAPIResService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    OpenAPIResService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_translate_1.TranslateService])
    ], OpenAPIResService);
    return OpenAPIResService;
}());
exports.OpenAPIResService = OpenAPIResService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvb3Blbi1hcGktcmVzL29wZW4tYXBpLXJlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0QsZUFBZSxDQUFDLENBQUE7QUFDbEUsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBRS9DLHFCQUF5QyxlQUFlLENBQUMsQ0FBQTtBQUd6RCxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBT3JDO0lBR0UsMkJBQW9CLElBQVUsRUFBUyxTQUEyQjtRQUE5QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFEM0QsTUFBQyxHQUFVLENBQUMsQ0FBQztJQUVwQixDQUFDO0lBY0Qsc0NBQVUsR0FBVixVQUFXLEdBQVU7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNSLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUNGO2FBQ0EsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBS0Esc0NBQVUsR0FBVixVQUFXLEdBQVU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFDLEdBQVk7WUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUlELHNDQUFVLEdBQVYsVUFBVyxHQUFVLEVBQUMsSUFBVztRQUM3QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FDRjthQUNBLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUtELHVDQUFXLEdBQVgsVUFBWSxHQUFXLEVBQUMsSUFBVztRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuQyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FDRjthQUNBLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUlPLHVDQUFXLEdBQW5CLFVBQW9CLEtBQVU7UUFHNUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU87WUFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxXQUFNLEtBQUssQ0FBQyxVQUFZLEdBQUcsY0FBYyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQXJGSDtRQUFDLGlCQUFVLEVBQUU7O3lCQUFBO0lBc0ZiLHdCQUFDO0FBQUQsQ0FyRkEsQUFxRkMsSUFBQTtBQXJGWSx5QkFBaUIsb0JBcUY3QixDQUFBIiwiZmlsZSI6ImFwcC9zZXJ2ZXIvb3Blbi1hcGktcmVzL29wZW4tYXBpLXJlcy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LEluamVjdGFibGUsRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XHJcblxyXG5pbXBvcnQgeyAgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcblxyXG4vKlxyXG5ieTogbHVvLmNodW54aWFuZ1xyXG4yMDE3LjAzLjAxXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPcGVuQVBJUmVzU2VydmljZSB7XHJcblxyXG4gIHB1YmxpYyBpOm51bWJlciA9IDA7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICAvKiDlj4LmlbDor7TmmI5cclxuICAqIHVybDror7fmsYLot6/lvoRcclxuICAqIG5hbWU66ZSZ6K+v56CB5ZCO6Z2i5re75Yqg55qE6K+G5Yir56ymXHJcbiAgKiBlcnJvckZvcm3vvJrmmL7npLrplJnor6/lvaLlvI9cclxuICAqICogMS7msqHmnInlj4LmlbDpu5jorqTku6XlpLTpg6jmj5DnpLrmoLflvI/mj5DnpLrplJnor6/kv6Hmga9cclxuICAqICogMi7mnInlj4LmlbDov5Tlm57plJnor6/kv6Hmga9cclxuICAqIGJvZHnvvJpwb3N06K+35rGC5Y+C5pWwXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIGdldOivt+axglxyXG4gICAqL1xyXG4gIGdldFByb21pc2UodXJsOnN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh1cmwpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihcclxuICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVsZXRl6K+35rGCXHJcbiAgICovXHJcbiAgIGRlbFByb21pc2UodXJsOnN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmRlbGV0ZSh1cmwpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigocmVzOlJlc3BvbnNlKT0+e1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHB1dOivt+axglxyXG4gICAqL1xyXG4gIHB1dFByb21pc2UodXJsOnN0cmluZyxib2R5OnN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcclxuICAgICAgY29uc3QgcG9zdEJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLnB1dCh1cmwsSlNPTi5zdHJpbmdpZnkocG9zdEJvZHkpKVxyXG4gICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcG9zdOivt+axglxyXG4gICAqL1xyXG4gIHBvc3RQcm9taXNlKHVybDogc3RyaW5nLGJvZHk6c3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xyXG4gICAgY29uc3QgcG9zdEJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeShwb3N0Qm9keSkpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOmUmeivr+WkhOeQhlxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgLy8gY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcclxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcclxuICAgICAgZXJyb3Iuc3RhdHVzID8gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dH1gIDogJ1NlcnZlciBlcnJvcic7XHJcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xyXG4gIH1cclxufVxyXG5cclxuIl19
