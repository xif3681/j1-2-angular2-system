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
var index_1 = require('../../../../server/index');
var OverviewComponent = (function () {
    function OverviewComponent(kittencupService, overviewService) {
        var _this = this;
        this.kittencupService = kittencupService;
        this.overviewService = overviewService;
        this.overviews = {
            total: '',
            usedDailyTraffic: '',
            authorizedDailyTraffic: '',
            authStatus: '',
            validTime: '',
            remainingTime: ''
        };
        kittencupService.change.subscribe(function (value) {
            _this.overviews = value;
        });
    }
    OverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-overview',
            templateUrl: 'overview.component.html',
            styleUrls: ['overview.component.css'],
            providers: [index_1.OverviewService]
        }), 
        __metadata('design:paramtypes', [index_1.KittencupService, index_1.OverviewService])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy9saWNlbnNlLXN5c3RlbS9vdmVydmlldy9vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUMxQyxzQkFBa0QsMEJBQTBCLENBQUMsQ0FBQTtBQVM3RTtJQVNFLDJCQUFtQixnQkFBaUMsRUFBUyxlQUFnQztRQVQvRixpQkFpQ0M7UUF4Qm9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFSN0YsY0FBUyxHQUFHO1lBQ1YsS0FBSyxFQUFDLEVBQUU7WUFDUixnQkFBZ0IsRUFBQyxFQUFFO1lBQ25CLHNCQUFzQixFQUFFLEVBQUU7WUFDMUIsVUFBVSxFQUFFLEVBQUU7WUFDZCxTQUFTLEVBQUUsRUFBRTtZQUNiLGFBQWEsRUFBQyxFQUFFO1NBQ2pCLENBQUM7UUFJQSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUN0QyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUF0Qkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQWUsQ0FBQztTQUM3QixDQUFDOzt5QkFBQTtJQWtDRix3QkFBQztBQUFELENBakNBLEFBaUNDLElBQUE7QUFqQ1kseUJBQWlCLG9CQWlDN0IsQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9jb25maWcvbGljZW5zZS1zeXN0ZW0vb3ZlcnZpZXcvb3ZlcnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdmVydmlld1NlcnZpY2UsIEtpdHRlbmN1cFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXIvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhci1vdmVydmlldycsXG4gIHRlbXBsYXRlVXJsOiAnb3ZlcnZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnb3ZlcnZpZXcuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtPdmVydmlld1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE92ZXJ2aWV3Q29tcG9uZW50IHtcbiAgb3ZlcnZpZXdzID0ge1xuICAgIHRvdGFsOicnLFxuICAgIHVzZWREYWlseVRyYWZmaWM6JycsXG4gICAgYXV0aG9yaXplZERhaWx5VHJhZmZpYzogJycsXG4gICAgYXV0aFN0YXR1czogJycsXG4gICAgdmFsaWRUaW1lOiAnJyxcbiAgICByZW1haW5pbmdUaW1lOicnXG4gIH07XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBraXR0ZW5jdXBTZXJ2aWNlOktpdHRlbmN1cFNlcnZpY2UscHJpdmF0ZSBvdmVydmlld1NlcnZpY2U6IE92ZXJ2aWV3U2VydmljZSkge1xuICAgIC8vIHNldEludGVydmFsKCgpPT57IHRoaXMuZ2V0T3ZlcnZpZXcoKX0sMTAwMClcbiAgICAvLyB0aGlzLmdldE92ZXJ2aWV3KCk7XG4gICAga2l0dGVuY3VwU2VydmljZS5jaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZSk9PntcbiAgICAgIHRoaXMub3ZlcnZpZXdzID0gdmFsdWU7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJbnmoTml7blgJnojrflj5bmlbDmja5cbiAgICovXG4gIC8vIGdldE92ZXJ2aWV3KCk6dm9pZHtcbiAgLy8gICB0aGlzLm92ZXJ2aWV3U2VydmljZS5nZXRPdmVydmlldygpXG4gIC8vICAgICAudGhlbihcbiAgLy8gICAgICAgb3ZlcnZpZXdzID0+IHtcbiAgLy8gICAgICAgICB0aGlzLm92ZXJ2aWV3cyA9IG92ZXJ2aWV3cztcbiAgLy8gICAgICAgICBjb25zb2xlLmRpcihvdmVydmlld3MpXG4gIC8vXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIGVycm9yID0+IHtcbiAgLy8gICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAvLyAgICAgICB9XG4gIC8vICAgICApXG4gIC8vIH1cbn1cbiJdfQ==
