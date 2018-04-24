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
var container_component_1 = require('./container.component');
var index_1 = require('../../../server/index');
var panel_component_1 = require("./panel/panel.component");
var index_2 = require("./status/index");
var index_3 = require("./button-group/index");
var index_4 = require("./../manage-navbar/index");
var ng2_translate_1 = require("ng2-translate");
var ContainerModule = (function () {
    function ContainerModule() {
    }
    ContainerModule = __decorate([
        core_1.NgModule({
            imports: [ng2_translate_1.TranslateModule, common_1.CommonModule, shared_module_1.SharedModule, ng_bootstrap_1.NgbModule],
            declarations: [container_component_1.ContainerComponent, panel_component_1.PanelComponent,
                index_2.StatusComponent, index_3.ButtonGroupComponent, index_4.ManageNavbarComponent],
            exports: [container_component_1.ContainerComponent, ng2_translate_1.TranslateModule],
            providers: [index_1.NameListService]
        }), 
        __metadata('design:paramtypes', [])
    ], ContainerModule);
    return ContainerModule;
}());
exports.ContainerModule = ContainerModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9jb250YWluZXIvY29udGFpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHVCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLDZCQUEwQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3ZELDhCQUE2QiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzdELG9DQUFrQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzFELHNCQUFnQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3hELGdDQUErQix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3pELHNCQUFnQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2pELHNCQUFxQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzVELHNCQUFzQywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pFLDhCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQVFoRDtJQUFBO0lBQStCLENBQUM7SUFQaEM7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQywrQkFBZSxFQUFDLHFCQUFZLEVBQUUsNEJBQVksRUFBQyx3QkFBUyxDQUFDO1lBQy9ELFlBQVksRUFBRSxDQUFDLHdDQUFrQixFQUFFLGdDQUFjO2dCQUMvQyx1QkFBZSxFQUFDLDRCQUFvQixFQUFDLDZCQUFxQixDQUFDO1lBQzdELE9BQU8sRUFBRSxDQUFDLHdDQUFrQixFQUFDLCtCQUFlLENBQUM7WUFDN0MsU0FBUyxFQUFFLENBQUMsdUJBQWUsQ0FBQztTQUM3QixDQUFDOzt1QkFBQTtJQUM2QixzQkFBQztBQUFELENBQS9CLEFBQWdDLElBQUE7QUFBbkIsdUJBQWUsa0JBQUksQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9tYW5hZ2UvY29udGFpbmVyL2NvbnRhaW5lci5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENvbnRhaW5lckNvbXBvbmVudH0gZnJvbSAnLi9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5hbWVMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlci9pbmRleCc7XG5pbXBvcnQgeyBQYW5lbENvbXBvbmVudCB9IGZyb20gXCIuL3BhbmVsL3BhbmVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU3RhdHVzQ29tcG9uZW50IH0gZnJvbSBcIi4vc3RhdHVzL2luZGV4XCI7XG5pbXBvcnQgeyBCdXR0b25Hcm91cENvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbi1ncm91cC9pbmRleFwiO1xuaW1wb3J0IHsgTWFuYWdlTmF2YmFyQ29tcG9uZW50IH0gZnJvbSBcIi4vLi4vbWFuYWdlLW5hdmJhci9pbmRleFwiO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSBcIm5nMi10cmFuc2xhdGVcIjtcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xhdGVNb2R1bGUsQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsTmdiTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29udGFpbmVyQ29tcG9uZW50LCBQYW5lbENvbXBvbmVudCxcbiAgICBTdGF0dXNDb21wb25lbnQsQnV0dG9uR3JvdXBDb21wb25lbnQsTWFuYWdlTmF2YmFyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbnRhaW5lckNvbXBvbmVudCxUcmFuc2xhdGVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtOYW1lTGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIENvbnRhaW5lck1vZHVsZSB7IH1cbiJdfQ==
