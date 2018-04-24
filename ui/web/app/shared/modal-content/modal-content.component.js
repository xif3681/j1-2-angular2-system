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
var ModalContent = (function () {
    function ModalContent(activeModal) {
        this.activeModal = activeModal;
    }
    ModalContent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ar-modal-content',
            templateUrl: 'modal-content.component.html',
            styleUrls: ['modal-content.component.css'],
            input: ['title', 'body']
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal])
    ], ModalContent);
    return ModalContent;
}());
exports.ModalContent = ModalContent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kYWwtY29udGVudC9tb2RhbC1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWlDLGVBQWUsQ0FBQyxDQUFBO0FBRWpELDZCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBVTVEO0lBRUUsc0JBQW1CLFdBQTJCO1FBQTNCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtJQUFHLENBQUM7SUFWcEQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDO1NBQ3hCLENBQUM7O29CQUFBO0lBS0YsbUJBQUM7QUFBRCxDQUhBLEFBR0MsSUFBQTtBQUhZLG9CQUFZLGVBR3hCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RhbC1jb250ZW50L21vZGFsLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ2JBY3RpdmVNb2RhbCB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXItbW9kYWwtY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnbW9kYWwtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtb2RhbC1jb250ZW50LmNvbXBvbmVudC5jc3MnXSxcbiAgaW5wdXQ6IFsndGl0bGUnLCdib2R5J11cbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRlbnQge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwpIHt9XG59XG4iXX0=
