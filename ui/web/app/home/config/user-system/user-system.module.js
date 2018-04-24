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
var index_2 = require('./user/index');
var ng2_translate_1 = require('ng2-translate');
var UserSystemModule = (function () {
    function UserSystemModule() {
    }
    UserSystemModule = __decorate([
        core_1.NgModule({
            imports: [ng2_translate_1.TranslateModule, common_1.CommonModule, shared_module_1.SharedModule, ng_bootstrap_1.NgbModule],
            declarations: [
                index_1.UserSystemComponent, index_2.UserComponent
            ],
            exports: [ng2_translate_1.TranslateModule, index_1.UserSystemComponent, index_2.UserComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], UserSystemModule);
    return UserSystemModule;
}());
exports.UserSystemModule = UserSystemModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy91c2VyLXN5c3RlbS91c2VyLXN5c3RlbS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUMvQyw2QkFBMEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN2RCw4QkFBNkIsK0JBQStCLENBQUMsQ0FBQTtBQUM3RCxzQkFBb0MsU0FBUyxDQUFDLENBQUE7QUFDOUMsc0JBQThCLGNBQWMsQ0FBQyxDQUFBO0FBQzdDLDhCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQVFoRDtJQUFBO0lBQWdDLENBQUM7SUFQakM7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQywrQkFBZSxFQUFDLHFCQUFZLEVBQUMsNEJBQVksRUFBQyx3QkFBUyxDQUFDO1lBQzlELFlBQVksRUFBRTtnQkFDWiwyQkFBbUIsRUFBQyxxQkFBYTthQUNsQztZQUNELE9BQU8sRUFBRSxDQUFDLCtCQUFlLEVBQUMsMkJBQW1CLEVBQUMscUJBQWEsQ0FBQztTQUM3RCxDQUFDOzt3QkFBQTtJQUM4Qix1QkFBQztBQUFELENBQWhDLEFBQWlDLElBQUE7QUFBcEIsd0JBQWdCLG1CQUFJLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvY29uZmlnL3VzZXItc3lzdGVtL3VzZXItc3lzdGVtLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlclN5c3RlbUNvbXBvbmVudCB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgVXNlckNvbXBvbmVudCB9IGZyb20gJy4vdXNlci9pbmRleCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICduZzItdHJhbnNsYXRlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xhdGVNb2R1bGUsQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxOZ2JNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBVc2VyU3lzdGVtQ29tcG9uZW50LFVzZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1RyYW5zbGF0ZU1vZHVsZSxVc2VyU3lzdGVtQ29tcG9uZW50LFVzZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyU3lzdGVtTW9kdWxlIHsgfVxuIl19
