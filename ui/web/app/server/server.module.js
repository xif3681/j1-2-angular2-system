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
var router_1 = require('@angular/router');
var forms_2 = require('@angular/forms');
var index_1 = require('./name-list/index');
var index_2 = require('./btn-status/index');
var index_3 = require('./overview-server/index');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var index_4 = require('./kittencup/index');
var index_5 = require('./prompt-emit/index');
var index_6 = require('./licence-list/index');
var index_7 = require('./footerbar/index');
var index_8 = require('./licence-count/index');
var index_9 = require('./del-licence/index');
var index_10 = require('./disk-list/index');
var index_11 = require('./raid-list/index');
var index_12 = require('./roll-list/index');
var index_13 = require('./server-panel/index');
var index_14 = require('./operate-disk/index');
var index_15 = require('./item-disk/index');
var index_16 = require('./disk-raid-info-list/index');
var index_17 = require('./del-raid/index');
var index_18 = require('./del-roll/index');
var index_19 = require('./item-raid/index');
var index_20 = require('./item-roll/index');
var index_21 = require('./user-list/index');
var index_22 = require('./user-login/index');
var index_23 = require('./item-user/index');
var index_24 = require('./del-user/index');
var index_25 = require('./user-count/index');
var index_26 = require('./user-status/index');
var index_27 = require('./open-api/index');
var index_28 = require('./raid-canused-list/index');
var index_29 = require('./version-info/index');
var ng2_translate_1 = require('ng2-translate');
var ServerModule = (function () {
    function ServerModule() {
    }
    ServerModule.forRoot = function () {
        return {
            ngModule: ServerModule,
            providers: [index_1.NameListService, index_2.BtnStatusService, index_3.OverviewService,
                index_4.KittencupService, index_6.LicenceListService, index_7.ProductInfoServer, index_5.PromptEmitService,
                index_8.LicenceCountService, index_9.DelLicenceService, index_10.DiskListService, index_11.RaidListService,
                index_12.RollListService, index_13.ServerPanelService, index_14.OperateDiskService, index_15.ItemDiskService,
                index_16.DiskRaidInfoListService, index_17.DeleteRaidService, index_19.ItemRaidService, index_18.DeleteRollService,
                index_20.ItemRollService, index_21.UserListService, index_23.ItemUserService, index_24.DeleteUserService, index_25.UserCountService,
                index_26.UserStatusService, index_22.UserLoginService, index_28.RaidCanUsedListService, index_29.VersionInfoService, index_27.OpenAPIService
            ]
        };
    };
    ServerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule, ng_bootstrap_1.NgbModule, forms_1.FormsModule, ng2_translate_1.TranslateModule],
            declarations: [],
            exports: [ng2_translate_1.TranslateModule, common_1.CommonModule, forms_1.FormsModule, forms_2.ReactiveFormsModule, router_1.RouterModule],
        }), 
        __metadata('design:paramtypes', [])
    ], ServerModule);
    return ServerModule;
}());
exports.ServerModule = ServerModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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bUIsRUFBRSxxQkFBWSxDQUFDO1NBQ3hGLENBQUM7O29CQUFBO0lBZUYsbUJBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQWRZLG9CQUFZLGVBY3hCLENBQUEiLCJmaWxlIjoiYXBwL3NlcnZlci9zZXJ2ZXIubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5hbWVMaXN0U2VydmljZSB9IGZyb20gJy4vbmFtZS1saXN0L2luZGV4JztcbmltcG9ydCB7IEJ0blN0YXR1c1NlcnZpY2UgfSBmcm9tICcuL2J0bi1zdGF0dXMvaW5kZXgnO1xuaW1wb3J0IHsgT3ZlcnZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9vdmVydmlldy1zZXJ2ZXIvaW5kZXgnO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgS2l0dGVuY3VwU2VydmljZSB9IGZyb20gJy4va2l0dGVuY3VwL2luZGV4JztcbmltcG9ydCB7IFByb21wdEVtaXRTZXJ2aWNlIH0gZnJvbSAnLi9wcm9tcHQtZW1pdC9pbmRleCc7XG5pbXBvcnQgeyBMaWNlbmNlTGlzdFNlcnZpY2UgfSBmcm9tICcuL2xpY2VuY2UtbGlzdC9pbmRleCc7XG5pbXBvcnQgeyBQcm9kdWN0SW5mb1NlcnZlciB9IGZyb20gJy4vZm9vdGVyYmFyL2luZGV4JztcbmltcG9ydCB7IExpY2VuY2VDb3VudFNlcnZpY2UgfSBmcm9tICcuL2xpY2VuY2UtY291bnQvaW5kZXgnO1xuaW1wb3J0IHsgRGVsTGljZW5jZVNlcnZpY2UgfSBmcm9tICcuL2RlbC1saWNlbmNlL2luZGV4JztcbmltcG9ydCB7IERpc2tMaXN0U2VydmljZSB9IGZyb20gJy4vZGlzay1saXN0L2luZGV4JztcbmltcG9ydCB7IFJhaWRMaXN0U2VydmljZSB9IGZyb20gJy4vcmFpZC1saXN0L2luZGV4JztcbmltcG9ydCB7IFJvbGxMaXN0U2VydmljZSB9IGZyb20gJy4vcm9sbC1saXN0L2luZGV4JztcbmltcG9ydCB7IFNlcnZlclBhbmVsU2VydmljZSB9IGZyb20gJy4vc2VydmVyLXBhbmVsL2luZGV4JztcbmltcG9ydCB7IE9wZXJhdGVEaXNrU2VydmljZSB9IGZyb20gJy4vb3BlcmF0ZS1kaXNrL2luZGV4JztcbmltcG9ydCB7IEl0ZW1EaXNrU2VydmljZSB9IGZyb20gJy4vaXRlbS1kaXNrL2luZGV4JztcbmltcG9ydCB7IERpc2tSYWlkSW5mb0xpc3RTZXJ2aWNlIH0gZnJvbSAnLi9kaXNrLXJhaWQtaW5mby1saXN0L2luZGV4JztcbmltcG9ydCB7IERlbGV0ZVJhaWRTZXJ2aWNlIH0gZnJvbSAnLi9kZWwtcmFpZC9pbmRleCc7XG5pbXBvcnQgeyBEZWxldGVSb2xsU2VydmljZSB9IGZyb20gJy4vZGVsLXJvbGwvaW5kZXgnO1xuaW1wb3J0IHsgSXRlbVJhaWRTZXJ2aWNlIH0gZnJvbSAnLi9pdGVtLXJhaWQvaW5kZXgnO1xuaW1wb3J0IHsgSXRlbVJvbGxTZXJ2aWNlIH0gZnJvbSAnLi9pdGVtLXJvbGwvaW5kZXgnO1xuaW1wb3J0IHsgVXNlckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLWxpc3QvaW5kZXgnO1xuaW1wb3J0IHsgVXNlckxvZ2luU2VydmljZSB9IGZyb20gJy4vdXNlci1sb2dpbi9pbmRleCc7XG5pbXBvcnQgeyBJdGVtVXNlclNlcnZpY2UgfSBmcm9tICcuL2l0ZW0tdXNlci9pbmRleCc7XG5pbXBvcnQgeyBEZWxldGVVc2VyU2VydmljZSB9IGZyb20gJy4vZGVsLXVzZXIvaW5kZXgnO1xuaW1wb3J0IHsgVXNlckNvdW50U2VydmljZSB9IGZyb20gJy4vdXNlci1jb3VudC9pbmRleCc7XG5pbXBvcnQgeyBVc2VyU3RhdHVzU2VydmljZSB9IGZyb20gJy4vdXNlci1zdGF0dXMvaW5kZXgnO1xuaW1wb3J0IHsgT3BlbkFQSVNlcnZpY2UgfSBmcm9tICcuL29wZW4tYXBpL2luZGV4JztcbmltcG9ydCB7IFJhaWRDYW5Vc2VkTGlzdFNlcnZpY2UgfSBmcm9tICcuL3JhaWQtY2FudXNlZC1saXN0L2luZGV4JztcbmltcG9ydCB7IFZlcnNpb25JbmZvU2VydmljZSB9IGZyb20gJy4vdmVyc2lvbi1pbmZvL2luZGV4JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ25nMi10cmFuc2xhdGUnO1xuLy8gaW1wb3J0IHsgUVIxQ29kZUNvbXBvbmVudCB9IGZyb20gJy4vcXJjb2RlL2luZGV4Jztcbi8qKlxuICogRG8gbm90IHNwZWNpZnkgcHJvdmlkZXJzIGZvciBtb2R1bGVzIHRoYXQgbWlnaHQgYmUgaW1wb3J0ZWQgYnkgYSBsYXp5IGxvYWRlZCBtb2R1bGUuXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBOZ2JNb2R1bGUsRm9ybXNNb2R1bGUsVHJhbnNsYXRlTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gIF0sXG4gIGV4cG9ydHM6IFtUcmFuc2xhdGVNb2R1bGUsIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsUmVhY3RpdmVGb3Jtc01vZHVsZSwgUm91dGVyTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTZXJ2ZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtOYW1lTGlzdFNlcnZpY2UsQnRuU3RhdHVzU2VydmljZSxPdmVydmlld1NlcnZpY2UsXG4gICAgICAgIEtpdHRlbmN1cFNlcnZpY2UsTGljZW5jZUxpc3RTZXJ2aWNlLFByb2R1Y3RJbmZvU2VydmVyLFByb21wdEVtaXRTZXJ2aWNlLFxuICAgICAgICBMaWNlbmNlQ291bnRTZXJ2aWNlLERlbExpY2VuY2VTZXJ2aWNlLERpc2tMaXN0U2VydmljZSxSYWlkTGlzdFNlcnZpY2UsXG4gICAgICAgIFJvbGxMaXN0U2VydmljZSxTZXJ2ZXJQYW5lbFNlcnZpY2UsT3BlcmF0ZURpc2tTZXJ2aWNlLEl0ZW1EaXNrU2VydmljZSxcbiAgICAgICAgRGlza1JhaWRJbmZvTGlzdFNlcnZpY2UsRGVsZXRlUmFpZFNlcnZpY2UsSXRlbVJhaWRTZXJ2aWNlLERlbGV0ZVJvbGxTZXJ2aWNlLFxuICAgICAgICBJdGVtUm9sbFNlcnZpY2UsVXNlckxpc3RTZXJ2aWNlLEl0ZW1Vc2VyU2VydmljZSxEZWxldGVVc2VyU2VydmljZSxVc2VyQ291bnRTZXJ2aWNlLFxuICAgICAgICBVc2VyU3RhdHVzU2VydmljZSxVc2VyTG9naW5TZXJ2aWNlLFJhaWRDYW5Vc2VkTGlzdFNlcnZpY2UsVmVyc2lvbkluZm9TZXJ2aWNlLE9wZW5BUElTZXJ2aWNlXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19
