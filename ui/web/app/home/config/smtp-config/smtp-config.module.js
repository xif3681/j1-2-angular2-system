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
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var shared_module_1 = require('../../../shared/shared.module');
var index_1 = require('./index');
var ng2_translate_1 = require('ng2-translate');
var SMTPConfigModule = (function () {
    function SMTPConfigModule() {
    }
    SMTPConfigModule = __decorate([
        core_1.NgModule({
            imports: [ng2_translate_1.TranslateModule, common_1.CommonModule, shared_module_1.SharedModule, ng_bootstrap_1.NgbModule],
            declarations: [
                index_1.SMTPConfigComponent
            ],
            exports: [ng2_translate_1.TranslateModule, index_1.SMTPConfigComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], SMTPConfigModule);
    return SMTPConfigModule;
}());
exports.SMTPConfigModule = SMTPConfigModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy9zbXRwLWNvbmZpZy9zbXRwLWNvbmZpZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUMvQyw2QkFBMEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN2RCw4QkFBNkIsK0JBQStCLENBQUMsQ0FBQTtBQUM3RCxzQkFBb0MsU0FBUyxDQUFDLENBQUE7QUFFOUMsOEJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBUWhEO0lBQUE7SUFBZ0MsQ0FBQztJQVBqQztRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLCtCQUFlLEVBQUMscUJBQVksRUFBQyw0QkFBWSxFQUFDLHdCQUFTLENBQUM7WUFDOUQsWUFBWSxFQUFFO2dCQUNaLDJCQUFtQjthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDLCtCQUFlLEVBQUMsMkJBQW1CLENBQUM7U0FDL0MsQ0FBQzs7d0JBQUE7SUFDOEIsdUJBQUM7QUFBRCxDQUFoQyxBQUFpQyxJQUFBO0FBQXBCLHdCQUFnQixtQkFBSSxDQUFBIiwiZmlsZSI6ImFwcC9ob21lL2NvbmZpZy9zbXRwLWNvbmZpZy9zbXRwLWNvbmZpZy5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFNNVFBDb25maWdDb21wb25lbnQgfSBmcm9tICcuL2luZGV4Jztcbi8vaW1wb3J0IHsgU01UUENvbXBvbmVudCB9IGZyb20gJy4vdXNlci9pbmRleCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICduZzItdHJhbnNsYXRlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xhdGVNb2R1bGUsQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxOZ2JNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTTVRQQ29uZmlnQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtUcmFuc2xhdGVNb2R1bGUsU01UUENvbmZpZ0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFNNVFBDb25maWdNb2R1bGUgeyB9XG4iXX0=
