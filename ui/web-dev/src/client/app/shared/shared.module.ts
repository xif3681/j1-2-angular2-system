import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { PromptComponent } from './prompt/index';
import { FooterbarComponent} from './footerbar/index';
import { ModalContent } from './modal-content/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationAdvanced} from './pagination-advanced/index';
import { ModalContentNewCode, AddLicenseService } from './modal-content-new-code/index';
import { ModalContentAbout ,VersionInfoService} from './modal-content-about/index';
import { ModalContentActiveCode, ActiveLicenseServer } from './modal-content-active-code/index';
import { ModalContentQrcode,QrcodeService } from './modal-content-qrcode/index';
import { QRCodeComponent } from './angular2-qrcode/index';
import { ModalContentNewRaid ,AddRAIDService} from './modal-content-new-raid/index';
import { ModalContentNewRoll,AddRollService } from './modal-content-new-roll/index';
import { ModalContentNewUser,AddUserService } from './modal-content-new-user/index';
import { ModalContentConfigRaid, ConfigRAIDServic } from './modal-content-config-raid/index';
import { ModalContentRebuildRaid ,RebulidRAIDService} from './modal-content-rebuild-raid/index';
import { ModalContentConfigRoll,ConfigRollService } from './modal-content-config-roll/index';
import { ModalContentEditUser,EditUserService } from './modal-content-edit-user/index';
import { EditPassword,EditPasswordService } from './modal-content-edit-password/index';
import { LoginFooterbarComponent } from './login-footerbar/index';
import { TranslateModule } from 'ng2-translate';
// import { QR1CodeComponent } from './qrcode/index';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,FormsModule,TranslateModule,CookieModule.forRoot()],
  declarations: [ToolbarComponent, NavbarComponent,PromptComponent, FooterbarComponent,LoginFooterbarComponent,QRCodeComponent,
    ModalContent,ModalContentNewCode,ModalContentActiveCode,ModalContentQrcode,PaginationAdvanced,ModalContentNewRaid,
    ModalContentNewRoll,ModalContentConfigRaid,ModalContentRebuildRaid,ModalContentConfigRoll,ModalContentAbout,
    ModalContentNewUser,ModalContentEditUser,EditPassword/*,
    QR1CodeComponent*/
  ],
  exports: [ TranslateModule,ToolbarComponent, NavbarComponent,PromptComponent, FooterbarComponent,LoginFooterbarComponent,
    ModalContent,ModalContentNewCode,ModalContentActiveCode,ModalContentQrcode,PaginationAdvanced,QRCodeComponent,ModalContentAbout,
    CommonModule, FormsModule,ReactiveFormsModule, RouterModule,ModalContentNewRaid,ModalContentNewRoll,ModalContentNewUser,
    ModalContentRebuildRaid,ModalContentConfigRoll,EditPassword,ModalContentConfigRaid,ModalContentEditUser/*,QR1CodeComponent*/],
  entryComponents: [ModalContent,ModalContentNewCode,ModalContentActiveCode,ModalContentQrcode,QRCodeComponent,ModalContentAbout,
    ModalContentNewRaid,ModalContentNewRoll,ModalContentNewUser,ModalContentConfigRaid,ModalContentRebuildRaid,
    ModalContentConfigRoll,ModalContentEditUser,EditPassword]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [QrcodeService, AddLicenseService,ActiveLicenseServer,
        AddRAIDService,AddRollService,AddUserService,
        ConfigRAIDServic,ConfigRollService,
        RebulidRAIDService,VersionInfoService,
        EditUserService,EditPasswordService
      ]
    };
  }
}
