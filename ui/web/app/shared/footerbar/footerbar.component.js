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
var index_1 = require('../../server/index');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var FooterbarComponent = (function () {
    function FooterbarComponent(productInfoServer, versionInfoService) {
        var _this = this;
        this.productInfoServer = productInfoServer;
        this.versionInfoService = versionInfoService;
        this.productInfo = {};
        productInfoServer.change.subscribe(function (value) {
            _this.productInfo = value;
        });
        this.getproductInfoMsg();
        this.getVersionInfo();
        var myDate = new Date();
        this.fullYear = myDate.getFullYear();
    }
    FooterbarComponent.prototype.getproductInfoMsg = function () {
        var _this = this;
        this.productInfoServer.getproductInfo()
            .then(function (productInfo) {
            _this.productInfo = productInfo;
        }, function (error) {
            _this.error = error;
        });
    };
    FooterbarComponent.prototype.getVersionInfo = function () {
        var _this = this;
        var me = this;
        this.versionInfoService.getVersion()
            .then(function (versionInfo) {
            me.versionInfo = versionInfo;
        }, function (error) {
            _this.error = error;
        });
    };
    FooterbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ab-footerbar',
            templateUrl: 'footerbar.component.html',
            styleUrls: ['footerbar.component.css']
        }), 
        __metadata('design:paramtypes', [index_1.ProductInfoServer, index_1.VersionInfoService])
    ], FooterbarComponent);
    return FooterbarComponent;
}());
exports.FooterbarComponent = FooterbarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvZm9vdGVyYmFyL2Zvb3RlcmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE2QyxlQUFlLENBQUMsQ0FBQTtBQUM3RCxzQkFBcUQsb0JBQW9CLENBQUMsQ0FBQTtBQUMxRSxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFDbkMsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBYXJDO0lBTUUsNEJBQW9CLGlCQUFtQyxFQUFRLGtCQUFxQztRQU50RyxpQkEyQ0M7UUFyQ3FCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBTHBHLGdCQUFXLEdBQUcsRUFDYixDQUFDO1FBS0EsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVk7WUFDOUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsOENBQWlCLEdBQWpCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFO2FBQ3BDLElBQUksQ0FDSCxVQUFBLFdBQVc7WUFDVCxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUNGLENBQUE7SUFFTCxDQUFDO0lBSUQsMkNBQWMsR0FBZDtRQUFBLGlCQVdDO1FBVkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTthQUNqQyxJQUFJLENBQ0gsVUFBQSxXQUFXO1lBQ1QsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FDRixDQUFBO0lBQ0wsQ0FBQztJQWpESDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDOzswQkFBQTtJQTZDRix5QkFBQztBQUFELENBM0NBLEFBMkNDLElBQUE7QUEzQ1ksMEJBQWtCLHFCQTJDOUIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL2Zvb3RlcmJhci9mb290ZXJiYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCAsSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdEluZm9TZXJ2ZXIsVmVyc2lvbkluZm9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGZvciBkZWJ1Z2dpbmdcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIHRvb2xiYXIgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhYi1mb290ZXJiYXInLFxuICB0ZW1wbGF0ZVVybDogJ2Zvb3RlcmJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb290ZXJiYXIuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgRm9vdGVyYmFyQ29tcG9uZW50IHtcbiAgcHJvZHVjdEluZm8gPSB7XG4gIH07XG4gIGVycm9yOmFueTtcbiAgZnVsbFllYXI6YW55O1xuICB2ZXJzaW9uSW5mbzphbnk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvZHVjdEluZm9TZXJ2ZXI6UHJvZHVjdEluZm9TZXJ2ZXIscHVibGljIHZlcnNpb25JbmZvU2VydmljZTpWZXJzaW9uSW5mb1NlcnZpY2UpIHtcbiAgICBwcm9kdWN0SW5mb1NlcnZlci5jaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZTpudW1iZXIpPT57XG4gICAgICB0aGlzLnByb2R1Y3RJbmZvID0gdmFsdWU7XG4gICAgfSk7XG4gICAgLy/liJ3lp4vljJbnmoTml7blgJnojrflj5bkv6Hmga9cbiAgICB0aGlzLmdldHByb2R1Y3RJbmZvTXNnKCk7XG4gICAgdGhpcy5nZXRWZXJzaW9uSW5mbygpO1xuICAgIGxldCBteURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuZnVsbFllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKTsgLy/ojrflj5blrozmlbTnmoTlubTku70oNOS9jSwxOTcwLT8/Pz8pXG4gIH1cbiAgZ2V0cHJvZHVjdEluZm9Nc2coKTp2b2lke1xuICAgIHRoaXMucHJvZHVjdEluZm9TZXJ2ZXIuZ2V0cHJvZHVjdEluZm8oKVxuICAgICAgLnRoZW4oXG4gICAgICAgIHByb2R1Y3RJbmZvID0+IHtcbiAgICAgICAgICB0aGlzLnByb2R1Y3RJbmZvID0gcHJvZHVjdEluZm87XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIClcblxuICB9XG4gIC8qKlxuICAgKiDojrflj5bniYjmnKzkv6Hmga/kv6Hmga9cbiAgICovXG4gIGdldFZlcnNpb25JbmZvKCk6dm9pZHtcbiAgICBsZXQgbWUgPSB0aGlzO1xuICAgIHRoaXMudmVyc2lvbkluZm9TZXJ2aWNlLmdldFZlcnNpb24oKVxuICAgICAgLnRoZW4oXG4gICAgICAgIHZlcnNpb25JbmZvID0+IHtcbiAgICAgICAgICBtZS52ZXJzaW9uSW5mbyA9IHZlcnNpb25JbmZvO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICApXG4gIH1cbn1cblxuIl19
