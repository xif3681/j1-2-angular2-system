import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenceComponent } from './licence.component';
// import { OverviewComponent } from './overview/overview.component';
import { TranslateModule } from 'ng2-translate';
@NgModule({
    imports: [TranslateModule,LicenceModule],
    declarations: [LicenceComponent],
    exports: [TranslateModule,LicenceComponent]
})

export class LicenceModule { }
