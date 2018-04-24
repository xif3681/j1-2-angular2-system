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
var index_2 = require('../../server/index');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var ng2_translate_1 = require('ng2-translate');
var ConfigRAIDServic = (function () {
    function ConfigRAIDServic(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    ConfigRAIDServic.prototype.configRaid = function (vir_drv_id, slot_numbers) {
        var _this = this;
        var url = "/v1/raid/config";
        return this.http
            .post(url, JSON.stringify({ 'vir_drv_id': vir_drv_id, 'slot_numbers': slot_numbers }))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(_this.translate.instant(res.json().code.toString() + 'raidconfig'));
            }
        })
            .catch(this.handleError);
    };
    ConfigRAIDServic.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ConfigRAIDServic = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ConfigRAIDServic);
    return ConfigRAIDServic;
}());
exports.ConfigRAIDServic = ConfigRAIDServic;
var ModalContentConfigRaid = (function () {
    function ModalContentConfigRaid(activeModal, diskRaidInfoListService, configRAIDServic, promptEmitService, translate) {
        this.activeModal = activeModal;
        this.diskRaidInfoListService = diskRaidInfoListService;
        this.configRAIDServic = configRAIDServic;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.diskRaidInfoList = [];
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
    ModalContentConfigRaid.prototype.ngOnInit = function () {
        this.getDiskRaidInfoList();
    };
    ModalContentConfigRaid.prototype.getDiskRaidInfoList = function () {
        var _this = this;
        this.promptContent = '正在获取磁盘信息';
        var me = this;
        this.diskRaidInfoListService.getDiskRaidInfoList()
            .then(function (diskRaidInfoList) {
            me.diskRaidInfoList = diskRaidInfoList;
            if (!diskRaidInfoList.length) {
                _this.promptContent = '当前无空闲磁盘';
            }
            else {
                _this.promptContent = '';
            }
        }, function (error) {
            _this.error = error;
        });
    };
    ModalContentConfigRaid.prototype.addDiskItem = function (slot_number) {
        this.slot_numbers1.push(Number(slot_number));
    };
    ModalContentConfigRaid.prototype.delDiskItem = function (slot_number) {
        for (var i = 0; i < this.slot_numbers1.length; i++) {
            if (this.slot_numbers1[i] == slot_number) {
                this.slot_numbers1.splice(i, 1);
            }
        }
    };
    ModalContentConfigRaid.prototype.addDiskAll = function (flag) {
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
    ModalContentConfigRaid.prototype.addModalRaid = function (vir_drv_id) {
        var _this = this;
        this.promptContentSubmit = 1;
        var me = this;
        me.slot_numbers = '(' + me.slot_numbers1 + ')';
        this.configRAIDServic.configRaid(vir_drv_id, me.slot_numbers)
            .then(function (diskRaidInfoList) {
            if (diskRaidInfoList != undefined) {
                if (diskRaidInfoList.config == 0) {
                    _this.promptEmitService.change.emit(_this.translate.instant('提示：配置RAID失败'));
                    me.activeModal.close('fail');
                    return;
                }
                else if (diskRaidInfoList.config == 1) {
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
    ], ModalContentConfigRaid.prototype, "body", void 0);
    ModalContentConfigRaid = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-config-raid',
            templateUrl: 'modal-content-config-raid.component.html',
            styleUrls: ['modal-content-config-raid.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_2.DiskRaidInfoListService, ConfigRAIDServic, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ModalContentConfigRaid);
    return ModalContentConfigRaid;
}());
exports.ModalContentConfigRaid = ModalContentConfigRaid;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1jb25maWctcmFpZC9tb2RhbC1jb250ZW50LWNvbmZpZy1yYWlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBQzdELHNCQUFpQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BFLDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRy9ELHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxzQkFBd0Msb0JBQW9CLENBQUMsQ0FBQTtBQUc3RCxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBRXJDLDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQU0vQztJQUdFLDBCQUFvQixJQUFVLEVBQVMsaUJBQW9DLEVBQVMsU0FBMkI7UUFBM0YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUZ4RyxNQUFDLEdBQVcsQ0FBQyxDQUFDO0lBR3JCLENBQUM7SUFNRCxxQ0FBVSxHQUFWLFVBQVcsVUFBVSxFQUFDLFlBQVk7UUFBbEMsaUJBZUM7UUFkQyxJQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGNBQWMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO2FBQy9FLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxVQUFDLEdBQWE7WUFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMs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QUMsY0FBTSxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7OEJBQUE7SUErSEYsNkJBQUM7QUFBRCxDQTVIQSxBQTRIQyxJQUFBO0FBNUhZLDhCQUFzQix5QkE0SGxDLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LWNvbmZpZy1yYWlkL21vZGFsLWNvbnRlbnQtY29uZmlnLXJhaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4vLi4vLi4vc2VydmVyL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCxOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDcmVhdGVSYWlkIH0gICAgZnJvbSAnLi9jcmVhdGUtcmFpZCc7XG5cbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBEaXNrUmFpZEluZm9MaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZlci9pbmRleCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcbi8qKlxuICpcbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnUkFJRFNlcnZpYyB7XG4gIHB1YmxpYyBpOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHVibGljIHByb21wdEVtaXRTZXJ2aWNlOiBQcm9tcHRFbWl0U2VydmljZSxwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG5cbiAgLyoqXG4gICAq6YWN572uUkFJRFxuICAgKi9cblxuICBjb25maWdSYWlkKHZpcl9kcnZfaWQsc2xvdF9udW1iZXJzKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAvdjEvcmFpZC9jb25maWdgO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCxKU09OLnN0cmluZ2lmeSh7J3Zpcl9kcnZfaWQnOnZpcl9kcnZfaWQsJ3Nsb3RfbnVtYmVycyc6c2xvdF9udW1iZXJzfSkpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkgfHwge307XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuc3RhdHVzID09IDIwMikge1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRFbWl0U2VydmljZS5jaGFuZ2UuZW1pdCh0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHJlcy5qc29uKCkuY29kZS50b1N0cmluZygpKydyYWlkY29uZmlnJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1jb25maWctcmFpZCcsXG4gIHRlbXBsYXRlVXJsOiAnbW9kYWwtY29udGVudC1jb25maWctcmFpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtb2RhbC1jb250ZW50LWNvbmZpZy1yYWlkLmNvbXBvbmVudC5jc3MnXSxcbiAgLy8gcHJvdmlkZXJzOiBbTmdGb3JtXSxcbiAgZGlyZWN0aXZlczpbTmdGb3JtXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCdib2R5J11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudENvbmZpZ1JhaWQge1xuICBASW5wdXQoKSBib2R5O1xuICBsaWNlbnNlOmFueTtcbiAgZXJyb3I6YW55O1xuICBjb250ZW50OmFueTtcbiAgZGlza1JhaWRJbmZvTGlzdDphbnlbXT1bXTtcbiAgc2xvdF9udW1iZXJzOnN0cmluZztcbiAgcHJvbXB0Q29udGVudDpzdHJpbmc7XG4gIHNsb3RfbnVtYmVyczE6YW55W109W107XG4gIGxpY2Vuc2VFcnJtc2c6QXJyYXk7XG4gIHByb21wdENvbnRlbnRTdWJtaXQ6YW55O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsLHB1YmxpYyBkaXNrUmFpZEluZm9MaXN0U2VydmljZTpEaXNrUmFpZEluZm9MaXN0U2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIGNvbmZpZ1JBSURTZXJ2aWM6Q29uZmlnUkFJRFNlcnZpYyxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG5cbn1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXREaXNrUmFpZEluZm9MaXN0KCk7XG4gIH1cbiAgdE5ld1JhaWQgPSBbXG4gICAgJ+anveS9jeWPtycsXG4gICAgJ+Wei+WPtycsXG4gICAgJ+WuuemHjydcbiAgXTtcbiAgLyoqXG4gICAqIOadoeW4puWkp+Wwj1xuICAgKi9cbiAgc3RyaXBlU2l6ZUxpc3Q6c3RyaW5nW109Wyc4JywnMTYnLCczMicsJzY0JywnMTI4JywnMjU2JywnNTEyJywnMTAyNCddO1xuICAvKipcbiAgICogUkFJROe6p+WIq1xuICAgKi9cbiAgUkFJRFJhbmtMaXN0PVtcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJSQUlEMFwiLFxuICAgICAgXCJyYWlkX2xldmVsXCI6IFwiMFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiUkFJRDVcIixcbiAgICAgIFwicmFpZF9sZXZlbFwiOiBcIjVcIixcbiAgICB9XG4gIF07XG5cbiAgLyoqXG4gICAqIOiOt+WPlumAieaLqeejgeebmOS/oeaBr1xuICAgKi9cbiAgZ2V0RGlza1JhaWRJbmZvTGlzdCgpOnZvaWR7XG4gICAgdGhpcy5wcm9tcHRDb250ZW50PSfmraPlnKjojrflj5bno4Hnm5jkv6Hmga8nO1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgdGhpcy5kaXNrUmFpZEluZm9MaXN0U2VydmljZS5nZXREaXNrUmFpZEluZm9MaXN0KClcbiAgICAgIC50aGVuKFxuICAgICAgICBkaXNrUmFpZEluZm9MaXN0ID0+IHtcbiAgICAgICAgICBtZS5kaXNrUmFpZEluZm9MaXN0ID0gZGlza1JhaWRJbmZvTGlzdDtcbiAgICAgICAgICBpZighZGlza1JhaWRJbmZvTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50PSflvZPliY3ml6Dnqbrpl7Lno4Hnm5gnO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50PScnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG5cblxuICAvKipcbiAgICog54K55Ye75Y2V5LiqY2hlY2tib3hcbiAgICogQHBhcmFtIHNsb3RfbnVtYmVyXG4gICAqL1xuICBhZGREaXNrSXRlbShzbG90X251bWJlcil7XG4gICAgdGhpcy5zbG90X251bWJlcnMxLnB1c2goTnVtYmVyKHNsb3RfbnVtYmVyKSk7XG4gIH1cbiAgLyoqXG4gICAqIOeCueWHu+WNleS4qmNoZWNrYm94XG4gICAqIEBwYXJhbSBzbG90X251bWJlclxuICAgKi9cbiAgZGVsRGlza0l0ZW0oc2xvdF9udW1iZXIpe1xuICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuc2xvdF9udW1iZXJzMS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYodGhpcy5zbG90X251bWJlcnMxW2ldID09IHNsb3RfbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2xvdF9udW1iZXJzMS5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDngrnlh7vlhajpgInmjInpkq5cbiAgICogQHBhcmFtIGZsYWdcbiAgICovXG4gIGFkZERpc2tBbGwoZmxhZyl7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICBtZS5zbG90X251bWJlcnMxID0gW107XG4gICAgaWYoZmxhZyl7XG4gICAgICBtZS5kaXNrUmFpZEluZm9MaXN0Lm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIG1lLnNsb3RfbnVtYmVyczEucHVzaChOdW1iZXIob2JqLnNsb3RfbnVtYmVyKSlcbiAgICAgIH0pXG4gICAgfWVsc2Uge1xuICAgICAgbWUuc2xvdF9udW1iZXJzMSA9IFtdO1xuICAgIH1cbiAgfVxuICBhZGRNb2RhbFJhaWQodmlyX2Rydl9pZCkge1xuICAgIHRoaXMucHJvbXB0Q29udGVudFN1Ym1pdCA9IDE7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICBtZS5zbG90X251bWJlcnMgPSAnKCcrbWUuc2xvdF9udW1iZXJzMSsnKSc7XG4gICAgdGhpcy5jb25maWdSQUlEU2VydmljLmNvbmZpZ1JhaWQodmlyX2Rydl9pZCxtZS5zbG90X251bWJlcnMpXG4gICAgICAudGhlbihcbiAgICAgICAgZGlza1JhaWRJbmZvTGlzdCA9PiB7XG4gICAgICAgICAgaWYoZGlza1JhaWRJbmZvTGlzdCE9dW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGlmKGRpc2tSYWlkSW5mb0xpc3QuY29uZmlnID09IDApe1xuICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8mumFjee9rlJBSUTlpLHotKUnKSk7XG4gICAgICAgICAgICAgIG1lLmFjdGl2ZU1vZGFsLmNsb3NlKCdmYWlsJyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1lbHNlIGlmKGRpc2tSYWlkSW5mb0xpc3QuY29uZmlnID09IDEpe1xuICAgICAgICAgICAgICAvLyB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KCfmj5DnpLrvvJrphY3nva5SQUlE5oiQ5YqfJyk7XG4gICAgICAgICAgICAgIG1lLmFjdGl2ZU1vZGFsLmNsb3NlKCdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wcm9tcHRDb250ZW50U3VibWl0ID0gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuICAgIC8vIG1lLmFjdGl2ZU1vZGFsLmNsb3NlKHRydWUpO1xuICB9XG5cbn1cbiJdfQ==
