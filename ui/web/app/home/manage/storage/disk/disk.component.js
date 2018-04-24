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
var http_1 = require('@angular/http');
var monitoring_service_1 = require('../../../../monitoring.service');
var DiskComponent = (function () {
    function DiskComponent(activeModal, diskListService, modalService, serverPanelService, operateDiskService, itemDiskService, promptEmitService, http, monitoring) {
        var _this = this;
        this.activeModal = activeModal;
        this.diskListService = diskListService;
        this.modalService = modalService;
        this.serverPanelService = serverPanelService;
        this.operateDiskService = operateDiskService;
        this.itemDiskService = itemDiskService;
        this.promptEmitService = promptEmitService;
        this.http = http;
        this.monitoring = monitoring;
        this.tHeadLicenceListNames = [
            '槽位号',
            '序列号',
            '所属RAID',
            '容量',
            '型号',
            '温度',
            '状态',
            '操作'
        ];
        this.diskListAll = [];
        this.diskContent = '';
        this.serverPanel = [];
        setInterval(function () { _this.refresh(); }, 600000);
    }
    DiskComponent.prototype.ngOnInit = function () {
        this.getServerPanelAll();
    };
    DiskComponent.prototype.refresh = function () {
        if (this.PendingServerPanelAllInfoRefresh == 1 && this.PendingDiskAllInfoRefresh == 1) {
            this.refreshFlag = true;
            this.getServerPanelAll();
        }
    };
    DiskComponent.prototype.getItemNum = function (item) {
        this.selectNum = item.slot_number;
    };
    DiskComponent.prototype.getServerPanelAll = function () {
        var _this = this;
        if (this.refreshFlag) {
            this.PendingServerPanelAllInfo = 1;
            this.PendingServerPanelAllInfoRefresh = 0;
            this.PendingDiskAllInfo = 1;
            this.PendingDiskAllInfoRefresh = 0;
        }
        else {
            this.PendingServerPanelAllInfo = 0;
            this.PendingServerPanelAllInfoRefresh = 1;
            this.PendingDiskAllInfo = 0;
            this.PendingDiskAllInfoRefresh = 1;
            this.diskContent = '正在获取磁盘列表信息';
            this.PendingServerError = '正在获取服务器面板信息';
        }
        this.serverPanelService.getServerPanel()
            .then(function (serverPanel) {
            if (serverPanel !== undefined) {
                if (serverPanel.code == 3758424065) {
                    _this.PendingServerError = '未发现服务器面板信息';
                    _this.PendingServerPanelAllInfo = 1;
                    _this.PendingServerPanelAllInfoRefresh = 1;
                    _this.getDiskListAll();
                }
                else if (serverPanel.code == 3759079434) {
                    _this.PendingServerError = 'RAID正在重建中...';
                    _this.PendingServerPanelAllInfo = 1;
                    _this.PendingServerPanelAllInfoRefresh = 1;
                    _this.getDiskListAll();
                }
                else {
                    _this.PendingServerError = '';
                    _this.serverPanel = serverPanel;
                    _this.PendingServerPanelAllInfo = 1;
                    _this.PendingServerPanelAllInfoRefresh = 1;
                    _this.getDiskListAll();
                }
            }
        }, function (error) {
            _this.error = error;
        });
    };
    DiskComponent.prototype.getDiskListAll = function () {
        var _this = this;
        this.diskListService.getDiskList()
            .then(function (diskListAll) {
            if (diskListAll !== undefined) {
                if (diskListAll.code == 3758424065) {
                    var me = _this;
                    me.diskContent = '未发现磁盘信息';
                    me.PendingDiskAllInfo = 1;
                    me.PendingDiskAllInfoRefresh = 1;
                }
                else if (diskListAll.code == 3759079434) {
                    var me = _this;
                    me.diskContent = 'RAID正在重建中...';
                    me.PendingDiskAllInfo = 1;
                    me.PendingDiskAllInfoRefresh = 1;
                }
                else {
                    var me = _this;
                    me.PendingDiskAllInfo = 1;
                    me.PendingDiskAllInfoRefresh = 1;
                    _this.diskContent = '';
                    me.diskListAll = diskListAll;
                    if (!diskListAll.length) {
                        me.diskContent = '暂无磁盘信息';
                    }
                }
            }
        }, function (error) {
            _this.error = error;
        });
    };
    DiskComponent.prototype.initDisk = function (item) {
        var _this = this;
        var modalInitDisk = this.modalService.open(index_1.ModalContent);
        modalInitDisk.componentInstance.title = '初始化';
        modalInitDisk.componentInstance.body = '初始化将丢失磁盘上的所有数据。您确定要执行此操作吗？';
        modalInitDisk.result.then(function (result) {
            if (result) {
                _this.PendingDiskStatus = 0;
                _this.operateDiskService.initHotSpare(item.slot_number)
                    .then(function (initDisk) {
                    if (initDisk.init_physdrv == 0) {
                        me.PendingDiskStatus = 1;
                        _this.promptEmitService.change.emit(_this.translate.instant('提示：初始化全局热备盘失败'));
                    }
                    else if (initDisk.init_physdrv == 1) {
                        var me_1 = _this;
                        me_1.itemDiskService.infoItemDisk(item.slot_number)
                            .then(function (itemDisk) {
                            item.slot_number = itemDisk.slot_number;
                            item.wwn = itemDisk.wwn;
                            item.init = itemDisk.init;
                            item.raid = itemDisk.raid;
                            item.capacity = itemDisk.capacity;
                            item.type = itemDisk.type;
                            item.temperature = itemDisk.temperature;
                            item.state = itemDisk.state;
                            me_1.PendingDiskStatus = 1;
                        }, function (error) {
                            me_1.error = error;
                            me_1.PendingDiskStatus = 1;
                        });
                    }
                });
            }
        }, function (reason) {
            return;
        });
    };
    DiskComponent.prototype.setDisk = function (item) {
        var _this = this;
        var modalSetDisk = this.modalService.open(index_1.ModalContent);
        modalSetDisk.componentInstance.title = '设置全局热备盘';
        modalSetDisk.componentInstance.body = '该磁盘将被设置为全局热备盘。您确认要执行此操作吗？';
        modalSetDisk.result.then(function (result) {
            if (result) {
                _this.PendingDiskStatus = 0;
                _this.operateDiskService.setHotSpare(item.slot_number)
                    .then(function (setDisk) {
                    if (setDisk.set_hotspare == 0) {
                        _this.PendingDiskStatus = 1;
                        _this.promptEmitService.change.emit(_this.translate.instant('提示：设置全局热备盘失败'));
                    }
                    else if (setDisk.set_hotspare == 1) {
                        var me_2 = _this;
                        _this.itemDiskService.infoItemDisk(item.slot_number)
                            .then(function (itemDisk) {
                            item.slot_number = itemDisk.slot_number;
                            item.wwn = itemDisk.wwn;
                            item.init = itemDisk.init;
                            item.raid = itemDisk.raid;
                            item.capacity = itemDisk.capacity;
                            item.type = itemDisk.type;
                            item.temperature = itemDisk.temperature;
                            item.state = itemDisk.state;
                            _this.PendingDiskStatus = 1;
                        }, function (error) {
                            me_2.error = error;
                            _this.PendingDiskStatus = 1;
                        });
                    }
                }, function (error) {
                    _this.error = error;
                });
            }
        }, function (reason) {
            return;
        });
    };
    DiskComponent.prototype.cancelDisk = function (item) {
        var _this = this;
        var modalCancelDisk = this.modalService.open(index_1.ModalContent);
        modalCancelDisk.componentInstance.title = '取消全局热备盘';
        modalCancelDisk.componentInstance.body = '取消热备盘将导致RAID无法快速重建。您确认要执行此操作吗？';
        modalCancelDisk.result.then(function (result) {
            if (result) {
                _this.PendingDiskStatus = 0;
                _this.operateDiskService.cancelHotSpare(item.slot_number)
                    .then(function (cancelDisk) {
                    if (cancelDisk.unset_hotspare == 0) {
                        _this.PendingDiskStatus = 1;
                        _this.promptEmitService.change.emit(_this.translate.instant('提示：取消全局热备盘失败'));
                    }
                    else if (cancelDisk.unset_hotspare == 1) {
                        var me_3 = _this;
                        _this.itemDiskService.infoItemDisk(item.slot_number)
                            .then(function (itemDisk) {
                            item.slot_number = itemDisk.slot_number;
                            item.wwn = itemDisk.wwn;
                            item.init = itemDisk.init;
                            item.raid = itemDisk.raid;
                            item.capacity = itemDisk.capacity;
                            item.type = itemDisk.type;
                            item.temperature = itemDisk.temperature;
                            item.state = itemDisk.state;
                            _this.PendingDiskStatus = 1;
                        }, function (error) {
                            me_3.error = error;
                            _this.PendingDiskStatus = 1;
                        });
                    }
                }, function (error) {
                    _this.error = error;
                });
            }
        }, function (reason) {
            return;
        });
    };
    DiskComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-disk',
            templateUrl: 'disk.component.html',
            styleUrls: ['disk.component.css'],
            providers: [ng_bootstrap_2.NgbAlertConfig, index_1.ModalContent, ng_bootstrap_1.NgbActiveModal]
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_2.DiskListService, ng_bootstrap_1.NgbModal, index_2.ServerPanelService, index_2.OperateDiskService, index_2.ItemDiskService, index_2.PromptEmitService, http_1.Http, monitoring_service_1.MonitoringService])
    ], DiskComponent);
    return DiskComponent;
}());
exports.DiskComponent = DiskComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL2Rpc2svZGlzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyw2QkFBeUMsNEJBQTRCLENBQUMsQ0FBQTtBQUN0RSxzQkFBNkIsMEJBQTBCLENBQUMsQ0FBQTtBQUN4RCxzQkFBdUcsMEJBQTBCLENBQUMsQ0FBQTtBQUNsSSw2QkFBK0IsNEJBQTRCLENBQUMsQ0FBQTtBQUM1RCxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsbUNBQWdDLGdDQUFnQyxDQUFDLENBQUE7QUFTakU7SUE2QkUsdUJBQW1CLFdBQTJCLEVBQzNCLGVBQWdDLEVBQVEsWUFBc0IsRUFDN0Qsa0JBQXNDLEVBQVMsa0JBQXFDLEVBQ3BGLGVBQWdDLEVBQVEsaUJBQW1DLEVBQzNFLElBQVUsRUFBUyxVQUE0QjtRQWpDckUsaUJBdVNDO1FBMVFvQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDM0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVEsaUJBQVksR0FBWixZQUFZLENBQVU7UUFDN0QsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFTLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDcEYsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVEsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMzRSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFoQ25FLDBCQUFxQixHQUFHO1lBQ3RCLEtBQUs7WUFDTCxLQUFLO1lBQ0wsUUFBUTtZQUNSLElBQUk7WUFDSixJQUFJO1lBQ0osSUFBSTtZQUNKLElBQUk7WUFDSixJQUFJO1NBQ0wsQ0FBQztRQUdGLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCLGdCQUFXLEdBQUMsRUFBRSxDQUFDO1FBRWYsZ0JBQVcsR0FBUyxFQUFFLENBQUM7UUFrQlgsV0FB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QUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQyxDQUNGLENBQUM7WUFDTixDQUFDO1FBQ0gsQ0FBQyxFQUFFLFVBQUMsTUFBTTtZQUNSLE1BQU0sQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTVTSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNqQyxTQUFTLEVBQUUsQ0FBQyw2QkFBYyxFQUFDLG9CQUFZLEVBQUMsNkJBQWMsQ0FBQztTQUN4RCxDQUFDOztxQkFBQTtJQXlTRixvQkFBQztBQUFELENBdlNBLEFBdVNDLElBQUE7QUF2U1kscUJBQWEsZ0JBdVN6QixDQUFBIiwiZmlsZSI6ImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL2Rpc2svZGlzay5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiTW9kYWwsIE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2luZGV4JztcbmltcG9ydCB7IERpc2tMaXN0U2VydmljZSxTZXJ2ZXJQYW5lbFNlcnZpY2UsT3BlcmF0ZURpc2tTZXJ2aWNlLEl0ZW1EaXNrU2VydmljZSxQcm9tcHRFbWl0U2VydmljZX0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7IE5nYkFsZXJ0Q29uZmlnIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7TW9uaXRvcmluZ1NlcnZpY2V9IGZyb20gJy4uLy4uLy4uLy4uL21vbml0b3Jpbmcuc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhci1kaXNrJyxcbiAgdGVtcGxhdGVVcmw6ICdkaXNrLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Rpc2suY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtOZ2JBbGVydENvbmZpZyxNb2RhbENvbnRlbnQsTmdiQWN0aXZlTW9kYWxdXG59KVxuXG5leHBvcnQgY2xhc3MgRGlza0NvbXBvbmVudCB7XG4gIHRIZWFkTGljZW5jZUxpc3ROYW1lcyA9IFtcbiAgICAn5qe95L2N5Y+3JyxcbiAgICAn5bqP5YiX5Y+3JyxcbiAgICAn5omA5bGeUkFJRCcsXG4gICAgJ+WuuemHjycsXG4gICAgJ+Wei+WPtycsXG4gICAgJ+a4qeW6picsXG4gICAgJ+eKtuaAgScsXG4gICAgJ+aTjeS9nCdcbiAgXTtcbiAgZXJyb3I6YW55O1xuICAvLyBkaXNrTGlzdEFsbDphbnlbXSA9IFtdO1xuICBkaXNrTGlzdEFsbCA9IFtdO1xuICBwcm9tcHQ6YW55O1xuICBkaXNrQ29udGVudD0nJztcbiAgc2VsZWN0TnVtOmFueTtcbiAgc2VydmVyUGFuZWw6YW55W10gPSBbXTtcbiAgYWN0aXZlOmFueTtcbiAgLyoqXG4gICAqIHBlbmRpbmcuLi7lj5jph4/nlKjmnaXmoIforrDlj5HpgIHor7fmsYLnirbmgIFcbiAgICovXG4gIFBlbmRpbmdEaXNrU3RhdHVzOmFueTtcbiAgUGVuZGluZ1NlcnZlclBhbmVsQWxsSW5mbzphbnk7XG4gIFBlbmRpbmdTZXJ2ZXJQYW5lbEFsbEluZm9SZWZyZXNoOmFueTtcbiAgUGVuZGluZ0Rpc2tBbGxJbmZvOmFueTtcbiAgUGVuZGluZ0Rpc2tBbGxJbmZvUmVmcmVzaDphbnk7XG4gIHJlZnJlc2hGbGFnOmFueTtcbiAgUGVuZGluZ1NlcnZlckVycm9yOmFueTtcbiAgY29uc3RydWN0b3IocHVibGljIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxcbiAgICAgICAgICAgICAgcHVibGljIGRpc2tMaXN0U2VydmljZTogRGlza0xpc3RTZXJ2aWNlLHB1YmxpYyBtb2RhbFNlcnZpY2U6IE5nYk1vZGFsLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlcnZlclBhbmVsU2VydmljZTogU2VydmVyUGFuZWxTZXJ2aWNlLHByaXZhdGUgb3BlcmF0ZURpc2tTZXJ2aWNlOk9wZXJhdGVEaXNrU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpdGVtRGlza1NlcnZpY2U6IEl0ZW1EaXNrU2VydmljZSxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6UHJvbXB0RW1pdFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgaHR0cDogSHR0cCxwcml2YXRlIG1vbml0b3Jpbmc6TW9uaXRvcmluZ1NlcnZpY2VcbiAgICAgICkge1xuICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKT0+eyB0aGlzLnJlZnJlc2goKX0sNjAwMDAwKVxuICB9XG4gIC8qKlxuICAgKiDliJ3lp4vnmoTml7blgJnojrflj5bkv6Hmga9cbiAgICovXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRTZXJ2ZXJQYW5lbEFsbCgpO1xuICB9XG4gIC8qKlxuICAgKiDngrnlh7vliLfmlrDmjInpkq5cbiAgICovXG4gIHJlZnJlc2goKTphbnl7XG4gICAgaWYodGhpcy5QZW5kaW5nU2VydmVyUGFuZWxBbGxJbmZvUmVmcmVzaD09MSYmdGhpcy5QZW5kaW5nRGlza0FsbEluZm9SZWZyZXNoPT0xKXtcbiAgICAgIHRoaXMucmVmcmVzaEZsYWcgPSB0cnVlO1xuICAgICAgdGhpcy5nZXRTZXJ2ZXJQYW5lbEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDngrnlh7vmnI3liqHpnaLmnb9cbiAgICovXG4gIGdldEl0ZW1OdW0oaXRlbSk6YW55e1xuICAgIHRoaXMuc2VsZWN0TnVtID0gaXRlbS5zbG90X251bWJlcjtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pyN5Yqh5Zmo6Z2i5p2/5L+h5oGvXG4gICAqL1xuICBnZXRTZXJ2ZXJQYW5lbEFsbCgpOmFueXtcbiAgICBpZih0aGlzLnJlZnJlc2hGbGFnKXtcbiAgICAgIHRoaXMuUGVuZGluZ1NlcnZlclBhbmVsQWxsSW5mbyA9IDE7XG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJQYW5lbEFsbEluZm9SZWZyZXNoID0gMDtcbiAgICAgIHRoaXMuUGVuZGluZ0Rpc2tBbGxJbmZvID0gMTtcbiAgICAgIHRoaXMuUGVuZGluZ0Rpc2tBbGxJbmZvUmVmcmVzaCA9IDA7XG4gICAgfWVsc2Uge1xuICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUGFuZWxBbGxJbmZvID0gMDsvL+iOt+WPluacjeWKoeWZqOmdouadv+S/oeaBr+OAgjDvvJrlvIDlp4vvvJsx77ya5a6M5oiQXG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJQYW5lbEFsbEluZm9SZWZyZXNoID0gMTtcbiAgICAgIHRoaXMuUGVuZGluZ0Rpc2tBbGxJbmZvID0gMDtcbiAgICAgIHRoaXMuUGVuZGluZ0Rpc2tBbGxJbmZvUmVmcmVzaCA9IDE7XG4gICAgICB0aGlzLmRpc2tDb250ZW50ID0gJ+ato+WcqOiOt+WPluejgeebmOWIl+ihqOS/oeaBryc7XG4gICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJFcnJvciA9ICfmraPlnKjojrflj5bmnI3liqHlmajpnaLmnb/kv6Hmga8nO1xuICAgIH1cbiAgICB0aGlzLnNlcnZlclBhbmVsU2VydmljZS5nZXRTZXJ2ZXJQYW5lbCgpXG4gICAgICAudGhlbihcbiAgICAgICAgc2VydmVyUGFuZWwgPT4ge1xuICAgICAgICAgIGlmKHNlcnZlclBhbmVsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgaWYoc2VydmVyUGFuZWwuY29kZSA9PSAzNzU4NDI0MDY1KXtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyRXJyb3IgPSAn5pyq5Y+R546w5pyN5Yqh5Zmo6Z2i5p2/5L+h5oGvJztcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUGFuZWxBbGxJbmZvID0gMTtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUGFuZWxBbGxJbmZvUmVmcmVzaCA9IDE7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0RGlza0xpc3RBbGwoKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHNlcnZlclBhbmVsLmNvZGUgPT0gMzc1OTA3OTQzNCl7XG4gICAgICAgICAgICAgIHRoaXMuUGVuZGluZ1NlcnZlckVycm9yID0gJ1JBSUTmraPlnKjph43lu7rkuK0uLi4nO1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJQYW5lbEFsbEluZm8gPSAxO1xuICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdTZXJ2ZXJQYW5lbEFsbEluZm9SZWZyZXNoID0gMTtcbiAgICAgICAgICAgICAgdGhpcy5nZXREaXNrTGlzdEFsbCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIHRoaXMuUGVuZGluZ1NlcnZlckVycm9yID0gJyc7XG4gICAgICAgICAgICAgIHRoaXMuc2VydmVyUGFuZWwgPSBzZXJ2ZXJQYW5lbDtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUGFuZWxBbGxJbmZvID0gMTtcbiAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nU2VydmVyUGFuZWxBbGxJbmZvUmVmcmVzaCA9IDE7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0RGlza0xpc3RBbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bliJfooajkv6Hmga9cbiAgICovXG4gIGdldERpc2tMaXN0QWxsKCk6IHZvaWQge1xuICAgIHRoaXMuZGlza0xpc3RTZXJ2aWNlLmdldERpc2tMaXN0KClcbiAgICAgIC50aGVuKFxuICAgICAgICBkaXNrTGlzdEFsbCA9PiB7XG4gICAgICAgICAgaWYoZGlza0xpc3RBbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBpZihkaXNrTGlzdEFsbC5jb2RlID09IDM3NTg0MjQwNjUpe1xuICAgICAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICAgICAgICBtZS5kaXNrQ29udGVudCA9ICfmnKrlj5HnjrDno4Hnm5jkv6Hmga8nO1xuICAgICAgICAgICAgICBtZS5QZW5kaW5nRGlza0FsbEluZm8gPSAxO1xuICAgICAgICAgICAgICBtZS5QZW5kaW5nRGlza0FsbEluZm9SZWZyZXNoID0gMTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGRpc2tMaXN0QWxsLmNvZGUgPT0gMzc1OTA3OTQzNCl7XG4gICAgICAgICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgICAgICAgIG1lLmRpc2tDb250ZW50ID0gJ1JBSUTmraPlnKjph43lu7rkuK0uLi4nO1xuICAgICAgICAgICAgICBtZS5QZW5kaW5nRGlza0FsbEluZm8gPSAxO1xuICAgICAgICAgICAgICBtZS5QZW5kaW5nRGlza0FsbEluZm9SZWZyZXNoID0gMTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICAgICAgICBtZS5QZW5kaW5nRGlza0FsbEluZm8gPSAxO1xuICAgICAgICAgICAgICBtZS5QZW5kaW5nRGlza0FsbEluZm9SZWZyZXNoID0gMTtcbiAgICAgICAgICAgICAgdGhpcy5kaXNrQ29udGVudCA9ICcnO1xuICAgICAgICAgICAgICBtZS5kaXNrTGlzdEFsbCA9IGRpc2tMaXN0QWxsO1xuICAgICAgICAgICAgICBpZighZGlza0xpc3RBbGwubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBtZS5kaXNrQ29udGVudCA9ICfmmoLml6Dno4Hnm5jkv6Hmga8nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+WMllxuICAgKi9cbiAgaW5pdERpc2soaXRlbSl7XG4gICAgLy8x77yM5by55qGG5o+Q56S6XG4gICAgbGV0IG1vZGFsSW5pdERpc2sgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsQ29udGVudCk7XG4gICAgbW9kYWxJbml0RGlzay5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9ICfliJ3lp4vljJYnO1xuICAgIG1vZGFsSW5pdERpc2suY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICfliJ3lp4vljJblsIbkuKLlpLHno4Hnm5jkuIrnmoTmiYDmnInmlbDmja7jgILmgqjnoa7lrpropoHmiafooYzmraTmk43kvZzlkJfvvJ8nO1xuICAgIG1vZGFsSW5pdERpc2sucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy/ngrnlh7vnoa7lrprmjInpkq7nmoTml7blgJnvvIzlj5HpgIHliKDpmaTor7fmsYJcbiAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgIHRoaXMuUGVuZGluZ0Rpc2tTdGF0dXMgPSAwO1xuICAgICAgICB0aGlzLm9wZXJhdGVEaXNrU2VydmljZS5pbml0SG90U3BhcmUoaXRlbS5zbG90X251bWJlcilcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGluaXREaXNrID0+IHtcbiAgICAgICAgICAgICAgaWYoaW5pdERpc2suaW5pdF9waHlzZHJ2ID09IDApe1xuICAgICAgICAgICAgICAgIG1lLlBlbmRpbmdEaXNrU3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8muWIneWni+WMluWFqOWxgOeDreWkh+ebmOWksei0pScpKVxuICAgICAgICAgICAgICB9ZWxzZSBpZihpbml0RGlzay5pbml0X3BoeXNkcnYgPT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgICAgICAgICBtZS5pdGVtRGlza1NlcnZpY2UuaW5mb0l0ZW1EaXNrKGl0ZW0uc2xvdF9udW1iZXIpXG4gICAgICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgICAgaXRlbURpc2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2xvdF9udW1iZXIgPSBpdGVtRGlzay5zbG90X251bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLnd3biA9IGl0ZW1EaXNrLnd3bjtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLmluaXQgPSBpdGVtRGlzay5pbml0O1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmFpZCA9IGl0ZW1EaXNrLnJhaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5jYXBhY2l0eSA9IGl0ZW1EaXNrLmNhcGFjaXR5O1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9IGl0ZW1EaXNrLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS50ZW1wZXJhdHVyZSA9IGl0ZW1EaXNrLnRlbXBlcmF0dXJlO1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3RhdGUgPSBpdGVtRGlzay5zdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICBtZS5QZW5kaW5nRGlza1N0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBtZS5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgIG1lLlBlbmRpbmdEaXNrU3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIChyZWFzb24pID0+IHtcbiAgICAgIHJldHVybjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKuiuvue9ruWFqOWxgOeDreWkh+ebmFxuICAgKi9cbiAgc2V0RGlzayhpdGVtKXtcblxuICAgIC8vMe+8jOW8ueahhuaPkOekulxuICAgIGxldCBtb2RhbFNldERpc2sgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsQ29udGVudCk7XG4gICAgbW9kYWxTZXREaXNrLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+iuvue9ruWFqOWxgOeDreWkh+ebmCc7XG4gICAgLy9pZijng63lpIfnm5jlrrnph4/kuI3lsI/kuo5SQUlE57uE5oiQ5ZGY55uY5pyA5aSn5a656YePKVxuICAgIG1vZGFsU2V0RGlzay5jb21wb25lbnRJbnN0YW5jZS5ib2R5ID0gJ+ivpeejgeebmOWwhuiiq+iuvue9ruS4uuWFqOWxgOeDreWkh+ebmOOAguaCqOehruiupOimgeaJp+ihjOatpOaTjeS9nOWQl++8nyc7XG4gICAgbW9kYWxTZXREaXNrLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIC8v54K55Ye756Gu5a6a5oyJ6ZKu55qE5pe25YCZ77yM5Y+R6YCB5Yig6Zmk6K+35rGCXG4gICAgICBpZihyZXN1bHQpe1xuICAgICAgICB0aGlzLlBlbmRpbmdEaXNrU3RhdHVzID0gMDtcbiAgICAgICAgdGhpcy5vcGVyYXRlRGlza1NlcnZpY2Uuc2V0SG90U3BhcmUoaXRlbS5zbG90X251bWJlcilcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgIHNldERpc2sgPT4ge1xuICAgICAgICAgICAgICBpZihzZXREaXNrLnNldF9ob3RzcGFyZSA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdEaXNrU3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8muiuvue9ruWFqOWxgOeDreWkh+ebmOWksei0pScpKVxuICAgICAgICAgICAgICB9ZWxzZSBpZihzZXREaXNrLnNldF9ob3RzcGFyZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1EaXNrU2VydmljZS5pbmZvSXRlbURpc2soaXRlbS5zbG90X251bWJlcilcbiAgICAgICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgICBpdGVtRGlzayA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5zbG90X251bWJlciA9IGl0ZW1EaXNrLnNsb3RfbnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ud3duID0gaXRlbURpc2sud3duO1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5pdCA9IGl0ZW1EaXNrLmluaXQ7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5yYWlkID0gaXRlbURpc2sucmFpZDtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNhcGFjaXR5ID0gaXRlbURpc2suY2FwYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS50eXBlID0gaXRlbURpc2sudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRlbXBlcmF0dXJlID0gaXRlbURpc2sudGVtcGVyYXR1cmU7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdGF0ZSA9IGl0ZW1EaXNrLnN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGVuZGluZ0Rpc2tTdGF0dXMgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBtZS5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGVuZGluZ0Rpc2tTdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgICAgcmV0dXJuO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKuWPlua2iOWFqOWxgOeDreWkh+ebmFxuICAgKi9cbiAgY2FuY2VsRGlzayhpdGVtKXtcbiAgICAvLzHvvIzlvLnmoYbmj5DnpLpcbiAgICBsZXQgbW9kYWxDYW5jZWxEaXNrID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbENvbnRlbnQpO1xuICAgIG1vZGFsQ2FuY2VsRGlzay5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9ICflj5bmtojlhajlsYDng63lpIfnm5gnO1xuICAgIC8vaWYo54Ot5aSH55uY5a656YeP5LiN5bCP5LqOUkFJROe7hOaIkOWRmOebmOacgOWkp+WuuemHjylcbiAgICBtb2RhbENhbmNlbERpc2suY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICflj5bmtojng63lpIfnm5jlsIblr7zoh7RSQUlE5peg5rOV5b+r6YCf6YeN5bu644CC5oKo56Gu6K6k6KaB5omn6KGM5q2k5pON5L2c5ZCX77yfJztcbiAgICBtb2RhbENhbmNlbERpc2sucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy/ngrnlh7vnoa7lrprmjInpkq7nmoTml7blgJnvvIzlj5HpgIHliKDpmaTor7fmsYJcbiAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgIHRoaXMuUGVuZGluZ0Rpc2tTdGF0dXMgPSAwO1xuICAgICAgICB0aGlzLm9wZXJhdGVEaXNrU2VydmljZS5jYW5jZWxIb3RTcGFyZShpdGVtLnNsb3RfbnVtYmVyKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgY2FuY2VsRGlzayA9PiB7XG4gICAgICAgICAgICAgIGlmKGNhbmNlbERpc2sudW5zZXRfaG90c3BhcmUgPT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5QZW5kaW5nRGlza1N0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdCh0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCfmj5DnpLrvvJrlj5bmtojlhajlsYDng63lpIfnm5jlpLHotKUnKSlcbiAgICAgICAgICAgICAgfWVsc2UgaWYoY2FuY2VsRGlzay51bnNldF9ob3RzcGFyZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1EaXNrU2VydmljZS5pbmZvSXRlbURpc2soaXRlbS5zbG90X251bWJlcilcbiAgICAgICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgICBpdGVtRGlzayA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5zbG90X251bWJlciA9IGl0ZW1EaXNrLnNsb3RfbnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ud3duID0gaXRlbURpc2sud3duO1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaW5pdCA9IGl0ZW1EaXNrLmluaXQ7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5yYWlkID0gaXRlbURpc2sucmFpZDtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNhcGFjaXR5ID0gaXRlbURpc2suY2FwYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS50eXBlID0gaXRlbURpc2sudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRlbXBlcmF0dXJlID0gaXRlbURpc2sudGVtcGVyYXR1cmU7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdGF0ZSA9IGl0ZW1EaXNrLnN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUGVuZGluZ0Rpc2tTdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbWUuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBlbmRpbmdEaXNrU3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAocmVhc29uKSA9PiB7XG4gICAgICByZXR1cm47XG4gICAgfSk7XG4gIH1cblxuXG59XG4iXX0=
