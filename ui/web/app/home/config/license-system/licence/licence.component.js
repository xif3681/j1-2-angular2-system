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
var licence_list_component_1 = require('../licence-list/licence-list.component');
var index_1 = require('../../../../server/index');
var LicenceComponent = (function () {
    function LicenceComponent(productInfoServer) {
        this.productInfoServer = productInfoServer;
    }
    LicenceComponent.prototype.onCarChange = function (a) {
        this.b = a;
    };
    LicenceComponent.prototype.ngOnInit = function () {
        this.getProductInfoMe();
    };
    LicenceComponent.prototype.getProductInfoMe = function () {
        var _this = this;
        this.PendStatus = 1;
        this.productInfoServer.getproductInfo()
            .then(function (overviews) {
            _this.PendStatus = 0;
        }, function (error) {
        });
    };
    LicenceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-licence',
            templateUrl: 'licence.component.html',
            styleUrls: ['licence.component.css'],
            directives: [licence_list_component_1.LicenceListComponent]
        }), 
        __metadata('design:paramtypes', [index_1.ProductInfoServer])
    ], LicenceComponent);
    return LicenceComponent;
}());
exports.LicenceComponent = LicenceComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy9saWNlbnNlLXN5c3RlbS9saWNlbmNlL2xpY2VuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMEIsZUFBZSxDQUFDLENBQUE7QUFDMUMsdUNBQW1DLHdDQUF3QyxDQUFDLENBQUE7QUFDNUUsc0JBQWlDLDBCQUEwQixDQUFDLENBQUE7QUFXNUQ7SUFRRSwwQkFBbUIsaUJBQW1DO1FBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDdEQsQ0FBQztJQU5ELHNDQUFXLEdBQVgsVUFBWSxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFYixDQUFDO0lBSUQsbUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFNRCwyQ0FBZ0IsR0FBaEI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUU7YUFDcEMsSUFBSSxDQUNILFVBQUEsU0FBUztZQUNQLEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsRUFDRCxVQUFBLEtBQUs7UUFDTCxDQUFDLENBQ0YsQ0FBQTtJQUNMLENBQUM7SUFuQ0g7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsVUFBVSxFQUFFLENBQUMsNkNBQW9CLENBQUM7U0FDbkMsQ0FBQzs7d0JBQUE7SUE4QkYsdUJBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBO0FBN0JZLHdCQUFnQixtQkE2QjVCLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvY29uZmlnL2xpY2Vuc2Utc3lzdGVtL2xpY2VuY2UvbGljZW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TGljZW5jZUxpc3RDb21wb25lbnR9IGZyb20gJy4uL2xpY2VuY2UtbGlzdC9saWNlbmNlLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RJbmZvU2VydmVyfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXIvaW5kZXgnO1xuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIGxhenkgbG9hZGVkIExpY2VuY2VDb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FyLWxpY2VuY2UnLFxuICB0ZW1wbGF0ZVVybDogJ2xpY2VuY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbGljZW5jZS5jb21wb25lbnQuY3NzJ10sXG4gIGRpcmVjdGl2ZXM6IFtMaWNlbmNlTGlzdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTGljZW5jZUNvbXBvbmVudCB7XG4gIGI6YW55O1xuICBQZW5kU3RhdHVzOmFueTtcbiAgb25DYXJDaGFuZ2UoYSk6dm9pZHtcbiAgICB0aGlzLmIgPSBhO1xuXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvZHVjdEluZm9TZXJ2ZXI6UHJvZHVjdEluZm9TZXJ2ZXIgKSB7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRQcm9kdWN0SW5mb01lKCk7XG4gIH1cblxuICAvKipcbiAgICog5Y+R6L+Z5p2h5raI5oGv55So5p2l5rWL6K+VbWFuYWdl5pyN5Yqh5piv5ZCm5Y+v5Lul5L2/55SoXG4gICAqIOe7meeVjOmdoui/meadoeaPkOekuuS/oeaBryDigJxtYW5hZ2Ug5a655Zmo5byC5bi477yM6K+35Yiw5a655Zmo5LiO5pyN5Yqh6aG16Z2i6YeN5ZCv4oCdXG4gICAqL1xuICBnZXRQcm9kdWN0SW5mb01lKCk6dm9pZHtcbiAgICB0aGlzLlBlbmRTdGF0dXMgPSAxO1xuICAgIHRoaXMucHJvZHVjdEluZm9TZXJ2ZXIuZ2V0cHJvZHVjdEluZm8oKVxuICAgICAgLnRoZW4oXG4gICAgICAgIG92ZXJ2aWV3cyA9PiB7XG4gICAgICAgICAgdGhpcy5QZW5kU3RhdHVzID0gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB9XG4gICAgICApXG4gIH1cbn1cbiJdfQ==
