'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var io;
        (function (io) {
            var ByteArrayOutputStream = (function (_super) {
                __extends(ByteArrayOutputStream, _super);
                function ByteArrayOutputStream() {
                    _super.call(this);
                    this.bytes = [];
                }
                ByteArrayOutputStream.prototype.writeByte = function (b) {
                    this.bytes.push(b);
                };
                ByteArrayOutputStream.prototype.toByteArray = function () {
                    return this.bytes;
                };
                return ByteArrayOutputStream;
            }(io.OutputStream));
            io.ByteArrayOutputStream = ByteArrayOutputStream;
        })(io = d_project.io || (d_project.io = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pby9CeXRlQXJyYXlPdXRwdXRTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWSxDQUFDOzs7Ozs7QUFDYixJQUFVLEdBQUcsQ0FzQlo7QUF0QkQsV0FBVSxHQUFHO0lBQUMsSUFBQSxTQUFTLENBc0J0QjtJQXRCYSxXQUFBLFNBQVM7UUFBQyxJQUFBLEVBQUUsQ0FzQnpCO1FBdEJ1QixXQUFBLEVBQUUsRUFBQyxDQUFDO1lBTTFCO2dCQUEyQyx5Q0FBWTtnQkFJckQ7b0JBQ0UsaUJBQU8sQ0FBQztvQkFIRixVQUFLLEdBQWMsRUFBRSxDQUFDO2dCQUk5QixDQUFDO2dCQUVNLHlDQUFTLEdBQWhCLFVBQWlCLENBQVU7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUVNLDJDQUFXLEdBQWxCO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNwQixDQUFDO2dCQUNILDRCQUFDO1lBQUQsQ0FmQSxBQWVDLENBZjBDLGVBQVksR0FldEQ7WUFmWSx3QkFBcUIsd0JBZWpDLENBQUE7UUFDSCxDQUFDLEVBdEJ1QixFQUFFLEdBQUYsWUFBRSxLQUFGLFlBQUUsUUFzQnpCO0lBQUQsQ0FBQyxFQXRCYSxTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzQnRCO0FBQUQsQ0FBQyxFQXRCUyxHQUFHLEtBQUgsR0FBRyxRQXNCWiIsImZpbGUiOiJhcHAvc2hhcmVkL3FyY29kZS1nZW5lcmF0b3IvdHMvc3JjL3RzL2NvbS9kX3Byb2plY3QvaW8vQnl0ZUFycmF5T3V0cHV0U3RyZWFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk91dHB1dFN0cmVhbS50c1wiIC8+XG4ndXNlIHN0cmljdCc7XG5uYW1lc3BhY2UgY29tLmRfcHJvamVjdC5pbyB7XG5cbiAgLyoqXG4gICAqIEJ5dGVBcnJheU91dHB1dFN0cmVhbVxuICAgKiBAYXV0aG9yIEthenVoaWtvIEFyYXNlXG4gICAqL1xuICBleHBvcnQgY2xhc3MgQnl0ZUFycmF5T3V0cHV0U3RyZWFtIGV4dGVuZHMgT3V0cHV0U3RyZWFtIHtcblxuICAgIHByaXZhdGUgYnl0ZXMgOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZUJ5dGUoYiA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgIHRoaXMuYnl0ZXMucHVzaChiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9CeXRlQXJyYXkoKSA6IG51bWJlcltdIHtcbiAgICAgIHJldHVybiB0aGlzLmJ5dGVzO1xuICAgIH1cbiAgfVxufVxuIl19
