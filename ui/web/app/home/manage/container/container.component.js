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
var index_1 = require('../../../server/index');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
exports.CODES = [
    { id: 3758227460, name: 'container does not exist', enName: '容器不存在' },
    { id: 3758227457, name: 'docker service can not link', enName: 'Docker服务连接失败' },
    { id: 3758227459, name: 'container in dead', enName: '容器处于异常状态' },
    { id: 3758227458, name: 'server error', enName: '容器级服务错误' },
    { id: 3758292994, name: 'operate service exist fault', enName: '操作服务发生错误' },
    { id: 3758292993, name: 'link error', enName: '连接supervisor服务失败' },
    { id: 3758292995, name: 'service status in fatal', enName: '服务处于异常状态' },
    { id: 3758292996, name: 'server error', enName: '服务错误' },
    { id: 3758161922, name: 'argument null', enName: '参数为空' },
    { id: 3758161921, name: 'argument error', enName: '参数错误' }
];
var ContainerComponent = (function () {
    function ContainerComponent(nameListService, alertConfig) {
        var _this = this;
        this.nameListService = nameListService;
        this.alertConfig = alertConfig;
        this.containerNames = [];
        this.serverNames = [];
        this.containerOrServer = {
            container: {
                enName: 'containers',
                name: '容器管理'
            },
            server: {
                enName: 'services',
                name: '服务管理'
            }
        };
        this.tHeadContainerNames = [
            '序号',
            '名称',
            '状态',
            'CPU占有率',
            '内存占有率',
            '操作'
        ];
        this.tHeadServerNames = [
            '序号',
            '名称',
            '所属容器',
            '状态',
            'CPU占有率',
            '内存占有率',
            '操作'
        ];
        setInterval(function () { _this.getNames(); }, 60000);
    }
    ContainerComponent.prototype.ngOnInit = function () {
        this.getNames();
    };
    ContainerComponent.prototype.getNames = function () {
        var _this = this;
        this.codes = exports.CODES;
        this.nameListService.getContainer()
            .then(function (containerNames) {
            _this.containerNames = containerNames;
        }, function (error) {
            _this.errorMessage = error;
        });
        this.nameListService.getServer()
            .then(function (serverNames) {
            _this.serverNames = serverNames;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-container',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'container.component.html',
            styleUrls: ['container.component.css'],
            providers: [ng_bootstrap_1.NgbAlertConfig]
        }), 
        __metadata('design:paramtypes', [index_1.NameListService, ng_bootstrap_1.NgbAlertConfig])
    ], ContainerComponent);
    return ContainerComponent;
}());
exports.ContainerComponent = ContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9jb250YWluZXIvY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBQ25FLHNCQUE4Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ3RELDZCQUE2Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBSTdDLGFBQUssR0FBVztJQUMzQixFQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUM7SUFDakUsRUFBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDO0lBQzNFLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQztJQUM3RCxFQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDO0lBQ3ZELEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQztJQUN2RSxFQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUM7SUFDOUQsRUFBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDO0lBQ25FLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUM7SUFDcEQsRUFBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQztJQUNyRCxFQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUM7Q0FDdkQsQ0FBQztBQWNGO0lBdUNFLDRCQUFtQixlQUFnQyxFQUFRLFdBQTJCO1FBdkN4RixpQkFnRkM7UUF6Q29CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFRLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQXJDdEYsbUJBQWMsR0FBUyxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBUyxFQUFFLENBQUM7UUFDdkIsc0JBQWlCLEdBQUc7WUFDbEIsU0FBUyxFQUFFO2dCQUNULE1BQU0sRUFBRyxZQUFZO2dCQUNyQixJQUFJLEVBQUMsTUFBTTthQUNaO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLE1BQU0sRUFBRyxVQUFVO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0YsQ0FBQztRQUNGLHdCQUFtQixHQUFHO1lBQ3BCLElBQUk7WUFDSixJQUFJO1lBQ0osSUFBSTtZQUNKLFFBQVE7WUFDUixPQUFPO1lBQ1AsSUFBSTtTQUNMLENBQUM7UUFDRixxQkFBZ0IsR0FBRztZQUNqQixJQUFJO1lBQ0osSUFBSTtZQUNKLE1BQU07WUFDTixJQUFJO1lBQ0osUUFBUTtZQUNSLE9BQU87WUFDUCxJQUFJO1NBQ0wsQ0FBQztRQVdBLFdBQVcsQ0FBQyxjQUFNLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUUzQyxDQUFDO0lBSUQscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBSUQscUNBQVEsR0FBUjtRQUFBLGlCQXdCQztRQXZCQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRTthQUM5QixJQUFJLENBQ0YsVUFBQSxjQUFjO1lBRVosS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDdkMsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILEtBQUksQ0FBQyxZQUFZLEdBQVEsS0FBSyxDQUFDO1FBQ2pDLENBQUMsQ0FDRixDQUFDO1FBRVAsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUU7YUFDM0IsSUFBSSxDQUNELFVBQUEsV0FBVztZQUVULEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxLQUFJLENBQUMsWUFBWSxHQUFRLEtBQUssQ0FBQztRQUVqQyxDQUFDLENBQ0YsQ0FBQztJQUNWLENBQUM7SUF2Rkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDdEMsU0FBUyxFQUFFLENBQUMsNkJBQWMsQ0FBQztTQUM1QixDQUFDOzswQkFBQTtJQWtGRix5QkFBQztBQUFELENBaEZBLEFBZ0ZDLElBQUE7QUFoRlksMEJBQWtCLHFCQWdGOUIsQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9tYW5hZ2UvY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hbWVMaXN0U2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmVyL2luZGV4JztcbmltcG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IENvZGUgfSBmcm9tICcuL0NvZGUvaW5kZXgnO1xuXG5cbmV4cG9ydCBjb25zdCBDT0RFUzogQ29kZVtdID0gW1xuICB7aWQ6IDM3NTgyMjc0NjAsIG5hbWU6ICdjb250YWluZXIgZG9lcyBub3QgZXhpc3QnLGVuTmFtZTon5a655Zmo5LiN5a2Y5ZyoJ30sXG4gIHtpZDogMzc1ODIyNzQ1NywgbmFtZTogJ2RvY2tlciBzZXJ2aWNlIGNhbiBub3QgbGluaycsZW5OYW1lOidEb2NrZXLmnI3liqHov57mjqXlpLHotKUnfSxcbiAge2lkOiAzNzU4MjI3NDU5LCBuYW1lOiAnY29udGFpbmVyIGluIGRlYWQnLGVuTmFtZTon5a655Zmo5aSE5LqO5byC5bi454q25oCBJ30sXG4gIHtpZDogMzc1ODIyNzQ1OCwgbmFtZTogJ3NlcnZlciBlcnJvcicsZW5OYW1lOiflrrnlmajnuqfmnI3liqHplJnor68nfSxcbiAge2lkOiAzNzU4MjkyOTk0LCBuYW1lOiAnb3BlcmF0ZSBzZXJ2aWNlIGV4aXN0IGZhdWx0Jyxlbk5hbWU6J+aTjeS9nOacjeWKoeWPkeeUn+mUmeivryd9LFxuICB7aWQ6IDM3NTgyOTI5OTMsIG5hbWU6ICdsaW5rIGVycm9yJyxlbk5hbWU6J+i/nuaOpXN1cGVydmlzb3LmnI3liqHlpLHotKUnfSxcbiAge2lkOiAzNzU4MjkyOTk1LCBuYW1lOiAnc2VydmljZSBzdGF0dXMgaW4gZmF0YWwnLGVuTmFtZTon5pyN5Yqh5aSE5LqO5byC5bi454q25oCBJ30sXG4gIHtpZDogMzc1ODI5Mjk5NiwgbmFtZTogJ3NlcnZlciBlcnJvcicsZW5OYW1lOifmnI3liqHplJnor68nfSxcbiAge2lkOiAzNzU4MTYxOTIyLCBuYW1lOiAnYXJndW1lbnQgbnVsbCcsZW5OYW1lOiflj4LmlbDkuLrnqbonfSxcbiAge2lkOiAzNzU4MTYxOTIxLCBuYW1lOiAnYXJndW1lbnQgZXJyb3InLGVuTmFtZTon5Y+C5pWw6ZSZ6K+vJ31cbl07XG5cbi8qKlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIHRoZSBsYXp5IGxvYWRlZCBNYW5hZ2VyQ29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhci1jb250YWluZXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZVVybDogJ2NvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb250YWluZXIuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtOZ2JBbGVydENvbmZpZ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgY29udGFpbmVyTmFtZXM6YW55W10gPSBbXTtcbiAgc2VydmVyTmFtZXM6YW55W10gPSBbXTtcbiAgY29udGFpbmVyT3JTZXJ2ZXIgPSB7XG4gICAgY29udGFpbmVyOiB7XG4gICAgICBlbk5hbWUgOiAnY29udGFpbmVycycsXG4gICAgICBuYW1lOiflrrnlmajnrqHnkIYnXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGVuTmFtZSA6ICdzZXJ2aWNlcycsXG4gICAgICBuYW1lOiAn5pyN5Yqh566h55CGJ1xuICAgIH1cbiAgfTtcbiAgdEhlYWRDb250YWluZXJOYW1lcyA9IFtcbiAgICAn5bqP5Y+3JyxcbiAgICAn5ZCN56ewJyxcbiAgICAn54q25oCBJyxcbiAgICAnQ1BV5Y2g5pyJ546HJyxcbiAgICAn5YaF5a2Y5Y2g5pyJ546HJyxcbiAgICAn5pON5L2cJ1xuICBdO1xuICB0SGVhZFNlcnZlck5hbWVzID0gW1xuICAgICfluo/lj7cnLFxuICAgICflkI3np7AnLFxuICAgICfmiYDlsZ7lrrnlmagnLFxuICAgICfnirbmgIEnLFxuICAgICdDUFXljaDmnInnjocnLFxuICAgICflhoXlrZjljaDmnInnjocnLFxuICAgICfmk43kvZwnXG4gIF07XG4gIHByb21wdDpzdHJpbmc7XG4gIGNvZGVzOmFueTtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1hbmFnZUNvbXBvbmVudCB3aXRoIHRoZSBpbmplY3RlZFxuICAgKiBOYW1lTGlzdFNlcnZpY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7TmFtZUxpc3RTZXJ2aWNlfSBuYW1lTGlzdFNlcnZpY2UgLSBUaGUgaW5qZWN0ZWQgTmFtZUxpc3RTZXJ2aWNlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIG5hbWVMaXN0U2VydmljZTogTmFtZUxpc3RTZXJ2aWNlLHB1YmxpYyBhbGVydENvbmZpZzogTmdiQWxlcnRDb25maWcpIHtcbiAgICAvLyBhbGVydENvbmZpZy5kaXNtaXNzaWJsZSA9IHRydWU7XG4gICAgc2V0SW50ZXJ2YWwoKCk9PnsgdGhpcy5nZXROYW1lcygpfSw2MDAwMClcblxuICB9XG4gIC8qKlxuICAgKiDliJ3lp4vljJbnmoTml7blgJnojrflj5bmlbDmja5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0TmFtZXMoKTtcblxuICB9XG4gIC8qKlxuICAgKiDku47mnI3liqHlmajojrflj5bmlbDmja5cbiAgICovXG4gIGdldE5hbWVzKCk6IHZvaWQge1xuICAgIHRoaXMuY29kZXMgPSBDT0RFUztcbiAgICB0aGlzLm5hbWVMaXN0U2VydmljZS5nZXRDb250YWluZXIoKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgY29udGFpbmVyTmFtZXMgPT4ge1xuICAgICAgICAgICAgIC8v5oiQ5Yqf6I635Y+W5pWw5o2u77yM6YeM6Z2i5pyJcGlk5Li6LTHnmoTmg4XlhrVcbiAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lck5hbWVzID0gY29udGFpbmVyTmFtZXM7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3I7XG4gICAgICAgICAgIH1cbiAgICAgICAgICk7XG5cbiAgICB0aGlzLm5hbWVMaXN0U2VydmljZS5nZXRTZXJ2ZXIoKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIHNlcnZlck5hbWVzID0+IHtcbiAgICAgICAgICAgICAgLy/miJDlip/ojrflj5bmlbDmja7vvIzph4zpnaLmnIlwaWTkuLotMeeahOaDheWGtVxuICAgICAgICAgICAgICB0aGlzLnNlcnZlck5hbWVzID0gc2VydmVyTmFtZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3I7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICB9XG5cbn1cbiJdfQ==
