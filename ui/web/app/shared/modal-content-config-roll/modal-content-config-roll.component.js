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
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var ConfigRollService = (function () {
    function ConfigRollService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    ConfigRollService.prototype.configRoll = function (obj) {
        var _this = this;
        var url = "/v1/lv/config";
        return this.http
            .post(url, JSON.stringify(obj))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(_this.translate.instant(res.json().code.toString() + 'lvconfig'));
            }
        })
            .catch(this.handleError);
    };
    ConfigRollService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ConfigRollService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], ConfigRollService);
    return ConfigRollService;
}());
exports.ConfigRollService = ConfigRollService;
var ModalContentConfigRoll = (function () {
    function ModalContentConfigRoll(activeModal, promptEmitService, configRollService, translate) {
        this.activeModal = activeModal;
        this.promptEmitService = promptEmitService;
        this.configRollService = configRollService;
        this.translate = translate;
        this.tNewRoll = [
            '',
            'RAID名称',
            'RAID类型',
            '容量',
            '可用空间'
        ];
        this.rollCapacity = ['GB', 'TB'];
        this.rollType = [{
                name: this.translate.instant('数据卷'),
                enName: 'data'
            }];
        this.dataSource = [
            '/anyrobot/store/elasticsearch'
        ];
    }
    ModalContentConfigRoll.prototype.ngOnInit = function () {
        this.congigRollModel = {
            'lv_name': '',
            'lv_type': 'data',
            'lv_name_config': this.body.lv_name,
            'lv_capacity': '',
            'lv_capacity_num': '',
            'lv_capacity_unit': 'GB',
            'data_source': '/anyrobot/store/elasticsearch'
        };
        this.bigSize = this.translate.instant('当前用户的容量为') + this.body.lv_capacity + this.translate.instant(',您还有') + this.body.lv_vgfree + this.translate.instant('容量可使用');
        var lv_capacity = this.body.lv_capacity.split(' ');
        this.congigRollModel.lv_capacity_num = lv_capacity[0];
        this.congigRollModel.lv_capacity_unit = lv_capacity[1];
    };
    ModalContentConfigRoll.prototype.checkCapacity = function () {
        this.congigRollModel.lv_capacity = this.congigRollModel.lv_capacity_num + this.congigRollModel.lv_capacity_unit;
        var bigSizeArrNumChange;
        var bigSizeArr = this.body.lv_vgfree.split(' ');
        var bigSizeArrNum = bigSizeArr[0];
        var bigSizeArrUnit = bigSizeArr[1];
        if (bigSizeArrUnit == 'GB') {
            bigSizeArrNumChange = bigSizeArrNum * 1024;
        }
        else if (bigSizeArrUnit == 'MB') {
            bigSizeArrNumChange = bigSizeArrNum;
        }
        else if (bigSizeArrUnit == 'TB') {
            bigSizeArrNumChange = bigSizeArrNum * 1024 * 1024;
        }
        else if (bigSizeArrUnit == 'KB') {
            bigSizeArrNumChange = bigSizeArrNum / 1024;
        }
        var lv_capacity_old = this.body.lv_capacity.split(' ');
        var lv_capacity_old_num = lv_capacity_old[0];
        var lv_capacity_old_unit = lv_capacity_old[1];
        var lvCapacityNumChange;
        if (lv_capacity_old_unit == 'GB') {
            lvCapacityNumChange = lv_capacity_old_num * 1024;
        }
        else if (lv_capacity_old_unit == 'MB') {
            lvCapacityNumChange = lv_capacity_old_num;
        }
        else if (lv_capacity_old_unit == 'TB') {
            lvCapacityNumChange = lv_capacity_old_num * 1024 * 1024;
        }
        else if (lv_capacity_old_unit == 'KB') {
            lvCapacityNumChange = lv_capacity_old_num / 1024;
        }
        var lv_capacity_num_change;
        if (this.congigRollModel.lv_capacity_unit == 'GB') {
            lv_capacity_num_change = this.congigRollModel.lv_capacity_num * 1024;
        }
        else if (this.congigRollModel.lv_capacity_unit == 'MB') {
            lv_capacity_num_change = this.congigRollModel.lv_capacity_num;
        }
        else if (this.congigRollModel.lv_capacity_unit == 'TB') {
            lv_capacity_num_change = this.congigRollModel.lv_capacity_num * 1024 * 1024;
        }
        else if (this.congigRollModel.lv_capacity_unit == 'KB') {
            lv_capacity_num_change = this.congigRollModel.lv_capacity_num / 1024;
        }
        if (lv_capacity_num_change < lvCapacityNumChange || lv_capacity_num_change > (bigSizeArrNumChange + lvCapacityNumChange)) {
            this.checkCapacityContent = this.translate.instant('卷容量必须大于等于') + this.body.lv_size + this.translate.instant('小于等于') + (bigSizeArrNumChange + lvCapacityNumChange) / (1024 * 1024) + 'TB';
            this.checkCapacityFlag = 1;
            return;
        }
        this.checkCapacityFlag = 0;
    };
    ModalContentConfigRoll.prototype.onRollSubmit = function () {
        var _this = this;
        this.congigRollModel.lv_name = this.body.lv_name;
        this.congigRollModel.lv_capacity = this.congigRollModel.lv_capacity_num + this.congigRollModel.lv_capacity_unit;
        var me = this;
        me.checkCapacity();
        if (me.checkCapacityFlag != 1) {
            this.promptContentSubmit = 1;
            this.configRollService.configRoll(me.congigRollModel)
                .then(function (diskRaidInfoList) {
                if (diskRaidInfoList != undefined) {
                    if (diskRaidInfoList.config_lv == 0) {
                        _this.promptEmitService.change.emit(_this.translate.instant('提示：配置Roll失败'));
                        me.activeModal.close({ status: 'fail' });
                        return;
                    }
                    else if (diskRaidInfoList.config_lv == 1) {
                        me.activeModal.close({ status: 'success', lv_name_config: me.congigRollModel.lv_name_config });
                        return;
                    }
                }
                _this.promptContentSubmit = 0;
            }, function (error) {
                _this.error = error;
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalContentConfigRoll.prototype, "body", void 0);
    ModalContentConfigRoll = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-config-roll',
            templateUrl: 'modal-content-config-roll.component.html',
            styleUrls: ['modal-content-config-roll.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, index_1.PromptEmitService, ConfigRollService, ng2_translate_1.TranslateService])
    ], ModalContentConfigRoll);
    return ModalContentConfigRoll;
}());
exports.ModalContentConfigRoll = ModalContentConfigRoll;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1jb25maWctcm9sbC9tb2RhbC1jb250ZW50LWNvbmZpZy1yb2xsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBQzdELHNCQUFpQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BFLDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9ELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFJL0MsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVNyQztJQUdFLDJCQUFvQixJQUFVLEVBQVMsaUJBQW9DLEVBQVMsU0FBMkI7UUFBM0YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUZ4RyxNQUFDLEdBQVcsQ0FBQyxDQUFDO0lBR3JCLENBQUM7SUFLRCxzQ0FBVSxHQUFWLFVBQVcsR0FBRztRQUFkLGlCQWVDO1FBZEMsSUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLENBQUM7UUFDSCxDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFJTyx1Q0FBVyxHQUFuQixVQUFvQixLQUFVO1FBRzVCLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPO1lBQzFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sV0FBTSxLQUFLLENBQUMsVUFBWSxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFwQ0g7UUFBQyxpQkFBVSxFQUFFOzt5QkFBQTtJQXFDYix3QkFBQztBQUFELENBcENBLEFBb0NDLElBQUE7QUFwQ1kseUJBQWlCLG9CQW9DN0IsQ0FBQTtBQVlEO0lBV0UsZ0NBQW1CLFdBQTJCLEVBQVEsaUJBQW9DLEVBQ3ZFLGlCQUFtQyxFQUFTLFNBQTJCO1FBRHZFLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUFRLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdkUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBcUIxRixhQUFRLEdBQUc7WUFDVCxFQUFFO1lBQ0YsUUFBUTtZQUNSLFFBQVE7WUFDUixJQUFJO1lBQ0osTUFBTTtTQUNQLENBQUM7UUFFRixpQkFBWSxHQUFVLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLGFBQVEsR0FBQyxDQUFDO2dCQUNSLElBQUksRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLE1BQU0sRUFBQyxNQUFNO2FBQ2QsQ0FBQyxDQUFDO1FBQ0gsZUFBVSxHQUFDO1lBQ1QsK0JBQStCO1NBQ2hDLENBQUM7SUFqQ0YsQ0FBQztJQUNELHlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ3JCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLE1BQU07WUFDakIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ25DLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLGlCQUFpQixFQUFFLEVBQUU7WUFDckIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixhQUFhLEVBQUMsK0JBQStCO1NBQzlDLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pKLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsR0FBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFHeEQsQ0FBQztJQW1CRCw4Q0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEdBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUUvRyxJQUFJLG1CQUFtQixDQUFDO1FBQ3hCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ3pCLG1CQUFtQixHQUFHLGFBQWEsR0FBQyxJQUFJLENBQUM7UUFDM0MsQ0FBQztRQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNoQyxtQkFBbUIsR0FBRyxhQUFhLENBQUM7UUFDdEMsQ0FBQztRQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNoQyxtQkFBbUIsR0FBRyxhQUFhLEdBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztRQUNoRCxDQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2hDLG1CQUFtQixHQUFHLGFBQWEsR0FBQyxJQUFJLENBQUM7UUFDM0MsQ0FBQztRQUVELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLG9CQUFvQixHQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxJQUFJLG1CQUFtQixDQUFDO1FBQ3hCLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDL0IsbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUMsSUFBSSxDQUFDO1FBQ2pELENBQUM7UUFBQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUN0QyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUM1QyxDQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDdEMsbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztRQUN0RCxDQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDdEMsbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUMsSUFBSSxDQUFDO1FBQ2pELENBQUM7UUFLRCxJQUFJLHNCQUFzQixDQUFDO1FBQzNCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNoRCxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBQyxJQUFJLENBQUM7UUFDckUsQ0FBQztRQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDdkQsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7UUFDaEUsQ0FBQztRQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDdkQsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEdBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztRQUMxRSxDQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUN2RCxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBQyxJQUFJLENBQUM7UUFDckUsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLHNCQUFzQixHQUFDLG1CQUFtQixJQUFFLHNCQUFzQixHQUFDLENBQUMsbUJBQW1CLEdBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDL0csSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsbUJBQW1CLEdBQUMsbUJBQW1CLENBQUMsR0FBQyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUM7WUFDNUssSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBSUQsNkNBQVksR0FBWjtRQUFBLGlCQTRCQztRQTNCQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQy9HLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQixFQUFFLENBQUEsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDbEQsSUFBSSxDQUNILFVBQUEsZ0JBQWdCO2dCQUNkLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUMxRSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRTNDLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO3dCQUM3RixNQUFNLENBQUM7b0JBQ1QsQ0FBQztnQkFDSCxDQUFDO2dCQUNELEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxFQUNELFVBQUEsS0FBSztnQkFDSCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNyQixDQUFDLENBQ0YsQ0FBQztRQUNOLENBQUM7SUFDSCxDQUFDO0lBcklEO1FBQUMsWUFBSyxFQUFFOzt3REFBQTtJQVhWO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsOEJBQThCO1lBQ3hDLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7WUFDdEQsVUFBVSxFQUFDLENBQUMsY0FBTSxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUM7U0FDeEIsQ0FBQzs7OEJBQUE7SUE2SUYsNkJBQUM7QUFBRCxDQTFJQSxBQTBJQyxJQUFBO0FBMUlZLDhCQUFzQix5QkEwSWxDLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50LWNvbmZpZy1yb2xsL21vZGFsLWNvbnRlbnQtY29uZmlnLXJvbGwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvbXB0RW1pdFNlcnZpY2V9IGZyb20gJy4vLi4vLi4vc2VydmVyL3Byb21wdC1lbWl0L2luZGV4JztcbmltcG9ydCB7IE5nYkFjdGl2ZU1vZGFsIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCxOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuLy8gaW1wb3J0IHsgTGljZW5jZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2xpY2VuY2UtbGlzdC9pbmRleCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG4vKipcbiAqXG4gKi9cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnUm9sbFNlcnZpY2Uge1xuICBwdWJsaWMgaTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHB1YmxpYyBwcm9tcHRFbWl0U2VydmljZTogUHJvbXB0RW1pdFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uZmlnUm9sbChvYmopOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgdXJsID0gYC92MS9sdi9jb25maWdgO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCxKU09OLnN0cmluZ2lmeShvYmopKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpIHx8IHt9O1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSAyMDIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQodGhpcy50cmFuc2xhdGUuaW5zdGFudChyZXMuanNvbigpLmNvZGUudG9TdHJpbmcoKSsnbHZjb25maWcnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gIH1cbiAgLyoqXG4gICAqIOmUmeivr+WkhOeQhlxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcblxuICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpOyAvLyBmb3IgZGVtbyBwdXJwb3NlcyBvbmx5XG4gICAgbGV0IGVyck1zZyA9IChlcnJvci5tZXNzYWdlKSA/IGVycm9yLm1lc3NhZ2UgOlxuICAgICAgZXJyb3Iuc3RhdHVzID8gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dH1gIDogJ1NlcnZlciBlcnJvcic7XG4gICAgY29uc29sZS5lcnJvcihlcnJNc2cpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVyck1zZyk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1jb25maWctcm9sbCcsXG4gIHRlbXBsYXRlVXJsOiAnbW9kYWwtY29udGVudC1jb25maWctcm9sbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtb2RhbC1jb250ZW50LWNvbmZpZy1yb2xsLmNvbXBvbmVudC5jc3MnXSxcbiAgZGlyZWN0aXZlczpbTmdGb3JtXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCdib2R5J11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudENvbmZpZ1JvbGwge1xuICBASW5wdXQoKSBib2R5O1xuICBsaWNlbnNlOmFueTtcbiAgZXJyb3I6YW55O1xuICBjb250ZW50OmFueTtcbiAgY29uZ2lnUm9sbE1vZGVsOmFueTtcbiAgY2hlY2tDYXBhY2l0eUNvbnRlbnQ6YW55O1xuICBjaGVja0NhcGFjaXR5RmxhZzphbnk7XG4gIGJpZ1NpemU6YW55O1xuICBsaWNlbnNlRXJybXNnOkFycmF5O1xuICBwcm9tcHRDb250ZW50U3VibWl0OmFueTtcbiAgY29uc3RydWN0b3IocHVibGljIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgY29uZmlnUm9sbFNlcnZpY2U6Q29uZmlnUm9sbFNlcnZpY2UscHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG5cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbmdpZ1JvbGxNb2RlbCA9IHtcbiAgICAgICdsdl9uYW1lJzogJycsXG4gICAgICAnbHZfdHlwZSc6ICdkYXRhJyxcbiAgICAgICdsdl9uYW1lX2NvbmZpZyc6IHRoaXMuYm9keS5sdl9uYW1lLFxuICAgICAgJ2x2X2NhcGFjaXR5JzogJycsXG4gICAgICAnbHZfY2FwYWNpdHlfbnVtJzogJycsXG4gICAgICAnbHZfY2FwYWNpdHlfdW5pdCc6ICdHQicsXG4gICAgICAnZGF0YV9zb3VyY2UnOicvYW55cm9ib3Qvc3RvcmUvZWxhc3RpY3NlYXJjaCdcbiAgICB9O1xuICAgIHRoaXMuYmlnU2l6ZT10aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCflvZPliY3nlKjmiLfnmoTlrrnph4/kuLonKSt0aGlzLmJvZHkubHZfY2FwYWNpdHkrdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnLOaCqOi/mOaciScpK3RoaXMuYm9keS5sdl92Z2ZyZWUrdGhpcy50cmFuc2xhdGUuaW5zdGFudCgn5a656YeP5Y+v5L2/55SoJyk7XG4gICAgbGV0IGx2X2NhcGFjaXR5ID0gdGhpcy5ib2R5Lmx2X2NhcGFjaXR5LnNwbGl0KCcgJyk7XG4gICAgdGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHlfbnVtID0gbHZfY2FwYWNpdHlbMF07XG4gICAgdGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHlfdW5pdCA9bHZfY2FwYWNpdHlbMV07XG5cblxuICB9XG4gIHROZXdSb2xsID0gW1xuICAgICcnLFxuICAgICdSQUlE5ZCN56ewJyxcbiAgICAnUkFJROexu+WeiycsXG4gICAgJ+WuuemHjycsXG4gICAgJ+WPr+eUqOepuumXtCdcbiAgXTtcbiAgcmFpZExpc3RBbGw6YW55O1xuICByb2xsQ2FwYWNpdHk6c3RyaW5nW109WydHQicsJ1RCJ107XG4gIHJvbGxUeXBlPVt7XG4gICAgbmFtZTp0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCfmlbDmja7ljbcnKSxcbiAgICBlbk5hbWU6J2RhdGEnXG4gIH1dO1xuICBkYXRhU291cmNlPVtcbiAgICAnL2FueXJvYm90L3N0b3JlL2VsYXN0aWNzZWFyY2gnXG4gIF07XG5cblxuICBjaGVja0NhcGFjaXR5KCl7XG4gICAgdGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHkgPSB0aGlzLmNvbmdpZ1JvbGxNb2RlbC5sdl9jYXBhY2l0eV9udW0gK3RoaXMuY29uZ2lnUm9sbE1vZGVsLmx2X2NhcGFjaXR5X3VuaXQ7XG4gICAgLy8g5Y+v5re75Yqg55qE5pyA5aSn5a656YePXG4gICAgbGV0IGJpZ1NpemVBcnJOdW1DaGFuZ2U7XG4gICAgbGV0IGJpZ1NpemVBcnIgPSB0aGlzLmJvZHkubHZfdmdmcmVlLnNwbGl0KCcgJyk7XG4gICAgbGV0IGJpZ1NpemVBcnJOdW0gPSBiaWdTaXplQXJyWzBdO1xuICAgIGxldCBiaWdTaXplQXJyVW5pdCA9IGJpZ1NpemVBcnJbMV07XG4gICAgaWYoYmlnU2l6ZUFyclVuaXQgPT0gJ0dCJyl7XG4gICAgICBiaWdTaXplQXJyTnVtQ2hhbmdlID0gYmlnU2l6ZUFyck51bSoxMDI0O1xuICAgIH1lbHNlIGlmIChiaWdTaXplQXJyVW5pdCA9PSAnTUInKXtcbiAgICAgIGJpZ1NpemVBcnJOdW1DaGFuZ2UgPSBiaWdTaXplQXJyTnVtO1xuICAgIH1lbHNlIGlmIChiaWdTaXplQXJyVW5pdCA9PSAnVEInKXtcbiAgICAgIGJpZ1NpemVBcnJOdW1DaGFuZ2UgPSBiaWdTaXplQXJyTnVtKjEwMjQqMTAyNDtcbiAgICB9ZWxzZSBpZiAoYmlnU2l6ZUFyclVuaXQgPT0gJ0tCJyl7XG4gICAgICBiaWdTaXplQXJyTnVtQ2hhbmdlID0gYmlnU2l6ZUFyck51bS8xMDI0O1xuICAgIH1cblxuICAgIGxldCBsdl9jYXBhY2l0eV9vbGQgPSB0aGlzLmJvZHkubHZfY2FwYWNpdHkuc3BsaXQoJyAnKTtcbiAgICBsZXQgbHZfY2FwYWNpdHlfb2xkX251bSA9IGx2X2NhcGFjaXR5X29sZFswXTtcbiAgICBsZXQgbHZfY2FwYWNpdHlfb2xkX3VuaXQgPWx2X2NhcGFjaXR5X29sZFsxXTtcbiAgICAvLyDlj6/nlKjmnIDlsI/lrrnph4/vvIznlKjmiLfkuYvliY3ovpPlhaXnmoTvvIzlj6rog73lop7liqDkuI3og73lh4/lsI9cbiAgICBsZXQgbHZDYXBhY2l0eU51bUNoYW5nZTtcbiAgICBpZihsdl9jYXBhY2l0eV9vbGRfdW5pdCA9PSAnR0InKXtcbiAgICAgIGx2Q2FwYWNpdHlOdW1DaGFuZ2UgPSBsdl9jYXBhY2l0eV9vbGRfbnVtKjEwMjQ7XG4gICAgfWVsc2UgaWYgKGx2X2NhcGFjaXR5X29sZF91bml0ID09ICdNQicpe1xuICAgICAgbHZDYXBhY2l0eU51bUNoYW5nZSA9IGx2X2NhcGFjaXR5X29sZF9udW07XG4gICAgfWVsc2UgaWYgKGx2X2NhcGFjaXR5X29sZF91bml0ID09ICdUQicpe1xuICAgICAgbHZDYXBhY2l0eU51bUNoYW5nZSA9IGx2X2NhcGFjaXR5X29sZF9udW0qMTAyNCoxMDI0O1xuICAgIH1lbHNlIGlmIChsdl9jYXBhY2l0eV9vbGRfdW5pdCA9PSAnS0InKXtcbiAgICAgIGx2Q2FwYWNpdHlOdW1DaGFuZ2UgPSBsdl9jYXBhY2l0eV9vbGRfbnVtLzEwMjQ7XG4gICAgfVxuXG5cblxuICAgIC8v55So5oi36L6T5YWl55qE5YC8XG4gICAgbGV0IGx2X2NhcGFjaXR5X251bV9jaGFuZ2U7XG4gICAgaWYodGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHlfdW5pdCA9PSAnR0InKXtcbiAgICAgIGx2X2NhcGFjaXR5X251bV9jaGFuZ2UgPSB0aGlzLmNvbmdpZ1JvbGxNb2RlbC5sdl9jYXBhY2l0eV9udW0qMTAyNDtcbiAgICB9ZWxzZSBpZiAodGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHlfdW5pdCA9PSAnTUInKXtcbiAgICAgIGx2X2NhcGFjaXR5X251bV9jaGFuZ2UgPSB0aGlzLmNvbmdpZ1JvbGxNb2RlbC5sdl9jYXBhY2l0eV9udW07XG4gICAgfWVsc2UgaWYgKHRoaXMuY29uZ2lnUm9sbE1vZGVsLmx2X2NhcGFjaXR5X3VuaXQgPT0gJ1RCJyl7XG4gICAgICBsdl9jYXBhY2l0eV9udW1fY2hhbmdlID0gdGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHlfbnVtKjEwMjQqMTAyNDtcbiAgICB9ZWxzZSBpZiAodGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHlfdW5pdCA9PSAnS0InKXtcbiAgICAgIGx2X2NhcGFjaXR5X251bV9jaGFuZ2UgPSB0aGlzLmNvbmdpZ1JvbGxNb2RlbC5sdl9jYXBhY2l0eV9udW0vMTAyNDtcbiAgICB9XG4gICAgaWYobHZfY2FwYWNpdHlfbnVtX2NoYW5nZTxsdkNhcGFjaXR5TnVtQ2hhbmdlfHxsdl9jYXBhY2l0eV9udW1fY2hhbmdlPihiaWdTaXplQXJyTnVtQ2hhbmdlK2x2Q2FwYWNpdHlOdW1DaGFuZ2UpKXtcbiAgICAgIHRoaXMuY2hlY2tDYXBhY2l0eUNvbnRlbnQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCfljbflrrnph4/lv4XpobvlpKfkuo7nrYnkuo4nKSt0aGlzLmJvZHkubHZfc2l6ZSt0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCflsI/kuo7nrYnkuo4nKSsoYmlnU2l6ZUFyck51bUNoYW5nZStsdkNhcGFjaXR5TnVtQ2hhbmdlKS8oMTAyNCoxMDI0KSsnVEInO1xuICAgICAgdGhpcy5jaGVja0NhcGFjaXR5RmxhZyA9IDE7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tDYXBhY2l0eUZsYWcgPSAwO1xuICB9XG5cblxuXG4gIG9uUm9sbFN1Ym1pdCgpIHtcbiAgICB0aGlzLmNvbmdpZ1JvbGxNb2RlbC5sdl9uYW1lID0gdGhpcy5ib2R5Lmx2X25hbWU7XG4gICAgdGhpcy5jb25naWdSb2xsTW9kZWwubHZfY2FwYWNpdHkgPSB0aGlzLmNvbmdpZ1JvbGxNb2RlbC5sdl9jYXBhY2l0eV9udW0gK3RoaXMuY29uZ2lnUm9sbE1vZGVsLmx2X2NhcGFjaXR5X3VuaXQ7XG4gICAgbGV0IG1lID0gdGhpcztcbiAgICBtZS5jaGVja0NhcGFjaXR5KCk7XG4gICAgaWYobWUuY2hlY2tDYXBhY2l0eUZsYWchPTEpIHtcbiAgICAgIHRoaXMucHJvbXB0Q29udGVudFN1Ym1pdCA9IDE7XG4gICAgICB0aGlzLmNvbmZpZ1JvbGxTZXJ2aWNlLmNvbmZpZ1JvbGwobWUuY29uZ2lnUm9sbE1vZGVsKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICBkaXNrUmFpZEluZm9MaXN0ID0+IHtcbiAgICAgICAgICAgIGlmIChkaXNrUmFpZEluZm9MaXN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAoZGlza1JhaWRJbmZvTGlzdC5jb25maWdfbHYgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQodGhpcy50cmFuc2xhdGUuaW5zdGFudCgn5o+Q56S677ya6YWN572uUm9sbOWksei0pScpKTtcbiAgICAgICAgICAgICAgICBtZS5hY3RpdmVNb2RhbC5jbG9zZSh7c3RhdHVzOiAnZmFpbCd9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlza1JhaWRJbmZvTGlzdC5jb25maWdfbHYgPT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucHJvbXB0RW1pdFNlcnZpY2UuY2hhbmdlLmVtaXQoJ+aPkOekuu+8mumFjee9rlJvbGzmiJDlip8nKTtcbiAgICAgICAgICAgICAgICBtZS5hY3RpdmVNb2RhbC5jbG9zZSh7c3RhdHVzOiAnc3VjY2VzcycsIGx2X25hbWVfY29uZmlnOiBtZS5jb25naWdSb2xsTW9kZWwubHZfbmFtZV9jb25maWd9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJvbXB0Q29udGVudFN1Ym1pdCA9IDA7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG5cblxufVxuIl19
