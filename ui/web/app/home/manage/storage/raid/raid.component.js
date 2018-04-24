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
var RaidComponent = (function () {
    function RaidComponent(activeModal, raidListService, modalService, deleteRaidService, itemRaidService, promptEmitService, translate) {
        var _this = this;
        this.activeModal = activeModal;
        this.raidListService = raidListService;
        this.modalService = modalService;
        this.deleteRaidService = deleteRaidService;
        this.itemRaidService = itemRaidService;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.tHeadRaidListNames = [
            '',
            'RAID名称',
            'RAID级别',
            '容量',
            '状态',
            '操作'
        ];
        this.raidListAll = [];
        setInterval(function () { _this.refresh(); }, 600000);
    }
    RaidComponent.prototype.ngOnInit = function () {
        this.getRaidListAll();
    };
    RaidComponent.prototype.refresh = function () {
        if (this.PendingServerRaidListAllRefresh == 1) {
            this.refreshFlag = true;
            this.getRaidListAll();
        }
    };
    RaidComponent.prototype.getRaidListItem = function (item, id) {
        var _this = this;
        this.itemRaidService.infoItemRaid(id)
            .then(function (itemRaid) {
            item.raid_name = itemRaid.raid_name;
            item.raid_level = itemRaid.raid_level;
            item.raid_size = itemRaid.raid_size;
            item.raid_state = itemRaid.raid_state;
            item.physdrvs = itemRaid.physdrvs;
            item.strpsz = itemRaid.strpsz;
            item.recon_completed = itemRaid.recon_completed;
            var me = _this;
            if (item.raid_state == 1) {
                me.rebuildRaidFlag = 1;
            }
            else {
                me.rebuildRaidFlag = 0;
            }
        }, function (error) {
            _this.error = error;
        });
    };
    RaidComponent.prototype.getRaidListAll = function () {
        var _this = this;
        if (this.refreshFlag) {
            this.PendingServerRaidListAll = 1;
            this.PendingServerRaidListAllRefresh = 0;
        }
        else {
            this.PendingServerRaidListAll = 0;
            this.PendingServerRaidListAllRefresh = 1;
            this.PendingServerRaidListAllError = '正在获取RAID信息';
            this.PendingServerRaidListAllErrorFlag = 0;
        }
        this.raidListService.getRaidList()
            .then(function (raidListAll) {
            if (raidListAll !== undefined) {
                if (raidListAll.code == 3759079425) {
                    _this.PendingServerRaidListAllError = '未发现RAID信息';
                    _this.PendingServerRaidListAllErrorFlag = 1;
                    _this.PendingServerRaidListAll = 1;
                    _this.PendingServerRaidListAllRefresh = 1;
                }
                else if (raidListAll.code == 3759079434) {
                    _this.PendingServerRaidListAllError = 'RAID正在重建中...';
                    _this.PendingServerRaidListAllErrorFlag = 1;
                    _this.PendingServerRaidListAll = 1;
                    _this.PendingServerRaidListAllRefresh = 1;
                }
                else {
                    var me_1 = _this;
                    raidListAll.map(function (obj) {
                        obj.licenceDetail = 'hide';
                        obj.faCaretType = 'fa-caret-right';
                        if (obj.raid_state == 1) {
                            me_1.rebuildRaidFlag = 1;
                        }
                        else {
                            me_1.rebuildRaidFlag = 0;
                        }
                    });
                    _this.PendingServerRaidListAllError = '';
                    _this.PendingServerRaidListAllErrorFlag = 0;
                    _this.raidListAll = raidListAll;
                    if (!raidListAll.length) {
                        _this.PendingServerRaidListAllError = '暂无RAID信息';
                        _this.PendingServerRaidListAllErrorFlag = 0;
                    }
                    _this.PendingServerRaidListAll = 1;
                    _this.PendingServerRaidListAllRefresh = 1;
                }
            }
        }, function (error) {
            _this.error = error;
        });
    };
    RaidComponent.prototype.addRaid = function () {
        var _this = this;
        var modalAddRaid = this.modalService.open(index_1.ModalContentNewRaid);
        modalAddRaid.componentInstance.title = '创建RAID';
        modalAddRaid.result.then(function (result) {
            if (result.status == 'success') {
                _this.itemRaidService.infoItemRaid(result.id)
                    .then(function (itemRaid) {
                    itemRaid.licenceDetail = 'hide';
                    itemRaid.faCaretType = 'fa-caret-right';
                    _this.raidListAll.push(itemRaid);
                    _this.PendingServerRaidListAllError = '';
                    _this.PendingServerRaidListAllErrorFlag = 0;
                }, function (error) {
                    _this.error = error;
                });
            }
        }, function (reason) {
        });
    };
    RaidComponent.prototype.delRAID = function (item, i) {
        var _this = this;
        var modalDelRAID = this.modalService.open(index_1.ModalContent);
        modalDelRAID.componentInstance.title = '删除RAID';
        modalDelRAID.componentInstance.body = '删除RAID将同步删除该RAID组中磁盘的数据。您确定要执行此操作吗？';
        modalDelRAID.result.then(function (result) {
            if (result) {
                _this.deleteRaidService.deleteRaid(item.vir_drv_id)
                    .then(function (deleteRaidMe) {
                    if (deleteRaidMe !== undefined) {
                        var me = _this;
                        if (deleteRaidMe.delete == 1) {
                            me.raidListAll.splice(i, 1);
                            if (!_this.raidListAll.length) {
                                _this.PendingServerRaidListAllError = '暂无RAID信息';
                                _this.PendingServerRaidListAllErrorFlag = 0;
                            }
                        }
                        else if (deleteRaidMe.delete == 0) {
                            _this.PendingServerRaidListAllError = '';
                            _this.PendingServerRaidListAllErrorFlag = 0;
                            _this.promptEmitService.change.emit(_this.translate.instant('提示：删除RAID失败'));
                        }
                    }
                }, function (error) {
                    _this.error = error;
                });
            }
        }, function (reason) {
            return;
        });
    };
    RaidComponent.prototype.configRAID = function (item) {
        var _this = this;
        var modalConfigRaid = this.modalService.open(index_1.ModalContentConfigRaid);
        modalConfigRaid.componentInstance.title = '配置RAID';
        modalConfigRaid.componentInstance.body = item;
        modalConfigRaid.result.then(function (result) {
            if (result == 'success') {
                var me = _this;
                me.getRaidListItem(item, item.vir_drv_id);
            }
        }, function (reason) {
        });
    };
    RaidComponent.prototype.rebuildRaid = function (item) {
        var _this = this;
        var modalRebuildRaid = this.modalService.open(index_1.ModalContentRebuildRaid);
        modalRebuildRaid.componentInstance.title = '重建RAID';
        modalRebuildRaid.componentInstance.body = item;
        modalRebuildRaid.result.then(function (result) {
            if (result == 'success') {
                var me = _this;
                me.getRaidListItem(item, item.vir_drv_id);
            }
        }, function (reason) {
        });
    };
    RaidComponent.prototype.toggleLicenceDetail = function (item) {
        if (item.faCaretType == 'fa-caret-down' || item.faCaretType == undefined) {
            item.faCaretType = 'fa-caret-right';
        }
        else {
            item.faCaretType = 'fa-caret-down';
        }
        if (item.licenceDetail == 'show' || item.licenceDetail == undefined) {
            item.licenceDetail = 'hide';
        }
        else {
            item.licenceDetail = 'show';
        }
    };
    RaidComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-raid',
            templateUrl: 'raid.component.html',
            styleUrls: ['raid.component.css'],
            providers: [ng_bootstrap_2.NgbAlertConfig, index_1.ModalContent, index_1.ModalContentNewRaid, index_1.ModalContentConfigRaid, index_1.ModalContentRebuildRaid,
                ng_bootstrap_1.NgbActiveModal, index_1.PaginationAdvanced]
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_2.RaidListService, ng_bootstrap_1.NgbModal, index_2.DeleteRaidService, index_2.ItemRaidService, index_2.PromptEmitService, ng2_translate_1.TranslateService])
    ], RaidComponent);
    return RaidComponent;
}());
exports.RaidComponent = RaidComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL3JhaWQvcmFpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyRCxlQUFlLENBQUMsQ0FBQTtBQUMzRSw2QkFBeUMsNEJBQTRCLENBQUMsQ0FBQTtBQUN0RSxzQkFBbUgsMEJBQTBCLENBQUMsQ0FBQTtBQUM5SSxzQkFBbUYsMEJBQTBCLENBQUMsQ0FBQTtBQUM5Ryw2QkFBK0IsNEJBQTRCLENBQUMsQ0FBQTtBQUM1RCw4QkFBK0IsZUFBZSxDQUFDLENBQUE7QUFXL0M7SUFtQkUsdUJBQW1CLFdBQTJCLEVBQzNCLGVBQWdDLEVBQVEsWUFBc0IsRUFDOUQsaUJBQW1DLEVBQVEsZUFBK0IsRUFDMUUsaUJBQW1DLEVBQVMsU0FBMkI7UUF0QjVGLGlCQStPQztRQTVOb0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFRLGlCQUFZLEdBQVosWUFBWSxDQUFVO1FBQzlELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDMUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBckIxRix1QkFBa0IsR0FBRztZQUNuQixFQUFFO1lBQ0YsUUFBUTtZQUNSLFFBQVE7WUFDUixJQUFJO1lBQ0osSUFBSTtZQUNKLElBQUk7U0FDTCxDQUFDO1FBR0YsZ0JBQVcsR0FBTyxFQUFFLENBQUM7UUFjbkIsV0FBVyxDQUFDLGNBQU0sS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFLRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFJRCwrQkFBTyxHQUFQO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLCtC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TCxDQUFDO0lBS0QsMkNBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFDdEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxlQUFlLElBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUE7UUFDckMsQ0FBQztRQUFBLElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUE7UUFDcEMsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksTUFBTSxJQUFFLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUNoRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQTtRQUM3QixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQTtRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQXRQSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNqQyxTQUFTLEVBQUUsQ0FBQyw2QkFBYyxFQUFDLG9CQUFZLEVBQUMsMkJBQW1CLEVBQUMsOEJBQXNCLEVBQUMsK0JBQXVCO2dCQUN4Ryw2QkFBYyxFQUFDLDBCQUFrQixDQUFDO1NBQ3JDLENBQUM7O3FCQUFBO0lBaVBGLG9CQUFDO0FBQUQsQ0EvT0EsQUErT0MsSUFBQTtBQS9PWSxxQkFBYSxnQkErT3pCLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvbWFuYWdlL3N0b3JhZ2UvcmFpZC9yYWlkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgLEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiTW9kYWwsIE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50LE1vZGFsQ29udGVudE5ld1JhaWQsTW9kYWxDb250ZW50Q29uZmlnUmFpZCxNb2RhbENvbnRlbnRSZWJ1aWxkUmFpZCxQYWdpbmF0aW9uQWR2YW5jZWQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW5kZXgnO1xuaW1wb3J0IHsgUmFpZExpc3RTZXJ2aWNlLERlbGV0ZVJhaWRTZXJ2aWNlLEl0ZW1SYWlkU2VydmljZSxQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7IE5nYkFsZXJ0Q29uZmlnIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItcmFpZCcsXG4gIHRlbXBsYXRlVXJsOiAncmFpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyYWlkLmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbTmdiQWxlcnRDb25maWcsTW9kYWxDb250ZW50LE1vZGFsQ29udGVudE5ld1JhaWQsTW9kYWxDb250ZW50Q29uZmlnUmFpZCxNb2RhbENvbnRlbnRSZWJ1aWxkUmFpZCxcbiAgICBOZ2JBY3RpdmVNb2RhbCxQYWdpbmF0aW9uQWR2YW5jZWRdXG59KVxuXG5leHBvcnQgY2xhc3MgUmFpZENvbXBvbmVudCB7XG4gIHRIZWFkUmFpZExpc3ROYW1lcyA9IFtcbiAgICAnJyxcbiAgICAnUkFJROWQjeensCcsXG4gICAgJ1JBSUTnuqfliKsnLFxuICAgICflrrnph48nLFxuICAgICfnirbmgIEnLFxuICAgICfmk43kvZwnXG4gIF07XG4gIGVycm9yOmFueTtcbiAgcmVidWlsZFJhaWRGbGFnOmFueTtcbiAgcmFpZExpc3RBbGw6YW55W109W107XG4gIHByb21wdDphbnk7XG4gIHJlZnJlc2hGbGFnOmFueTtcbiAgUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsOmFueTtcbiAgUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsUmVmcmVzaDphbnk7XG4gIFBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yOmFueTtcbiAgUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsRXJyb3JGbGFnOmFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsLFxuICAgICAgICAgICAgICBwdWJsaWMgcmFpZExpc3RTZXJ2aWNlOiBSYWlkTGlzdFNlcnZpY2UscHVibGljIG1vZGFsU2VydmljZTogTmdiTW9kYWwsXG4gICAgICAgICAgICAgIHB1YmxpYyBkZWxldGVSYWlkU2VydmljZTpEZWxldGVSYWlkU2VydmljZSxwdWJsaWMgaXRlbVJhaWRTZXJ2aWNlOkl0ZW1SYWlkU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHByb21wdEVtaXRTZXJ2aWNlOlByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG5cbiAgKSB7XG4gICAgc2V0SW50ZXJ2YWwoKCk9PnsgdGhpcy5yZWZyZXNoKCl9LDYwMDAwMClcbiAgfVxuICAvKipcbiAgICog5Yid5aeL55qE5pe25YCZ6I635Y+W5L+h5oGvXG4gICAqL1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0UmFpZExpc3RBbGwoKTtcbiAgfVxuICAvKipcbiAgICog54K55Ye75Yi35paw5oyJ6ZKuXG4gICAqL1xuICByZWZyZXNoKCk6YW55e1xuICAgIGlmKHRoaXMuUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsUmVmcmVzaD09MSl7XG4gICAgICB0aGlzLnJlZnJlc2hGbGFnID0gdHJ1ZTtcbiAgICAgIHRoaXMuZ2V0UmFpZExpc3RBbGwoKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluWNleadoeWIl+ihqOS/oeaBr1xuICAgKi9cbiAgZ2V0UmFpZExpc3RJdGVtKGl0ZW0saWQpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1SYWlkU2VydmljZS5pbmZvSXRlbVJhaWQoaWQpXG4gICAgICAudGhlbihcbiAgICAgICAgaXRlbVJhaWQgPT4ge1xuICAgICAgICAgIGl0ZW0ucmFpZF9uYW1lID0gaXRlbVJhaWQucmFpZF9uYW1lO1xuICAgICAgICAgIGl0ZW0ucmFpZF9sZXZlbCA9IGl0ZW1SYWlkLnJhaWRfbGV2ZWw7XG4gICAgICAgICAgaXRlbS5yYWlkX3NpemUgPSBpdGVtUmFpZC5yYWlkX3NpemU7XG4gICAgICAgICAgaXRlbS5yYWlkX3N0YXRlID0gaXRlbVJhaWQucmFpZF9zdGF0ZTtcbiAgICAgICAgICBpdGVtLnBoeXNkcnZzID0gaXRlbVJhaWQucGh5c2RydnM7XG4gICAgICAgICAgaXRlbS5zdHJwc3ogPSBpdGVtUmFpZC5zdHJwc3o7XG4gICAgICAgICAgaXRlbS5yZWNvbl9jb21wbGV0ZWQgPSBpdGVtUmFpZC5yZWNvbl9jb21wbGV0ZWQ7XG4gICAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgICBpZihpdGVtLnJhaWRfc3RhdGUgPT0gMSl7XG4gICAgICAgICAgICBtZS5yZWJ1aWxkUmFpZEZsYWcgPSAxO1xuICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG1lLnJlYnVpbGRSYWlkRmxhZyA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApXG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluWIl+ihqOS/oeaBr1xuICAgKi9cbiAgZ2V0UmFpZExpc3RBbGwoKTogdm9pZCB7XG4gICAgaWYodGhpcy5yZWZyZXNoRmxhZyl7XG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbCA9IDE7XG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbFJlZnJlc2ggPSAwO1xuICAgIH1lbHNlIHtcbiAgICAgIHRoaXMuUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsID0gMDtcbiAgICAgIHRoaXMuUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsUmVmcmVzaCA9IDE7XG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yID0gJ+ato+WcqOiOt+WPllJBSUTkv6Hmga8nO1xuICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvckZsYWcgPSAwO1xuICAgIH1cbiAgICB0aGlzLnJhaWRMaXN0U2VydmljZS5nZXRSYWlkTGlzdCgpXG4gICAgICAudGhlbihcbiAgICAgICAgcmFpZExpc3RBbGwgPT4ge1xuICAgICAgICAgIGlmKHJhaWRMaXN0QWxsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgaWYocmFpZExpc3RBbGwuY29kZSA9PSAzNzU5MDc5NDI1KXtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvciA9ICfmnKrlj5HnjrBSQUlE5L+h5oGvJztcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvckZsYWcgPSAxO1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbCA9IDE7XG4gICAgICAgICAgICAgIHRoaXMuUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsUmVmcmVzaCA9IDE7XG4gICAgICAgICAgICB9ZWxzZSBpZihyYWlkTGlzdEFsbC5jb2RlID09IDM3NTkwNzk0MzQpe1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yID0gJ1JBSUTmraPlnKjph43lu7rkuK0uLi4nO1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yRmxhZyA9IDE7XG4gICAgICAgICAgICAgIHRoaXMuUGVuZGluZ1NlcnZlclJhaWRMaXN0QWxsID0gMTtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxSZWZyZXNoID0gMTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICAgICAgICByYWlkTGlzdEFsbC5tYXAoZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgICAgICAgICBvYmoubGljZW5jZURldGFpbCA9ICdoaWRlJztcbiAgICAgICAgICAgICAgICBvYmouZmFDYXJldFR5cGUgPSAnZmEtY2FyZXQtcmlnaHQnO1xuXG4gICAgICAgICAgICAgICAgaWYob2JqLnJhaWRfc3RhdGUgPT0gMSl7XG4gICAgICAgICAgICAgICAgICBtZS5yZWJ1aWxkUmFpZEZsYWcgPSAxO1xuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgIG1lLnJlYnVpbGRSYWlkRmxhZyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvciA9ICcnO1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yRmxhZyA9IDA7XG4gICAgICAgICAgICAgIHRoaXMucmFpZExpc3RBbGwgPSByYWlkTGlzdEFsbDtcbiAgICAgICAgICAgICAgaWYoIXJhaWRMaXN0QWxsLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvciA9ICfmmoLml6BSQUlE5L+h5oGvJztcbiAgICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yRmxhZyA9IDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGwgPSAxO1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbFJlZnJlc2ggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIm+W7ulJBSURcbiAgICovXG4gIGFkZFJhaWQoKSB7XG4gICAgbGV0IG1vZGFsQWRkUmFpZCA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oTW9kYWxDb250ZW50TmV3UmFpZCk7XG4gICAgbW9kYWxBZGRSYWlkLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+WIm+W7ulJBSUQnO1xuICAgIG1vZGFsQWRkUmFpZC5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZihyZXN1bHQuc3RhdHVzID09ICdzdWNjZXNzJyl7XG4gICAgICAgIHRoaXMuaXRlbVJhaWRTZXJ2aWNlLmluZm9JdGVtUmFpZChyZXN1bHQuaWQpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBpdGVtUmFpZCA9PiB7XG4gICAgICAgICAgICAgIGl0ZW1SYWlkLmxpY2VuY2VEZXRhaWwgPSAnaGlkZSc7XG4gICAgICAgICAgICAgIGl0ZW1SYWlkLmZhQ2FyZXRUeXBlID0gJ2ZhLWNhcmV0LXJpZ2h0JztcbiAgICAgICAgICAgICAgdGhpcy5yYWlkTGlzdEFsbC5wdXNoKGl0ZW1SYWlkKTtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvciA9ICcnO1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yRmxhZyA9IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgfVxuICAgIH0sIChyZWFzb24pID0+IHtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDliKDpmaRSQUlEXG4gICAqL1xuICBkZWxSQUlEKGl0ZW0saSkge1xuICAgIC8vMe+8jOW8ueahhuaPkOekulxuICAgIGxldCBtb2RhbERlbFJBSUQgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsQ29udGVudCk7XG4gICAgbW9kYWxEZWxSQUlELmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+WIoOmZpFJBSUQnO1xuICAgIG1vZGFsRGVsUkFJRC5jb21wb25lbnRJbnN0YW5jZS5ib2R5ID0gJ+WIoOmZpFJBSUTlsIblkIzmraXliKDpmaTor6VSQUlE57uE5Lit56OB55uY55qE5pWw5o2u44CC5oKo56Gu5a6a6KaB5omn6KGM5q2k5pON5L2c5ZCX77yfJztcbiAgICBtb2RhbERlbFJBSUQucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy/ngrnlh7vnoa7lrprmjInpkq7nmoTml7blgJnvvIzlj5HpgIHliKDpmaTor7fmsYJcbiAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgIHRoaXMuZGVsZXRlUmFpZFNlcnZpY2UuZGVsZXRlUmFpZChpdGVtLnZpcl9kcnZfaWQpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBkZWxldGVSYWlkTWUgPT4ge1xuICAgICAgICAgICAgICBpZihkZWxldGVSYWlkTWUgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihkZWxldGVSYWlkTWUuZGVsZXRlID09IDEpe1xuICAgICAgICAgICAgICAgICAgbWUucmFpZExpc3RBbGwuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgaWYoIXRoaXMucmFpZExpc3RBbGwubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvciA9ICfmmoLml6BSQUlE5L+h5oGvJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUmFpZExpc3RBbGxFcnJvckZsYWcgPSAwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRlbGV0ZVJhaWRNZS5kZWxldGUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJSYWlkTGlzdEFsbEVycm9yRmxhZyA9IDA7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8muWIoOmZpFJBSUTlpLHotKUnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAocmVhc29uKSA9PiB7XG4gICAgICByZXR1cm47XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOmFjee9rlJBSURcbiAgICovXG4gIGNvbmZpZ1JBSUQoaXRlbSkge1xuICAgIGxldCBtb2RhbENvbmZpZ1JhaWQgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsQ29udGVudENvbmZpZ1JhaWQpO1xuICAgIG1vZGFsQ29uZmlnUmFpZC5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9ICfphY3nva5SQUlEJztcbiAgICBtb2RhbENvbmZpZ1JhaWQuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9IGl0ZW07XG4gICAgbW9kYWxDb25maWdSYWlkLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIC8v54K55Ye75re75Yqg5oyJ6ZKu77yM6YeN5paw6I635Y+W5YiX6KGo5L+h5oGvXG4gICAgICBpZihyZXN1bHQgPT0nc3VjY2Vzcycpe1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICBtZS5nZXRSYWlkTGlzdEl0ZW0oaXRlbSxpdGVtLnZpcl9kcnZfaWQpXG4gICAgICB9XG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDph43lu7pSQUlEXG4gICAqL1xuICByZWJ1aWxkUmFpZChpdGVtKSB7XG4gICAgbGV0IG1vZGFsUmVidWlsZFJhaWQgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsQ29udGVudFJlYnVpbGRSYWlkKTtcbiAgICBtb2RhbFJlYnVpbGRSYWlkLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+mHjeW7ulJBSUQnO1xuICAgIG1vZGFsUmVidWlsZFJhaWQuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9IGl0ZW07XG4gICAgbW9kYWxSZWJ1aWxkUmFpZC5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAvL+eCueWHu+a3u+WKoOaMiemSru+8jOmHjeaWsOiOt+WPluWIl+ihqOS/oeaBr1xuICAgICAgaWYocmVzdWx0PT0nc3VjY2Vzcycpe1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICBtZS5nZXRSYWlkTGlzdEl0ZW0oaXRlbSxpdGVtLnZpcl9kcnZfaWQpO1xuICAgICAgfVxuICAgIH0sIChyZWFzb24pID0+IHtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDngrnlh7vlh7rnjrDor6bmg4Xkv6Hmga9cbiAgICovXG4gIHRvZ2dsZUxpY2VuY2VEZXRhaWwoaXRlbSl7XG4gICAgaWYoaXRlbS5mYUNhcmV0VHlwZSA9PSAnZmEtY2FyZXQtZG93bid8fGl0ZW0uZmFDYXJldFR5cGUgPT0gdW5kZWZpbmVkKXtcbiAgICAgIGl0ZW0uZmFDYXJldFR5cGUgPSAnZmEtY2FyZXQtcmlnaHQnXG4gICAgfWVsc2Uge1xuICAgICAgaXRlbS5mYUNhcmV0VHlwZSA9ICdmYS1jYXJldC1kb3duJ1xuICAgIH1cbiAgICBpZihpdGVtLmxpY2VuY2VEZXRhaWwgPT0gJ3Nob3cnfHxpdGVtLmxpY2VuY2VEZXRhaWwgPT0gdW5kZWZpbmVkKXtcbiAgICAgIGl0ZW0ubGljZW5jZURldGFpbCA9ICdoaWRlJ1xuICAgIH1lbHNle1xuICAgICAgaXRlbS5saWNlbmNlRGV0YWlsID0gJ3Nob3cnXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==
