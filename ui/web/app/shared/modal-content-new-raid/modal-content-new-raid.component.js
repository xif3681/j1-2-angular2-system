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
var ng2_translate_1 = require('ng2-translate');
var http_1 = require('@angular/http');
var index_2 = require('../../server/index');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var AddRAIDService = (function () {
    function AddRAIDService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    AddRAIDService.prototype.addRaid = function (obj) {
        var _this = this;
        var url = "/v1/raid/create";
        return this.http
            .post(url, JSON.stringify(obj))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(_this.translate.instant(res.json().code.toString() + 'raidcreate'));
            }
        })
            .catch(this.handleError);
    };
    AddRAIDService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    AddRAIDService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], AddRAIDService);
    return AddRAIDService;
}());
exports.AddRAIDService = AddRAIDService;
var ModalContentNewRaid = (function () {
    function ModalContentNewRaid(activeModal, diskRaidInfoListService, addRAIDService, promptEmitService, translate) {
        this.activeModal = activeModal;
        this.diskRaidInfoListService = diskRaidInfoListService;
        this.addRAIDService = addRAIDService;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.diskRaidInfoList = [];
        this.tNewRaid = [
            '槽位号',
            '型号',
            '容量'
        ];
        this.stripeSizeList = ['8', '16', '32', '64', '128', '256', '512', '1024'];
        this.RAIDRankList = [
            {
                "name": "RAID0",
                "raid_level": "0",
            },
            {
                "name": "RAID5",
                "raid_level": "5",
            }
        ];
    }
    ModalContentNewRaid.prototype.ngOnInit = function () {
        this.createRaidModel = {
            'raid_name': '',
            'raid_level': '5',
            'strip_size': '256',
            'slot_numbers1': [],
            'slot_numbers': ''
        };
        this.getDiskRaidInfoList();
    };
    ModalContentNewRaid.prototype.getDiskRaidInfoList = function () {
        var _this = this;
        this.promptContent = '正在获取磁盘信息';
        var me = this;
        this.diskRaidInfoListService.getDiskRaidInfoList()
            .then(function (diskRaidInfoList) {
            me.diskRaidInfoList = diskRaidInfoList;
            if (!diskRaidInfoList.length) {
                _this.promptContent = '暂无磁盘信息';
            }
            else {
                _this.promptContent = '';
            }
        }, function (error) {
            _this.error = error;
        });
    };
    ModalContentNewRaid.prototype.addDiskItem = function (slot_number) {
        this.createRaidModel.slot_numbers1.push(Number(slot_number));
        this.handlePrompt();
    };
    ModalContentNewRaid.prototype.delDiskItem = function (slot_number) {
        for (var i = 0; i < this.createRaidModel.slot_numbers1.length; i++) {
            if (this.createRaidModel.slot_numbers1[i] == slot_number) {
                this.createRaidModel.slot_numbers1.splice(i, 1);
            }
        }
        this.handlePrompt();
    };
    ModalContentNewRaid.prototype.addDiskAll = function (flag) {
        var me = this;
        me.createRaidModel.slot_numbers1 = [];
        if (flag) {
            me.diskRaidInfoList.map(function (obj) {
                me.createRaidModel.slot_numbers1.push(Number(obj.slot_number));
            });
        }
        else {
            me.createRaidModel.slot_numbers1 = [];
        }
        this.handlePrompt();
    };
    ModalContentNewRaid.prototype.handlePrompt = function () {
        this.promptRaidContent = '';
        if (this.createRaidModel.raid_level == 5 && this.createRaidModel.slot_numbers1.length < 3) {
            this.promptRaidContent = '所选磁盘少于3块，无法创建RAID5';
            return;
        }
        else if (this.createRaidModel.raid_level == 0 && this.createRaidModel.slot_numbers1.length < 2) {
            this.promptRaidContent = '所选磁盘少于2块，无法创建RAID0';
            return;
        }
    };
    ModalContentNewRaid.prototype.handleSelectPrompt = function (raid_level) {
        this.promptRaidContent = '';
        if (this.createRaidModel.slot_numbers1.length) {
            if (raid_level == 5 && this.createRaidModel.slot_numbers1.length < 2) {
                this.promptRaidContent = '所选磁盘少于2块，无法创建RAID0';
                return;
            }
            else if (raid_level == 0 && this.createRaidModel.slot_numbers1.length < 3) {
                this.promptRaidContent = '所选磁盘少于3块，无法创建RAID5';
                return;
            }
        }
    };
    ModalContentNewRaid.prototype.onSubmit = function () {
        var _this = this;
        this.handlePrompt();
        var me = this;
        this.createRaidModel.slot_numbers = '(' + this.createRaidModel.slot_numbers1 + ')';
        this.promptContentSubmit = 1;
        this.addRAIDService.addRaid(me.createRaidModel)
            .then(function (diskRaidInfoList) {
            if (diskRaidInfoList != undefined) {
                if (diskRaidInfoList.create == 0) {
                    _this.promptEmitService.change.emit(_this.translate.instant('提示：添加RAID失败'));
                    me.activeModal.close('fail');
                }
                else if (diskRaidInfoList.create == 1) {
                    me.activeModal.close({ status: 'success', id: diskRaidInfoList.vir_drv_id });
                }
            }
            _this.promptContentSubmit = 0;
        }, function (error) {
            _this.error = error;
        });
    };
    ModalContentNewRaid = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-new-raid',
            templateUrl: 'modal-content-new-raid.component.html',
            styleUrls: ['modal-content-new-raid.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_2.DiskRaidInfoListService, AddRAIDService, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ModalContentNewRaid);
    return ModalContentNewRaid;
}());
exports.ModalContentNewRaid = ModalContentNewRaid;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1uZXctcmFpZC9tb2RhbC1jb250ZW50LW5ldy1yYWlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBQzdELHNCQUFpQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BFLDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9ELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msc0JBQXdDLG9CQUFvQixDQUFDLENBQUE7QUFHN0QsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUdFLHdCQUFvQixJQUFVLEVBQVMsaUJBQW9DLEVBQVMsU0FBMkI7UUFBM0YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUZ4RyxNQUFDLEdBQVcsQ0FBQyxDQUFDO0lBSXJCLENBQUM7SUFFRCxnQ0FBTyxHQUFQLFVBQVEsR0FBRztRQUFYLGlCQWVDO1FBZEMsSUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUM7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxD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SCxDQUFDO1lBQ0QsS0FBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBektIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7WUFFbkQsVUFBVSxFQUFDLENBQUMsY0FBTSxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7MkJBQUE7SUFzS0YsMEJBQUM7QUFBRCxDQW5LQSxBQW1LQyxJQUFBO0FBbktZLDJCQUFtQixzQkFtSy9CLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LW5ldy1yYWlkL21vZGFsLWNvbnRlbnQtbmV3LXJhaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4vLi4vLi4vc2VydmVyL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCxOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IERpc2tSYWlkSW5mb0xpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBmb3IgZGVidWdnaW5nXG5cbi8qKlxuICrmt7vliqBSQUlE5pyN5YqhXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkZFJBSURTZXJ2aWNlIHtcbiAgcHVibGljIGk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4pIHtcbiAgfVxuXG4gIGFkZFJhaWQob2JqKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAvdjEvcmFpZC9jcmVhdGVgO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCxKU09OLnN0cmluZ2lmeShvYmopKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9O1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSAyMDIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQodGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSsncmFpZGNyZWF0ZScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuICAvKipcbiAgICog6ZSZ6K+v5aSE55CGXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgLy8gY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICBsZXQgZXJyTXNnID0gKGVycm9yLm1lc3NhZ2UpID8gZXJyb3IubWVzc2FnZSA6XG4gICAgICBlcnJvci5zdGF0dXMgPyBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0fWAgOiAnU2VydmVyIGVycm9yJztcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyTXNnKTtcbiAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FyLW1vZGFsLWNvbnRlbnQtbmV3LXJhaWQnLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWNvbnRlbnQtbmV3LXJhaWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbW9kYWwtY29udGVudC1uZXctcmFpZC5jb21wb25lbnQuY3NzJ10sXG4gIC8vIHByb3ZpZGVyczogW05nRm9ybV0sXG4gIGRpcmVjdGl2ZXM6W05nRm9ybV0sXG4gIGlucHV0OiBbJ3RpdGxlJywnYm9keSddXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRlbnROZXdSYWlkIHtcbiAgbGljZW5zZTphbnk7XG4gIGVycm9yOmFueTtcbiAgY29udGVudDphbnk7XG4gIGRpc2tSYWlkSW5mb0xpc3Q6YW55W109W107XG4gIGxpY2Vuc2VFcnJtc2c6QXJyYXk7XG4gIGNyZWF0ZVJhaWRNb2RlbDphbnk7XG4gIHByb21wdENvbnRlbnQ6YW55O1xuICBwcm9tcHRSYWlkQ29udGVudDphbnk7XG4gIHByb21wdENvbnRlbnRTdWJtaXQ6YW55O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsLHB1YmxpYyBkaXNrUmFpZEluZm9MaXN0U2VydmljZTpEaXNrUmFpZEluZm9MaXN0U2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIGFkZFJBSURTZXJ2aWNlOkFkZFJBSURTZXJ2aWNlLHB1YmxpYyBwcm9tcHRFbWl0U2VydmljZTogUHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcblxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlUmFpZE1vZGVsID0ge1xuICAgICAgJ3JhaWRfbmFtZSc6ICcnLFxuICAgICAgJ3JhaWRfbGV2ZWwnOiAnNScsXG4gICAgICAnc3RyaXBfc2l6ZSc6ICcyNTYnLFxuICAgICAgJ3Nsb3RfbnVtYmVyczEnOiBbXSxcbiAgICAgICdzbG90X251bWJlcnMnOicnXG4gICAgfTtcbiAgICB0aGlzLmdldERpc2tSYWlkSW5mb0xpc3QoKTtcbiAgfVxuICB0TmV3UmFpZCA9IFtcbiAgICAn5qe95L2N5Y+3JyxcbiAgICAn5Z6L5Y+3JyxcbiAgICAn5a656YePJ1xuICBdO1xuICAvKipcbiAgICog5p2h5bim5aSn5bCPXG4gICAqL1xuICBzdHJpcGVTaXplTGlzdDpzdHJpbmdbXT1bJzgnLCcxNicsJzMyJywnNjQnLCcxMjgnLCcyNTYnLCc1MTInLCcxMDI0J107XG4gIC8qKlxuICAgKiBSQUlE57qn5YirXG4gICAqL1xuICBSQUlEUmFua0xpc3Q9W1xuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlJBSUQwXCIsXG4gICAgICBcInJhaWRfbGV2ZWxcIjogXCIwXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJSQUlENVwiLFxuICAgICAgXCJyYWlkX2xldmVsXCI6IFwiNVwiLFxuICAgIH1cbiAgXTtcbiAgLyoqXG4gICAqIOiOt+WPlumAieaLqeejgeebmOS/oeaBr1xuICAgKi9cbiAgZ2V0RGlza1JhaWRJbmZvTGlzdCgpOnZvaWR7XG4gICAgdGhpcy5wcm9tcHRDb250ZW50PSfmraPlnKjojrflj5bno4Hnm5jkv6Hmga8nO1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgdGhpcy5kaXNrUmFpZEluZm9MaXN0U2VydmljZS5nZXREaXNrUmFpZEluZm9MaXN0KClcbiAgICAgIC50aGVuKFxuICAgICAgICBkaXNrUmFpZEluZm9MaXN0ID0+IHtcbiAgICAgICAgICBtZS5kaXNrUmFpZEluZm9MaXN0ID0gZGlza1JhaWRJbmZvTGlzdDtcbiAgICAgICAgICBpZighZGlza1JhaWRJbmZvTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50PSfmmoLml6Dno4Hnm5jkv6Hmga8nO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50PScnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIOeCueWHu+WNleS4qmNoZWNrYm94XG4gICAqIEBwYXJhbSBzbG90X251bWJlclxuICAgKi9cbiAgYWRkRGlza0l0ZW0oc2xvdF9udW1iZXIpe1xuICAgIHRoaXMuY3JlYXRlUmFpZE1vZGVsLnNsb3RfbnVtYmVyczEucHVzaChOdW1iZXIoc2xvdF9udW1iZXIpKTtcbiAgICB0aGlzLmhhbmRsZVByb21wdCgpO1xuICB9XG4gIC8qKlxuICAgKiDngrnlh7vljZXkuKpjaGVja2JveFxuICAgKiBAcGFyYW0gc2xvdF9udW1iZXJcbiAgICovXG4gIGRlbERpc2tJdGVtKHNsb3RfbnVtYmVyKXtcbiAgICBmb3IodmFyIGk9MDsgaTx0aGlzLmNyZWF0ZVJhaWRNb2RlbC5zbG90X251bWJlcnMxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZih0aGlzLmNyZWF0ZVJhaWRNb2RlbC5zbG90X251bWJlcnMxW2ldID09IHNsb3RfbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUmFpZE1vZGVsLnNsb3RfbnVtYmVyczEuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVByb21wdCgpO1xuICB9XG4gIC8qKlxuICAgKiDngrnlh7vlhajpgInmjInpkq5cbiAgICogQHBhcmFtIGZsYWdcbiAgICovXG4gIGFkZERpc2tBbGwoZmxhZyl7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICBtZS5jcmVhdGVSYWlkTW9kZWwuc2xvdF9udW1iZXJzMSA9IFtdO1xuICAgIGlmKGZsYWcpe1xuICAgICAgbWUuZGlza1JhaWRJbmZvTGlzdC5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBtZS5jcmVhdGVSYWlkTW9kZWwuc2xvdF9udW1iZXJzMS5wdXNoKE51bWJlcihvYmouc2xvdF9udW1iZXIpKTtcbiAgICAgIH0pXG4gICAgfWVsc2Uge1xuICAgICAgbWUuY3JlYXRlUmFpZE1vZGVsLnNsb3RfbnVtYmVyczEgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVQcm9tcHQoKTtcbiAgfVxuICBoYW5kbGVQcm9tcHQoKXtcbiAgICB0aGlzLnByb21wdFJhaWRDb250ZW50ID0gJyc7XG4gICAgaWYodGhpcy5jcmVhdGVSYWlkTW9kZWwucmFpZF9sZXZlbCA9PSA1JiZ0aGlzLmNyZWF0ZVJhaWRNb2RlbC5zbG90X251bWJlcnMxLmxlbmd0aDwzKXtcbiAgICAgIHRoaXMucHJvbXB0UmFpZENvbnRlbnQgPSAn5omA6YCJ56OB55uY5bCR5LqOM+Wdl++8jOaXoOazleWIm+W7ulJBSUQ1JztcbiAgICAgIHJldHVybjtcbiAgICB9ZWxzZSBpZih0aGlzLmNyZWF0ZVJhaWRNb2RlbC5yYWlkX2xldmVsID09IDAmJnRoaXMuY3JlYXRlUmFpZE1vZGVsLnNsb3RfbnVtYmVyczEubGVuZ3RoPDIpe1xuICAgICAgdGhpcy5wcm9tcHRSYWlkQ29udGVudCA9ICfmiYDpgInno4Hnm5jlsJHkuo4y5Z2X77yM5peg5rOV5Yib5bu6UkFJRDAnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDkuI3nn6XpgZPkuLrku4DkuYjmmK/nm7jlj43nmoTvvIxcbiAgICogQHBhcmFtIHJhaWRfbGV2ZWxcbiAgICovXG4gIGhhbmRsZVNlbGVjdFByb21wdChyYWlkX2xldmVsKXtcbiAgICB0aGlzLnByb21wdFJhaWRDb250ZW50ID0gJyc7XG4gICAgaWYodGhpcy5jcmVhdGVSYWlkTW9kZWwuc2xvdF9udW1iZXJzMS5sZW5ndGgpe1xuICAgICAgaWYocmFpZF9sZXZlbCA9PSA1JiZ0aGlzLmNyZWF0ZVJhaWRNb2RlbC5zbG90X251bWJlcnMxLmxlbmd0aDwyKXtcbiAgICAgICAgdGhpcy5wcm9tcHRSYWlkQ29udGVudCA9ICfmiYDpgInno4Hnm5jlsJHkuo4y5Z2X77yM5peg5rOV5Yib5bu6UkFJRDAnO1xuICAgICAgICByZXR1cm47XG4gICAgICB9ZWxzZSBpZihyYWlkX2xldmVsID09IDAmJnRoaXMuY3JlYXRlUmFpZE1vZGVsLnNsb3RfbnVtYmVyczEubGVuZ3RoPDMpe1xuICAgICAgICB0aGlzLnByb21wdFJhaWRDb250ZW50ID0gJ+aJgOmAieejgeebmOWwkeS6jjPlnZfvvIzml6Dms5XliJvlu7pSQUlENSc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuICAvKipcbiAgICog5o+Q5Lqk5re75Yqg55qEUkFJROS/oeaBr1xuICAgKi9cbiAgb25TdWJtaXQoKSB7XG4gICAgdGhpcy5oYW5kbGVQcm9tcHQoKTtcbiAgICBsZXQgbWUgPSB0aGlzO1xuICAgIHRoaXMuY3JlYXRlUmFpZE1vZGVsLnNsb3RfbnVtYmVycyA9ICcoJyt0aGlzLmNyZWF0ZVJhaWRNb2RlbC5zbG90X251bWJlcnMxKycpJztcbiAgICB0aGlzLnByb21wdENvbnRlbnRTdWJtaXQgPSAxO1xuICAgIHRoaXMuYWRkUkFJRFNlcnZpY2UuYWRkUmFpZChtZS5jcmVhdGVSYWlkTW9kZWwpXG4gICAgICAudGhlbihcbiAgICAgICAgZGlza1JhaWRJbmZvTGlzdCA9PiB7XG4gICAgICAgICAgaWYoZGlza1JhaWRJbmZvTGlzdCE9dW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGlmKGRpc2tSYWlkSW5mb0xpc3QuY3JlYXRlID09IDApe1xuICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8mua3u+WKoFJBSUTlpLHotKUnKSk7XG4gICAgICAgICAgICAgIG1lLmFjdGl2ZU1vZGFsLmNsb3NlKCdmYWlsJyk7XG4gICAgICAgICAgICB9ZWxzZSBpZihkaXNrUmFpZEluZm9MaXN0LmNyZWF0ZSA9PSAxKXtcbiAgICAgICAgICAgICAgLy8gdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdCgn5o+Q56S677ya5re75YqgUkFJROaIkOWKnycpO1xuICAgICAgICAgICAgICBtZS5hY3RpdmVNb2RhbC5jbG9zZSh7c3RhdHVzOidzdWNjZXNzJyxpZDpkaXNrUmFpZEluZm9MaXN0LnZpcl9kcnZfaWR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50U3VibWl0ID0gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG5cblxuXG59XG4iXX0=
