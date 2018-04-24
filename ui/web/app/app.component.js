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
var index_1 = require('./shared/index');
require('./operators');
var http_1 = require('@angular/http');
var monitoring_service_1 = require('./monitoring.service');
var windowserver_1 = require('./windowserver');
var ng2_translate_1 = require('ng2-translate');
var AppComponent = (function () {
    function AppComponent(winRef, monitoring, http, translate) {
        this.winRef = winRef;
        this.monitoring = monitoring;
        this.http = http;
        this.translate = translate;
        console.log('Environment config', index_1.Config);
        console.log('Window object', winRef.nativeWindow);
        var lang = winRef.nativeWindow.window.localStorage.lang || 'ch';
        winRef.nativeWindow.window.localStorage.lang = lang;
        translate.addLangs(["ch", "tw", "en"]);
        translate.setDefaultLang(lang);
        translate.use(lang.match(/en|tw|ch/) ? lang : 'ch');
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-app',
            templateUrl: 'app.component.html',
            styles: ["\n    :host{\n        display: block;\n        height: inherit;\n    }\n  "],
        }), 
        __metadata('design:paramtypes', [windowserver_1.WindowRef, monitoring_service_1.MonitoringService, http_1.Http, ng2_translate_1.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMEIsZUFBZSxDQUFDLENBQUE7QUFDMUMsc0JBQXVCLGdCQUFnQixDQUFDLENBQUE7QUFDeEMsUUFBTyxhQUFhLENBQUMsQ0FBQTtBQUNyQixxQkFBbUIsZUFBZSxDQUFDLENBQUE7QUFDbkMsbUNBQWdDLHNCQUFzQixDQUFDLENBQUE7QUFDdkQsNkJBQXdCLGdCQUFnQixDQUFDLENBQUE7QUFDekMsOEJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBaUIvQztJQUNFLHNCQUFvQixNQUFpQixFQUFVLFVBQTRCLEVBQVMsSUFBUyxFQUFTLFNBQTJCO1FBQTdHLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQUs7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUUvSCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGNBQU0sQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNoRSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNwRCxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQWV0RCxDQUFDO0lBcENIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLE1BQU0sRUFBQyxDQUFDLDRFQUtQLENBQUM7U0FDSCxDQUFDOztvQkFBQTtJQTJCRixtQkFBQztBQUFELENBekJBLEFBeUJDLElBQUE7QUF6Qlksb0JBQVksZUF5QnhCLENBQUEiLCJmaWxlIjoiYXBwL2FwcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vc2hhcmVkL2luZGV4JztcbmltcG9ydCAnLi9vcGVyYXRvcnMnO1xuaW1wb3J0IHtIdHRwfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7TW9uaXRvcmluZ1NlcnZpY2V9IGZyb20gJy4vbW9uaXRvcmluZy5zZXJ2aWNlJztcbmltcG9ydCB7V2luZG93UmVmfSBmcm9tICcuL3dpbmRvd3NlcnZlcic7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIG1haW4gYXBwbGljYXRpb24gY29tcG9uZW50LiBXaXRoaW4gdGhlIEBSb3V0ZXMgYW5ub3RhdGlvbiBpcyB0aGUgY29uZmlndXJhdGlvbiBvZiB0aGVcbiAqIGFwcGxpY2F0aW9ucyByb3V0ZXMsIGNvbmZpZ3VyaW5nIHRoZSBwYXRocyBmb3IgdGhlIGxhenkgbG9hZGVkIGNvbXBvbmVudHMgKE1hbmFnZUNvbXBvbmVudCwgQ29uZmlnQ29tcG9uZW50KS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnc2QtYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICdhcHAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6W2BcbiAgICA6aG9zdHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICB9XG4gIGBdLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWYsIHByaXZhdGUgbW9uaXRvcmluZzpNb25pdG9yaW5nU2VydmljZSxwcml2YXRlIGh0dHA6SHR0cCxwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuXG4gICAgY29uc29sZS5sb2coJ0Vudmlyb25tZW50IGNvbmZpZycsIENvbmZpZyk7XG4gICAgY29uc29sZS5sb2coJ1dpbmRvdyBvYmplY3QnLCB3aW5SZWYubmF0aXZlV2luZG93KTtcbiAgICBsZXQgbGFuZyA9IHdpblJlZi5uYXRpdmVXaW5kb3cud2luZG93LmxvY2FsU3RvcmFnZS5sYW5nIHx8ICdjaCc7XG4gICAgd2luUmVmLm5hdGl2ZVdpbmRvdy53aW5kb3cubG9jYWxTdG9yYWdlLmxhbmcgPSBsYW5nO1xuICAgIHRyYW5zbGF0ZS5hZGRMYW5ncyhbXCJjaFwiLFwidHdcIiwgXCJlblwiXSk7XG4gICAgdHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKGxhbmcpO1xuICAgIHRyYW5zbGF0ZS51c2UobGFuZy5tYXRjaCgvZW58dHd8Y2gvKSA/IGxhbmcgOiAnY2gnKTtcblxuXG5cbiAgICAvLyAvL2xvY2FsU3RvcmFnZS5sYW5nICDmnaXlrZjlgqjnlKjmiLfkuIrkuIDmrKHpgInmi6nnmoTor63oqIAs5aaC5p6c55So5oi35piv56ys5LiA5qyh55m75b2VLOm7mOiupOaYvuekuuS4reaWh1xuICAgIC8vIHZhciBsYW5nID0gd2luZG93LmxvY2FsU3RvcmFnZS5sYW5nIHx8ICd6aC1jbic7XG4gICAgLy8gd2luZG93LmxvY2FsU3RvcmFnZS5sYW5nID0gbGFuZztcbiAgICAvLyAkdHJhbnNsYXRlUHJvdmlkZXIucHJlZmVycmVkTGFuZ3VhZ2UobGFuZyk7XG4gICAgLy8gJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZUxvYWRlcignJHRyYW5zbGF0ZVBhcnRpYWxMb2FkZXInLCB7XG4gICAgLy8gICB1cmxUZW1wbGF0ZTogJ3twYXJ0fS9pMThuL3tsYW5nfS5qc29uJ1xuICAgIC8vIH0pO1xuICAgIC8vIC8vIEVuYWJsZSBlc2NhcGluZyBvZiBIVE1MXG4gICAgLy8gLy8gJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVNhbml0aXplVmFsdWVTdHJhdGVneSgnc2FuaXRpemUnKTtcbiAgICAvLyAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KG51bGwpO1xuICAgIC8vICR0cmFuc2xhdGVQcm92aWRlci5mYWxsYmFja0xhbmd1YWdlKCdlbi11cycpO1xuICB9XG59XG4iXX0=
