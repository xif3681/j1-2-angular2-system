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
var index_1 = require('./../../server/prompt-emit/index');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var VersionInfoService = (function () {
    function VersionInfoService(http, promptEmitService) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.i = 0;
    }
    VersionInfoService.prototype.getVersion = function () {
        var _this = this;
        var url = "/v1/version";
        return this.http
            .get(url)
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit('提示：无法获取版本信息,错误原因：' + res.json().message);
            }
        })
            .catch(this.handleError);
    };
    VersionInfoService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    VersionInfoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService])
    ], VersionInfoService);
    return VersionInfoService;
}());
exports.VersionInfoService = VersionInfoService;
var ModalContentAbout = (function () {
    function ModalContentAbout(activeModal, versionInfoService) {
        this.activeModal = activeModal;
        this.versionInfoService = versionInfoService;
        this.getVersionInfo();
        var myDate = new Date();
        this.fullYear = myDate.getFullYear();
    }
    ModalContentAbout.prototype.ngOnInit = function () {
    };
    ModalContentAbout.prototype.getVersionInfo = function () {
        var _this = this;
        var me = this;
        this.versionInfoService.getVersion()
            .then(function (versionInfo) {
            me.versionInfo = versionInfo;
        }, function (error) {
            _this.error = error;
        });
    };
    ModalContentAbout = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-about',
            templateUrl: 'modal-content-about.component.html',
            styleUrls: ['modal-content-about.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, VersionInfoService])
    ], ModalContentAbout);
    return ModalContentAbout;
}());
exports.ModalContentAbout = ModalContentAbout;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1hYm91dC9tb2RhbC1jb250ZW50LWFib3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBQzdELHNCQUFpQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BFLDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRy9ELHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUkvQyxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBUXJDO0lBR0UsNEJBQW9CLElBQVUsRUFBUyxpQkFBb0M7UUFBdkQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFGcEUsTUFBQyxHQUFXLENBQUMsQ0FBQztJQUlyQixDQUFDO0lBS0QsdUNBQVUsR0FBVjtRQUFBLGlCQWdCQztRQWRDLElBQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ1IsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUNILFVBQUMsR0FBYTtZQUNaLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvRSxDQUFDO1FBQ0gsQ0FBQyxDQUNGO2FBQ0EsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBSU8sd0NBQVcsR0FBbkIsVUFBb0IsS0FBVTtRQUc1QixJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTztZQUMxQyxLQUFLLENBQUMsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFdBQU0sS0FBSyxDQUFDLFVBQVksR0FBRyxjQUFjLENBQUM7UUFDMUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBdENIO1FBQUMsaUJBQVUsRUFBRTs7MEJBQUE7SUF1Q2IseUJBQUM7QUFBRCxDQXRDQSxBQXNDQyxJQUFBO0FBdENZLDBCQUFrQixxQkFzQzlCLENBQUE7QUFjRDtJQU9FLDJCQUFtQixXQUEyQixFQUFRLGtCQUFxQztRQUF4RSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFBUSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3pGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUlELDBDQUFjLEdBQWQ7UUFBQSxpQkFXQztRQVZDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7YUFDakMsSUFBSSxDQUNILFVBQUEsV0FBVztZQUNULEVBQUUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQ0YsQ0FBQTtJQUNMLENBQUM7SUF4Q0g7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUVoRCxVQUFVLEVBQUMsQ0FBQyxjQUFNLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQztTQUN4QixDQUFDOzt5QkFBQTtJQWlDRix3QkFBQztBQUFELENBOUJBLEFBOEJDLElBQUE7QUE5QlkseUJBQWlCLG9CQThCN0IsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGFsLWNvbnRlbnQtYWJvdXQvbW9kYWwtY29udGVudC1hYm91dC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0ICxJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi8uLi8uLi9zZXJ2ZXIvcHJvbXB0LWVtaXQvaW5kZXgnO1xuaW1wb3J0IHsgTmdiQWN0aXZlTW9kYWwgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuLy8gaW1wb3J0IHsgTGljZW5jZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2xpY2VuY2UtbGlzdC9pbmRleCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG4vKipcbiAqXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZlcnNpb25JbmZvU2VydmljZSB7XG4gIHB1YmxpYyBpOiBudW1iZXIgPSAwO1xuICAvLyBwcml2YXRlIGhvc3QgPSAnaHR0cDovLzE5Mi4xNjguODQuMTQwOjEwMDAwJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZ2V0VmVyc2lvbigpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgLy8gY29uc3QgdXJsID0gYCR7dGhpcy5ob3N0fS92MS92ZXJzaW9uYDtcbiAgICBjb25zdCB1cmwgPSBgL3YxL3ZlcnNpb25gO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9O1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSAyMDIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQoJ+aPkOekuu+8muaXoOazleiOt+WPlueJiOacrOS/oeaBryzplJnor6/ljp/lm6DvvJonICsgcmVzLmpzb24oKS5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuICAvKipcbiAgICog6ZSZ6K+v5aSE55CGXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgLy8gY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICBsZXQgZXJyTXNnID0gKGVycm9yLm1lc3NhZ2UpID8gZXJyb3IubWVzc2FnZSA6XG4gICAgICBlcnJvci5zdGF0dXMgPyBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0fWAgOiAnU2VydmVyIGVycm9yJztcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyTXNnKTtcbiAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FyLW1vZGFsLWNvbnRlbnQtYWJvdXQnLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWNvbnRlbnQtYWJvdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbW9kYWwtY29udGVudC1hYm91dC5jb21wb25lbnQuY3NzJ10sXG4gIC8vIHByb3ZpZGVyczogW05nRm9ybV0sXG4gIGRpcmVjdGl2ZXM6W05nRm9ybV0sXG4gIGlucHV0OiBbJ3RpdGxlJywnYm9keSddXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRlbnRBYm91dCB7XG4gIGxpY2Vuc2U6YW55O1xuICBlcnJvcjphbnk7XG4gIGNvbnRlbnQ6YW55O1xuICB2ZXJzaW9uSW5mbzpBcnJheTtcbiAgcHJpdmF0ZSBmdWxsWWVhcjphbnlcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsLHB1YmxpYyB2ZXJzaW9uSW5mb1NlcnZpY2U6VmVyc2lvbkluZm9TZXJ2aWNlKSB7XG4gICAgdGhpcy5nZXRWZXJzaW9uSW5mbygpO1xuICAgIGxldCBteURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuZnVsbFllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKTsgLy/ojrflj5blrozmlbTnmoTlubTku70oNOS9jSwxOTcwLT8/Pz8pXG4gIH1cbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxuICAvKipcbiAgICog6I635Y+W54mI5pys5L+h5oGv5L+h5oGvXG4gICAqL1xuICBnZXRWZXJzaW9uSW5mbygpOnZvaWR7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICB0aGlzLnZlcnNpb25JbmZvU2VydmljZS5nZXRWZXJzaW9uKClcbiAgICAgIC50aGVuKFxuICAgICAgICB2ZXJzaW9uSW5mbyA9PiB7XG4gICAgICAgICAgbWUudmVyc2lvbkluZm8gPSB2ZXJzaW9uSW5mbztcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG59XG4iXX0=
