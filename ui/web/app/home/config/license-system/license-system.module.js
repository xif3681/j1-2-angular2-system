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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var license_system_component_1 = require('./license-system.component');
var shared_module_1 = require('../../../shared/shared.module');
var overview_component_1 = require('./overview/overview.component');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var ng2_translate_1 = require('ng2-translate');
var licence_component_1 = require('./licence/licence.component');
var licence_list_component_1 = require('./licence-list/licence-list.component');
var LicenseSystemModule = (function () {
    function LicenseSystemModule() {
    }
    LicenseSystemModule = __decorate([
        core_1.NgModule({
            imports: [ng2_translate_1.TranslateModule, common_1.CommonModule, shared_module_1.SharedModule, forms_1.FormsModule, ng_bootstrap_1.NgbModule.forRoot()],
            declarations: [license_system_component_1.LicenseSystemComponent, licence_component_1.LicenceComponent, licence_list_component_1.LicenceListComponent, overview_component_1.OverviewComponent],
            exports: [ng2_translate_1.TranslateModule, license_system_component_1.LicenseSystemComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], LicenseSystemModule);
    return LicenseSystemModule;
}());
exports.LicenseSystemModule = LicenseSystemModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy9saWNlbnNlLXN5c3RlbS9saWNlbnNlLXN5c3RlbS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUMvQyxzQkFBNEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUM3Qyx5Q0FBdUMsNEJBQTRCLENBQUMsQ0FBQTtBQUNwRSw4QkFBNkIsK0JBQStCLENBQUMsQ0FBQTtBQUM3RCxtQ0FBa0MsK0JBQStCLENBQUMsQ0FBQTtBQUNsRSw2QkFBMEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN2RCw4QkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFFaEQsa0NBQWlDLDZCQUE2QixDQUFDLENBQUE7QUFDL0QsdUNBQXFDLHVDQUF1QyxDQUFDLENBQUE7QUFVN0U7SUFBQTtJQUFtQyxDQUFDO0lBTnBDO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsK0JBQWUsRUFBQyxxQkFBWSxFQUFDLDRCQUFZLEVBQUMsbUJBQVcsRUFBQyx3QkFBUyxDQUFDLE9BQU8sRUFBRSxDQUF5RTtZQUM1SixZQUFZLEVBQUUsQ0FBQyxpREFBc0IsRUFBQyxvQ0FBZ0IsRUFBQyw2Q0FBb0IsRUFBQyxzQ0FBaUIsQ0FBNEg7WUFDek4sT0FBTyxFQUFFLENBQUMsK0JBQWUsRUFBQyxpREFBc0IsQ0FBK0I7U0FDaEYsQ0FBQzs7MkJBQUE7SUFFaUMsMEJBQUM7QUFBRCxDQUFuQyxBQUFvQyxJQUFBO0FBQXZCLDJCQUFtQixzQkFBSSxDQUFBIiwiZmlsZSI6ImFwcC9ob21lL2NvbmZpZy9saWNlbnNlLXN5c3RlbS9saWNlbnNlLXN5c3RlbS5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTGljZW5zZVN5c3RlbUNvbXBvbmVudCB9IGZyb20gJy4vbGljZW5zZS1zeXN0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IE92ZXJ2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9vdmVydmlldy9vdmVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XG4vLyBpbXBvcnQgeyBDb25maWdOYXZiYXJDb21wb25lbnQgfSBmcm9tICcuLy4uL2NvbmZpZy1uYXZiYXIvY29uZmlnLW5hdmJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGljZW5jZUNvbXBvbmVudCB9IGZyb20gJy4vbGljZW5jZS9saWNlbmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaWNlbmNlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGljZW5jZS1saXN0L2xpY2VuY2UtbGlzdC5jb21wb25lbnQnO1xuLy8gaW1wb3J0IHsgTGljZW5jZUxpc3RDb21wb25lbnQsTGljZW5jZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9saWNlbmNlLWxpc3QvbGljZW5jZS1saXN0LmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1RyYW5zbGF0ZU1vZHVsZSxDb21tb25Nb2R1bGUsU2hhcmVkTW9kdWxlLEZvcm1zTW9kdWxlLE5nYk1vZHVsZS5mb3JSb290KCkvKiBSb3V0ZXJNb2R1bGUuZm9yUm9vdChjb25maWdSb3V0ZXMpLCovLyosIE90aGVyTW9kdWxlLCBMaWNlbmNlTW9kdWxlKi9dLFxuICBkZWNsYXJhdGlvbnM6IFtMaWNlbnNlU3lzdGVtQ29tcG9uZW50LExpY2VuY2VDb21wb25lbnQsTGljZW5jZUxpc3RDb21wb25lbnQsT3ZlcnZpZXdDb21wb25lbnQvKkNvbmZpZ05hdmJhckNvbXBvbmVudCxMaWNlbmNlQ29tcG9uZW50LE92ZXJ2aWV3Q29tcG9uZW50LExpY2VuY2VMaXN0Q29tcG9uZW50LyosIFNoYXJlZE1vZHVsZSxPdGhlck1vZHVsZSxMaWNlbmNlTW9kdWxlKi9dLFxuICBleHBvcnRzOiBbVHJhbnNsYXRlTW9kdWxlLExpY2Vuc2VTeXN0ZW1Db21wb25lbnQvKixPdGhlck1vZHVsZSxMaWNlbmNlTW9kdWxlKi9dXG59KVxuXG5leHBvcnQgY2xhc3MgTGljZW5zZVN5c3RlbU1vZHVsZSB7IH1cbiJdfQ==
