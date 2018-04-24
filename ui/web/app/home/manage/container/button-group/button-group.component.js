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
var index_1 = require('../../../../server/index');
var index_2 = require('../../../../shared/index');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var ng2_translate_1 = require('ng2-translate');
var ButtonGroupComponent = (function () {
    function ButtonGroupComponent(btnStatusService, modalService, promptEmitService, translate) {
        this.btnStatusService = btnStatusService;
        this.modalService = modalService;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.changed = new core_1.EventEmitter();
    }
    ButtonGroupComponent.prototype.btnstatus = function (alertDifMe, nameMe, difStatusMe, btnContainerMe) {
        var _this = this;
        var me = this;
        var nameMeTrim = nameMe.trim();
        var alertDifMeTrim = alertDifMe.trim();
        var difStatusMeTrim = difStatusMe.trim();
        var btnContainerMeTrim = btnContainerMe ? btnContainerMe.trim() : '';
        var flag = true;
        if (difStatusMeTrim == 'stop') {
            if (alertDifMeTrim == 'services') {
                var modalSer = me.modalService.open(index_2.ModalContent);
                modalSer.componentInstance.title = '停止服务';
                modalSer.componentInstance.body = '停止服务运行存在系统无法正常使用的风险。您确定要停止该服务吗？';
                modalSer.result.then(function (result) {
                    flag = result;
                    _this.btnStatusServersChange(flag, alertDifMeTrim, nameMeTrim, difStatusMeTrim, btnContainerMeTrim);
                    return;
                }, function (reason) {
                });
            }
            else if (alertDifMeTrim == 'containers') {
                var modalCon = me.modalService.open(index_2.ModalContent);
                modalCon.componentInstance.title = '停止容器';
                modalCon.componentInstance.body = '停止容器运行存在系统无法正常使用的风险。您确定要停止该容器吗？';
                modalCon.result.then(function (result) {
                    flag = result;
                    _this.btnStatusServersChange(flag, alertDifMeTrim, nameMeTrim, difStatusMeTrim, btnContainerMeTrim);
                    return;
                }, function (reason) {
                });
            }
        }
        else {
            this.btnStatusServersChange(flag, alertDifMeTrim, nameMeTrim, difStatusMeTrim, btnContainerMeTrim);
        }
    };
    ButtonGroupComponent.prototype.btnStatusServersChange = function (flag, alertDifMeTrim, nameMeTrim, difStatusMeTrim, btnContainerMeTrim) {
        var _this = this;
        this.PendStatusEn = difStatusMeTrim;
        if (flag) {
            this.PendStatus = 1;
            this.btnStatusService.btnStatusChange(alertDifMeTrim, nameMeTrim, difStatusMeTrim, btnContainerMeTrim)
                .then(function (nowInf) {
                if (nowInf != undefined) {
                    _this.PendStatus = 0;
                    if (nowInf.pid == -1) {
                        var hint = _this.translate.instant('提示：');
                        _this.promptEmitService.change.emit(hint + nameMeTrim + _this.translate.instant(difStatusMeTrim + '失败,') + _this.translate.instant("请确保所在的容器处于运行状态"));
                    }
                    else {
                        _this.nowInf = nowInf;
                        _this.changed.next(nowInf);
                    }
                }
                else {
                    _this.PendStatus = 0;
                }
            }, function (error) {
                _this.errorMessage = error;
            });
        }
        else {
        }
    };
    ButtonGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-button-group',
            templateUrl: 'button-group.component.html',
            styleUrls: ['button-group.component.css'],
            providers: [index_1.BtnStatusService],
            inputs: ['alertDif', 'btnItem'],
            outputs: ['changed']
        }), 
        __metadata('design:paramtypes', [index_1.BtnStatusService, ng_bootstrap_1.NgbModal, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ButtonGroupComponent);
    return ButtonGroupComponent;
}());
exports.ButtonGroupComponent = ButtonGroupComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9jb250YWluZXIvYnV0dG9uLWdyb3VwL2J1dHRvbi1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QyxlQUFlLENBQUMsQ0FBQTtBQUN4RCxzQkFBbUQsMEJBQTBCLENBQUMsQ0FBQTtBQUc5RSxzQkFBNkIsMEJBQTBCLENBQUMsQ0FBQTtBQUN4RCw2QkFBeUMsNEJBQTRCLENBQUMsQ0FBQTtBQUN0RSw4QkFBK0IsZUFBZSxDQUFDLENBQUE7QUFlL0M7SUFNRSw4QkFBb0IsZ0JBQWtDLEVBQVEsWUFBc0IsRUFDakUsaUJBQW1DLEVBQVMsU0FBMkI7UUFEdEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFRLGlCQUFZLEdBQVosWUFBWSxDQUFVO1FBQ2pFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVExRixZQUFPLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFON0IsQ0FBQztJQU9ELHdDQUFTLEdBQVQsVUFBVSxVQUFrQixFQUFDLE1BQWMsRUFBQyxXQUFtQixFQUFDLGNBQXNCO1FBQXRGLGlCQW1DQztRQWxDQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFZCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLElBQUksZUFBZSxHQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QyxJQUFJLGtCQUFrQixHQUFHLGNBQWMsR0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRSxDQUFDO1FBRWpFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixFQUFFLENBQUEsQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLENBQUEsQ0FBQztZQUM1QixFQUFFLENBQUEs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Qzt3QkFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRTVCLENBQUM7Z0JBQ0gsQ0FBQztnQkFBQSxJQUFJLENBQUMsQ0FBQztvQkFDTCxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztZQUNILENBQUMsRUFDRCxVQUFBLEtBQUs7Z0JBQ0gsS0FBSSxDQUFDLFlBQVksR0FBUSxLQUFLLENBQUM7WUFDakMsQ0FBQyxDQUNKLENBQUM7UUFDUixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7UUFDTixDQUFDO0lBQ0gsQ0FBQztJQXRHSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLHdCQUFnQixDQUFDO1lBQzdCLE1BQU0sRUFBQyxDQUFDLFVBQVUsRUFBQyxTQUFTLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3JCLENBQUM7OzRCQUFBO0lBK0ZGLDJCQUFDO0FBQUQsQ0E3RkEsQUE2RkMsSUFBQTtBQTdGWSw0QkFBb0IsdUJBNkZoQyxDQUFBIiwiZmlsZSI6ImFwcC9ob21lL21hbmFnZS9jb250YWluZXIvYnV0dG9uLWdyb3VwL2J1dHRvbi1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnRuU3RhdHVzU2VydmljZSxQcm9tcHRFbWl0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlci9pbmRleCc7XG5cbmltcG9ydCB7IENvZGUgfSBmcm9tICcuLi9Db2RlL2luZGV4JztcbmltcG9ydCB7IE1vZGFsQ29udGVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbmRleCc7XG5pbXBvcnQgeyBOZ2JNb2RhbCwgTmdiQWN0aXZlTW9kYWwgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyB0aGUgbmF2aWdhdGlvbiBiYXIgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdteS1idXR0b24tZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ2J1dHRvbi1ncm91cC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydidXR0b24tZ3JvdXAuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtCdG5TdGF0dXNTZXJ2aWNlXSxcbiAgaW5wdXRzOlsnYWxlcnREaWYnLCdidG5JdGVtJ10sXG4gIG91dHB1dHM6IFsnY2hhbmdlZCddXG59KVxuXG5leHBvcnQgY2xhc3MgQnV0dG9uR3JvdXBDb21wb25lbnQge1xuICBlcnJvck1lc3NhZ2U6c3RyaW5nO1xuICBub3dJbmY6YW55O1xuICBwcm9tcHQ6c3RyaW5nO1xuICBQZW5kU3RhdHVzOmFueTtcbiAgUGVuZFN0YXR1c0VuOmFueTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBidG5TdGF0dXNTZXJ2aWNlOiBCdG5TdGF0dXNTZXJ2aWNlLHB1YmxpYyBtb2RhbFNlcnZpY2U6IE5nYk1vZGFsLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6UHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcblxuICB9XG5cblxuICAvKipcbiAgICog54K55Ye75ZCv5Yqo77yM6YeN5ZCv77yM5YGc5q2i5oyJ6ZKuXG4gICAqL1xuICBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBidG5zdGF0dXMoYWxlcnREaWZNZTogc3RyaW5nLG5hbWVNZTogc3RyaW5nLGRpZlN0YXR1c01lOiBzdHJpbmcsYnRuQ29udGFpbmVyTWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHZhciBtZSA9IHRoaXM7XG5cbiAgICBsZXQgbmFtZU1lVHJpbSA9IG5hbWVNZS50cmltKCk7XG4gICAgbGV0IGFsZXJ0RGlmTWVUcmltID0gYWxlcnREaWZNZS50cmltKCk7XG4gICAgbGV0IGRpZlN0YXR1c01lVHJpbT0gZGlmU3RhdHVzTWUudHJpbSgpO1xuICAgIGxldCBidG5Db250YWluZXJNZVRyaW0gPSBidG5Db250YWluZXJNZT9idG5Db250YWluZXJNZS50cmltKCk6Jyc7XG4gICAgLy8gbGV0IGRpZlN0YXR1c1RvQ2ggPSB0aGlzLnN0YXR1c1RvQ2goZGlmU3RhdHVzTWVUcmltKTtcbiAgICBsZXQgZmxhZyA9IHRydWU7XG4gICAgaWYoZGlmU3RhdHVzTWVUcmltID09ICdzdG9wJyl7XG4gICAgICBpZihhbGVydERpZk1lVHJpbSA9PSAnc2VydmljZXMnKXtcbiAgICAgICAgbGV0IG1vZGFsU2VyID0gbWUubW9kYWxTZXJ2aWNlLm9wZW4oTW9kYWxDb250ZW50KTtcbiAgICAgICAgbW9kYWxTZXIuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSAn5YGc5q2i5pyN5YqhJztcbiAgICAgICAgbW9kYWxTZXIuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICflgZzmraLmnI3liqHov5DooYzlrZjlnKjns7vnu5/ml6Dms5XmraPluLjkvb/nlKjnmoTpo47pmanjgILmgqjnoa7lrpropoHlgZzmraLor6XmnI3liqHlkJfvvJ8nO1xuICAgICAgICBtb2RhbFNlci5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgZmxhZyA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLmJ0blN0YXR1c1NlcnZlcnNDaGFuZ2UoZmxhZyxhbGVydERpZk1lVHJpbSxuYW1lTWVUcmltLGRpZlN0YXR1c01lVHJpbSxidG5Db250YWluZXJNZVRyaW0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSwgKHJlYXNvbikgPT4ge1xuICAgICAgICB9KTtcblxuICAgICAgfWVsc2UgaWYoYWxlcnREaWZNZVRyaW0gPT0gJ2NvbnRhaW5lcnMnKXtcbiAgICAgICAgY29uc3QgbW9kYWxDb24gPSBtZS5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbENvbnRlbnQpO1xuICAgICAgICBtb2RhbENvbi5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9ICflgZzmraLlrrnlmagnO1xuICAgICAgICBtb2RhbENvbi5jb21wb25lbnRJbnN0YW5jZS5ib2R5ID0gJ+WBnOatouWuueWZqOi/kOihjOWtmOWcqOezu+e7n+aXoOazleato+W4uOS9v+eUqOeahOmjjumZqeOAguaCqOehruWumuimgeWBnOatouivpeWuueWZqOWQl++8nyc7XG4gICAgICAgIG1vZGFsQ29uLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBmbGFnID0gcmVzdWx0O1xuICAgICAgICAgIHRoaXMuYnRuU3RhdHVzU2VydmVyc0NoYW5nZShmbGFnLGFsZXJ0RGlmTWVUcmltLG5hbWVNZVRyaW0sZGlmU3RhdHVzTWVUcmltLGJ0bkNvbnRhaW5lck1lVHJpbSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9LCAocmVhc29uKSA9PiB7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgdGhpcy5idG5TdGF0dXNTZXJ2ZXJzQ2hhbmdlKGZsYWcsYWxlcnREaWZNZVRyaW0sbmFtZU1lVHJpbSxkaWZTdGF0dXNNZVRyaW0sYnRuQ29udGFpbmVyTWVUcmltKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGZsYWc65by55qGG56Gu5a6a77yM5Y+W5raI77yMeOaMiemSrueahOeCueWHu1xuICAgKiBAcGFyYW0gYWxlcnREaWZNZVRyaW1cbiAgICogQHBhcmFtIG5hbWVNZVRyaW1cbiAgICogQHBhcmFtIGRpZlN0YXR1c01lVHJpbVxuICAgKiBAcGFyYW0gYnRuQ29udGFpbmVyTWVUcmltXG4gICAqIOacjeWKoeS/oeaBr+eahOS6pOS6klxuICAgKi9cbiAgcHJpdmF0ZSBidG5TdGF0dXNTZXJ2ZXJzQ2hhbmdlKGZsYWcsYWxlcnREaWZNZVRyaW0sbmFtZU1lVHJpbSxkaWZTdGF0dXNNZVRyaW0sYnRuQ29udGFpbmVyTWVUcmltKTogdm9pZHtcblxuICAgIHRoaXMuUGVuZFN0YXR1c0VuID0gZGlmU3RhdHVzTWVUcmltO1xuICAgIGlmKGZsYWcpe1xuICAgICAgdGhpcy5QZW5kU3RhdHVzID0gMTtcbiAgICAgIHRoaXMuYnRuU3RhdHVzU2VydmljZS5idG5TdGF0dXNDaGFuZ2UoYWxlcnREaWZNZVRyaW0sbmFtZU1lVHJpbSxkaWZTdGF0dXNNZVRyaW0sYnRuQ29udGFpbmVyTWVUcmltKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICBub3dJbmYgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8yMDAgcGlk5Li6LTEg5pON5L2c5bCx5LiN6LW35L2c55So5LqGXG4gICAgICAgICAgICAgICAgaWYobm93SW5mIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgdGhpcy5QZW5kU3RhdHVzID0gMDtcbiAgICAgICAgICAgICAgICAgIGlmKG5vd0luZi5waWQgPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8micpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KGhpbnQgK25hbWVNZVRyaW0gKyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRpZlN0YXR1c01lVHJpbSsn5aSx6LSlLCcpICsgdGhpcy50cmFuc2xhdGUuaW5zdGFudChcIuivt+ehruS/neaJgOWcqOeahOWuueWZqOWkhOS6jui/kOihjOeKtuaAgVwiKSk7XG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy/nu4jkuo7miJDlip9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3dJbmYgPSBub3dJbmY7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZC5uZXh0KG5vd0luZik7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQoJ+aPkOekuu+8micrbmFtZU1lVHJpbSArIGRpZlN0YXR1c1RvQ2ggK1wi5oiQ5YqfXCIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuUGVuZFN0YXR1cyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PmVycm9yO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICB9ZWxzZXtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
