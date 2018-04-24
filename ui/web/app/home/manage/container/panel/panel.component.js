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
var PanelComponent = (function () {
    function PanelComponent() {
    }
    PanelComponent.prototype.onBtnItemChange = function (item, value) {
        item.name = value.name;
        item.container = value.container;
        item.status = value.status;
        item.cpu_percent = value.cpu_percent;
        item.mem_percent = value.mem_percent;
    };
    PanelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-panel',
            templateUrl: 'panel.component.html',
            styleUrls: ['panel.component.css'],
            providers: [index_1.NameListService],
            inputs: ['Title', 'Names', 'tHeadNames']
        }), 
        __metadata('design:paramtypes', [])
    ], PanelComponent);
    return PanelComponent;
}());
exports.PanelComponent = PanelComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9jb250YWluZXIvcGFuZWwvcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUMsZUFBZSxDQUFDLENBQUE7QUFHekQsc0JBQThCLDBCQUEwQixDQUFDLENBQUE7QUFhekQ7SUFBQTtJQVNBLENBQUM7SUFQRSx3Q0FBZSxHQUFmLFVBQWdCLElBQVMsRUFBRSxLQUFVO1FBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQWpCSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsQ0FBQyx1QkFBZSxDQUFDO1lBQzVCLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsWUFBWSxDQUFDO1NBQ3ZDLENBQUM7O3NCQUFBO0lBV0YscUJBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHNCQUFjLGlCQVMxQixDQUFBIiwiZmlsZSI6ImFwcC9ob21lL21hbmFnZS9jb250YWluZXIvcGFuZWwvcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuLi9zdGF0dXMvaW5kZXgnO1xuaW1wb3J0IHsgQnV0dG9uR3JvdXBDb21wb25lbnQgfSBmcm9tICcuLi9idXR0b24tZ3JvdXAvaW5kZXgnO1xuaW1wb3J0IHtOYW1lTGlzdFNlcnZpY2V9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlci9pbmRleCc7XG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyB0aGUgbmF2aWdhdGlvbiBiYXIgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdteS1wYW5lbCcsXG4gIHRlbXBsYXRlVXJsOiAncGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFuZWwuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtOYW1lTGlzdFNlcnZpY2VdLFxuICBpbnB1dHM6IFsnVGl0bGUnLCdOYW1lcycsJ3RIZWFkTmFtZXMnXVxufSlcblxuZXhwb3J0IGNsYXNzIFBhbmVsQ29tcG9uZW50e1xuXG4gICBvbkJ0bkl0ZW1DaGFuZ2UoaXRlbTogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgIGl0ZW0ubmFtZSA9IHZhbHVlLm5hbWU7XG4gICAgIGl0ZW0uY29udGFpbmVyID0gdmFsdWUuY29udGFpbmVyO1xuICAgICBpdGVtLnN0YXR1cyA9IHZhbHVlLnN0YXR1cztcbiAgICAgaXRlbS5jcHVfcGVyY2VudCA9IHZhbHVlLmNwdV9wZXJjZW50O1xuICAgICBpdGVtLm1lbV9wZXJjZW50ID0gdmFsdWUubWVtX3BlcmNlbnQ7XG4gIH1cbn1cbiJdfQ==
