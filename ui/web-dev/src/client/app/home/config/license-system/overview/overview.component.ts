import { Component } from '@angular/core';
import { OverviewService, KittencupService } from '../../../../server/index';

@Component({
  moduleId: module.id,
  selector: 'ar-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
  providers: [OverviewService]
})
export class OverviewComponent {
  overviews = {
    total:'',
    usedDailyTraffic:'',
    authorizedDailyTraffic: '',
    authStatus: '',
    validTime: '',
    remainingTime:''
  };
  constructor(public kittencupService:KittencupService,private overviewService: OverviewService) {
    // setInterval(()=>{ this.getOverview()},1000)
    // this.getOverview();
    kittencupService.change.subscribe((value)=>{
      this.overviews = value;
    })
  }

  /**
   * 初始化的时候获取数据
   */
  // getOverview():void{
  //   this.overviewService.getOverview()
  //     .then(
  //       overviews => {
  //         this.overviews = overviews;
  //         console.dir(overviews)
  //
  //       },
  //       error => {
  //          this.error = error;
  //       }
  //     )
  // }
}
