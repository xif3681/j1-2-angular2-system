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
var AddRollService = (function () {
    function AddRollService(http, promptEmitService, translate) {
        this.http = http;
        this.promptEmitService = promptEmitService;
        this.translate = translate;
        this.i = 0;
    }
    AddRollService.prototype.addRoll = function (obj) {
        var _this = this;
        var url = "/v1/lv/create";
        return this.http
            .post(url, JSON.stringify(obj))
            .toPromise()
            .then(function (res) {
            if (res.status == 200) {
                return res.json() || {};
            }
            else if (res.status == 202) {
                _this.promptEmitService.change.emit(_this.translate.instant(res.json().code.toString() + 'lvcreate'));
            }
        })
            .catch(this.handleError);
    };
    AddRollService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    AddRollService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.PromptEmitService, ng2_translate_1.TranslateService])
    ], AddRollService);
    return AddRollService;
}());
exports.AddRollService = AddRollService;
var ModalContentNewRoll = (function () {
    function ModalContentNewRoll(activeModal, addRollService, promptEmitService, raidCanUsedListService, translate) {
        this.activeModal = activeModal;
        this.addRollService = addRollService;
        this.promptEmitService = promptEmitService;
        this.raidCanUsedListService = raidCanUsedListService;
        this.translate = translate;
        this.tNewRoll = [
            '',
            'RAID名称',
            'RAID类型',
            '容量',
            '可用空间'
        ];
        this.bigSize = '';
        this.inputType = '';
        this.rollCapacity = ['GB', 'TB'];
        this.rollType = [{
                name: this.translate.instant('数据卷'),
                enName: 'data'
            }];
    }
    ModalContentNewRoll.prototype.ngOnInit = function () {
        this.createRollModel = {
            'lv_name': '',
            'lv_type': 'data',
            'vir_drv_id': '',
            'lv_capacity': '',
            'lv_capacity_num': '',
            'lv_capacity_unit': 'GB'
        };
        this.getRaidListAll();
    };
    ModalContentNewRoll.prototype.getRaidListAll = function () {
        var _this = this;
        this.promptContent = '正在获取RAID信息';
        var me = this;
        this.raidCanUsedListService.getRaidCanUsedList()
            .then(function (raidListAll) {
            me.raidListAll = raidListAll;
            if (!raidListAll.length) {
                _this.promptContent = '当前无空闲RAID';
            }
            else {
                _this.promptContent = '';
            }
        }, function (error) {
            _this.error = error;
        });
    };
    ModalContentNewRoll.prototype.onKeyup = function (type) {
        this.inputType = type;
        this.checkCapacityContent = '';
    };
    ModalContentNewRoll.prototype.addRollItem = function (item) {
        this.createRollModel.vir_drv_id = item.vir_drv_id;
        if (item.vgfree == null) {
            this.bigSize = this.translate.instant('可用最大容量') + item.raid_size;
            this.bigSizeNum = item.raid_size;
        }
        else if (item.vgfree !== null) {
            this.bigSize = this.translate.instant('可用最大容量') + item.vgfree;
            this.bigSizeNum = item.vgfree;
        }
    };
    ModalContentNewRoll.prototype.checkCapacity = function () {
        this.createRollModel.lv_capacity = this.createRollModel.lv_capacity_num + this.createRollModel.lv_capacity_unit;
        var bigSizeArrNumChange;
        var bigSizeArr = this.bigSizeNum.split(' ');
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
        var lv_capacity_num_change;
        if (this.createRollModel.lv_capacity_unit == 'GB') {
            lv_capacity_num_change = this.createRollModel.lv_capacity_num * 1024;
        }
        else if (this.createRollModel.lv_capacity_unit == 'MB') {
            lv_capacity_num_change = this.createRollModel.lv_capacity_num;
        }
        else if (this.createRollModel.lv_capacity_unit == 'TB') {
            lv_capacity_num_change = this.createRollModel.lv_capacity_num * 1024 * 1024;
        }
        else if (this.createRollModel.lv_capacity_unit == 'KB') {
            lv_capacity_num_change = this.createRollModel.lv_capacity_num / 1024;
        }
        if (lv_capacity_num_change <= 0 || lv_capacity_num_change > bigSizeArrNumChange) {
            this.checkCapacityContent = this.translate.instant('卷容量必须大于0小于等于') + this.bigSizeNum;
            this.checkCapacityFlag = 1;
            return;
        }
        this.checkCapacityFlag = 0;
    };
    ModalContentNewRoll.prototype.onRollSubmit = function () {
        var _this = this;
        this.createRollModel.lv_capacity = this.createRollModel.lv_capacity_num + this.createRollModel.lv_capacity_unit;
        var me = this;
        me.checkCapacity();
        if (me.checkCapacityFlag != 1) {
            this.promptContentSubmit = 1;
            this.addRollService.addRoll(me.createRollModel)
                .then(function (diskRaidInfoList) {
                if (diskRaidInfoList != undefined) {
                    if (diskRaidInfoList.lv_created == 0) {
                        _this.promptEmitService.change.emit(_this.translate.instant('提示：添加Roll失败'));
                        me.activeModal.close('fail');
                        return;
                    }
                    else if (diskRaidInfoList.lv_created == 1) {
                        me.activeModal.close({ status: 'success', name: _this.createRollModel.lv_name });
                        return;
                    }
                }
                _this.promptContentSubmit = 0;
            }, function (error) {
                _this.error = error;
            });
        }
    };
    ModalContentNewRoll = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content-new-roll',
            templateUrl: 'modal-content-new-roll.component.html',
            styleUrls: ['modal-content-new-roll.component.css'],
            directives: [forms_1.NgForm],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, AddRollService, index_1.PromptEmitService, index_2.RaidCanUsedListService, ng2_translate_1.TranslateService])
    ], ModalContentNewRoll);
    return ModalContentNewRoll;
}());
exports.ModalContentNewRoll = ModalContentNewRoll;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC1uZXctcm9sbC9tb2RhbC1jb250ZW50LW5ldy1yb2xsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZDLGVBQWUsQ0FBQyxDQUFBO0FBQzdELHNCQUFpQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BFLDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9ELDhCQUErQixlQUFlLENBQUMsQ0FBQTtBQUUvQyxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msc0JBQXVDLG9CQUFvQixDQUFDLENBQUE7QUFHNUQsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQVFyQztJQUdFLHdCQUFvQixJQUFVLEVBQVMsaUJBQW9DLEVBQVMsU0FBMkI7UUFBM0YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUZ4RyxNQUFDLEdBQVcsQ0FBQyxDQUFDO0lBSXJCLENBQUM7SUFLRCxnQ0FBTyxHQUFQLFVBQVEsR0FBRztRQUFYLGlCQWVDO1FBZEMsSUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQ0gsVUFBQyxHQUFhO1lBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FB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cC9zaGFyZWQvbW9kYWwtY29udGVudC1uZXctcm9sbC9tb2RhbC1jb250ZW50LW5ldy1yb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgLEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb21wdEVtaXRTZXJ2aWNlfSBmcm9tICcuLy4uLy4uL3NlcnZlci9wcm9tcHQtZW1pdC9pbmRleCc7XG5pbXBvcnQgeyBOZ2JBY3RpdmVNb2RhbCB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICduZzItdHJhbnNsYXRlJztcblxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFJhaWRDYW5Vc2VkTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2ZXIvaW5kZXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcblxuLyoqXG4gKlxuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZGRSb2xsU2VydmljZSB7XG4gIHB1YmxpYyBpOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHVibGljIHByb21wdEVtaXRTZXJ2aWNlOiBQcm9tcHRFbWl0U2VydmljZSxwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuXG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFkZFJvbGwob2JqKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAvdjEvbHYvY3JlYXRlYDtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsSlNPTi5zdHJpbmdpZnkob2JqKSlcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKSB8fCB7fTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT0gMjAyKSB7XG4gICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQocmVzLmpzb24oKS5jb2RlLnRvU3RyaW5nKCkrJ2x2Y3JlYXRlJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG4gIC8qKlxuICAgKiDplJnor6/lpITnkIZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAvLyBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJNc2cpO1xuICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudC1uZXctcm9sbCcsXG4gIHRlbXBsYXRlVXJsOiAnbW9kYWwtY29udGVudC1uZXctcm9sbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtb2RhbC1jb250ZW50LW5ldy1yb2xsLmNvbXBvbmVudC5jc3MnXSxcbiAgLy8gcHJvdmlkZXJzOiBbTmdGb3JtXSxcbiAgZGlyZWN0aXZlczpbTmdGb3JtXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCdib2R5J11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudE5ld1JvbGwge1xuICBsaWNlbnNlOmFueTtcbiAgZXJyb3I6YW55O1xuICBjb250ZW50OmFueTtcbiAgY3JlYXRlUm9sbE1vZGVsOmFueTtcbiAgbGljZW5zZUVycm1zZzpBcnJheTtcbiAgY29uc3RydWN0b3IocHVibGljIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhZGRSb2xsU2VydmljZTpBZGRSb2xsU2VydmljZSxwdWJsaWMgcHJvbXB0RW1pdFNlcnZpY2U6IFByb21wdEVtaXRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmFpZENhblVzZWRMaXN0U2VydmljZTpSYWlkQ2FuVXNlZExpc3RTZXJ2aWNlLHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG5cbiAgKSB7XG5cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVJvbGxNb2RlbCA9IHtcbiAgICAgICdsdl9uYW1lJzogJycsXG4gICAgICAnbHZfdHlwZSc6ICdkYXRhJyxcbiAgICAgICd2aXJfZHJ2X2lkJzogJycsXG4gICAgICAnbHZfY2FwYWNpdHknOiAnJyxcbiAgICAgICdsdl9jYXBhY2l0eV9udW0nOiAnJyxcbiAgICAgICdsdl9jYXBhY2l0eV91bml0JzogJ0dCJ1xuICAgIH07XG4gICAgdGhpcy5nZXRSYWlkTGlzdEFsbCgpO1xuICB9XG4gIHROZXdSb2xsID0gW1xuICAgICcnLFxuICAgICdSQUlE5ZCN56ewJyxcbiAgICAnUkFJROexu+WeiycsXG4gICAgJ+WuuemHjycsXG4gICAgJ+WPr+eUqOepuumXtCdcbiAgXTtcbiAgcmFpZExpc3RBbGw6YW55O1xuICBiaWdTaXplPScnO1xuICBpbnB1dFR5cGU9Jyc7XG4gIHByb21wdENvbnRlbnQ6YW55O1xuICBjaGVja0NhcGFjaXR5RmxhZzphbnk7XG4gIGJpZ1NpemVOdW06YW55O1xuICBjaGVja0NhcGFjaXR5Q29udGVudDphbnk7XG4gIHByb21wdENvbnRlbnRTdWJtaXQ6YW55O1xuICByb2xsQ2FwYWNpdHk6c3RyaW5nW109WydHQicsJ1RCJ107XG4gIHJvbGxUeXBlPVt7XG4gICAgbmFtZTp0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCfmlbDmja7ljbcnKSxcbiAgICBlbk5hbWU6J2RhdGEnXG4gIH1dO1xuICAvKipcbiAgICog6I635Y+WUkFJROWIl+ihqOS/oeaBr1xuICAgKiBAcGFyYW0gc3RhcnQg5byA5aeL5pWwXG4gICAqIEBwYXJhbSBsaW1pdCDmr4/pobXmmL7npLrnmoTmnaHmlbBcbiAgICovXG4gIGdldFJhaWRMaXN0QWxsKCk6IHZvaWQge1xuICAgIHRoaXMucHJvbXB0Q29udGVudD0n5q2j5Zyo6I635Y+WUkFJROS/oeaBryc7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICB0aGlzLnJhaWRDYW5Vc2VkTGlzdFNlcnZpY2UuZ2V0UmFpZENhblVzZWRMaXN0KClcbiAgICAgIC50aGVuKFxuICAgICAgICByYWlkTGlzdEFsbCA9PiB7XG4gICAgICAgICAgbWUucmFpZExpc3RBbGwgPSByYWlkTGlzdEFsbDtcbiAgICAgICAgICBpZighcmFpZExpc3RBbGwubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0Q29udGVudD0n5b2T5YmN5peg56m66ZeyUkFJRCc7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnByb21wdENvbnRlbnQ9Jyc7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG4gIG9uS2V5dXAodHlwZSl7XG4gICAgdGhpcy5pbnB1dFR5cGUgPSB0eXBlO1xuICAgIHRoaXMuY2hlY2tDYXBhY2l0eUNvbnRlbnQgPSAnJztcbiAgfVxuICBhZGRSb2xsSXRlbShpdGVtKXtcbiAgICB0aGlzLmNyZWF0ZVJvbGxNb2RlbC52aXJfZHJ2X2lkPWl0ZW0udmlyX2Rydl9pZDtcbiAgICBpZihpdGVtLnZnZnJlZT09bnVsbCl7XG4gICAgICB0aGlzLmJpZ1NpemU9dGhpcy50cmFuc2xhdGUuaW5zdGFudCgn5Y+v55So5pyA5aSn5a656YePJykraXRlbS5yYWlkX3NpemU7XG4gICAgICB0aGlzLmJpZ1NpemVOdW09aXRlbS5yYWlkX3NpemU7XG4gICAgfWVsc2UgaWYgKGl0ZW0udmdmcmVlIT09bnVsbCl7XG4gICAgICB0aGlzLmJpZ1NpemU9dGhpcy50cmFuc2xhdGUuaW5zdGFudCgn5Y+v55So5pyA5aSn5a656YePJykraXRlbS52Z2ZyZWU7XG4gICAgICB0aGlzLmJpZ1NpemVOdW09aXRlbS52Z2ZyZWU7XG4gICAgfVxuICB9XG5cblxuICBjaGVja0NhcGFjaXR5KCl7XG4gICAgdGhpcy5jcmVhdGVSb2xsTW9kZWwubHZfY2FwYWNpdHkgPSB0aGlzLmNyZWF0ZVJvbGxNb2RlbC5sdl9jYXBhY2l0eV9udW0gK3RoaXMuY3JlYXRlUm9sbE1vZGVsLmx2X2NhcGFjaXR5X3VuaXQ7XG4gICAgLy8g5Y+v55So5pyA5aSn5a656YePXG4gICAgbGV0IGJpZ1NpemVBcnJOdW1DaGFuZ2U7XG4gICAgbGV0IGJpZ1NpemVBcnIgPSB0aGlzLmJpZ1NpemVOdW0uc3BsaXQoJyAnKTtcbiAgICBsZXQgYmlnU2l6ZUFyck51bSA9IGJpZ1NpemVBcnJbMF07XG4gICAgbGV0IGJpZ1NpemVBcnJVbml0ID0gYmlnU2l6ZUFyclsxXTtcbiAgICBpZihiaWdTaXplQXJyVW5pdCA9PSAnR0InKXtcbiAgICAgIGJpZ1NpemVBcnJOdW1DaGFuZ2UgPSBiaWdTaXplQXJyTnVtKjEwMjQ7XG4gICAgfWVsc2UgaWYgKGJpZ1NpemVBcnJVbml0ID09ICdNQicpe1xuICAgICAgYmlnU2l6ZUFyck51bUNoYW5nZSA9IGJpZ1NpemVBcnJOdW07XG4gICAgfWVsc2UgaWYgKGJpZ1NpemVBcnJVbml0ID09ICdUQicpe1xuICAgICAgYmlnU2l6ZUFyck51bUNoYW5nZSA9IGJpZ1NpemVBcnJOdW0qMTAyNCoxMDI0O1xuICAgIH1lbHNlIGlmIChiaWdTaXplQXJyVW5pdCA9PSAnS0InKXtcbiAgICAgIGJpZ1NpemVBcnJOdW1DaGFuZ2UgPSBiaWdTaXplQXJyTnVtLzEwMjQ7XG4gICAgfVxuXG5cbiAgICAvL+eUqOaIt+i+k+WFpeeahOWAvFxuICAgIGxldCBsdl9jYXBhY2l0eV9udW1fY2hhbmdlO1xuICAgIGlmKHRoaXMuY3JlYXRlUm9sbE1vZGVsLmx2X2NhcGFjaXR5X3VuaXQgPT0gJ0dCJyl7XG4gICAgICBsdl9jYXBhY2l0eV9udW1fY2hhbmdlID0gdGhpcy5jcmVhdGVSb2xsTW9kZWwubHZfY2FwYWNpdHlfbnVtKjEwMjQ7XG4gICAgfWVsc2UgaWYgKHRoaXMuY3JlYXRlUm9sbE1vZGVsLmx2X2NhcGFjaXR5X3VuaXQgPT0gJ01CJyl7XG4gICAgICBsdl9jYXBhY2l0eV9udW1fY2hhbmdlID0gdGhpcy5jcmVhdGVSb2xsTW9kZWwubHZfY2FwYWNpdHlfbnVtO1xuICAgIH1lbHNlIGlmICh0aGlzLmNyZWF0ZVJvbGxNb2RlbC5sdl9jYXBhY2l0eV91bml0ID09ICdUQicpe1xuICAgICAgbHZfY2FwYWNpdHlfbnVtX2NoYW5nZSA9IHRoaXMuY3JlYXRlUm9sbE1vZGVsLmx2X2NhcGFjaXR5X251bSoxMDI0KjEwMjQ7XG4gICAgfWVsc2UgaWYgKHRoaXMuY3JlYXRlUm9sbE1vZGVsLmx2X2NhcGFjaXR5X3VuaXQgPT0gJ0tCJyl7XG4gICAgICBsdl9jYXBhY2l0eV9udW1fY2hhbmdlID0gdGhpcy5jcmVhdGVSb2xsTW9kZWwubHZfY2FwYWNpdHlfbnVtLzEwMjQ7XG4gICAgfVxuXG4gICAgaWYobHZfY2FwYWNpdHlfbnVtX2NoYW5nZTw9MHx8bHZfY2FwYWNpdHlfbnVtX2NoYW5nZT5iaWdTaXplQXJyTnVtQ2hhbmdlKXtcbiAgICAgIHRoaXMuY2hlY2tDYXBhY2l0eUNvbnRlbnQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCfljbflrrnph4/lv4XpobvlpKfkuo4w5bCP5LqO562J5LqOJykrdGhpcy5iaWdTaXplTnVtO1xuICAgICAgdGhpcy5jaGVja0NhcGFjaXR5RmxhZyA9IDE7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tDYXBhY2l0eUZsYWcgPSAwO1xuICB9XG5cbiAgb25Sb2xsU3VibWl0KCkge1xuICAgIHRoaXMuY3JlYXRlUm9sbE1vZGVsLmx2X2NhcGFjaXR5ID0gdGhpcy5jcmVhdGVSb2xsTW9kZWwubHZfY2FwYWNpdHlfbnVtICt0aGlzLmNyZWF0ZVJvbGxNb2RlbC5sdl9jYXBhY2l0eV91bml0O1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgbWUuY2hlY2tDYXBhY2l0eSgpO1xuICAgIGlmKG1lLmNoZWNrQ2FwYWNpdHlGbGFnIT0xKXtcbiAgICAgIHRoaXMucHJvbXB0Q29udGVudFN1Ym1pdCA9IDE7XG4gICAgICB0aGlzLmFkZFJvbGxTZXJ2aWNlLmFkZFJvbGwobWUuY3JlYXRlUm9sbE1vZGVsKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICBkaXNrUmFpZEluZm9MaXN0ID0+IHtcbiAgICAgICAgICAgIGlmKGRpc2tSYWlkSW5mb0xpc3QhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgIGlmKGRpc2tSYWlkSW5mb0xpc3QubHZfY3JlYXRlZCA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ+aPkOekuu+8mua3u+WKoFJvbGzlpLHotKUnKSk7XG4gICAgICAgICAgICAgICAgbWUuYWN0aXZlTW9kYWwuY2xvc2UoJ2ZhaWwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1lbHNlIGlmKGRpc2tSYWlkSW5mb0xpc3QubHZfY3JlYXRlZCA9PSAxKXtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnByb21wdEVtaXRTZXJ2aWNlLmNoYW5nZS5lbWl0KCfmj5DnpLrvvJrmt7vliqBSb2xs5oiQ5YqfJyk7XG5cbiAgICAgICAgICAgICAgICBtZS5hY3RpdmVNb2RhbC5jbG9zZSh7c3RhdHVzOidzdWNjZXNzJyxuYW1lOnRoaXMuY3JlYXRlUm9sbE1vZGVsLmx2X25hbWV9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJvbXB0Q29udGVudFN1Ym1pdCA9IDA7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICB9XG5cblxuXG59XG4iXX0=
