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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var ngx_cookie_1 = require('ngx-cookie');
var index_1 = require('./toolbar/index');
var index_2 = require('./navbar/index');
var index_3 = require('./prompt/index');
var index_4 = require('./footerbar/index');
var index_5 = require('./modal-content/index');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var index_6 = require('./pagination-advanced/index');
var index_7 = require('./modal-content-new-code/index');
var index_8 = require('./modal-content-about/index');
var index_9 = require('./modal-content-active-code/index');
var index_10 = require('./modal-content-qrcode/index');
var index_11 = require('./angular2-qrcode/index');
var index_12 = require('./modal-content-new-raid/index');
var index_13 = require('./modal-content-new-roll/index');
var index_14 = require('./modal-content-new-user/index');
var index_15 = require('./modal-content-config-raid/index');
var index_16 = require('./modal-content-rebuild-raid/index');
var index_17 = require('./modal-content-config-roll/index');
var index_18 = require('./modal-content-edit-user/index');
var index_19 = require('./modal-content-edit-password/index');
var index_20 = require('./login-footerbar/index');
var ng2_translate_1 = require('ng2-translate');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [index_10.QrcodeService, index_7.AddLicenseService, index_9.ActiveLicenseServer,
                index_12.AddRAIDService, index_13.AddRollService, index_14.AddUserService,
                index_15.ConfigRAIDServic, index_17.ConfigRollService,
                index_16.RebulidRAIDService, index_8.VersionInfoService,
                index_18.EditUserService, index_19.EditPasswordService
            ]
        };
    };
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule, ng_bootstrap_1.NgbModule, forms_1.FormsModule, ng2_translate_1.TranslateModule, ngx_cookie_1.CookieModule.forRoot()],
            declarations: [index_1.ToolbarComponent, index_2.NavbarComponent, index_3.PromptComponent, index_4.FooterbarComponent, index_20.LoginFooterbarComponent, index_11.QRCodeComponent,
                index_5.ModalContent, index_7.ModalContentNewCode, index_9.ModalContentActiveCode, index_10.ModalContentQrcode, index_6.PaginationAdvanced, index_12.ModalContentNewRaid,
                index_13.ModalContentNewRoll, index_15.ModalContentConfigRaid, index_16.ModalContentRebuildRaid, index_17.ModalContentConfigRoll, index_8.ModalContentAbout,
                index_14.ModalContentNewUser, index_18.ModalContentEditUser, index_19.EditPassword
            ],
            exports: [ng2_translate_1.TranslateModule, index_1.ToolbarComponent, index_2.NavbarComponent, index_3.PromptComponent, index_4.FooterbarComponent, index_20.LoginFooterbarComponent,
                index_5.ModalContent, index_7.ModalContentNewCode, index_9.ModalContentActiveCode, index_10.ModalContentQrcode, index_6.PaginationAdvanced, index_11.QRCodeComponent, index_8.ModalContentAbout,
                common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule, index_12.ModalContentNewRaid, index_13.ModalContentNewRoll, index_14.ModalContentNewUser,
                index_16.ModalContentRebuildRaid, index_17.ModalContentConfigRoll, index_19.EditPassword, index_15.ModalContentConfigRaid, index_18.ModalContentEditUser],
            entryComponents: [index_5.ModalContent, index_7.ModalContentNewCode, index_9.ModalContentActiveCode, index_10.ModalContentQrcode, index_11.QRCodeComponent, index_8.ModalContentAbout,
                index_12.ModalContentNewRaid, index_13.ModalContentNewRoll, index_14.ModalContentNewUser, index_15.ModalContentConfigRaid, index_16.ModalContentRebuildRaid,
                index_17.ModalContentConfigRoll, index_18.ModalContentEditUser, index_19.EditPassword]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQThDLGVBQWUsQ0FBQyxDQUFBO0FBQzlELHVCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLHVCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLHNCQUFpRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2xFLDJCQUE2QixZQUFZLENBQUMsQ0FBQTtBQUMxQyxzQkFBaUMsaUJBQWlCLENBQUMsQ0FBQTtBQUNuRCxzQkFBZ0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUNqRCxzQkFBZ0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUNqRCxzQkFBa0MsbUJBQW1CLENBQUMsQ0FBQTtBQUN0RCxzQkFBNkIsdUJBQXVCLENBQUMsQ0FBQTtBQUNyRCw2QkFBMEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN2RCxzQkFBa0MsNkJBQTZCLENBQUMsQ0FBQTtBQUNoRSxzQkFBdUQsZ0NBQWdDLENBQUMsQ0FBQTtBQUN4RixzQkFBcUQsNkJBQTZCLENBQUMsQ0FBQTtBQUNuRixzQkFBNEQsbUNBQW1DLENBQUMsQ0FBQTtBQUNoRyx1QkFBaUQsOEJBQThCLENBQUMsQ0FBQTtBQUNoRix1QkFBZ0MseUJBQXlCLENBQUMsQ0FBQTtBQUMxRCx1QkFBbUQsZ0NBQWdDLENBQUMsQ0FBQTtBQUNwRix1QkFBbUQsZ0NBQWdDLENBQUMsQ0FBQTtBQUNwRix1QkFBbUQsZ0NBQWdDLENBQUMsQ0FBQTtBQUNwRix1QkFBeUQsbUNBQW1DLENBQUMsQ0FBQTtBQUM3Rix1QkFBMkQsb0NBQW9DLENBQUMsQ0FBQTtBQUNoRyx1QkFBeUQsbUNBQW1DLENBQUMsQ0FBQTtBQUM3Rix1QkFBcUQsaUNBQWlDLENBQUMsQ0FBQTtBQUN2Rix1QkFBaUQscUNBQXFDLENBQUMsQ0FBQTtBQUN2Rix1QkFBd0MseUJBQXlCLENBQUMsQ0FBQTtBQUNsRSw4QkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFzQmhEO0lBQUE7SUFZQSxDQUFDO0lBWFEsb0JBQU8sR0FBZDtRQUNFLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRSxDQUFDLHNCQUFhLEVBQUUseUJBQWlCLEVBQUMsMkJBQW1CO2dCQUM5RCx1QkFBYyxFQUFDLHVCQUFjLEVBQUMsdUJBQWM7Z0JBQzVDLHlCQUFnQixFQUFDLDBCQUFpQjtnQkFDbEMsMkJBQWtCLEVBQUMsMEJBQWtCO2dCQUNyQyx3QkFBZSxFQUFDLDRCQUFtQjthQUNwQztTQUNGLENBQUM7SUFDSixDQUFDO0lBM0JIO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksRUFBRSxxQkFBWSxFQUFFLHdCQUFTLEVBQUMsbUJBQVcsRUFBQywrQkFBZSxFQUFDLHlCQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkcsWUFBWSxFQUFFLENBQUMsd0JBQWdCLEVBQUUsdUJBQWUsRUFBQyx1QkFBZSxFQUFFLDBCQUFrQixFQUFDLGdDQUF1QixFQUFDLHdCQUFlO2dCQUMxSCxvQkFBWSxFQUFDLDJCQUFtQixFQUFDLDhCQUFzQixFQUFDLDJCQUFrQixFQUFDLDBCQUFrQixFQUFDLDRCQUFtQjtnQkFDakgsNEJBQW1CLEVBQUMsK0JBQXNCLEVBQUMsZ0NBQXVCLEVBQUMsK0JBQXNCLEVBQUMseUJBQWlCO2dCQUMzRyw0QkFBbUIsRUFBQyw2QkFBb0IsRUFBQyxxQkFBWTthQUV0RDtZQUNELE9BQU8sRUFBRSxDQUFFLCtCQUFlLEVBQUMsd0JBQWdCLEVBQUUsdUJBQWUsRUFBQyx1QkFBZSxFQUFFLDBCQUFrQixFQUFDLGdDQUF1QjtnQkFDdEgsb0JBQVksRUFBQywyQkFBbUIsRUFBQyw4QkFBc0IsRUFBQywyQkFBa0IsRUFBQywwQkFBa0IsRUFBQyx3QkFBZSxFQUFDLHlCQUFpQjtnQkFDL0gscUJBQVksRUFBRSxtQkFBVyxFQUFDLDJCQUFtQixFQUFFLHFCQUFZLEVBQUMsNEJBQW1CLEVBQUMsNEJBQW1CLEVBQUMsNEJBQW1CO2dCQUN2SCxnQ0FBdUIsRUFBQywrQkFBc0IsRUFBQyxxQkFBWSxFQUFDLCtCQUFzQixFQUFDLDZCQUFvQixDQUFzQjtZQUMvSCxlQUFlLEVBQUUsQ0FBQyxvQkFBWSxFQUFDLDJCQUFtQixFQUFDLDhCQUFzQixFQUFDLDJCQUFrQixFQUFDLHdCQUFlLEVBQUMseUJBQWlCO2dCQUM1SCw0QkFBbUIsRUFBQyw0QkFBbUIsRUFBQyw0QkFBbUIsRUFBQywrQkFBc0IsRUFBQyxnQ0FBdUI7Z0JBQzFHLCtCQUFzQixFQUFDLDZCQUFvQixFQUFDLHFCQUFZLENBQUM7U0FDNUQsQ0FBQzs7b0JBQUE7SUFhRixtQkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBWlksb0JBQVksZUFZeEIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3NoYXJlZC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvb2tpZU1vZHVsZSB9IGZyb20gJ25neC1jb29raWUnO1xuaW1wb3J0IHsgVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vdG9vbGJhci9pbmRleCc7XG5pbXBvcnQgeyBOYXZiYXJDb21wb25lbnQgfSBmcm9tICcuL25hdmJhci9pbmRleCc7XG5pbXBvcnQgeyBQcm9tcHRDb21wb25lbnQgfSBmcm9tICcuL3Byb21wdC9pbmRleCc7XG5pbXBvcnQgeyBGb290ZXJiYXJDb21wb25lbnR9IGZyb20gJy4vZm9vdGVyYmFyL2luZGV4JztcbmltcG9ydCB7IE1vZGFsQ29udGVudCB9IGZyb20gJy4vbW9kYWwtY29udGVudC9pbmRleCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQWR2YW5jZWR9IGZyb20gJy4vcGFnaW5hdGlvbi1hZHZhbmNlZC9pbmRleCc7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnROZXdDb2RlLCBBZGRMaWNlbnNlU2VydmljZSB9IGZyb20gJy4vbW9kYWwtY29udGVudC1uZXctY29kZS9pbmRleCc7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnRBYm91dCAsVmVyc2lvbkluZm9TZXJ2aWNlfSBmcm9tICcuL21vZGFsLWNvbnRlbnQtYWJvdXQvaW5kZXgnO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50QWN0aXZlQ29kZSwgQWN0aXZlTGljZW5zZVNlcnZlciB9IGZyb20gJy4vbW9kYWwtY29udGVudC1hY3RpdmUtY29kZS9pbmRleCc7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnRRcmNvZGUsUXJjb2RlU2VydmljZSB9IGZyb20gJy4vbW9kYWwtY29udGVudC1xcmNvZGUvaW5kZXgnO1xuaW1wb3J0IHsgUVJDb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9hbmd1bGFyMi1xcmNvZGUvaW5kZXgnO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50TmV3UmFpZCAsQWRkUkFJRFNlcnZpY2V9IGZyb20gJy4vbW9kYWwtY29udGVudC1uZXctcmFpZC9pbmRleCc7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnROZXdSb2xsLEFkZFJvbGxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1jb250ZW50LW5ldy1yb2xsL2luZGV4JztcbmltcG9ydCB7IE1vZGFsQ29udGVudE5ld1VzZXIsQWRkVXNlclNlcnZpY2UgfSBmcm9tICcuL21vZGFsLWNvbnRlbnQtbmV3LXVzZXIvaW5kZXgnO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50Q29uZmlnUmFpZCwgQ29uZmlnUkFJRFNlcnZpYyB9IGZyb20gJy4vbW9kYWwtY29udGVudC1jb25maWctcmFpZC9pbmRleCc7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnRSZWJ1aWxkUmFpZCAsUmVidWxpZFJBSURTZXJ2aWNlfSBmcm9tICcuL21vZGFsLWNvbnRlbnQtcmVidWlsZC1yYWlkL2luZGV4JztcbmltcG9ydCB7IE1vZGFsQ29udGVudENvbmZpZ1JvbGwsQ29uZmlnUm9sbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLWNvbnRlbnQtY29uZmlnLXJvbGwvaW5kZXgnO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50RWRpdFVzZXIsRWRpdFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1jb250ZW50LWVkaXQtdXNlci9pbmRleCc7XG5pbXBvcnQgeyBFZGl0UGFzc3dvcmQsRWRpdFBhc3N3b3JkU2VydmljZSB9IGZyb20gJy4vbW9kYWwtY29udGVudC1lZGl0LXBhc3N3b3JkL2luZGV4JztcbmltcG9ydCB7IExvZ2luRm9vdGVyYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi1mb290ZXJiYXIvaW5kZXgnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnbmcyLXRyYW5zbGF0ZSc7XG4vLyBpbXBvcnQgeyBRUjFDb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9xcmNvZGUvaW5kZXgnO1xuLyoqXG4gKiBEbyBub3Qgc3BlY2lmeSBwcm92aWRlcnMgZm9yIG1vZHVsZXMgdGhhdCBtaWdodCBiZSBpbXBvcnRlZCBieSBhIGxhenkgbG9hZGVkIG1vZHVsZS5cbiAqL1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIE5nYk1vZHVsZSxGb3Jtc01vZHVsZSxUcmFuc2xhdGVNb2R1bGUsQ29va2llTW9kdWxlLmZvclJvb3QoKV0sXG4gIGRlY2xhcmF0aW9uczogW1Rvb2xiYXJDb21wb25lbnQsIE5hdmJhckNvbXBvbmVudCxQcm9tcHRDb21wb25lbnQsIEZvb3RlcmJhckNvbXBvbmVudCxMb2dpbkZvb3RlcmJhckNvbXBvbmVudCxRUkNvZGVDb21wb25lbnQsXG4gICAgTW9kYWxDb250ZW50LE1vZGFsQ29udGVudE5ld0NvZGUsTW9kYWxDb250ZW50QWN0aXZlQ29kZSxNb2RhbENvbnRlbnRRcmNvZGUsUGFnaW5hdGlvbkFkdmFuY2VkLE1vZGFsQ29udGVudE5ld1JhaWQsXG4gICAgTW9kYWxDb250ZW50TmV3Um9sbCxNb2RhbENvbnRlbnRDb25maWdSYWlkLE1vZGFsQ29udGVudFJlYnVpbGRSYWlkLE1vZGFsQ29udGVudENvbmZpZ1JvbGwsTW9kYWxDb250ZW50QWJvdXQsXG4gICAgTW9kYWxDb250ZW50TmV3VXNlcixNb2RhbENvbnRlbnRFZGl0VXNlcixFZGl0UGFzc3dvcmQvKixcbiAgICBRUjFDb2RlQ29tcG9uZW50Ki9cbiAgXSxcbiAgZXhwb3J0czogWyBUcmFuc2xhdGVNb2R1bGUsVG9vbGJhckNvbXBvbmVudCwgTmF2YmFyQ29tcG9uZW50LFByb21wdENvbXBvbmVudCwgRm9vdGVyYmFyQ29tcG9uZW50LExvZ2luRm9vdGVyYmFyQ29tcG9uZW50LFxuICAgIE1vZGFsQ29udGVudCxNb2RhbENvbnRlbnROZXdDb2RlLE1vZGFsQ29udGVudEFjdGl2ZUNvZGUsTW9kYWxDb250ZW50UXJjb2RlLFBhZ2luYXRpb25BZHZhbmNlZCxRUkNvZGVDb21wb25lbnQsTW9kYWxDb250ZW50QWJvdXQsXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSxSZWFjdGl2ZUZvcm1zTW9kdWxlLCBSb3V0ZXJNb2R1bGUsTW9kYWxDb250ZW50TmV3UmFpZCxNb2RhbENvbnRlbnROZXdSb2xsLE1vZGFsQ29udGVudE5ld1VzZXIsXG4gICAgTW9kYWxDb250ZW50UmVidWlsZFJhaWQsTW9kYWxDb250ZW50Q29uZmlnUm9sbCxFZGl0UGFzc3dvcmQsTW9kYWxDb250ZW50Q29uZmlnUmFpZCxNb2RhbENvbnRlbnRFZGl0VXNlci8qLFFSMUNvZGVDb21wb25lbnQqL10sXG4gIGVudHJ5Q29tcG9uZW50czogW01vZGFsQ29udGVudCxNb2RhbENvbnRlbnROZXdDb2RlLE1vZGFsQ29udGVudEFjdGl2ZUNvZGUsTW9kYWxDb250ZW50UXJjb2RlLFFSQ29kZUNvbXBvbmVudCxNb2RhbENvbnRlbnRBYm91dCxcbiAgICBNb2RhbENvbnRlbnROZXdSYWlkLE1vZGFsQ29udGVudE5ld1JvbGwsTW9kYWxDb250ZW50TmV3VXNlcixNb2RhbENvbnRlbnRDb25maWdSYWlkLE1vZGFsQ29udGVudFJlYnVpbGRSYWlkLFxuICAgIE1vZGFsQ29udGVudENvbmZpZ1JvbGwsTW9kYWxDb250ZW50RWRpdFVzZXIsRWRpdFBhc3N3b3JkXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNoYXJlZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1FyY29kZVNlcnZpY2UsIEFkZExpY2Vuc2VTZXJ2aWNlLEFjdGl2ZUxpY2Vuc2VTZXJ2ZXIsXG4gICAgICAgIEFkZFJBSURTZXJ2aWNlLEFkZFJvbGxTZXJ2aWNlLEFkZFVzZXJTZXJ2aWNlLFxuICAgICAgICBDb25maWdSQUlEU2VydmljLENvbmZpZ1JvbGxTZXJ2aWNlLFxuICAgICAgICBSZWJ1bGlkUkFJRFNlcnZpY2UsVmVyc2lvbkluZm9TZXJ2aWNlLFxuICAgICAgICBFZGl0VXNlclNlcnZpY2UsRWRpdFBhc3N3b3JkU2VydmljZVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==
