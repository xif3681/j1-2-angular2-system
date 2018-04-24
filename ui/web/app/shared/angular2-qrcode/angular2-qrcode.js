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
var qrcode = require('qrcode-generator');
var QRCodeComponent = (function () {
    function QRCodeComponent(elementRef) {
        this.elementRef = elementRef;
        this.data = '';
        this.size = 128;
        this.type = 4;
        this.level = 'M';
    }
    QRCodeComponent.prototype.ngOnInit = function () {
        try {
            this.qr = qrcode(this.type, this.level);
            this.qr.addData(this.data);
            this.qr.make();
            var imgTagString = this.qr.createImgTag(this.type, 0);
            var el = this.elementRef.nativeElement;
            el.innerHTML = imgTagString;
            var imgTagObject = el.firstElementChild;
            imgTagObject.width = this.size;
            imgTagObject.height = this.size;
        }
        catch (e) {
            console.error("Could not generate QR Code: " + e.message);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], QRCodeComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], QRCodeComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], QRCodeComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], QRCodeComponent.prototype, "level", void 0);
    QRCodeComponent = __decorate([
        core_1.Component({
            selector: 'qr-code',
            template: ''
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], QRCodeComponent);
    return QRCodeComponent;
}());
exports.QRCodeComponent = QRCodeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvYW5ndWxhcjItcXJjb2RlL2FuZ3VsYXIyLXFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBTU8sZUFBZSxDQUFDLENBQUE7QUFFdkIsSUFBTyxNQUFNLFdBQVcsa0JBQWtCLENBQUMsQ0FBQztBQU01QztJQVFJLHlCQUNZLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQekIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBQ25CLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsVUFBSyxHQUFXLEdBQUcsQ0FBQztJQUsxQixDQUFDO0lBRUosa0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLEVBQUUsR0FBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDcEQsRUFBRSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7WUFDNUIsSUFBSSxZQUFZLEdBQXdDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUM3RSxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDL0IsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBK0IsQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1FBQzlELENBQUM7SUFDTCxDQUFDO0lBeEJEO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQVRaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQzs7dUJBQUE7SUE0QkYsc0JBQUM7QUFBRCxDQTNCQSxBQTJCQyxJQUFBO0FBM0JZLHVCQUFlLGtCQTJCM0IsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL2FuZ3VsYXIyLXFyY29kZS9hbmd1bGFyMi1xcmNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIE5nTW9kdWxlLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IHFyY29kZSB9IGZyb20gJ3FyY29kZS1nZW5lcmF0b3InO1xuaW1wb3J0IHFyY29kZSA9IHJlcXVpcmUoJ3FyY29kZS1nZW5lcmF0b3InKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdxci1jb2RlJyxcbiAgICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgUVJDb2RlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGRhdGE6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlciA9IDEyODtcbiAgICBASW5wdXQoKSB0eXBlOiBudW1iZXIgPSA0O1xuICAgIEBJbnB1dCgpIGxldmVsOiBzdHJpbmcgPSAnTSc7XG4gICAgcHJpdmF0ZSBxcjogUVJDb2RlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5xciA9IHFyY29kZSh0aGlzLnR5cGUsIHRoaXMubGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy5xci5hZGREYXRhKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnFyLm1ha2UoKTtcbiAgICAgICAgICAgIGxldCBpbWdUYWdTdHJpbmcgPSB0aGlzLnFyLmNyZWF0ZUltZ1RhZyh0aGlzLnR5cGUsIDApO1xuICAgICAgICAgICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaW1nVGFnU3RyaW5nO1xuICAgICAgICAgICAgbGV0IGltZ1RhZ09iamVjdDogSFRNTEltYWdlRWxlbWVudCA9IDxIVE1MSW1hZ2VFbGVtZW50PiBlbC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIGltZ1RhZ09iamVjdC53aWR0aCA9IHRoaXMuc2l6ZTtcbiAgICAgICAgICAgIGltZ1RhZ09iamVjdC5oZWlnaHQgPSB0aGlzLnNpemU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBnZW5lcmF0ZSBRUiBDb2RlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
