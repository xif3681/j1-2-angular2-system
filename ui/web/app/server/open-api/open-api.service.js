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
var OpenAPIService = (function () {
    function OpenAPIService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    OpenAPIService.prototype.getPromise = function (url, name, errorForm) {
        var _this = this;
        return this.http
            .get(url)
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
                if (errorForm) {
                    return _this.translate.instant(res.json().code.toString() + name);
                }
                else {
                    _this.promptEmitService.change.emit(res.json().code.toString() + name);
                }
            }
        })
            .catch(this.handleError);
    };
    OpenAPIService.prototype.delPromise = function (url, name, errorForm) {
        var _this = this;
        return this.http
            .delete(url)
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res;
            }
            else if (res.status == 202) {
                if (errorForm) {
                    return _this.translate.instant(res.json().code.toString() + name);
                }
                else {
                    _this.promptEmitService.change.emit(res.json().code.toString() + name);
                }
            }
        })
            .catch(this.handleError);
    };
    OpenAPIService.prototype.putPromise = function (url, body, name, errorForm) {
        var _this = this;
        var postBody = JSON.parse(body);
        return this.http
            .put(url, JSON.stringify(postBody))
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
                if (errorForm) {
                    return _this.translate.instant(res.json().code.toString() + name);
                }
                else {
                    _this.promptEmitService.change.emit(res.json().code.toString() + name);
                }
            }
        })
            .catch(this.handleError);
    };
    OpenAPIService.prototype.postPromise = function (url, body, name, errorForm) {
        var _this = this;
        var postBody = JSON.parse(body);
        return this.http
            .post(url, JSON.stringify(postBody))
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
                if (errorForm) {
                    return _this.translate.instant(res.json().code.toString() + name);
                }
                else {
                    _this.promptEmitService.change.emit(res.json().code.toString() + name);
                }
            }
        })
            .catch(this.handleError);
    };
    OpenAPIService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    OpenAPIService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], OpenAPIService);
    return OpenAPIService;
}());
exports.OpenAPIService = OpenAPIService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvb3Blbi1hcGkvb3Blbi1hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBQ2xFLHNCQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBeUMsZUFBZSxDQUFDLENBQUE7QUFHekQsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQU9yQztJQUdFLHdCQUFvQixJQUFVLEVBQVEsaUJBQW1DLEVBQVMsU0FBMkI7UUFBekYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFRLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUR0RyxNQUFDLEdBQVUsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFjRCxtQ0FBVSxHQUFWLFVBQVcsR0FBVSxFQUFDLElBQVcsRUFBQyxTQUFpQjtRQUFuRCxpQkF1QkM7UUF0QkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNSLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUEsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDWixDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDO2dCQUMzQixDQUFDO1lBQ0gsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcs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LENBQUM7b0JBQ2IsTUFBTSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFJTyxvQ0FBVyxHQUFuQixVQUFvQixLQUFVO1FBRzVCLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPO1lBQzFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sV0FBTSxLQUFLLENBQUMsVUFBWSxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFsSUg7UUFBQyxpQkFBVSxFQUFFOztzQkFBQTtJQW1JYixxQkFBQztBQUFELENBbElBLEFBa0lDLElBQUE7QUFsSVksc0JBQWMsaUJBa0kxQixDQUFBIiwiZmlsZSI6ImFwcC9zZXJ2ZXIvb3Blbi1hcGkvb3Blbi1hcGkuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCxJbmplY3RhYmxlLEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4uL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XG5cbmltcG9ydCB7ICBIZWFkZXJzLCBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG5cbi8qXG5ieTogbHVvLmNodW54aWFuZ1xuMjAxNy4wMy4wMVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3BlbkFQSVNlcnZpY2Uge1xuXG4gIHB1YmxpYyBpOm51bWJlciA9IDA7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6UHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qIOWPguaVsOivtOaYjlxuICAqIHVybDror7fmsYLot6/lvoRcbiAgKiBuYW1lOumUmeivr+eggeWQjumdoua3u+WKoOeahOivhuWIq+esplxuICAqIGVycm9yRm9ybe+8muaYvuekuumUmeivr+W9ouW8j1xuICAqICogMS7msqHmnInlj4LmlbDpu5jorqTku6XlpLTpg6jmj5DnpLrmoLflvI/mj5DnpLrplJnor6/kv6Hmga9cbiAgKiAqIDIu5pyJ5Y+C5pWw6L+U5Zue6ZSZ6K+v5L+h5oGvXG4gICogYm9kee+8mnBvc3Tor7fmsYLlj4LmlbBcbiAgICovXG5cbiAgLyoqXG4gICAqIGdldOivt+axglxuICAgKi9cbiAgZ2V0UHJvbWlzZSh1cmw6c3RyaW5nLG5hbWU6c3RyaW5nLGVycm9yRm9ybTpib29sZWFuKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZihyZXMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICBpZihyZXMuX2JvZHkgPT0gJycpe1xuICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkgfHwgeyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXMgPT0gMjAyKXtcbiAgICAgICAgICAgIGlmKGVycm9yRm9ybSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKStuYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQocmVzLmpzb24oKS5jb2RlLnRvU3RyaW5nKCkrbmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZWxldGXor7fmsYJcbiAgICovXG4gICBkZWxQcm9taXNlKHVybDpzdHJpbmcsbmFtZTpzdHJpbmcsZXJyb3JGb3JtOmJvb2xlYW4pOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKChyZXM6UmVzcG9uc2UpPT57XG4gICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXMgPT0gMjAyKXtcbiAgICAgICAgICBpZihlcnJvckZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHJlcy5qc29uKCkuY29kZS50b1N0cmluZygpK25hbWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHJlcy5qc29uKCkuY29kZS50b1N0cmluZygpK25hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICB9XG4gIC8qKlxuICAgKiBwdXTor7fmsYJcbiAgICovXG4gIHB1dFByb21pc2UodXJsOnN0cmluZyxib2R5OnN0cmluZyxuYW1lOnN0cmluZyxlcnJvckZvcm06Ym9vbGVhbik6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgIGNvbnN0IHBvc3RCb2R5ID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgLnB1dCh1cmwsSlNPTi5zdHJpbmdpZnkocG9zdEJvZHkpKVxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgICAgaWYocmVzLl9ib2R5ID09ICcnKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHsgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYocmVzLnN0YXR1cyA9PSAyMDIpe1xuICAgICAgICAgICAgICBpZihlcnJvckZvcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKStuYW1lKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHJlcy5qc29uKCkuY29kZS50b1N0cmluZygpK25hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwb3N06K+35rGCXG4gICAqL1xuICBwb3N0UHJvbWlzZSh1cmw6IHN0cmluZyxib2R5OnN0cmluZyxuYW1lOnN0cmluZyxlcnJvckZvcm06Ym9vbGVhbik6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCBwb3N0Qm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgIC5wb3N0KHVybCwgSlNPTi5zdHJpbmdpZnkocG9zdEJvZHkpKVxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgICAgaWYocmVzLl9ib2R5ID09ICcnKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHsgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYocmVzLnN0YXR1cyA9PSAyMDIpe1xuICAgICAgICAgICAgICBpZihlcnJvckZvcm0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKStuYW1lKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHJlcy5qc29uKCkuY29kZS50b1N0cmluZygpK25hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuICAvKipcbiAgICog6ZSZ6K+v5aSE55CGXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgLy8gY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICBsZXQgZXJyTXNnID0gKGVycm9yLm1lc3NhZ2UpID8gZXJyb3IubWVzc2FnZSA6XG4gICAgICBlcnJvci5zdGF0dXMgPyBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0fWAgOiAnU2VydmVyIGVycm9yJztcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyTXNnKTtcbiAgfVxufVxuXG4iXX0=
