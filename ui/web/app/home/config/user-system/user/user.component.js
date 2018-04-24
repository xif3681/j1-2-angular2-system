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
var index_1 = require('../../../../shared/index');
var index_2 = require('../../../../server/index');
var ng_bootstrap_2 = require('@ng-bootstrap/ng-bootstrap');
var ng2_translate_1 = require('ng2-translate');
var UserComponent = (function () {
    function UserComponent(activeModal, userListService, modalService, deleteUserService, itemUserService, promptEmitService, userCountService, userStatusService, translate) {
        this.activeModal = activeModal;
        this.userListService = userListService;
        this.modalService = modalService;
        this.deleteUserService = deleteUserService;
        this.itemUserService = itemUserService;
        this.promptEmitService = promptEmitService;
        this.userCountService = userCountService;
        this.userStatusService = userStatusService;
        this.translate = translate;
        this.tHeadLicenceListNames = [
            '用户名',
            '显示名',
            '邮箱',
            '使用状态',
            '描述',
            '操作',
        ];
        this.userListAll = [];
        this.showCurPageNum = 10;
        this.showCurPage = 1;
        this.showPage = 1;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
        this.getUserCountAll();
    };
    UserComponent.prototype.getUserListAll = function (start, limit) {
        var _this = this;
        this.userListService.getUserList(start, limit)
            .then(function (userListAll) {
            if (userListAll !== undefined) {
                _this.userListAll = userListAll;
            }
        }, function (error) {
            _this.error = error;
        });
    };
    UserComponent.prototype.getUserCountAll = function () {
        var _this = this;
        var me = this;
        this.userCountService.getUserCount()
            .then(function (userCount) {
            me.userCountMe = userCount.count;
        }, function (error) {
            _this.error = error;
        });
    };
    UserComponent.prototype.stateChange = function (item) {
        var _this = this;
        var state;
        if (item.status) {
            state = 'disable';
        }
        else {
            state = 'enable';
        }
        var me = this;
        this.userStatusService.userStatusChange(item.userId, state)
            .then(function (userStatus) {
            if (userStatus !== undefined) {
                item.status = !item.status;
            }
        }, function (error) {
            _this.error = error;
        });
    };
    UserComponent.prototype.addUser = function () {
        var _this = this;
        var modalRef1 = this.modalService.open(index_1.ModalContentNewUser);
        modalRef1.componentInstance.title = '创建用户';
        modalRef1.result.then(function (result) {
            if (result == 'success') {
                var me = _this;
                me.getUserListAll((_this.showPage - 1) * _this.showCurPageNum, _this.showCurPageNum);
                _this.getUserCountAll();
            }
        }, function (reason) {
        });
    };
    UserComponent.prototype.editUser = function (item) {
        var _this = this;
        var modalRef3 = this.modalService.open(index_1.ModalContentEditUser);
        modalRef3.componentInstance.title = '编辑用户';
        modalRef3.componentInstance.body = item;
        modalRef3.result.then(function (result) {
            if (result == 'success') {
                var me_1 = _this;
                _this.itemUserService.infoItemUser(item.userId)
                    .then(function (itemUser) {
                    item.loginName = itemUser.loginName;
                    item.displayName = itemUser.displayName;
                    item.email = itemUser.email;
                    item.status = itemUser.status;
                    item.description = itemUser.description;
                }, function (error) {
                    me_1.error = error;
                });
            }
        }, function (reason) {
        });
    };
    UserComponent.prototype.delUser = function (item) {
        var _this = this;
        var modalDelRoll = this.modalService.open(index_1.ModalContent);
        modalDelRoll.componentInstance.title = '删除用户';
        modalDelRoll.componentInstance.body = '删除用户将导此用户无法登录，您确定要执行此操作吗？';
        modalDelRoll.result.then(function (result) {
            if (result) {
                _this.deleteUserService.deleteUser(item.userId)
                    .then(function (deleteUserMe) {
                    if (deleteUserMe !== undefined) {
                        var me = _this;
                        me.getUserListAll((_this.showPage - 1) * _this.showCurPageNum, _this.showCurPageNum);
                        _this.getUserCountAll();
                    }
                }, function (error) {
                    _this.error = error;
                });
            }
        }, function (reason) {
            return;
        });
    };
    UserComponent.prototype.onCurPageNum = function (num) {
        this.showCurPageNum = parseInt(num);
        this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    };
    UserComponent.prototype.onCurPage = function (num) {
        this.showPage = parseInt(num);
        this.showCurPage = parseInt(num);
        this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    };
    UserComponent.prototype.onPage = function (num) {
        this.showPage = parseInt(num);
        this.showCurPage = parseInt(num);
        this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-user',
            templateUrl: 'user.component.html',
            styleUrls: ['user.component.css'],
            providers: [ng_bootstrap_2.NgbAlertConfig, index_1.ModalContent, index_1.ModalContentNewUser, index_1.ModalContentEditUser,
                ng_bootstrap_1.NgbActiveModal, index_1.PaginationAdvanced]
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_2.UserListService, ng_bootstrap_1.NgbModal, index_2.DeleteUserService, index_2.ItemUserService, index_2.PromptEmitService, index_2.UserCountService, index_2.UserStatusService, ng2_translate_1.TranslateService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy91c2VyLXN5c3RlbS91c2VyL3VzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUQsZUFBZSxDQUFDLENBQUE7QUFDekUsNkJBQXVDLDRCQUE0QixDQUFDLENBQUE7QUFDcEUsc0JBQTBGLDBCQUEwQixDQUFDLENBQUE7QUFDckgsc0JBT08sMEJBQTBCLENBQUMsQ0FBQTtBQUNsQyw2QkFBNkIsNEJBQTRCLENBQUMsQ0FBQTtBQUUxRCw4QkFBK0IsZUFBZSxDQUFDLENBQUE7QUFXL0M7SUFxQkUsdUJBQW1CLFdBQTJCLEVBQzNCLGVBQWdDLEVBQVMsWUFBc0IsRUFDL0QsaUJBQW9DLEVBQVMsZUFBZ0MsRUFDN0UsaUJBQW9DLEVBQVMsZ0JBQWtDLEVBQy9FLGlCQUFvQyxFQUFVLFNBQTJCO1FBSnpFLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUMvRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQzdFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQy9FLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQXhCNUYsMEJBQXFCLEdBQUc7WUFDdEIsS0FBSztZQUNMLEtBQUs7WUFDTCxJQUFJO1lBQ0osTUFBTTtZQUNOLElBQUk7WUFDSixJQUFJO1NBQ0wsQ0FBQztRQUVGLGdCQUFXLEdBQVUsRUFBRSxDQUFDO1FBT3hCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGFBQVEsR0FBVyxDQUFDLENBQUM7SUFPckIsQ0FBQztJQU1ELGdDQUFRLEdBQVI7UUFDRSxJQUFJ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R0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUdELDhCQUFNLEdBQU4sVUFBTyxHQUFHO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQXhNSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNqQyxTQUFTLEVBQUUsQ0FBQyw2QkFBYyxFQUFFLG9CQUFZLEVBQUUsMkJBQW1CLEVBQUUsNEJBQW9CO2dCQUNqRiw2QkFBYyxFQUFFLDBCQUFrQixDQUFDO1NBQ3RDLENBQUM7O3FCQUFBO0lBb01GLG9CQUFDO0FBQUQsQ0FsTUEsQUFrTUMsSUFBQTtBQWxNWSxxQkFBYSxnQkFrTXpCLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvY29uZmlnL3VzZXItc3lzdGVtL3VzZXIvdXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEluamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYk1vZGFsLCBOZ2JBY3RpdmVNb2RhbH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHtNb2RhbENvbnRlbnQsIE1vZGFsQ29udGVudE5ld1VzZXIsIFBhZ2luYXRpb25BZHZhbmNlZCwgTW9kYWxDb250ZW50RWRpdFVzZXJ9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbmRleCc7XG5pbXBvcnQge1xuICBVc2VyTGlzdFNlcnZpY2UsXG4gIERlbGV0ZVVzZXJTZXJ2aWNlLFxuICBVc2VyU3RhdHVzU2VydmljZSxcbiAgSXRlbVVzZXJTZXJ2aWNlLFxuICBQcm9tcHRFbWl0U2VydmljZSxcbiAgVXNlckNvdW50U2VydmljZVxufSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXIvaW5kZXgnO1xuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuXG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhci11c2VyJyxcbiAgdGVtcGxhdGVVcmw6ICd1c2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3VzZXIuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtOZ2JBbGVydENvbmZpZywgTW9kYWxDb250ZW50LCBNb2RhbENvbnRlbnROZXdVc2VyLCBNb2RhbENvbnRlbnRFZGl0VXNlcixcbiAgICBOZ2JBY3RpdmVNb2RhbCwgUGFnaW5hdGlvbkFkdmFuY2VkXVxufSlcblxuZXhwb3J0IGNsYXNzIFVzZXJDb21wb25lbnQge1xuICB0SGVhZExpY2VuY2VMaXN0TmFtZXMgPSBbXG4gICAgJ+eUqOaIt+WQjScsXG4gICAgJ+aYvuekuuWQjScsXG4gICAgJ+mCrueusScsXG4gICAgJ+S9v+eUqOeKtuaAgScsXG4gICAgJ+aPj+i/sCcsXG4gICAgJ+aTjeS9nCcsXG4gIF07XG4gIGVycm9yOiBhbnk7XG4gIHVzZXJMaXN0QWxsOiBhbnlbXSA9IFtdO1xuICBwcm9tcHQ6IGFueTtcbiAgdXNlckNvdW50TWU6IGFueTtcbiAgLyoqXG4gICAqXG4gICAqIOWIhumhteWIneWni+S/oeaBr1xuICAgKi9cbiAgc2hvd0N1clBhZ2VOdW06IG51bWJlciA9IDEwO1xuICBzaG93Q3VyUGFnZTogbnVtYmVyID0gMTtcbiAgc2hvd1BhZ2U6IG51bWJlciA9IDE7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxcbiAgICAgICAgICAgICAgcHVibGljIHVzZXJMaXN0U2VydmljZTogVXNlckxpc3RTZXJ2aWNlLCBwdWJsaWMgbW9kYWxTZXJ2aWNlOiBOZ2JNb2RhbCxcbiAgICAgICAgICAgICAgcHVibGljIGRlbGV0ZVVzZXJTZXJ2aWNlOiBEZWxldGVVc2VyU2VydmljZSwgcHVibGljIGl0ZW1Vc2VyU2VydmljZTogSXRlbVVzZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlLCBwdWJsaWMgdXNlckNvdW50U2VydmljZTogVXNlckNvdW50U2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHVzZXJTdGF0dXNTZXJ2aWNlOiBVc2VyU3RhdHVzU2VydmljZSwgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vnmoTml7blgJnojrflj5bkv6Hmga9cbiAgICovXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRVc2VyTGlzdEFsbCgodGhpcy5zaG93UGFnZSAtIDEpICogdGhpcy5zaG93Q3VyUGFnZU51bSwgdGhpcy5zaG93Q3VyUGFnZU51bSk7XG4gICAgdGhpcy5nZXRVc2VyQ291bnRBbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bliJfooajkv6Hmga9cbiAgICovXG4gIGdldFVzZXJMaXN0QWxsKHN0YXJ0LCBsaW1pdCk6IHZvaWQge1xuICAgIHRoaXMudXNlckxpc3RTZXJ2aWNlLmdldFVzZXJMaXN0KHN0YXJ0LCBsaW1pdClcbiAgICAgIC50aGVuKFxuICAgICAgICB1c2VyTGlzdEFsbCA9PiB7XG4gICAgICAgICAgaWYgKHVzZXJMaXN0QWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXNlckxpc3RBbGwgPSB1c2VyTGlzdEFsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5oC75pWwXG4gICAqL1xuICBnZXRVc2VyQ291bnRBbGwoKTogdm9pZCB7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICB0aGlzLnVzZXJDb3VudFNlcnZpY2UuZ2V0VXNlckNvdW50KClcbiAgICAgIC50aGVuKFxuICAgICAgICB1c2VyQ291bnQgPT4ge1xuICAgICAgICAgIG1lLnVzZXJDb3VudE1lID0gdXNlckNvdW50LmNvdW50O1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApXG4gIH1cblxuICAvKipcbiAgICog6Lef5pS554q25oCBXG4gICAqL1xuICBzdGF0ZUNoYW5nZShpdGVtKSB7XG4gICAgbGV0IHN0YXRlO1xuICAgIGlmIChpdGVtLnN0YXR1cykge1xuICAgICAgc3RhdGUgPSAnZGlzYWJsZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlID0gJ2VuYWJsZSc7XG4gICAgfVxuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgdGhpcy51c2VyU3RhdHVzU2VydmljZS51c2VyU3RhdHVzQ2hhbmdlKGl0ZW0udXNlcklkLCBzdGF0ZSlcbiAgICAgIC50aGVuKFxuICAgICAgICB1c2VyU3RhdHVzID0+IHtcbiAgICAgICAgICBpZiAodXNlclN0YXR1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpdGVtLnN0YXR1cyA9ICFpdGVtLnN0YXR1cztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIClcblxuICB9XG5cbiAgLyoqXG4gICAqIOa3u+WKoOeUqOaIt1xuICAgKi9cbiAgYWRkVXNlcigpIHtcbiAgICBsZXQgbW9kYWxSZWYxID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbENvbnRlbnROZXdVc2VyKTtcbiAgICBtb2RhbFJlZjEuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSAn5Yib5bu655So5oi3JztcbiAgICBtb2RhbFJlZjEucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHJlc3VsdCA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgbWUuZ2V0VXNlckxpc3RBbGwoKHRoaXMuc2hvd1BhZ2UgLSAxKSAqIHRoaXMuc2hvd0N1clBhZ2VOdW0sIHRoaXMuc2hvd0N1clBhZ2VOdW0pO1xuICAgICAgICB0aGlzLmdldFVzZXJDb3VudEFsbCgpO1xuICAgICAgfVxuICAgIH0sIChyZWFzb24pID0+IHtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDnvJbovpHnlKjmiLdcbiAgICovXG4gIGVkaXRVc2VyKGl0ZW0pIHtcbiAgICBsZXQgbW9kYWxSZWYzID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbENvbnRlbnRFZGl0VXNlcik7XG4gICAgbW9kYWxSZWYzLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+e8lui+keeUqOaItyc7XG4gICAgbW9kYWxSZWYzLmNvbXBvbmVudEluc3RhbmNlLmJvZHkgPSBpdGVtO1xuICAgIG1vZGFsUmVmMy5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09ICdzdWNjZXNzJykge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICB0aGlzLml0ZW1Vc2VyU2VydmljZS5pbmZvSXRlbVVzZXIoaXRlbS51c2VySWQpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBpdGVtVXNlciA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0ubG9naW5OYW1lID0gaXRlbVVzZXIubG9naW5OYW1lO1xuICAgICAgICAgICAgICBpdGVtLmRpc3BsYXlOYW1lID0gaXRlbVVzZXIuZGlzcGxheU5hbWU7XG4gICAgICAgICAgICAgIGl0ZW0uZW1haWwgPSBpdGVtVXNlci5lbWFpbDtcbiAgICAgICAgICAgICAgaXRlbS5zdGF0dXMgPSBpdGVtVXNlci5zdGF0dXM7XG4gICAgICAgICAgICAgIGl0ZW0uZGVzY3JpcHRpb24gPSBpdGVtVXNlci5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIG1lLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgfVxuXG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIoOmZpOeUqOaIt1xuICAgKi9cbiAgZGVsVXNlcihpdGVtKSB7XG4gICAgLy8x77yM5by55qGG5o+Q56S6XG4gICAgbGV0IG1vZGFsRGVsUm9sbCA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oTW9kYWxDb250ZW50KTtcbiAgICBtb2RhbERlbFJvbGwuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSAn5Yig6Zmk55So5oi3JztcbiAgICBtb2RhbERlbFJvbGwuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICfliKDpmaTnlKjmiLflsIblr7zmraTnlKjmiLfml6Dms5XnmbvlvZXvvIzmgqjnoa7lrpropoHmiafooYzmraTmk43kvZzlkJfvvJ8nO1xuICAgIG1vZGFsRGVsUm9sbC5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAvL+eCueWHu+ehruWumuaMiemSrueahOaXtuWAme+8jOWPkemAgeWIoOmZpOivt+axglxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLmRlbGV0ZVVzZXJTZXJ2aWNlLmRlbGV0ZVVzZXIoaXRlbS51c2VySWQpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBkZWxldGVVc2VyTWUgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGVsZXRlVXNlck1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vIG1lLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KCfmj5DnpLrvvJrliKDpmaTnlKjmiLfmiJDlip8nKTtcbiAgICAgICAgICAgICAgICBtZS5nZXRVc2VyTGlzdEFsbCgodGhpcy5zaG93UGFnZSAtIDEpICogdGhpcy5zaG93Q3VyUGFnZU51bSwgdGhpcy5zaG93Q3VyUGFnZU51bSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRVc2VyQ291bnRBbGwoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgICAgcmV0dXJuO1xuICAgIH0pO1xuICB9XG5cbiAgLy/liIbpobVcbiAgLy/pgInmi6nmr4/pobXmmL7npLrnmoTmnaHmlbBcbiAgb25DdXJQYWdlTnVtKG51bSk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0N1clBhZ2VOdW0gPSBwYXJzZUludChudW0pO1xuICAgIC8v6I635Y+W5b2T5YmN6aG15pi+56S655qE5L+h5oGv77yI5ZCO5Y+w6I635Y+W77yJXG4gICAgdGhpcy5nZXRVc2VyTGlzdEFsbCgodGhpcy5zaG93UGFnZSAtIDEpICogdGhpcy5zaG93Q3VyUGFnZU51bSwgdGhpcy5zaG93Q3VyUGFnZU51bSk7XG4gIH1cblxuICAvL+i3s+i9rOiHs+eahOmhteaVsFxuICBvbkN1clBhZ2UobnVtKTogdm9pZCB7XG4gICAgdGhpcy5zaG93UGFnZSA9IHBhcnNlSW50KG51bSk7XG4gICAgdGhpcy5zaG93Q3VyUGFnZSA9IHBhcnNlSW50KG51bSk7XG4gICAgdGhpcy5nZXRVc2VyTGlzdEFsbCgodGhpcy5zaG93UGFnZSAtIDEpICogdGhpcy5zaG93Q3VyUGFnZU51bSwgdGhpcy5zaG93Q3VyUGFnZU51bSk7XG4gIH1cblxuICAvL+eCueWHu+aYvuekuueahOmhteaVsFxuICBvblBhZ2UobnVtKTogdm9pZCB7XG4gICAgdGhpcy5zaG93UGFnZSA9IHBhcnNlSW50KG51bSk7XG4gICAgdGhpcy5zaG93Q3VyUGFnZSA9IHBhcnNlSW50KG51bSk7XG4gICAgdGhpcy5nZXRVc2VyTGlzdEFsbCgodGhpcy5zaG93UGFnZSAtIDEpICogdGhpcy5zaG93Q3VyUGFnZU51bSwgdGhpcy5zaG93Q3VyUGFnZU51bSk7XG4gIH1cblxuXG59XG4iXX0=
