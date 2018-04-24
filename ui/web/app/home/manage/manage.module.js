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
var shared_module_1 = require('../../shared/shared.module');
var manage_component_1 = require('./manage.component');
var index_1 = require('../../server/index');
var panel_component_1 = require("./container/panel/panel.component");
var index_2 = require("./container/status/index");
var index_3 = require("./container/button-group/index");
var index_4 = require("./manage-navbar/index");
var index_5 = require('./container/index');
var index_6 = require('./storage/index');
var storage_module_1 = require('./storage/storage.module');
var index_7 = require('./storage/storage-navbar/index');
var index_8 = require('./../../guards/index');
var ng2_translate_1 = require('ng2-translate');
var ManageModule = (function () {
    function ManageModule() {
    }
    ManageModule = __decorate([
        core_1.NgModule({
            imports: [ng2_translate_1.TranslateModule, common_1.CommonModule, shared_module_1.SharedModule, ng_bootstrap_1.NgbModule, storage_module_1.StorageModule],
            declarations: [manage_component_1.ManageComponent, panel_component_1.PanelComponent,
                index_2.StatusComponent, index_3.ButtonGroupComponent, index_4.ManageNavbarComponent,
                index_5.ContainerComponent, index_6.StorageComponent, index_7.StorageNavbarComponent
            ],
            exports: [manage_component_1.ManageComponent, ng2_translate_1.TranslateModule],
            providers: [index_1.NameListService, index_8.AuthGuard]
        }), 
        __metadata('design:paramtypes', [])
    ], ManageModule);
    return ManageModule;
}());
exports.ManageModule = ManageModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9tYW5hZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsNkJBQTBCLDRCQUE0QixDQUFDLENBQUE7QUFDdkQsOEJBQTZCLDRCQUE0QixDQUFDLENBQUE7QUFDMUQsaUNBQWdDLG9CQUFvQixDQUFDLENBQUE7QUFDckQsc0JBQWdDLG9CQUFvQixDQUFDLENBQUE7QUFDckQsZ0NBQStCLG1DQUFtQyxDQUFDLENBQUE7QUFDbkUsc0JBQWdDLDBCQUEwQixDQUFDLENBQUE7QUFDM0Qsc0JBQXFDLGdDQUFnQyxDQUFDLENBQUE7QUFDdEUsc0JBQXNDLHVCQUF1QixDQUFDLENBQUE7QUFDOUQsc0JBQW1DLG1CQUFtQixDQUFDLENBQUE7QUFDdkQsc0JBQWlDLGlCQUFpQixDQUFDLENBQUE7QUFDbkQsK0JBQThCLDBCQUEwQixDQUFDLENBQUE7QUFDekQsc0JBQXVDLGdDQUFnQyxDQUFDLENBQUE7QUFDeEUsc0JBQTBCLHNCQUFzQixDQUFDLENBQUE7QUFDakQsOEJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBVWhEO0lBQUE7SUFBNEIsQ0FBQztJQVQ3QjtRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLCtCQUFlLEVBQUMscUJBQVksRUFBRSw0QkFBWSxFQUFDLHdCQUFTLEVBQUMsOEJBQWEsQ0FBQztZQUM3RSxZQUFZLEVBQUUsQ0FBQyxrQ0FBZSxFQUFFLGdDQUFjO2dCQUM1Qyx1QkFBZSxFQUFDLDRCQUFvQixFQUFDLDZCQUFxQjtnQkFDMUQsMEJBQWtCLEVBQUMsd0JBQWdCLEVBQUMsOEJBQXNCO2FBQzdEO1lBQ0MsT0FBTyxFQUFFLENBQUMsa0NBQWUsRUFBQywrQkFBZSxDQUFDO1lBQzFDLFNBQVMsRUFBRSxDQUFDLHVCQUFlLEVBQUMsaUJBQVMsQ0FBQztTQUN2QyxDQUFDOztvQkFBQTtJQUMwQixtQkFBQztBQUFELENBQTVCLEFBQTZCLElBQUE7QUFBaEIsb0JBQVksZUFBSSxDQUFBIiwiZmlsZSI6ImFwcC9ob21lL21hbmFnZS9tYW5hZ2UubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL21hbmFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmFtZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7IFBhbmVsQ29tcG9uZW50IH0gZnJvbSBcIi4vY29udGFpbmVyL3BhbmVsL3BhbmVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU3RhdHVzQ29tcG9uZW50IH0gZnJvbSBcIi4vY29udGFpbmVyL3N0YXR1cy9pbmRleFwiO1xuaW1wb3J0IHsgQnV0dG9uR3JvdXBDb21wb25lbnQgfSBmcm9tIFwiLi9jb250YWluZXIvYnV0dG9uLWdyb3VwL2luZGV4XCI7XG5pbXBvcnQgeyBNYW5hZ2VOYXZiYXJDb21wb25lbnQgfSBmcm9tIFwiLi9tYW5hZ2UtbmF2YmFyL2luZGV4XCI7XG5pbXBvcnQgeyBDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lci9pbmRleCc7XG5pbXBvcnQgeyBTdG9yYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9zdG9yYWdlL2luZGV4JztcbmltcG9ydCB7IFN0b3JhZ2VNb2R1bGUgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5tb2R1bGUnO1xuaW1wb3J0IHsgU3RvcmFnZU5hdmJhckNvbXBvbmVudCB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLW5hdmJhci9pbmRleCc7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuLy4uLy4uL2d1YXJkcy9pbmRleCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICduZzItdHJhbnNsYXRlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xhdGVNb2R1bGUsQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsTmdiTW9kdWxlLFN0b3JhZ2VNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYW5hZ2VDb21wb25lbnQsIFBhbmVsQ29tcG9uZW50LFxuICAgIFN0YXR1c0NvbXBvbmVudCxCdXR0b25Hcm91cENvbXBvbmVudCxNYW5hZ2VOYXZiYXJDb21wb25lbnQsXG4gICAgQ29udGFpbmVyQ29tcG9uZW50LFN0b3JhZ2VDb21wb25lbnQsU3RvcmFnZU5hdmJhckNvbXBvbmVudFxuXSxcbiAgZXhwb3J0czogW01hbmFnZUNvbXBvbmVudCxUcmFuc2xhdGVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtOYW1lTGlzdFNlcnZpY2UsQXV0aEd1YXJkXVxufSlcbmV4cG9ydCBjbGFzcyBNYW5hZ2VNb2R1bGUgeyB9XG4iXX0=
