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
var config_component_1 = require('./config.component');
var user_system_module_1 = require('./user-system/user-system.module');
var smtp_config_module_1 = require('./smtp-config/smtp-config.module');
var shared_module_1 = require('../../shared/shared.module');
var ng2_translate_1 = require('ng2-translate');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var config_navbar_component_1 = require('./config-navbar/config-navbar.component');
var ConfigModule = (function () {
    function ConfigModule() {
    }
    ConfigModule = __decorate([
        core_1.NgModule({
            imports: [ng2_translate_1.TranslateModule, common_1.CommonModule, shared_module_1.SharedModule, forms_1.FormsModule, user_system_module_1.UserSystemModule, smtp_config_module_1.SMTPConfigModule, ng_bootstrap_1.NgbModule.forRoot()],
            declarations: [config_component_1.ConfigComponent, config_navbar_component_1.ConfigNavbarComponent],
            exports: [ng2_translate_1.TranslateModule, config_component_1.ConfigComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ConfigModule);
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy9jb25maWcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0Msc0JBQTRCLGdCQUFnQixDQUFDLENBQUE7QUFDN0MsaUNBQWdDLG9CQUFvQixDQUFDLENBQUE7QUFDckQsbUNBQWlDLGtDQUFrQyxDQUFDLENBQUE7QUFJcEUsbUNBQWlDLGtDQUFrQyxDQUFDLENBQUE7QUFDcEUsOEJBQTZCLDRCQUE0QixDQUFDLENBQUE7QUFDMUQsOEJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBRWhELDZCQUEwQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3ZELHdDQUFzQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBV2hGO0lBQUE7SUFBNEIsQ0FBQztJQU43QjtRQUFDLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLCtCQUFlLEVBQUMscUJBQVksRUFBQyw0QkFBWSxFQUFDLG1CQUFXLEVBQUMscUNBQWdCLEVBQUMscUNBQWdCLEVBQUMsd0JBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0SCxZQUFZLEVBQUUsQ0FBQyxrQ0FBZSxFQUFDLCtDQUFxQixDQUE2RDtZQUNqSCxPQUFPLEVBQUUsQ0FBQywrQkFBZSxFQUFDLGtDQUFlLENBQUM7U0FDN0MsQ0FBQzs7b0JBQUE7SUFFMEIsbUJBQUM7QUFBRCxDQUE1QixBQUE2QixJQUFBO0FBQWhCLG9CQUFZLGVBQUksQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9jb25maWcvY29uZmlnLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb25maWdDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclN5c3RlbU1vZHVsZSB9IGZyb20gJy4vdXNlci1zeXN0ZW0vdXNlci1zeXN0ZW0ubW9kdWxlJztcbmltcG9ydCB7IFVzZXJTeXN0ZW1Db21wb25lbnQgfSBmcm9tICcuL3VzZXItc3lzdGVtL3VzZXItc3lzdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaWNlbnNlU3lzdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9saWNlbnNlLXN5c3RlbS9saWNlbnNlLXN5c3RlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU01UUENvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vc210cC1jb25maWcvc210cC1jb25maWcuY29tcG9uZW50JztcbmltcG9ydCB7IFNNVFBDb25maWdNb2R1bGUgfSBmcm9tICcuL3NtdHAtY29uZmlnL3NtdHAtY29uZmlnLm1vZHVsZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICduZzItdHJhbnNsYXRlJztcbi8vIGltcG9ydCB7IE92ZXJ2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9saWNlbnNlLXN5c3RlbS9vdmVydmlldy9vdmVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgQ29uZmlnTmF2YmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWctbmF2YmFyL2NvbmZpZy1uYXZiYXIuY29tcG9uZW50Jztcbi8vIGltcG9ydCB7IExpY2VuY2VDb21wb25lbnQgfSBmcm9tICcuL2xpY2Vuc2Utc3lzdGVtL2xpY2VuY2UvbGljZW5jZS5jb21wb25lbnQnO1xuLy8gaW1wb3J0IHsgTGljZW5jZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpY2Vuc2Utc3lzdGVtL2xpY2VuY2UtbGlzdC9saWNlbmNlLWxpc3QuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtUcmFuc2xhdGVNb2R1bGUsQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxGb3Jtc01vZHVsZSxVc2VyU3lzdGVtTW9kdWxlLFNNVFBDb25maWdNb2R1bGUsTmdiTW9kdWxlLmZvclJvb3QoKV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ29uZmlnQ29tcG9uZW50LENvbmZpZ05hdmJhckNvbXBvbmVudC8qLExpY2VuY2VDb21wb25lbnQsT3ZlcnZpZXdDb21wb25lbnQsTGljZW5jZUxpc3RDb21wb25lbnQqL10sXG4gICAgZXhwb3J0czogW1RyYW5zbGF0ZU1vZHVsZSxDb25maWdDb21wb25lbnRdXG59KVxuXG5leHBvcnQgY2xhc3MgQ29uZmlnTW9kdWxlIHsgfVxuIl19
