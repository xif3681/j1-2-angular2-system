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
var RebulidRAIDService = (function () {
    function RebulidRAIDService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    RebulidRAIDService.prototype.rebulidRaid = function (obj) {
        var _this = this;
        var url = '/v1/raid/reconstruct';
        return this.http
            .post(url, obj)
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(_this.translate.instant(res.json().code.toString() + 'raidreconstruct'));
            }
        })
            .catch(this.handleError);
    };
    RebulidRAIDService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    RebulidRAIDService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], RebulidRAIDService);
    return RebulidRAIDService;
}());
exports.RebulidRAIDService = RebulidRAIDService;
var ModalContentRebuildRaid = (function () {
    function ModalContentRebuildRaid(activeModal, diskRaidInfoListService, rebulidRAIDService, promptEmitService, translate) {
        this.activeModal = activeModal;
        this.diskRaidInfoListService = diskRaidInfoListService;
        this.rebulidRAIDService = rebulidRAIDService;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.slot_numbers1 = [];
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
    ModalContentRebuildRaid.prototype.ngOnInit = function () {
        this.rebulidRAID = {
            'vir_drv_id': '',
            'slot_numbers': ''
        };
        this.getDiskRaidInfoList();
    };
    ModalContentRebuildRaid.prototype.getDiskRaidInfoList = function () {
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
    ModalContentRebuildRaid.prototype.addDiskItem = function (slot_number) {
        this.slot_numbers1.push(Number(slot_number));
    };
    ModalContentRebuildRaid.prototype.delDiskItem = function (slot_number) {
        for (var i = 0; i < this.slot_numbers1.length; i++) {
            if (this.slot_numbers1[i] == slot_number) {
                this.slot_numbers1.splice(i, 1);
            }
        }
    };
    ModalContentRebuildRaid.prototype.addDiskAll = function (flag) {
        var me = this;
        me.slot_numbers1 = [];
        if (flag) {
            me.diskRaidInfoList.map(function (obj) {
                me.slot_numbers1.push(Number(obj.slot_number));
            });
        }
        else {
            me.slot_numbers1 = [];
        }
    };
    ModalContentRebuildRaid.prototype.onSubmit = function () {
        var _this = this;
        this.rebulidRAID.vir_drv_id = this.body.vir_drv_id;
        this.rebulidRAID.slot_numbers = '(' + this.slot_numbers1 + ')';
        var me = this;
        this.promptContentSubmit = 1;
        this.rebulidRAIDService.rebulidRaid(me.rebulidRAID)
            .then(function (resultRaid) {
            if (resultRaid != undefined) {
                if (resultRaid.reconstruct == 0) {
                    _this.promptEmitService.change.emit(_this.translate.instant('提示：重建RAID失败'));
                    me.activeModal.close('fail');
                    return;
                }
                else if (resultRaid.reconstruct == 1) {
                    me.activeModal.close('success');
                    return;
                }
            }
            _this.promptContentSubmit = 0;
        }, function (error) {
            _this.error = error;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalContentRebuildRaid.prototype, "body", void 0);
    ModalContentRebuildRaid = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-rebuild-raid',
            templateUrl: 'modal-content-rebuild-raid.component.html',
            styleUrls: ['modal-content-rebuild-raid.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_2.DiskRaidInfoListService, RebulidRAIDService, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ModalContentRebuildRaid);
    return ModalContentRebuildRaid;
}());
exports.ModalContentRebuildRaid = ModalContentRebuildRaid;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1yZWJ1aWxkLXJhaWQvbW9kYWwtY29udGVudC1yZWJ1aWxkLXJhaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFDN0Qsc0JBQWlDLGtDQUFrQyxDQUFDLENBQUE7QUFDcEUsNkJBQStCLDRCQUE0QixDQUFDLENBQUE7QUFFNUQsc0JBQThDLGdCQUFnQixDQUFDLENBQUE7QUFFL0QsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxzQkFBd0Msb0JBQW9CLENBQUMsQ0FBQTtBQUc3RCxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBUXJDO0lBR0UsNEJBQW9CLElBQVUsRUFBUyxpQkFBb0MsRUFBUyxTQUEyQjtRQUEzRixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBRnhHLE1BQUMsR0FBVyxDQUFDLENBQUM7SUFHckIsQ0FBQztJQUtELHdDQUFXLEdBQVgsVUFBWSxHQUFHO1FBQWYsaUJBZUM7UUFkQyxJQUFNLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQzthQUNiLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFD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QyxDQUFDO1lBRXZELFVBQVUsRUFBQyxDQUFDLGNBQU0sQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDO1NBQ3hCLENBQUM7OytCQUFBO0lBa0lGLDhCQUFDO0FBQUQsQ0EvSEEsQUErSEMsSUFBQTtBQS9IWSwrQkFBdUIsMEJBK0huQyxDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1yZWJ1aWxkLXJhaWQvbW9kYWwtY29udGVudC1yZWJ1aWxkLXJhaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4vLi4vLi4vc2VydmVyL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4vLi4vLi4vc2VydmVyL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ3JlYXRlUmFpZCB9ICAgIGZyb20gJy4vY3JlYXRlLXJhaWQnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBEaXNrUmFpZEluZm9MaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZlci9pbmRleCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG4vKipcbiAqXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlYnVsaWRSQUlEU2VydmljZSB7XG4gIHB1YmxpYyBpOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHVibGljIHByb21wdEVtaXRTZXJ2aWNlOiBQcm9tcHRFbWl0U2VydmljZSxwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICByZWJ1bGlkUmFpZChvYmopOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gJy92MS9yYWlkL3JlY29uc3RydWN0JztcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsb2JqKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9O1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSAyMDIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQodGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSsncmFpZHJlY29uc3RydWN0JykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1yZWJ1aWxkLXJhaWQnLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWNvbnRlbnQtcmVidWlsZC1yYWlkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21vZGFsLWNvbnRlbnQtcmVidWlsZC1yYWlkLmNvbXBvbmVudC5jc3MnXSxcbiAgLy8gcHJvdmlkZXJzOiBbTmdGb3JtXSxcbiAgZGlyZWN0aXZlczpbTmdGb3JtXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCdib2R5J11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudFJlYnVpbGRSYWlkIHtcbiAgQElucHV0KCkgYm9keTphbnk7XG4gIGxpY2Vuc2U6YW55O1xuICBlcnJvcjphbnk7XG4gIGNvbnRlbnQ6YW55O1xuICBzbG90X251bWJlcnMxOmFueVtdPVtdO1xuICBkaXNrUmFpZEluZm9MaXN0OmFueTtcbiAgcmVidWxpZFJBSUQ6YW55O1xuICBwcm9tcHRDb250ZW50OmFueTtcbiAgbGljZW5zZUVycm1zZzpBcnJheTtcbiAgcHJvbXB0Q29udGVudFN1Ym1pdDphbnk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwscHVibGljIGRpc2tSYWlkSW5mb0xpc3RTZXJ2aWNlOkRpc2tSYWlkSW5mb0xpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVidWxpZFJBSURTZXJ2aWNlOlJlYnVsaWRSQUlEU2VydmljZSxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6UHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcblxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVidWxpZFJBSUQgPSB7XG4gICAgICAndmlyX2Rydl9pZCc6ICcnLFxuICAgICAgJ3Nsb3RfbnVtYmVycyc6ICcnXG4gICAgfTtcbiAgICB0aGlzLmdldERpc2tSYWlkSW5mb0xpc3QoKTtcbiAgfVxuICB0TmV3UmFpZCA9IFtcbiAgICAn5qe95L2N5Y+3JyxcbiAgICAn5Z6L5Y+3JyxcbiAgICAn5a656YePJ1xuICBdO1xuICAvKipcbiAgICog5p2h5bim5aSn5bCPXG4gICAqL1xuICBzdHJpcGVTaXplTGlzdDpzdHJpbmdbXT1bJzgnLCcxNicsJzMyJywnNjQnLCcxMjgnLCcyNTYnLCc1MTInLCcxMDI0J107XG4gIC8qKlxuICAgKiBSQUlE57qn5YirXG4gICAqL1xuICBSQUlEUmFua0xpc3Q9W1xuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlJBSUQwXCIsXG4gICAgICBcInJhaWRfbGV2ZWxcIjogXCIwXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJSQUlENVwiLFxuICAgICAgXCJyYWlkX2xldmVsXCI6IFwiNVwiLFxuICAgIH1cbiAgXTtcbiAgLyoqXG4gICAqIOiOt+WPlumAieaLqeejgeebmOS/oeaBr1xuICAgKi9cbiAgZ2V0RGlza1JhaWRJbmZvTGlzdCgpOnZvaWR7XG4gICAgdGhpcy5wcm9tcHRDb250ZW50PSfmraPlnKjojrflj5bno4Hnm5jkv6Hmga8nO1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgdGhpcy5kaXNrUmFpZEluZm9MaXN0U2VydmljZS5nZXREaXNrUmFpZEluZm9MaXN0KClcbiAgICAgIC50aGVuKFxuICAgICAgICBkaXNrUmFpZEluZm9MaXN0ID0+IHtcbiAgICAgICAgICBtZS5kaXNrUmFpZEluZm9MaXN0ID0gZGlza1JhaWRJbmZvTGlzdDtcbiAgICAgICAgICBpZighZGlza1JhaWRJbmZvTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50PSfmmoLml6Dno4Hnm5jkv6Hmga8nO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50PScnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIOeCueWHu+WNleS4qmNoZWNrYm94XG4gICAqIEBwYXJhbSBzbG90X251bWJlclxuICAgKi9cbiAgYWRkRGlza0l0ZW0oc2xvdF9udW1iZXIpe1xuICAgIHRoaXMuc2xvdF9udW1iZXJzMS5wdXNoKE51bWJlcihzbG90X251bWJlcikpXG4gIH1cbiAgLyoqXG4gICAqIOeCueWHu+WNleS4qmNoZWNrYm94XG4gICAqIEBwYXJhbSBzbG90X251bWJlclxuICAgKi9cbiAgZGVsRGlza0l0ZW0oc2xvdF9udW1iZXIpe1xuICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuc2xvdF9udW1iZXJzMS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYodGhpcy5zbG90X251bWJlcnMxW2ldID09IHNsb3RfbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2xvdF9udW1iZXJzMS5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDngrnlh7vlhajpgInmjInpkq5cbiAgICogQHBhcmFtIGZsYWdcbiAgICovXG4gIGFkZERpc2tBbGwoZmxhZyl7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICBtZS5zbG90X251bWJlcnMxID0gW107XG4gICAgaWYoZmxhZyl7XG4gICAgICBtZS5kaXNrUmFpZEluZm9MaXN0Lm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIG1lLnNsb3RfbnVtYmVyczEucHVzaChOdW1iZXIob2JqLnNsb3RfbnVtYmVyKSlcbiAgICAgIH0pXG4gICAgfWVsc2Uge1xuICAgICAgbWUuc2xvdF9udW1iZXJzMSA9IFtdO1xuICAgIH1cbiAgfVxuICBvblN1Ym1pdCgpIHtcbiAgICB0aGlzLnJlYnVsaWRSQUlELnZpcl9kcnZfaWQgPSB0aGlzLmJvZHkudmlyX2Rydl9pZDtcbiAgICB0aGlzLnJlYnVsaWRSQUlELnNsb3RfbnVtYmVycyA9ICcoJyt0aGlzLnNsb3RfbnVtYmVyczErJyknO1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgdGhpcy5wcm9tcHRDb250ZW50U3VibWl0ID0gMTtcbiAgICB0aGlzLnJlYnVsaWRSQUlEU2VydmljZS5yZWJ1bGlkUmFpZChtZS5yZWJ1bGlkUkFJRClcbiAgICAgIC50aGVuKFxuICAgICAgICByZXN1bHRSYWlkID0+IHtcbiAgICAgICAgICBpZihyZXN1bHRSYWlkIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgaWYocmVzdWx0UmFpZC5yZWNvbnN0cnVjdCA9PSAwKXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdCh0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCfmj5DnpLrvvJrph43lu7pSQUlE5aSx6LSlJykpO1xuICAgICAgICAgICAgICBtZS5hY3RpdmVNb2RhbC5jbG9zZSgnZmFpbCcpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHRSYWlkLnJlY29uc3RydWN0ID09IDEpe1xuICAgICAgICAgICAgICAvLyB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KCfmj5DnpLrvvJrph43lu7pSQUlE5oiQ5YqfJyk7XG4gICAgICAgICAgICAgIG1lLmFjdGl2ZU1vZGFsLmNsb3NlKCdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50U3VibWl0ID0gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAvLyB0aGlzLmFjdGl2ZU1vZGFsLmNsb3NlKHRydWUpO1xuXG4gIH1cbn1cbiJdfQ==
