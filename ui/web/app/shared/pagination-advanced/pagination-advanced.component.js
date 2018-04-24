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
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var PaginationAdvanced = (function () {
    function PaginationAdvanced(config) {
        this.config = config;
        this.curPage = '1';
        this.page = '1';
        this.curPageNum = '10';
        this.changCurPageNum = new core_1.EventEmitter();
        this.changCurPage = new core_1.EventEmitter();
        this.changPage = new core_1.EventEmitter();
        this.pageNumList = ['10', '15', '20', '30', '40', '50'];
    }
    PaginationAdvanced.prototype.pageChanged = function (num) {
        this.page = num;
        this.curPage = num;
        this.changPage.emit(num);
    };
    PaginationAdvanced.prototype.setCurPageNum = function (num) {
        this.curPageNum = num;
        this.changCurPageNum.emit(num);
    };
    PaginationAdvanced.prototype.jumpPageKeyUp = function (e, num) {
        if (e.keyCode == 13) {
            this.page = num;
            this.curPage = num;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PaginationAdvanced.prototype, "changCurPageNum", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PaginationAdvanced.prototype, "changCurPage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PaginationAdvanced.prototype, "changPage", void 0);
    PaginationAdvanced = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-pagination-advanced',
            templateUrl: 'pagination-advanced.component.html',
            styleUrls: ['pagination-advanced.component.css'],
            inputs: ['toLicenseCountMe'],
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbPaginationConfig])
    ], PaginationAdvanced);
    return PaginationAdvanced;
}());
exports.PaginationAdvanced = PaginationAdvanced;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGFnaW5hdGlvbi1hZHZhbmNlZC9wYWdpbmF0aW9uLWFkdmFuY2VkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQThDLGVBQWUsQ0FBQyxDQUFBO0FBQzlELDZCQUFvQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTWpFLFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUNuQyxRQUFPLDZCQUE2QixDQUFDLENBQUE7QUFXckM7SUE0QkUsNEJBQW1CLE1BQTJCO1FBQTNCLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBeEI5QyxZQUFPLEdBQVMsR0FBRyxDQUFDO1FBQ3BCLFNBQUksR0FBUyxHQUFHLENBQUM7UUFDakIsZUFBVSxHQUFTLElBQUksQ0FBQztRQUN4QixvQkFBZSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3JDLGlCQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDbEMsY0FBUyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBZ0IvQixnQkFBVyxHQUFVLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztJQUlyRCxDQUFDO0lBbkJELHdDQUFXLEdBQVgsVUFBWSxHQUFHO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELDBDQUFhLEdBQWIsVUFBYyxHQUFHO1FBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELDBDQUFhLEdBQWIsVUFBYyxDQUFDLEVBQUMsR0FBRztRQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUF2QkQ7UUFBQyxhQUFNLEVBQUU7OytEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OzREQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O3lEQUFBO0lBWFg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUNoRCxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUM3QixDQUFDOzswQkFBQTtJQWdDRix5QkFBQztBQUFELENBOUJBLEFBOEJDLElBQUE7QUE5QlksMEJBQWtCLHFCQThCOUIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3BhZ2luYXRpb24tYWR2YW5jZWQvcGFnaW5hdGlvbi1hZHZhbmNlZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbXBvbmVudCxPdXRwdXQsRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JQYWdpbmF0aW9uQ29uZmlnIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuXG5cbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZm9yIGRlYnVnZ2luZ1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhci1wYWdpbmF0aW9uLWFkdmFuY2VkJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdpbmF0aW9uLWFkdmFuY2VkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2luYXRpb24tYWR2YW5jZWQuY29tcG9uZW50LmNzcyddLFxuICBpbnB1dHM6IFsndG9MaWNlbnNlQ291bnRNZSddLFxufSlcblxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25BZHZhbmNlZCB7XG4gIEBPdXRwdXQoKSBjaGFuZ0N1clBhZ2VOdW07XG4gIEBPdXRwdXQoKSBjaGFuZ0N1clBhZ2U7XG4gIEBPdXRwdXQoKSBjaGFuZ1BhZ2U7XG4gIGN1clBhZ2U6IHN0cmluZz0nMSc7XG4gIHBhZ2U6IHN0cmluZz0nMSc7XG4gIGN1clBhZ2VOdW06IHN0cmluZz0nMTAnO1xuICBjaGFuZ0N1clBhZ2VOdW0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNoYW5nQ3VyUGFnZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY2hhbmdQYWdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwYWdlQ2hhbmdlZChudW0pOnZvaWR7XG4gICAgdGhpcy5wYWdlID0gbnVtO1xuICAgIHRoaXMuY3VyUGFnZSA9IG51bTtcbiAgICB0aGlzLmNoYW5nUGFnZS5lbWl0KG51bSk7XG4gIH1cbiAgc2V0Q3VyUGFnZU51bShudW0pOnZvaWR7XG4gICAgdGhpcy5jdXJQYWdlTnVtID0gbnVtO1xuICAgIHRoaXMuY2hhbmdDdXJQYWdlTnVtLmVtaXQobnVtKTtcbiAgfVxuICBqdW1wUGFnZUtleVVwKGUsbnVtKTogdm9pZCB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgdGhpcy5wYWdlID0gbnVtO1xuICAgICAgdGhpcy5jdXJQYWdlID0gbnVtO1xuICAgIH1cbiAgfVxuICBwYWdlTnVtTGlzdDpzdHJpbmdbXT1bJzEwJywnMTUnLCcyMCcsJzMwJywnNDAnLCc1MCddO1xuICBlcnJvcjphbnk7XG4gIGxpY2Vuc2VDb3VudE1lOmFueTtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZzogTmdiUGFnaW5hdGlvbkNvbmZpZykge1xuICB9XG59XG4iXX0=
