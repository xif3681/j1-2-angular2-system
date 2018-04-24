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
var RollComponent = (function () {
    function RollComponent(activeModal, rollListService, modalService, deleteRollService, itemRollService, promptEmitService, translate) {
        var _this = this;
        this.activeModal = activeModal;
        this.rollListService = rollListService;
        this.modalService = modalService;
        this.deleteRollService = deleteRollService;
        this.itemRollService = itemRollService;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.tHeadLicenceListNames = [
            '卷名称',
            '使用率',
            '容量',
            '可用空间',
            '所属设备',
            '卷类型',
            '状态',
            '操作'
        ];
        this.rollListAll = [];
        setInterval(function () { _this.refresh(); }, 300000);
    }
    RollComponent.prototype.ngOnInit = function () {
        this.getRollListAll();
    };
    RollComponent.prototype.refresh = function () {
        if (this.PendingServerRollListAllRefresh == 1) {
            this.refreshFlag = true;
            this.getRollListAll();
        }
    };
    RollComponent.prototype.getRollListItem = function (item, lv_name_config) {
        var me = this;
        this.itemRollService.infoItemRoll(lv_name_config)
            .then(function (itemRoll) {
            if (itemRoll !== undefined) {
                item.lv_name = itemRoll.lv_name;
                item.lv_avalible_capacity = itemRoll.lv_avalible_capacity;
                item.lv_capacity = itemRoll.lv_capacity;
                item.raid_name = itemRoll.raid_name;
                item.lv_type = itemRoll.lv_type;
                item.lv_status = itemRoll.lv_status;
                item.lv_used_percent = itemRoll.lv_used_percent;
                item.has_raid_recon = itemRoll.has_raid_recon;
            }
        }, function (error) {
            me.error = error;
        });
    };
    RollComponent.prototype.getRollListAll = function () {
        var _this = this;
        if (this.refreshFlag) {
            this.PendingServerRollListAll = 1;
            this.PendingServerRollListAllRefresh = 0;
        }
        else {
            this.PendingServerRollListAll = 0;
            this.PendingServerRollListAllRefresh = 1;
        }
        this.rollListService.getRollList()
            .then(function (rollListAll) {
            if (rollListAll !== undefined) {
                _this.rollListAll = rollListAll;
                _this.PendingServerRollListAll = 1;
                _this.PendingServerRollListAllRefresh = 1;
                if (rollListAll.length && rollListAll[0].has_raid_recon == 1) {
                    _this.unAddRoll = 1;
                }
                else {
                    _this.unAddRoll = 0;
                }
            }
        }, function (error) {
            _this.error = error;
        });
    };
    RollComponent.prototype.addRoll = function () {
        var _this = this;
        var modalRef1 = this.modalService.open(index_1.ModalContentNewRoll);
        modalRef1.componentInstance.title = '创建卷';
        modalRef1.result.then(function (result) {
            if (result.status == 'success') {
                var me_1 = _this;
                _this.itemRollService.infoItemRoll(result.name)
                    .then(function (itemRoll) {
                    me_1.rollListAll.push(itemRoll);
                }, function (error) {
                    me_1.error = error;
                });
            }
        }, function (reason) {
        });
    };
    RollComponent.prototype.configRoll = function (item) {
        var _this = this;
        var modalRef3 = this.modalService.open(index_1.ModalContentConfigRoll);
        modalRef3.componentInstance.title = '配置卷';
        modalRef3.componentInstance.body = item;
        modalRef3.result.then(function (result) {
            if (result) {
                if (result.status == 'success') {
                    var me = _this;
                    me.getRollListItem(item, result.lv_name_config);
                }
            }
        }, function (reason) {
        });
    };
    RollComponent.prototype.delRoll = function (item, i) {
        var _this = this;
        var modalDelRoll = this.modalService.open(index_1.ModalContent);
        modalDelRoll.componentInstance.title = '删除卷';
        modalDelRoll.componentInstance.body = '删除卷将导数数据无法恢复。您确定要执行此操作吗？';
        modalDelRoll.result.then(function (result) {
            if (result) {
                _this.deleteRollService.deleteRoll(item.lv_name)
                    .then(function (deleteRaidMe) {
                    var me = _this;
                    if (deleteRaidMe.lv_deleted == 1) {
                        me.rollListAll.splice(i, 1);
                    }
                    else if (deleteRaidMe.lv_deleted == 0) {
                        _this.promptEmitService.change.emit(_this.translate.instant('提示：删除卷失败'));
                    }
                }, function (error) {
                    _this.error = error;
                });
            }
        }, function (reason) {
            return;
        });
    };
    RollComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-roll',
            templateUrl: 'roll.component.html',
            styleUrls: ['roll.component.css'],
            directives: [index_1.QRCodeComponent],
            providers: [ng_bootstrap_2.NgbAlertConfig, index_1.ModalContent, index_1.ModalContentNewRoll, index_1.ModalContentConfigRoll,
                ng_bootstrap_1.NgbActiveModal, index_1.PaginationAdvanced]
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_2.RollListService, ng_bootstrap_1.NgbModal, index_2.DeleteRollService, index_2.ItemRollService, index_2.PromptEmitService, ng2_translate_1.TranslateService])
    ], RollComponent);
    return RollComponent;
}());
exports.RollComponent = RollComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL3JvbGwvcm9sbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyRCxlQUFlLENBQUMsQ0FBQTtBQUMzRSw2QkFBeUMsNEJBQTRCLENBQUMsQ0FBQTtBQUN0RSxzQkFBMkcsMEJBQTBCLENBQUMsQ0FBQTtBQUN0SSxzQkFBbUYsMEJBQTBCLENBQUMsQ0FBQTtBQUM5Ryw2QkFBK0IsNEJBQTRCLENBQUMsQ0FBQTtBQUM1RCw4QkFBK0IsZUFBZSxDQUFDLENBQUE7QUFZL0M7SUFtQkUsdUJBQW1CLFdBQTJCLEVBQzNCLGVBQWdDLEVBQVEsWUFBc0IsRUFDOUQsaUJBQW1DLEVBQVEsZUFBK0IsRUFDMUUsaUJBQW1DLEVBQVMsU0FBMkI7UUF0QjVGLGlCQTZLQztRQTFKb0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFRLGlCQUFZLEdBQVosWUFBWSxDQUFVO1FBQzlELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDMUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBckIxRiwwQkFBcUIsR0FBRztZQUN0QixLQUFLO1lBQ0wsS0FBSztZQUNMLElBQUk7WUFDSixNQUFNO1lBQ04sTUFBTTtZQUNOLEtBQUs7WUFDTCxJQUFJO1lBQ0osSUFBSTtTQUNMLENBQUM7UUFHRixnQkFBVyxHQUFPLEVBQUUsQ0FBQztRQVduQixXQUFXLENBQUMsY0FBTSxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQU1ELGdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsK0JBQStCLElBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFJRCx1Q0FBZSxHQUFmLFVBQWdCLElBQUksRUFBQyxjQUFjO1FBQ2pDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQzthQUM5QyxJQUFJLENBQ0gsVUFBQSxRQUFRO1lBQ04sRUFBRSxDQUFBLENBQUMsUUFBUSxLQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUNoRCxDQUFDO1FBQ0gsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLENBQUMsQ0FDRixDQUFBO0lBQ0wsQ0FBQztJQUtELHNDQUFjLEdBQWQ7UUFBQSxpQkEwQkM7UUF6QkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7WUFDbkIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsK0JBQStCLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQSxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLCtCQUErQixHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUU7YUFDL0IsSUFBSSxDQUNILFVBQUEsV0FBVztZQUNULEVBQUUsQ0FBQSxDQUFDLFdBQVcsS0FBRyxTQUFTLENBQUMsQ0FBQSxDQUFDO2dCQUMxQixLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLCtCQUErQixHQUFHLENBQUMsQ0FBQztnQkFDekMsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ3pELEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNKLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7SUFLRCwrQkFBTyxHQUFQO1FBQUEsaUJBb0JDO1FBbkJDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLDJCQUFtQixDQUFDLENBQUM7UUFDNUQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDMUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQzNCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFFN0IsSUFBSSxJQUFFLEdBQUcsS0FBSSxDQUFDO2dCQUNkLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQzNDLElBQUksQ0FDSCxVQUFBLFFBQVE7b0JBQ04sSUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsRUFDRCxVQUFBLEtBQUs7b0JBQ0gsSUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLENBQUMsQ0FDRixDQUFDO1lBRU4sQ0FBQztRQUNILENBQUMsRUFBRSxVQUFDLE1BQU07UUFDVixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFLRCxrQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUFmLGlCQWNDO1FBYkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsOEJBQXNCLENBQUMsQ0FBQztRQUMvRCxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMxQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN4QyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFFM0IsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDVCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFFLFNBQVMsQ0FBQyxDQUFBLENBQUM7b0JBQzNCLElBQUksRUFBRSxHQUFHLEtBQUksQ0FBQztvQkFDZCxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pELENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxFQUFFLFVBQUMsTUFBTTtRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUlELCtCQUFPLEdBQVAsVUFBUSxJQUFJLEVBQUMsQ0FBQztRQUFkLGlCQTBCQztRQXhCQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBWSxDQUFDLENBQUM7UUFDeEQsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDN0MsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRywwQkFBMEIsQ0FBQztRQUNqRSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFFOUIsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQzVDLElBQUksQ0FDSCxVQUFBLFlBQVk7b0JBQ1YsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDO29CQUNkLEVBQUUsQ0FBQSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFDL0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5QixDQUFDO29CQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQ3JDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLENBQUM7Z0JBQ0gsQ0FBQyxFQUNELFVBQUEsS0FBSztvQkFDSCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQyxDQUNGLENBQUM7WUFDTixDQUFDO1FBQ0gsQ0FBQyxFQUFFLFVBQUMsTUFBTTtZQUNSLE1BQU0sQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5MSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsQ0FBQyx1QkFBZSxDQUFDO1lBQzdCLFNBQVMsRUFBRSxDQUFDLDZCQUFjLEVBQUMsb0JBQVksRUFBQywyQkFBbUIsRUFBQyw4QkFBc0I7Z0JBQ2hGLDZCQUFjLEVBQUMsMEJBQWtCLENBQUM7U0FDckMsQ0FBQzs7cUJBQUE7SUErS0Ysb0JBQUM7QUFBRCxDQTdLQSxBQTZLQyxJQUFBO0FBN0tZLHFCQUFhLGdCQTZLekIsQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9tYW5hZ2Uvc3RvcmFnZS9yb2xsL3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JNb2RhbCwgTmdiQWN0aXZlTW9kYWwgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnQsTW9kYWxDb250ZW50TmV3Um9sbCxQYWdpbmF0aW9uQWR2YW5jZWQsUVJDb2RlQ29tcG9uZW50LE1vZGFsQ29udGVudENvbmZpZ1JvbGwgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW5kZXgnO1xuaW1wb3J0IHsgUm9sbExpc3RTZXJ2aWNlLERlbGV0ZVJvbGxTZXJ2aWNlLEl0ZW1Sb2xsU2VydmljZSxQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7IE5nYkFsZXJ0Q29uZmlnIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItcm9sbCcsXG4gIHRlbXBsYXRlVXJsOiAncm9sbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyb2xsLmNvbXBvbmVudC5jc3MnXSxcbiAgZGlyZWN0aXZlczogW1FSQ29kZUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW05nYkFsZXJ0Q29uZmlnLE1vZGFsQ29udGVudCxNb2RhbENvbnRlbnROZXdSb2xsLE1vZGFsQ29udGVudENvbmZpZ1JvbGwsXG4gICAgTmdiQWN0aXZlTW9kYWwsUGFnaW5hdGlvbkFkdmFuY2VkXVxufSlcblxuZXhwb3J0IGNsYXNzIFJvbGxDb21wb25lbnQge1xuICB0SGVhZExpY2VuY2VMaXN0TmFtZXMgPSBbXG4gICAgJ+WNt+WQjeensCcsXG4gICAgJ+S9v+eUqOeOhycsXG4gICAgJ+WuuemHjycsXG4gICAgJ+WPr+eUqOepuumXtCcsXG4gICAgJ+aJgOWxnuiuvuWkhycsXG4gICAgJ+WNt+exu+WeiycsXG4gICAgJ+eKtuaAgScsXG4gICAgJ+aTjeS9nCdcbiAgXTtcbiAgZXJyb3I6YW55O1xuICB1bkFkZFJvbGw6YW55O1xuICByb2xsTGlzdEFsbDphbnlbXT1bXTtcbiAgcHJvbXB0OmFueTtcbiAgcmVmcmVzaEZsYWc6YW55O1xuICBQZW5kaW5nU2VydmVyUm9sbExpc3RBbGw6YW55O1xuICBQZW5kaW5nU2VydmVyUm9sbExpc3RBbGxSZWZyZXNoOmFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsLFxuICAgICAgICAgICAgICBwdWJsaWMgcm9sbExpc3RTZXJ2aWNlOiBSb2xsTGlzdFNlcnZpY2UscHVibGljIG1vZGFsU2VydmljZTogTmdiTW9kYWwsXG4gICAgICAgICAgICAgIHB1YmxpYyBkZWxldGVSb2xsU2VydmljZTpEZWxldGVSb2xsU2VydmljZSxwdWJsaWMgaXRlbVJvbGxTZXJ2aWNlOkl0ZW1Sb2xsU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHByb21wdEVtaXRTZXJ2aWNlOlByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4pIHtcbiAgICBzZXRJbnRlcnZhbCgoKT0+eyB0aGlzLnJlZnJlc2goKX0sMzAwMDAwKVxuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+eahOaXtuWAmeiOt+WPluS/oeaBr1xuICAgKi9cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFJvbGxMaXN0QWxsKCk7XG4gIH1cblxuICByZWZyZXNoKCk6YW55e1xuICAgIGlmKHRoaXMuUGVuZGluZ1NlcnZlclJvbGxMaXN0QWxsUmVmcmVzaD09MSl7XG4gICAgICB0aGlzLnJlZnJlc2hGbGFnID0gdHJ1ZTtcbiAgICAgIHRoaXMuZ2V0Um9sbExpc3RBbGwoKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluWNleadoeWIl+ihqOS/oeaBr1xuICAgKi9cbiAgZ2V0Um9sbExpc3RJdGVtKGl0ZW0sbHZfbmFtZV9jb25maWcpOiB2b2lkIHtcbiAgICBsZXQgbWUgPSB0aGlzO1xuICAgIHRoaXMuaXRlbVJvbGxTZXJ2aWNlLmluZm9JdGVtUm9sbChsdl9uYW1lX2NvbmZpZylcbiAgICAgIC50aGVuKFxuICAgICAgICBpdGVtUm9sbCA9PiB7XG4gICAgICAgICAgaWYoaXRlbVJvbGwhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGl0ZW0ubHZfbmFtZSA9IGl0ZW1Sb2xsLmx2X25hbWU7XG4gICAgICAgICAgICBpdGVtLmx2X2F2YWxpYmxlX2NhcGFjaXR5ID0gaXRlbVJvbGwubHZfYXZhbGlibGVfY2FwYWNpdHk7XG4gICAgICAgICAgICBpdGVtLmx2X2NhcGFjaXR5ID0gaXRlbVJvbGwubHZfY2FwYWNpdHk7XG4gICAgICAgICAgICBpdGVtLnJhaWRfbmFtZSA9IGl0ZW1Sb2xsLnJhaWRfbmFtZTtcbiAgICAgICAgICAgIGl0ZW0ubHZfdHlwZSA9IGl0ZW1Sb2xsLmx2X3R5cGU7XG4gICAgICAgICAgICBpdGVtLmx2X3N0YXR1cyA9IGl0ZW1Sb2xsLmx2X3N0YXR1cztcbiAgICAgICAgICAgIGl0ZW0ubHZfdXNlZF9wZXJjZW50ID0gaXRlbVJvbGwubHZfdXNlZF9wZXJjZW50O1xuICAgICAgICAgICAgaXRlbS5oYXNfcmFpZF9yZWNvbiA9IGl0ZW1Sb2xsLmhhc19yYWlkX3JlY29uO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIG1lLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bliJfooajkv6Hmga9cbiAgICovXG4gIGdldFJvbGxMaXN0QWxsKCk6IHZvaWQge1xuICAgIGlmKHRoaXMucmVmcmVzaEZsYWcpe1xuICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUm9sbExpc3RBbGwgPSAxO1xuICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUm9sbExpc3RBbGxSZWZyZXNoID0gMDtcbiAgICB9ZWxzZSB7XG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSb2xsTGlzdEFsbCA9IDA7XG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSb2xsTGlzdEFsbFJlZnJlc2ggPSAxO1xuICAgIH1cbiAgICB0aGlzLnJvbGxMaXN0U2VydmljZS5nZXRSb2xsTGlzdCgpXG4gICAgICAudGhlbihcbiAgICAgICAgcm9sbExpc3RBbGwgPT4ge1xuICAgICAgICAgIGlmKHJvbGxMaXN0QWxsIT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMucm9sbExpc3RBbGwgPSByb2xsTGlzdEFsbDtcbiAgICAgICAgICAgIHRoaXMuUGVuZGluZ1NlcnZlclJvbGxMaXN0QWxsID0gMTtcbiAgICAgICAgICAgIHRoaXMuUGVuZGluZ1NlcnZlclJvbGxMaXN0QWxsUmVmcmVzaCA9IDE7XG4gICAgICAgICAgICBpZihyb2xsTGlzdEFsbC5sZW5ndGgmJnJvbGxMaXN0QWxsWzBdLmhhc19yYWlkX3JlY29uID09IDEpe1xuICAgICAgICAgICAgICB0aGlzLnVuQWRkUm9sbCA9IDE7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgdGhpcy51bkFkZFJvbGwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOa3u+WKoFJvbGxcbiAgICovXG4gIGFkZFJvbGwoKSB7XG4gICAgbGV0IG1vZGFsUmVmMSA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oTW9kYWxDb250ZW50TmV3Um9sbCk7XG4gICAgbW9kYWxSZWYxLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+WIm+W7uuWNtyc7XG4gICAgbW9kYWxSZWYxLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGlmKHJlc3VsdC5zdGF0dXMgPT0gJ3N1Y2Nlc3MnKXtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICB0aGlzLml0ZW1Sb2xsU2VydmljZS5pbmZvSXRlbVJvbGwocmVzdWx0Lm5hbWUpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBpdGVtUm9sbCA9PiB7XG4gICAgICAgICAgICAgIG1lLnJvbGxMaXN0QWxsLnB1c2goaXRlbVJvbGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgbWUuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICB9XG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOmFjee9ruWNt1xuICAgKi9cbiAgY29uZmlnUm9sbChpdGVtKSB7XG4gICAgbGV0IG1vZGFsUmVmMyA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oTW9kYWxDb250ZW50Q29uZmlnUm9sbCk7XG4gICAgbW9kYWxSZWYzLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+mFjee9ruWNtyc7XG4gICAgbW9kYWxSZWYzLmNvbXBvbmVudEluc3RhbmNlLmJvZHkgPSBpdGVtO1xuICAgIG1vZGFsUmVmMy5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAvL+eCueWHu+a3u+WKoOaMiemSru+8jOmHjeaWsOiOt+WPluWIl+ihqOS/oeaBr1xuICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgaWYocmVzdWx0LnN0YXR1cz09J3N1Y2Nlc3MnKXtcbiAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICAgIG1lLmdldFJvbGxMaXN0SXRlbShpdGVtLHJlc3VsdC5sdl9uYW1lX2NvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAocmVhc29uKSA9PiB7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOWIoOmZpOWNt1xuICAgKi9cbiAgZGVsUm9sbChpdGVtLGkpIHtcbiAgICAvLzHvvIzlvLnmoYbmj5DnpLpcbiAgICBsZXQgbW9kYWxEZWxSb2xsID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbENvbnRlbnQpO1xuICAgIG1vZGFsRGVsUm9sbC5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9ICfliKDpmaTljbcnO1xuICAgIG1vZGFsRGVsUm9sbC5jb21wb25lbnRJbnN0YW5jZS5ib2R5ID0gJ+WIoOmZpOWNt+WwhuWvvOaVsOaVsOaNruaXoOazleaBouWkjeOAguaCqOehruWumuimgeaJp+ihjOatpOaTjeS9nOWQl++8nyc7XG4gICAgbW9kYWxEZWxSb2xsLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIC8v54K55Ye756Gu5a6a5oyJ6ZKu55qE5pe25YCZ77yM5Y+R6YCB5Yig6Zmk6K+35rGCXG4gICAgICBpZihyZXN1bHQpe1xuICAgICAgICB0aGlzLmRlbGV0ZVJvbGxTZXJ2aWNlLmRlbGV0ZVJvbGwoaXRlbS5sdl9uYW1lKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgZGVsZXRlUmFpZE1lID0+IHtcbiAgICAgICAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgICAgICAgaWYoZGVsZXRlUmFpZE1lLmx2X2RlbGV0ZWQgPT0gMSl7XG4gICAgICAgICAgICAgICAgbWUucm9sbExpc3RBbGwuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICB9ZWxzZSBpZihkZWxldGVSYWlkTWUubHZfZGVsZXRlZCA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8muWIoOmZpOWNt+Wksei0pScpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgICAgcmV0dXJuO1xuICAgIH0pO1xuICB9XG5cblxuXG59XG4iXX0=
