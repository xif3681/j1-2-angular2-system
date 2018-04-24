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
var index_1 = require('./disk/index');
var index_2 = require('./raid/index');
var index_3 = require('./roll/index');
var ng2_translate_1 = require("ng2-translate");
var StorageModule = (function () {
    function StorageModule() {
    }
    StorageModule = __decorate([
        core_1.NgModule({
            imports: [ng2_translate_1.TranslateModule, common_1.CommonModule, shared_module_1.SharedModule, ng_bootstrap_1.NgbModule],
            declarations: [
                index_1.DiskComponent, index_2.RaidComponent, index_3.RollComponent
            ],
            exports: [
                common_1.CommonModule,
                ng2_translate_1.TranslateModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], StorageModule);
    return StorageModule;
}());
exports.StorageModule = StorageModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL3N0b3JhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsNkJBQTBCLDRCQUE0QixDQUFDLENBQUE7QUFDdkQsOEJBQTZCLCtCQUErQixDQUFDLENBQUE7QUFDN0Qsc0JBQThCLGNBQWMsQ0FBQyxDQUFBO0FBQzdDLHNCQUE4QixjQUFjLENBQUMsQ0FBQTtBQUM3QyxzQkFBOEIsY0FBYyxDQUFDLENBQUE7QUFDN0MsOEJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBWWhEO0lBQUE7SUFBNkIsQ0FBQztJQVY5QjtRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLCtCQUFlLEVBQUMscUJBQVksRUFBQyw0QkFBWSxFQUFDLHdCQUFTLENBQUM7WUFDOUQsWUFBWSxFQUFFO2dCQUNaLHFCQUFhLEVBQUMscUJBQWEsRUFBQyxxQkFBYTthQUMxQztZQUNELE9BQU8sRUFBRTtnQkFDUCxxQkFBWTtnQkFDWiwrQkFBZTthQUNoQjtTQUNGLENBQUM7O3FCQUFBO0lBQzJCLG9CQUFDO0FBQUQsQ0FBN0IsQUFBOEIsSUFBQTtBQUFqQixxQkFBYSxnQkFBSSxDQUFBIiwiZmlsZSI6ImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL3N0b3JhZ2UubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBEaXNrQ29tcG9uZW50IH0gZnJvbSAnLi9kaXNrL2luZGV4JztcbmltcG9ydCB7IFJhaWRDb21wb25lbnQgfSBmcm9tICcuL3JhaWQvaW5kZXgnO1xuaW1wb3J0IHsgUm9sbENvbXBvbmVudCB9IGZyb20gJy4vcm9sbC9pbmRleCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tIFwibmcyLXRyYW5zbGF0ZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVHJhbnNsYXRlTW9kdWxlLENvbW1vbk1vZHVsZSxTaGFyZWRNb2R1bGUsTmdiTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGlza0NvbXBvbmVudCxSYWlkQ29tcG9uZW50LFJvbGxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yYWdlTW9kdWxlIHsgfVxuIl19
