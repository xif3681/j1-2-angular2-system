"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var monitoring_service_1 = require('./monitoring.service');
var CustomHttp = (function (_super) {
    __extends(CustomHttp, _super);
    function CustomHttp(backend, defaultOptions, monitoring) {
        _super.call(this, backend, defaultOptions);
        this.monitoring = monitoring;
        console.log('monitoring = ' + this.monitoring);
    }
    CustomHttp.prototype.request = function (url, options) {
        var _this = this;
        this.monitoring.pendingRequestsNumber++;
        return _super.prototype.request.call(this, url, options).finally(function () {
            _this.monitoring.pendingRequestsNumber--;
        });
    };
    CustomHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, monitoring_service_1.MonitoringService])
    ], CustomHttp);
    return CustomHttp;
}(http_1.Http));
exports.CustomHttp = CustomHttp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9odHRwLmN1c3RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMscUJBQStFLGVBQWUsQ0FBQyxDQUFBO0FBQy9GLFFBQU8sU0FBUyxDQUFDLENBQUE7QUFDakIsbUNBQWdDLHNCQUFzQixDQUFDLENBQUE7QUFHdkQ7SUFBZ0MsOEJBQUk7SUFDbEMsb0JBQVksT0FBMEIsRUFDMUIsY0FBOEIsRUFDdEIsVUFBNEI7UUFDOUMsa0JBQU0sT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRGIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFFOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCw0QkFBTyxHQUFQLFVBQVEsR0FBcUIsRUFBRSxPQUE0QjtRQUEzRCxpQkFPQztRQUxDLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN4QyxNQUFNLENBQUMsZ0JBQUssQ0FBQyxPQUFPLFlBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUV6QyxLQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBaEJIO1FBQUMsaUJBQVUsRUFBRTs7a0JBQUE7SUFzRGIsaUJBQUM7QUFBRCxDQXJEQSxBQXFEQyxDQXJEK0IsV0FBSSxHQXFEbkM7QUFyRFksa0JBQVUsYUFxRHRCLENBQUEiLCJmaWxlIjoiYXBwL2h0dHAuY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cCxDb25uZWN0aW9uQmFja2VuZCxSZXF1ZXN0T3B0aW9ucyxSZXF1ZXN0T3B0aW9uc0FyZ3MsUmVxdWVzdH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgJ3J4anMvUngnO1xuaW1wb3J0IHtNb25pdG9yaW5nU2VydmljZX0gZnJvbSAnLi9tb25pdG9yaW5nLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cCBleHRlbmRzIEh0dHAge1xuICBjb25zdHJ1Y3RvcihiYWNrZW5kOiBDb25uZWN0aW9uQmFja2VuZCxcbiAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLFxuICAgICAgICAgICAgICBwcml2YXRlIG1vbml0b3Jpbmc6TW9uaXRvcmluZ1NlcnZpY2UpIHtcbiAgICBzdXBlcihiYWNrZW5kLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgY29uc29sZS5sb2coJ21vbml0b3JpbmcgPSAnK3RoaXMubW9uaXRvcmluZyk7XG4gIH1cblxuICByZXF1ZXN0KHVybDogc3RyaW5nIHwgUmVxdWVzdCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICAvLyBjb25zb2xlLmxvZygncmVxdWVzdC4uLicpO1xuICAgIHRoaXMubW9uaXRvcmluZy5wZW5kaW5nUmVxdWVzdHNOdW1iZXIrKztcbiAgICByZXR1cm4gc3VwZXIucmVxdWVzdCh1cmwsIG9wdGlvbnMpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2ZpbmFsbHknKTtcbiAgICAgIHRoaXMubW9uaXRvcmluZy5wZW5kaW5nUmVxdWVzdHNOdW1iZXItLTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdldCh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgLy8gICBjb25zb2xlLmxvZygnZ2V0Li4uJyk7XG4gIC8vICAgLy8gdGhpcy5tb25pdG9yaW5nLnBlbmRpbmdSZXF1ZXN0c051bWJlcisrO1xuICAvLyAgIHJldHVybiBzdXBlci5nZXQodXJsLCBvcHRpb25zKS5maW5hbGx5KCgpID0+IHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdmaW5hbGx5Jyk7XG4gIC8vICAgICAvLyB0aGlzLm1vbml0b3JpbmcucGVuZGluZ1JlcXVlc3RzTnVtYmVyLS07XG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gcHV0KHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAvLyAgIGNvbnNvbGUubG9nKCdwdXQuLi4nKTtcbiAgLy8gICAvLyB0aGlzLm1vbml0b3JpbmcucGVuZGluZ1JlcXVlc3RzTnVtYmVyKys7XG4gIC8vICAgcmV0dXJuIHN1cGVyLnB1dCh1cmwsIG9wdGlvbnMpLmZpbmFsbHkoKCkgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2coJ2ZpbmFsbHknKTtcbiAgLy8gICAgIC8vIHRoaXMubW9uaXRvcmluZy5wZW5kaW5nUmVxdWVzdHNOdW1iZXItLTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuICAvL1xuICAvLyBwb3N0KHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAvLyAgIGNvbnNvbGUubG9nKCdwb3N0Li4uJyk7XG4gIC8vICAgLy8gdGhpcy5tb25pdG9yaW5nLnBlbmRpbmdSZXF1ZXN0c051bWJlcisrO1xuICAvLyAgIHJldHVybiBzdXBlci5wb3N0KHVybCwgb3B0aW9ucykuZmluYWxseSgoKSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZygnZmluYWxseScpO1xuICAvLyAgICAgLy8gdGhpcy5tb25pdG9yaW5nLnBlbmRpbmdSZXF1ZXN0c051bWJlci0tO1xuICAvLyAgIH0pO1xuICAvLyB9XG4gIC8vXG4gIC8vIGRlbGV0ZSh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgLy8gICBjb25zb2xlLmxvZygnZGVsZXRlLi4uJyk7XG4gIC8vICAgLy8gdGhpcy5tb25pdG9yaW5nLnBlbmRpbmdSZXF1ZXN0c051bWJlcisrO1xuICAvLyAgIHJldHVybiBzdXBlci5kZWxldGUodXJsLCBvcHRpb25zKS5maW5hbGx5KCgpID0+IHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdmaW5hbGx5Jyk7XG4gIC8vICAgICAvLyB0aGlzLm1vbml0b3JpbmcucGVuZGluZ1JlcXVlc3RzTnVtYmVyLS07XG4gIC8vICAgfSk7XG4gIC8vIH1cblxufVxuIl19
