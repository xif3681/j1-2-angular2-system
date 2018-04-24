import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NameListService } from './name-list/index';
import { BtnStatusService } from './btn-status/index';
import { OverviewService } from './overview-server/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KittencupService } from './kittencup/index';
import { PromptEmitService } from './prompt-emit/index';
import { LicenceListService } from './licence-list/index';
import { ProductInfoServer } from './footerbar/index';
import { LicenceCountService } from './licence-count/index';
import { DelLicenceService } from './del-licence/index';
import { DiskListService } from './disk-list/index';
import { RaidListService } from './raid-list/index';
import { RollListService } from './roll-list/index';
import { ServerPanelService } from './server-panel/index';
import { OperateDiskService } from './operate-disk/index';
import { ItemDiskService } from './item-disk/index';
import { DiskRaidInfoListService } from './disk-raid-info-list/index';
import { DeleteRaidService } from './del-raid/index';
import { DeleteRollService } from './del-roll/index';
import { ItemRaidService } from './item-raid/index';
import { ItemRollService } from './item-roll/index';
import { UserListService } from './user-list/index';
import { UserLoginService } from './user-login/index';
import { ItemUserService } from './item-user/index';
import { DeleteUserService } from './del-user/index';
import { UserCountService } from './user-count/index';
import { UserStatusService } from './user-status/index';
import { OpenAPIService } from './open-api/index';
import { RaidCanUsedListService } from './raid-canused-list/index';
import { VersionInfoService } from './version-info/index';
import { TranslateModule } from 'ng2-translate';
// import { QR1CodeComponent } from './qrcode/index';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,FormsModule,TranslateModule],
  declarations: [
  ],
  exports: [TranslateModule, CommonModule, FormsModule,ReactiveFormsModule, RouterModule],
})
export class ServerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServerModule,
      providers: [NameListService,BtnStatusService,OverviewService,
        KittencupService,LicenceListService,ProductInfoServer,PromptEmitService,
        LicenceCountService,DelLicenceService,DiskListService,RaidListService,
        RollListService,ServerPanelService,OperateDiskService,ItemDiskService,
        DiskRaidInfoListService,DeleteRaidService,ItemRaidService,DeleteRollService,
        ItemRollService,UserListService,ItemUserService,DeleteUserService,UserCountService,
        UserStatusService,UserLoginService,RaidCanUsedListService,VersionInfoService,OpenAPIService
      ]
    };
  }
}
