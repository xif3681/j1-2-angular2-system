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
var ngx_cookie_1 = require('ngx-cookie');
var index_1 = require('../../shared/index');
var index_2 = require('../../server/index');
var windowserver_1 = require('../../windowserver');
var ng2_translate_1 = require('ng2-translate');
var NavbarComponent = (function () {
    function NavbarComponent(winRef, modalService, userLoginService, itemUserService, translate, _cookieService) {
        this.winRef = winRef;
        this.modalService = modalService;
        this.userLoginService = userLoginService;
        this.itemUserService = itemUserService;
        this.translate = translate;
        this._cookieService = _cookieService;
        this.select = 'manage';
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
        this.token = currentUser && currentUser.token;
        this.userId = currentUser && currentUser.userId;
        this.getUserItem(this.userId);
        this.curLang = this.winRef.nativeWindow.window.localStorage.lang || 'ch';
    };
    NavbarComponent.prototype.getUserItem = function (id) {
        var _this = this;
        var me = this;
        this.itemUserService.infoItemUser(id)
            .then(function (itemUser) {
            _this.loginName = itemUser.displayName;
        }, function (error) {
            me.error = error;
        });
    };
    NavbarComponent.prototype.setAbout = function () {
        var modalRef1 = this.modalService.open(index_1.ModalContentAbout);
        modalRef1.componentInstance.title = '关于AnyRobot';
    };
    NavbarComponent.prototype.editPassWorld = function () {
        var modalRef1 = this.modalService.open(index_1.EditPassword);
        modalRef1.componentInstance.title = '修改密码';
        modalRef1.componentInstance.userId = this.userId;
    };
    NavbarComponent.prototype.setCurrentLang = function (lang) {
        this.curLang = lang;
        this.translate.use(this.curLang);
        this.winRef.nativeWindow.window.localStorage.lang = this.curLang;
        if (lang == 'tw') {
            document.title = '愛數 AnyRobot';
        }
        else if (lang == 'en') {
            document.title = 'Eisoo AnyRobot';
        }
        else if (lang == 'ch') {
            document.title = '爱数 AnyRobot';
        }
    };
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-navbar',
            templateUrl: 'navbar.component.html',
            styleUrls: ['navbar.component.css'],
        }), 
        __metadata('design:paramtypes', [windowserver_1.WindowRef, ng_bootstrap_1.NgbModal, index_2.UserLoginService, index_2.ItemUserService, ng2_translate_1.TranslateService, ngx_cookie_1.CookieService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbmF2YmFyL25hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUMxQyw2QkFBd0IsNEJBQTRCLENBQUMsQ0FBQTtBQUNyRCwyQkFBOEIsWUFBWSxDQUFDLENBQUE7QUFDM0Msc0JBQThDLG9CQUFvQixDQUFDLENBQUE7QUFDbkUsc0JBQWdELG9CQUFvQixDQUFDLENBQUE7QUFDckUsNkJBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFDN0MsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBVy9DO0lBT0UseUJBQW9CLE1BQWlCLEVBQVMsWUFBc0IsRUFDakQsZ0JBQWlDLEVBQVEsZUFBK0IsRUFDdkUsU0FBMkIsRUFBUyxjQUE0QjtRQUZoRSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQVU7UUFDakQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFRLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUN2RSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFjO1FBQ2xGLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBRXpCLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBRUUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUVoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztJQUM1RSxDQUFDO0lBTUQscUNBQVcsR0FBWCxVQUFZLEVBQUU7UUFBZCxpQkFXQztRQVZFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQzthQUNsQyxJQUFJLENBQ0gsVUFBQSxRQUFRO1lBQ04sS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3hDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixDQUFDLENBQ0YsQ0FBQTtJQUNOLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBQ0UsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMseUJBQWlCLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztJQUNuRCxDQUFDO0lBQ0QsdUNBQWEsR0FBYjtRQUNFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFZLENBQUMsQ0FBQztRQUNyRCxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUUzQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbkQsQ0FBQztJQUtELHdDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDdkIsUUFBUSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztRQUNwQyxDQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ3RCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBdkVIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3BDLENBQUM7O3VCQUFBO0lBb0VGLHNCQUFDO0FBQUQsQ0FsRUEsQUFrRUMsSUFBQTtBQWxFWSx1QkFBZSxrQkFrRTNCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiTW9kYWx9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llJztcbmltcG9ydCB7IE1vZGFsQ29udGVudEFib3V0LEVkaXRQYXNzd29yZH0gZnJvbSAnLi4vLi4vc2hhcmVkL2luZGV4JztcbmltcG9ydCB7IFVzZXJMb2dpblNlcnZpY2UsSXRlbVVzZXJTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2ZXIvaW5kZXgnO1xuaW1wb3J0IHtXaW5kb3dSZWZ9IGZyb20gJy4uLy4uL3dpbmRvd3NlcnZlcic7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIG5hdmlnYXRpb24gYmFyIGNvbXBvbmVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnc2QtbmF2YmFyJyxcbiAgdGVtcGxhdGVVcmw6ICduYXZiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbmF2YmFyLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBOYXZiYXJDb21wb25lbnQge1xuICBzZWxlY3Q6YW55O1xuICB0b2tlbjphbnk7XG4gIHVzZXJJZDphbnk7XG4gIGxvZ2luTmFtZTphbnk7XG4gIGVycm9yOmFueTtcbiAgY3VyTGFuZzphbnk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWYsIHB1YmxpYyBtb2RhbFNlcnZpY2U6IE5nYk1vZGFsLFxuICAgICAgICAgICAgICBwdWJsaWMgdXNlckxvZ2luU2VydmljZTpVc2VyTG9naW5TZXJ2aWNlLHB1YmxpYyBpdGVtVXNlclNlcnZpY2U6SXRlbVVzZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxwcml2YXRlIF9jb29raWVTZXJ2aWNlOkNvb2tpZVNlcnZpY2Upe1xuICAgIHRoaXMuc2VsZWN0ID0gJ21hbmFnZSc7XG5cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBsZXQgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xuICAgIGxldCBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UodGhpcy5fY29va2llU2VydmljZS5nZXRPYmplY3QoJ2N1cnJlbnRVc2VyJykpO1xuICAgIHRoaXMudG9rZW4gPSBjdXJyZW50VXNlciAmJiBjdXJyZW50VXNlci50b2tlbjtcbiAgICB0aGlzLnVzZXJJZCA9IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLnVzZXJJZDtcbiAgICAvLyB0aGlzLmdldFVzZXJJdGVtKHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdy53aW5kb3cudXNlcklkKTtcbiAgICB0aGlzLmdldFVzZXJJdGVtKHRoaXMudXNlcklkKTtcbiAgICB0aGlzLmN1ckxhbmcgID0gdGhpcy53aW5SZWYubmF0aXZlV2luZG93LndpbmRvdy5sb2NhbFN0b3JhZ2UubGFuZyB8fCAnY2gnO1xuICB9XG5cblxuICAvKipcbiAgICog6I635Y+W55So5oi355qE5pi+56S65ZCNXG4gICAqL1xuICBnZXRVc2VySXRlbShpZCkge1xuICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICB0aGlzLml0ZW1Vc2VyU2VydmljZS5pbmZvSXRlbVVzZXIoaWQpXG4gICAgICAgLnRoZW4oXG4gICAgICAgICBpdGVtVXNlciA9PiB7XG4gICAgICAgICAgIHRoaXMubG9naW5OYW1lID0gaXRlbVVzZXIuZGlzcGxheU5hbWU7XG4gICAgICAgICB9LFxuICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICBtZS5lcnJvciA9IGVycm9yO1xuICAgICAgICAgfVxuICAgICAgIClcbiAgfVxuICBzZXRBYm91dCgpOmFueSB7XG4gICAgbGV0IG1vZGFsUmVmMSA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oTW9kYWxDb250ZW50QWJvdXQpO1xuICAgIG1vZGFsUmVmMS5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9ICflhbPkuo5BbnlSb2JvdCc7XG4gIH1cbiAgZWRpdFBhc3NXb3JsZCgpOmFueSB7XG4gICAgbGV0IG1vZGFsUmVmMSA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oRWRpdFBhc3N3b3JkKTtcbiAgICBtb2RhbFJlZjEuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSAn5L+u5pS55a+G56CBJztcbiAgICAvLyBtb2RhbFJlZjEuY29tcG9uZW50SW5zdGFuY2UucGFzc1dvcmQgPSB0aGlzLnBhc3NXb3JkO1xuICAgIG1vZGFsUmVmMS5jb21wb25lbnRJbnN0YW5jZS51c2VySWQgPSB0aGlzLnVzZXJJZDtcbiAgfVxuICAvKipcbiAgICog6K6+572u5b2T5YmN55qE6K+t6KiA77yM5pS+5ZyobG9jYWxTdG9yYWdl6YeM6Z2iXG4gICAqIEBwYXJhbSBsYW5nXG4gICAqL1xuICBzZXRDdXJyZW50TGFuZyhsYW5nKXtcbiAgICB0aGlzLmN1ckxhbmcgPSBsYW5nO1xuICAgIHRoaXMudHJhbnNsYXRlLnVzZSh0aGlzLmN1ckxhbmcpO1xuICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdy53aW5kb3cubG9jYWxTdG9yYWdlLmxhbmcgPSB0aGlzLmN1ckxhbmc7XG4gICAgaWYgKGxhbmcgPT0gJ3R3Jykge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSAn5oSb5pW4IEFueVJvYm90JztcbiAgICB9IGVsc2UgaWYgKGxhbmcgPT0gJ2VuJyl7XG4gICAgICBkb2N1bWVudC50aXRsZSA9ICdFaXNvbyBBbnlSb2JvdCc7XG4gICAgfWVsc2UgaWYgKGxhbmcgPT0gJ2NoJyl7XG4gICAgICBkb2N1bWVudC50aXRsZSA9ICfniLHmlbAgQW55Um9ib3QnO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=
