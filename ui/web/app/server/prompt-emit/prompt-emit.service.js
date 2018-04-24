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
var PromptEmitService = (function () {
    function PromptEmitService() {
        this.change = new core_1.EventEmitter();
    }
    PromptEmitService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PromptEmitService);
    return PromptEmitService;
}());
exports.PromptEmitService = PromptEmitService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2ZXIvcHJvbXB0LWVtaXQvcHJvbXB0LWVtaXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBRWxFO0lBR0U7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFOSDtRQUFDLGlCQUFVLEVBQUU7O3lCQUFBO0lBT2Isd0JBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLHlCQUFpQixvQkFNN0IsQ0FBQSIsImZpbGUiOiJhcHAvc2VydmVyL3Byb21wdC1lbWl0L3Byb21wdC1lbWl0LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOe7hOS7tumXtOmAmui/h+acjeWKoeadpemAmuS/oVxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsSW5qZWN0YWJsZSxFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9tcHRFbWl0U2VydmljZSB7XG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj47XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxufVxuIl19
