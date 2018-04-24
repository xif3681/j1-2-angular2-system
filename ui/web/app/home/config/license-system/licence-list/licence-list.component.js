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
var LicenceListComponent = (function () {
    function LicenceListComponent(kittencupService, overviewService, activeModal, licenceListService, modalService, delLicenceService, licenceCountService, productInfoServer) {
        this.kittencupService = kittencupService;
        this.overviewService = overviewService;
        this.activeModal = activeModal;
        this.licenceListService = licenceListService;
        this.modalService = modalService;
        this.delLicenceService = delLicenceService;
        this.licenceCountService = licenceCountService;
        this.productInfoServer = productInfoServer;
        this.tHeadLicenceListNames = [
            '',
            '授权码',
            '类型',
            '有效期',
            '授权流量',
            '状态',
            '操作'
        ];
        this.licenceListAll = [];
        this.showCurPageNum = 10;
        this.showCurPage = 1;
        this.showPage = 1;
        this.getLicenseCountAll();
        this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
        this.getOverviewAll();
        this.getproductInfoMsg();
    }
    LicenceListComponent.prototype.getOverviewAll = function () {
        var _this = this;
        this.overviewService.getOverview()
            .then(function (overviews) {
            _this.overviewAll = overviews;
            _this.kittencupService.change.emit(overviews);
        }, function (error) {
            _this.error = error;
        });
    };
    LicenceListComponent.prototype.getproductInfoMsg = function () {
        var _this = this;
        this.productInfoServer.getproductInfo()
            .then(function (productInfo) {
            _this.productInfo = productInfo;
            _this.productInfoServer.change.emit(productInfo);
        }, function (error) {
            _this.error = error;
        });
    };
    LicenceListComponent.prototype.getLicenceListAll = function (start, limit) {
        var _this = this;
        this.licenceListService.getLicenceList(start, limit)
            .then(function (licenceListAll) {
            if (licenceListAll == '') {
                _this.licenceListAll = [];
            }
            else if (licenceListAll) {
                licenceListAll.map(function (obj) {
                    obj.licenceDetail = 'hide';
                    obj.faCaretType = 'fa-caret-right';
                });
                _this.licenceListAll = licenceListAll;
            }
        }, function (error) {
            _this.error = error;
        });
    };
    LicenceListComponent.prototype.getLicenseCountAll = function () {
        var _this = this;
        var me = this;
        this.licenceCountService.getLicenseCount()
            .then(function (licenseCount) {
            me.licenseCountMe = licenseCount.count;
        }, function (error) {
            _this.error = error;
        });
    };
    LicenceListComponent.prototype.addCode = function () {
        var _this = this;
        var modalRef1 = this.modalService.open(index_1.ModalContentNewCode);
        modalRef1.componentInstance.title = '添加授权码';
        modalRef1.componentInstance.body = '请输入您要添加的授权码，多个授权码以回车键隔开：';
        modalRef1.result.then(function (result) {
            _this.getLicenceListAll((_this.showPage - 1) * _this.showCurPageNum, _this.showCurPageNum);
            _this.getLicenseCountAll();
            _this.getOverviewAll();
            _this.getproductInfoMsg();
        }, function (reason) {
            _this.getLicenceListAll((_this.showPage - 1) * _this.showCurPageNum, _this.showCurPageNum);
            _this.getLicenseCountAll();
            _this.getOverviewAll();
            _this.getproductInfoMsg();
        });
    };
    LicenceListComponent.prototype.seeCode = function () {
        var modalRef2 = this.modalService.open(index_1.ModalContentQrcode);
        modalRef2.componentInstance.title = '查看机器码';
    };
    LicenceListComponent.prototype.actCode = function (item) {
        var _this = this;
        var modalRef3 = this.modalService.open(index_1.ModalContentActiveCode);
        modalRef3.componentInstance.title = '激活授权码';
        modalRef3.componentInstance.body = '请输入授权码对应的激活码';
        modalRef3.componentInstance.serial = item.serial;
        modalRef3.componentInstance.machineCode = item.machineCode;
        modalRef3.result.then(function (result) {
            if (result) {
                _this.getLicenceListAll((_this.showPage - 1) * _this.showCurPageNum, _this.showCurPageNum);
                _this.getOverviewAll();
                _this.getproductInfoMsg();
            }
        }, function (reason) {
        });
    };
    LicenceListComponent.prototype.delCode = function (item) {
        var _this = this;
        if (item.status == 0 || item.status == 2 || item.status == 3) {
            this.delLicenceService.delLicence(item.serial)
                .then(function (delLicenceMe) {
                if (delLicenceMe !== undefined) {
                    _this.getLicenceListAll((_this.showPage - 1) * _this.showCurPageNum, _this.showCurPageNum);
                    _this.getLicenseCountAll();
                    _this.getOverviewAll();
                    _this.getproductInfoMsg();
                }
            }, function (error) {
                _this.error = error;
            });
        }
        else if (item.status == 1) {
            var modalRef4 = this.modalService.open(index_1.ModalContent);
            modalRef4.componentInstance.title = '删除授权码';
            if (item.type == 'test') {
                modalRef4.componentInstance.body = '删除该授权码将导致产品授权失效，您确定要执行此操作吗？';
            }
            else if (item.type == 'daily' || item.type == 'datanode') {
                modalRef4.componentInstance.body = '删除该授权码将导致已授权的代理失效，您确定要执行此操作吗？';
            }
            else if (item.type == 'base') {
                modalRef4.componentInstance.body = '删除该授权码将导致产品授权全部失效，您确定要执行此操作吗？';
            }
            modalRef4.result.then(function (result) {
                if (result) {
                    _this.delLicenceService.delLicence(item.serial)
                        .then(function (delLicenceMe) {
                        if (delLicenceMe !== undefined) {
                            _this.getLicenceListAll((_this.showPage - 1) * _this.showCurPageNum, _this.showCurPageNum);
                            _this.getLicenseCountAll();
                            _this.getOverviewAll();
                            _this.getproductInfoMsg();
                        }
                    }, function (error) {
                        _this.error = error;
                    });
                }
            }, function (reason) {
                return;
            });
        }
    };
    LicenceListComponent.prototype.onCurPageNum = function (num) {
        this.showCurPageNum = parseInt(num);
        this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    };
    LicenceListComponent.prototype.onCurPage = function (num) {
        this.showPage = parseInt(num);
        this.showCurPage = parseInt(num);
        this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    };
    LicenceListComponent.prototype.onPage = function (num) {
        this.showPage = parseInt(num);
        this.showCurPage = parseInt(num);
        this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    };
    LicenceListComponent.prototype.toggleLicenceDetail = function (item) {
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
    LicenceListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-licence-list',
            templateUrl: 'licence-list.component.html',
            styleUrls: ['licence-list.component.css'],
            directives: [index_1.QRCodeComponent],
            providers: [ng_bootstrap_2.NgbAlertConfig, index_1.ModalContent, index_1.ModalContentActiveCode, index_1.ModalContentNewCode,
                index_1.ModalContentQrcode, ng_bootstrap_1.NgbActiveModal, index_1.PaginationAdvanced]
        }), 
        __metadata('design:paramtypes', [index_2.KittencupService, index_2.OverviewService, ng_bootstrap_1.NgbActiveModal, index_2.LicenceListService, ng_bootstrap_1.NgbModal, index_2.DelLicenceService, index_2.LicenceCountService, index_2.ProductInfoServer])
    ], LicenceListComponent);
    return LicenceListComponent;
}());
exports.LicenceListComponent = LicenceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy9saWNlbnNlLXN5c3RlbS9saWNlbmNlLWxpc3QvbGljZW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBQ3pFLDZCQUF1Qyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3BFLHNCQU9PLDBCQUEwQixDQUFDLENBQUE7QUFDbEMsc0JBT08sMEJBQTBCLENBQUMsQ0FBQTtBQUNsQyw2QkFBNkIsNEJBQTRCLENBQUMsQ0FBQTtBQVkxRDtJQTBCRSw4QkFBbUIsZ0JBQWtDLEVBQVUsZUFBZ0MsRUFDNUUsV0FBMkIsRUFBUyxrQkFBc0MsRUFDMUUsWUFBc0IsRUFBUyxpQkFBb0MsRUFDbkUsbUJBQXdDLEVBQVUsaUJBQW9DO1FBSHRGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDNUUsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUMxRSxpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDbkUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUE1QnpHLDBCQUFxQixHQUFHO1lBQ3RCLEVBQUU7WUFDRixLQUFLO1lBQ0wsSUFBSTtZQUNKLEtBQUs7WUFDTCxNQUFNO1lBQ04sSUFBSTtZQUNKLElBQUk7U0FDTCxDQUFDO1FBRUYsbUJBQWMsR0FBVSxFQUFFLENBQUM7UUFXM0IsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQVNuQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJ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Ozs0QkFBQTtJQXFRRiwyQkFBQztBQUFELENBcFFBLEFBb1FDLElBQUE7QUFwUVksNEJBQW9CLHVCQW9RaEMsQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9jb25maWcvbGljZW5zZS1zeXN0ZW0vbGljZW5jZS1saXN0L2xpY2VuY2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEluamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYk1vZGFsLCBOZ2JBY3RpdmVNb2RhbH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHtcbiAgTW9kYWxDb250ZW50LFxuICBNb2RhbENvbnRlbnRBY3RpdmVDb2RlLFxuICBNb2RhbENvbnRlbnROZXdDb2RlLFxuICBNb2RhbENvbnRlbnRRcmNvZGUsXG4gIFBhZ2luYXRpb25BZHZhbmNlZCxcbiAgUVJDb2RlQ29tcG9uZW50XG59IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbmRleCc7XG5pbXBvcnQge1xuICBPdmVydmlld1NlcnZpY2UsXG4gIEtpdHRlbmN1cFNlcnZpY2UsXG4gIExpY2VuY2VMaXN0U2VydmljZSxcbiAgUHJvZHVjdEluZm9TZXJ2ZXIsXG4gIERlbExpY2VuY2VTZXJ2aWNlLFxuICBMaWNlbmNlQ291bnRTZXJ2aWNlXG59IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlci9pbmRleCc7XG5pbXBvcnQge05nYkFsZXJ0Q29uZmlnfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbGljZW5jZS1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICdsaWNlbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbGljZW5jZS1saXN0LmNvbXBvbmVudC5jc3MnXSxcbiAgZGlyZWN0aXZlczogW1FSQ29kZUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW05nYkFsZXJ0Q29uZmlnLCBNb2RhbENvbnRlbnQsIE1vZGFsQ29udGVudEFjdGl2ZUNvZGUsIE1vZGFsQ29udGVudE5ld0NvZGUsXG4gICAgTW9kYWxDb250ZW50UXJjb2RlLCBOZ2JBY3RpdmVNb2RhbCwgUGFnaW5hdGlvbkFkdmFuY2VkXVxufSlcbmV4cG9ydCBjbGFzcyBMaWNlbmNlTGlzdENvbXBvbmVudCB7XG4gIHRIZWFkTGljZW5jZUxpc3ROYW1lcyA9IFtcbiAgICAnJyxcbiAgICAn5o6I5p2D56CBJyxcbiAgICAn57G75Z6LJyxcbiAgICAn5pyJ5pWI5pyfJyxcbiAgICAn5o6I5p2D5rWB6YePJyxcbiAgICAn54q25oCBJyxcbiAgICAn5pON5L2cJ1xuICBdO1xuXG4gIGxpY2VuY2VMaXN0QWxsOiBhbnlbXSA9IFtdO1xuICBlcnJvcjogYW55O1xuICBsaWNlbnNlQ291bnRNZTogYW55O1xuXG4gIHByb21wdDogYW55O1xuICBvdmVydmlld0FsbDogYW55O1xuICBwcm9kdWN0SW5mbzogYW55O1xuICAvKipcbiAgICpcbiAgICog5YiG6aG15Yid5aeL5L+h5oGvXG4gICAqL1xuICBzaG93Q3VyUGFnZU51bTogbnVtYmVyID0gMTA7XG4gIHNob3dDdXJQYWdlOiBudW1iZXIgPSAxO1xuICBzaG93UGFnZTogbnVtYmVyID0gMTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMga2l0dGVuY3VwU2VydmljZTogS2l0dGVuY3VwU2VydmljZSwgcHJpdmF0ZSBvdmVydmlld1NlcnZpY2U6IE92ZXJ2aWV3U2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCwgcHVibGljIGxpY2VuY2VMaXN0U2VydmljZTogTGljZW5jZUxpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgbW9kYWxTZXJ2aWNlOiBOZ2JNb2RhbCwgcHVibGljIGRlbExpY2VuY2VTZXJ2aWNlOiBEZWxMaWNlbmNlU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIGxpY2VuY2VDb3VudFNlcnZpY2U6IExpY2VuY2VDb3VudFNlcnZpY2UsIHByaXZhdGUgcHJvZHVjdEluZm9TZXJ2ZXI6IFByb2R1Y3RJbmZvU2VydmVyKSB7XG4gICAgLyoqXG4gICAgICog5Yid5aeL55qE5pe25YCZ6I635Y+W5L+h5oGvXG4gICAgICovXG4gICAgdGhpcy5nZXRMaWNlbnNlQ291bnRBbGwoKTtcbiAgICB0aGlzLmdldExpY2VuY2VMaXN0QWxsKCh0aGlzLnNob3dQYWdlIC0gMSkgKiB0aGlzLnNob3dDdXJQYWdlTnVtLCB0aGlzLnNob3dDdXJQYWdlTnVtKTtcbiAgICB0aGlzLmdldE92ZXJ2aWV3QWxsKCk7XG4gICAgdGhpcy5nZXRwcm9kdWN0SW5mb01zZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluiuuOWPr+ivgee7n+iuoeS/oeaBr1xuICAgKi9cbiAgZ2V0T3ZlcnZpZXdBbGwoKTogYW55IHtcbiAgICB0aGlzLm92ZXJ2aWV3U2VydmljZS5nZXRPdmVydmlldygpXG4gICAgICAudGhlbihcbiAgICAgICAgb3ZlcnZpZXdzID0+IHtcbiAgICAgICAgICB0aGlzLm92ZXJ2aWV3QWxsID0gb3ZlcnZpZXdzO1xuICAgICAgICAgIHRoaXMua2l0dGVuY3VwU2VydmljZS5jaGFuZ2UuZW1pdChvdmVydmlld3MpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApXG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5Lqn5ZOB5L+h5oGv77yM5bqV6YOo5pi+56S6XG4gICAqL1xuICBnZXRwcm9kdWN0SW5mb01zZygpOiB2b2lkIHtcbiAgICB0aGlzLnByb2R1Y3RJbmZvU2VydmVyLmdldHByb2R1Y3RJbmZvKClcbiAgICAgIC50aGVuKFxuICAgICAgICBwcm9kdWN0SW5mbyA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9kdWN0SW5mbyA9IHByb2R1Y3RJbmZvO1xuICAgICAgICAgIC8v6I635Y+W5Yiw5LmL5ZCO77yM6Lef5pawXG4gICAgICAgICAgdGhpcy5wcm9kdWN0SW5mb1NlcnZlci5jaGFuZ2UuZW1pdChwcm9kdWN0SW5mbyk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuXG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5YiX6KGo5L+h5oGvXG4gICAqIEBwYXJhbSBzdGFydCDlvIDlp4vmlbBcbiAgICogQHBhcmFtIGxpbWl0IOavj+mhteaYvuekuueahOadoeaVsFxuICAgKi9cblxuICBnZXRMaWNlbmNlTGlzdEFsbChzdGFydCwgbGltaXQpOiB2b2lkIHtcbiAgICB0aGlzLmxpY2VuY2VMaXN0U2VydmljZS5nZXRMaWNlbmNlTGlzdChzdGFydCwgbGltaXQpXG4gICAgICAudGhlbihcbiAgICAgICAgbGljZW5jZUxpc3RBbGwgPT4ge1xuICAgICAgICAgIGlmIChsaWNlbmNlTGlzdEFsbCA9PSAnJykge1xuICAgICAgICAgICAgdGhpcy5saWNlbmNlTGlzdEFsbCA9IFtdO1xuICAgICAgICAgIH0gZWxzZSBpZiAobGljZW5jZUxpc3RBbGwpIHtcbiAgICAgICAgICAgIGxpY2VuY2VMaXN0QWxsLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgIG9iai5saWNlbmNlRGV0YWlsID0gJ2hpZGUnO1xuICAgICAgICAgICAgICBvYmouZmFDYXJldFR5cGUgPSAnZmEtY2FyZXQtcmlnaHQnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmxpY2VuY2VMaXN0QWxsID0gbGljZW5jZUxpc3RBbGw7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluaAu+aVsFxuICAgKi9cbiAgZ2V0TGljZW5zZUNvdW50QWxsKCk6IHZvaWQge1xuICAgIGxldCBtZSA9IHRoaXM7XG4gICAgdGhpcy5saWNlbmNlQ291bnRTZXJ2aWNlLmdldExpY2Vuc2VDb3VudCgpXG4gICAgICAudGhlbihcbiAgICAgICAgbGljZW5zZUNvdW50ID0+IHtcbiAgICAgICAgICBtZS5saWNlbnNlQ291bnRNZSA9IGxpY2Vuc2VDb3VudC5jb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIOa3u+WKoOaOiOadg+eggVxuICAgKi9cbiAgYWRkQ29kZSgpIHtcbiAgICBsZXQgbW9kYWxSZWYxID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbENvbnRlbnROZXdDb2RlKTtcbiAgICBtb2RhbFJlZjEuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSAn5re75Yqg5o6I5p2D56CBJztcbiAgICBtb2RhbFJlZjEuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICfor7fovpPlhaXmgqjopoHmt7vliqDnmoTmjojmnYPnoIHvvIzlpJrkuKrmjojmnYPnoIHku6Xlm57ovabplK7pmpTlvIDvvJonO1xuICAgIG1vZGFsUmVmMS5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAvL+eCueWHu+ehruWumuWPlua2iOaMiemSru+8jOmHjeaWsOiOt+WPluWIl+ihqOS/oeaBr1xuICAgICAgdGhpcy5nZXRMaWNlbmNlTGlzdEFsbCgodGhpcy5zaG93UGFnZSAtIDEpICogdGhpcy5zaG93Q3VyUGFnZU51bSwgdGhpcy5zaG93Q3VyUGFnZU51bSk7XG4gICAgICB0aGlzLmdldExpY2Vuc2VDb3VudEFsbCgpO1xuICAgICAgdGhpcy5nZXRPdmVydmlld0FsbCgpO1xuICAgICAgdGhpcy5nZXRwcm9kdWN0SW5mb01zZygpO1xuICAgIH0sIChyZWFzb24pID0+IHtcbiAgICAgIC8v54K55Ye75re75Yqg5oyJ6ZKu77yM6YeN5paw6I635Y+W5YiX6KGo5L+h5oGvXG4gICAgICB0aGlzLmdldExpY2VuY2VMaXN0QWxsKCh0aGlzLnNob3dQYWdlIC0gMSkgKiB0aGlzLnNob3dDdXJQYWdlTnVtLCB0aGlzLnNob3dDdXJQYWdlTnVtKTtcbiAgICAgIHRoaXMuZ2V0TGljZW5zZUNvdW50QWxsKCk7XG4gICAgICB0aGlzLmdldE92ZXJ2aWV3QWxsKCk7XG4gICAgICB0aGlzLmdldHByb2R1Y3RJbmZvTXNnKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5p+l55yL5py65Zmo56CBXG4gICAqL1xuICBzZWVDb2RlKCkge1xuICAgIGxldCBtb2RhbFJlZjIgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsQ29udGVudFFyY29kZSk7XG4gICAgbW9kYWxSZWYyLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gJ+afpeeci+acuuWZqOeggSc7XG4gIH1cblxuICAvKipcbiAgICog5r+A5rS75o6I5p2D56CBXG4gICAqL1xuICBhY3RDb2RlKGl0ZW0pIHtcbiAgICBsZXQgbW9kYWxSZWYzID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihNb2RhbENvbnRlbnRBY3RpdmVDb2RlKTtcbiAgICBtb2RhbFJlZjMuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSAn5r+A5rS75o6I5p2D56CBJztcbiAgICBtb2RhbFJlZjMuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICfor7fovpPlhaXmjojmnYPnoIHlr7nlupTnmoTmv4DmtLvnoIEnO1xuICAgIG1vZGFsUmVmMy5jb21wb25lbnRJbnN0YW5jZS5zZXJpYWwgPSBpdGVtLnNlcmlhbDtcbiAgICBtb2RhbFJlZjMuY29tcG9uZW50SW5zdGFuY2UubWFjaGluZUNvZGUgPSBpdGVtLm1hY2hpbmVDb2RlO1xuICAgIG1vZGFsUmVmMy5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAvL+eCueWHu+a3u+WKoOaMiemSru+8jOmHjeaWsOiOt+WPluWIl+ihqOS/oeaBr1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLmdldExpY2VuY2VMaXN0QWxsKCh0aGlzLnNob3dQYWdlIC0gMSkgKiB0aGlzLnNob3dDdXJQYWdlTnVtLCB0aGlzLnNob3dDdXJQYWdlTnVtKTtcbiAgICAgICAgdGhpcy5nZXRPdmVydmlld0FsbCgpO1xuICAgICAgICB0aGlzLmdldHByb2R1Y3RJbmZvTXNnKCk7XG4gICAgICB9XG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIoOmZpOaOiOadg+eggVxuICAgKi9cbiAgZGVsQ29kZShpdGVtKSB7XG4gICAgLy8wLDIsM+ebtOaOpeWIoOmZpFxuICAgIGlmIChpdGVtLnN0YXR1cyA9PSAwIHx8IGl0ZW0uc3RhdHVzID09IDIgfHwgaXRlbS5zdGF0dXMgPT0gMykge1xuICAgICAgdGhpcy5kZWxMaWNlbmNlU2VydmljZS5kZWxMaWNlbmNlKGl0ZW0uc2VyaWFsKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICBkZWxMaWNlbmNlTWUgPT4ge1xuICAgICAgICAgICAgaWYgKGRlbExpY2VuY2VNZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0TGljZW5jZUxpc3RBbGwoKHRoaXMuc2hvd1BhZ2UgLSAxKSAqIHRoaXMuc2hvd0N1clBhZ2VOdW0sIHRoaXMuc2hvd0N1clBhZ2VOdW0pO1xuICAgICAgICAgICAgICB0aGlzLmdldExpY2Vuc2VDb3VudEFsbCgpO1xuICAgICAgICAgICAgICB0aGlzLmdldE92ZXJ2aWV3QWxsKCk7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0cHJvZHVjdEluZm9Nc2coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpdGVtLnN0YXR1cyA9PSAxKSB7XG4gICAgICAvLzHvvIzlvLnmoYbmj5DnpLpcbiAgICAgIGxldCBtb2RhbFJlZjQgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKE1vZGFsQ29udGVudCk7XG4gICAgICBtb2RhbFJlZjQuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSAn5Yig6Zmk5o6I5p2D56CBJztcbiAgICAgIGlmIChpdGVtLnR5cGUgPT0gJ3Rlc3QnKSB7XG4gICAgICAgIG1vZGFsUmVmNC5jb21wb25lbnRJbnN0YW5jZS5ib2R5ID0gJ+WIoOmZpOivpeaOiOadg+eggeWwhuWvvOiHtOS6p+WTgeaOiOadg+WkseaViO+8jOaCqOehruWumuimgeaJp+ihjOatpOaTjeS9nOWQl++8nyc7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVtLnR5cGUgPT0gJ2RhaWx5JyB8fCBpdGVtLnR5cGUgPT0gJ2RhdGFub2RlJykge1xuICAgICAgICBtb2RhbFJlZjQuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICfliKDpmaTor6XmjojmnYPnoIHlsIblr7zoh7Tlt7LmjojmnYPnmoTku6PnkIblpLHmlYjvvIzmgqjnoa7lrpropoHmiafooYzmraTmk43kvZzlkJfvvJ8nO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlbS50eXBlID09ICdiYXNlJykge1xuICAgICAgICBtb2RhbFJlZjQuY29tcG9uZW50SW5zdGFuY2UuYm9keSA9ICfliKDpmaTor6XmjojmnYPnoIHlsIblr7zoh7Tkuqflk4HmjojmnYPlhajpg6jlpLHmlYjvvIzmgqjnoa7lrpropoHmiafooYzmraTmk43kvZzlkJfvvJ8nO1xuICAgICAgfVxuICAgICAgbW9kYWxSZWY0LnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgLy/ngrnlh7vnoa7lrprmjInpkq7nmoTml7blgJnvvIzlj5HpgIHliKDpmaTor7fmsYJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHRoaXMuZGVsTGljZW5jZVNlcnZpY2UuZGVsTGljZW5jZShpdGVtLnNlcmlhbClcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICBkZWxMaWNlbmNlTWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkZWxMaWNlbmNlTWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMaWNlbmNlTGlzdEFsbCgodGhpcy5zaG93UGFnZSAtIDEpICogdGhpcy5zaG93Q3VyUGFnZU51bSwgdGhpcy5zaG93Q3VyUGFnZU51bSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmdldExpY2Vuc2VDb3VudEFsbCgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRPdmVydmlld0FsbCgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRwcm9kdWN0SW5mb01zZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSwgKHJlYXNvbikgPT4ge1xuICAgICAgICByZXR1cm47XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvL+WIhumhtVxuICAvL+mAieaLqeavj+mhteaYvuekuueahOadoeaVsFxuICBvbkN1clBhZ2VOdW0obnVtKTogdm9pZCB7XG4gICAgdGhpcy5zaG93Q3VyUGFnZU51bSA9IHBhcnNlSW50KG51bSk7XG4gICAgLy/ojrflj5blvZPliY3pobXmmL7npLrnmoTkv6Hmga/vvIjlkI7lj7Dojrflj5bvvIlcbiAgICB0aGlzLmdldExpY2VuY2VMaXN0QWxsKCh0aGlzLnNob3dQYWdlIC0gMSkgKiB0aGlzLnNob3dDdXJQYWdlTnVtLCB0aGlzLnNob3dDdXJQYWdlTnVtKTtcbiAgfVxuXG4gIC8v6Lez6L2s6Iez55qE6aG15pWwXG4gIG9uQ3VyUGFnZShudW0pOiB2b2lkIHtcbiAgICB0aGlzLnNob3dQYWdlID0gcGFyc2VJbnQobnVtKTtcbiAgICB0aGlzLnNob3dDdXJQYWdlID0gcGFyc2VJbnQobnVtKTtcbiAgICB0aGlzLmdldExpY2VuY2VMaXN0QWxsKCh0aGlzLnNob3dQYWdlIC0gMSkgKiB0aGlzLnNob3dDdXJQYWdlTnVtLCB0aGlzLnNob3dDdXJQYWdlTnVtKTtcbiAgfVxuXG4gIC8v54K55Ye75pi+56S655qE6aG15pWwXG4gIG9uUGFnZShudW0pOiB2b2lkIHtcbiAgICB0aGlzLnNob3dQYWdlID0gcGFyc2VJbnQobnVtKTtcbiAgICB0aGlzLnNob3dDdXJQYWdlID0gcGFyc2VJbnQobnVtKTtcblxuICAgIHRoaXMuZ2V0TGljZW5jZUxpc3RBbGwoKHRoaXMuc2hvd1BhZ2UgLSAxKSAqIHRoaXMuc2hvd0N1clBhZ2VOdW0sIHRoaXMuc2hvd0N1clBhZ2VOdW0pO1xuICB9XG5cbiAgLy/ngrnlh7vlh7rnjrDmjojmnYPnoIHnmoTor6bmg4VcbiAgdG9nZ2xlTGljZW5jZURldGFpbChpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZmFDYXJldFR5cGUgPT0gJ2ZhLWNhcmV0LWRvd24nIHx8IGl0ZW0uZmFDYXJldFR5cGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpdGVtLmZhQ2FyZXRUeXBlID0gJ2ZhLWNhcmV0LXJpZ2h0J1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtLmZhQ2FyZXRUeXBlID0gJ2ZhLWNhcmV0LWRvd24nXG4gICAgfVxuICAgIGlmIChpdGVtLmxpY2VuY2VEZXRhaWwgPT0gJ3Nob3cnIHx8IGl0ZW0ubGljZW5jZURldGFpbCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZW0ubGljZW5jZURldGFpbCA9ICdoaWRlJ1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtLmxpY2VuY2VEZXRhaWwgPSAnc2hvdydcbiAgICB9XG4gIH1cblxufVxuIl19
