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
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var index_1 = require('../../server/index');
var ng2_translate_1 = require('ng2-translate');
var router_1 = require('@angular/router');
var PromptComponent = (function () {
    function PromptComponent(promptEmitService, translate, router) {
        var _this = this;
        this.translate = translate;
        this.router = router;
        this.promptShow = true;
        var errorArr = [];
        var logOutFlag = false;
        promptEmitService.change.subscribe(function (value) {
            if (value.substring(0, 10) == '3758358534') {
                logOutFlag = true;
            }
            if (logOutFlag) {
                setTimeout(function () {
                    _this.router.navigate(['/login']);
                }, 3000);
            }
            errorArr.push(value);
        });
        this.prompt = errorArr;
    }
    PromptComponent.prototype.closePrompt = function (i) {
        if (this.prompt[i].substring(0, 10) == '3758358534') {
            this.router.navigate(['/login']);
        }
        this.prompt.splice(i, 1);
    };
    PromptComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-prompt',
            templateUrl: 'prompt.component.html',
            styleUrls: ['prompt.component.css'],
            providers: [ng_bootstrap_1.NgbAlertConfig]
        }), 
        __metadata('design:paramtypes', [index_1.PromptEmitService, ng2_translate_1.TranslateService, router_1.Router])
    ], PromptComponent);
    return PromptComponent;
}());
exports.PromptComponent = PromptComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcHJvbXB0L3Byb21wdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRCxlQUFlLENBQUMsQ0FBQTtBQUNsRSw2QkFBNkIsNEJBQTRCLENBQUMsQ0FBQTtBQUMxRCxzQkFBaUMsb0JBQW9CLENBQUMsQ0FBQTtBQUN0RCw4QkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0MsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFZekM7SUFJRSx5QkFBWSxpQkFBbUMsRUFBUyxTQUEyQixFQUMvRCxNQUFjO1FBTHBDLGlCQWtDQztRQTlCeUQsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDL0QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQ3ZDLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFBLENBQUM7Z0JBQ3hDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDcEIsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7Z0JBQ2IsVUFBVSxDQUFDO29CQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1YsQ0FBQztZQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUUzQixDQUFDO0lBS1EscUNBQVcsR0FBbEIsVUFBbUIsQ0FBQztRQUNsQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksWUFBWSxDQUFDLENBQUEsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBekNIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLFNBQVMsRUFBRSxDQUFDLDZCQUFjLENBQUM7U0FDNUIsQ0FBQzs7dUJBQUE7SUFvQ0Ysc0JBQUM7QUFBRCxDQWxDQSxBQWtDQyxJQUFBO0FBbENZLHVCQUFlLGtCQWtDM0IsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3Byb21wdC9wcm9tcHQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LEluamVjdGFibGUsRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkFsZXJ0Q29uZmlnfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIHRvb2xiYXIgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdteS1wcm9tcHQnLFxuICB0ZW1wbGF0ZVVybDogJ3Byb21wdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9tcHQuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtOZ2JBbGVydENvbmZpZ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBQcm9tcHRDb21wb25lbnQge1xuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xuICBwcm9tcHRTaG93OmJvb2xlYW47XG4gIHByb21wdDphbnk7XG4gIGNvbnN0cnVjdG9yKHByb21wdEVtaXRTZXJ2aWNlOlByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKXtcblxuICAgIHRoaXMucHJvbXB0U2hvdyA9IHRydWU7XG4gICAgbGV0IGVycm9yQXJyID0gW107XG4gICAgbGV0IGxvZ091dEZsYWcgPSBmYWxzZTtcbiAgICBwcm9tcHRFbWl0U2VydmljZS5jaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZSk9PntcbiAgICAgIGlmKHZhbHVlLnN1YnN0cmluZygwLDEwKSA9PSAnMzc1ODM1ODUzNCcpe1xuICAgICAgICBsb2dPdXRGbGFnID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmKGxvZ091dEZsYWcpe1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XG4gICAgICAgIH0sMzAwMCk7XG4gICAgICB9XG4gICAgICBlcnJvckFyci5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICB0aGlzLnByb21wdCA9IGVycm9yQXJyO1xuICAgIC8vIHNldEludGVydmFsKCgpPT57IHRoaXMucHJvbXB0LnNwbGljZSgwLCAxKTt9LDIwMDApXG59XG5cbi8qKlxuICog54K55Ye7cHJvbXB05o+Q56S65L+h5oGv5YWz6ZetXG4gKi9cbiAgcHVibGljIGNsb3NlUHJvbXB0KGkpIHtcbiAgICBpZih0aGlzLnByb21wdFtpXS5zdWJzdHJpbmcoMCwxMCkgPT0gJzM3NTgzNTg1MzQnKXtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgIH1cbiAgICB0aGlzLnByb21wdC5zcGxpY2UoaSwgMSk7XG4gIH1cbn1cblxuIl19
