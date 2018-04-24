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
var shared_module_1 = require('../shared/shared.module');
var ng2_translate_1 = require('ng2-translate');
var config_module_1 = require('./config/config.module');
var manage_module_1 = require('./manage/manage.module');
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_module_1.SharedModule, ng_bootstrap_1.NgbModule, config_module_1.ConfigModule, manage_module_1.ManageModule, ng2_translate_1.TranslateModule],
            declarations: [],
            exports: [ng2_translate_1.TranslateModule],
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsNkJBQTBCLDRCQUE0QixDQUFDLENBQUE7QUFDdkQsOEJBQTZCLHlCQUF5QixDQUFDLENBQUE7QUFDdkQsOEJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBR2hELDhCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3RELDhCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBUXREO0lBQUE7SUFBMEIsQ0FBQztJQVAzQjtRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLEVBQUMsNEJBQVksRUFBQyx3QkFBUyxFQUFFLDRCQUFZLEVBQUUsNEJBQVksRUFBQywrQkFBZSxDQUFDO1lBQzFGLFlBQVksRUFBRSxFQUViO1lBQ0QsT0FBTyxFQUFFLENBQUMsK0JBQWUsQ0FBQztTQUMzQixDQUFDOztrQkFBQTtJQUN3QixpQkFBQztBQUFELENBQTFCLEFBQTJCLElBQUE7QUFBZCxrQkFBVSxhQUFJLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuLy8gaW1wb3J0IHsgTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tYW5hZ2UvaW5kZXgnO1xuLy8gaW1wb3J0IHsgQ29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWcvaW5kZXgnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLm1vZHVsZSc7XG5pbXBvcnQgeyBNYW5hZ2VNb2R1bGUgfSBmcm9tICcuL21hbmFnZS9tYW5hZ2UubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2hhcmVkTW9kdWxlLE5nYk1vZHVsZSwgQ29uZmlnTW9kdWxlLCBNYW5hZ2VNb2R1bGUsVHJhbnNsYXRlTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gTWFuYWdlQ29tcG9uZW50LENvbmZpZ0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbVHJhbnNsYXRlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgSG9tZU1vZHVsZSB7IH1cbiJdfQ==
