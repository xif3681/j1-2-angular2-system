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
        var qrcode;
        (function (qrcode) {
            var QR8BitByte = (function (_super) {
                __extends(QR8BitByte, _super);
                function QR8BitByte(data) {
                    _super.call(this, qrcode.Mode.MODE_8BIT_BYTE, data);
                }
                QR8BitByte.prototype.write = function (buffer) {
                    var data = qrcode.QRCode.stringToBytes(this.getData());
                    for (var i = 0; i < data.length; i += 1) {
                        buffer.put(data[i], 8);
                    }
                };
                QR8BitByte.prototype.getLength = function () {
                    return qrcode.QRCode.stringToBytes(this.getData()).length;
                };
                return QR8BitByte;
            }(qrcode.QRData));
            qrcode.QR8BitByte = QR8BitByte;
        })(qrcode = d_project.qrcode || (d_project.qrcode = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVI4Qml0Qnl0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZLENBQUM7Ozs7OztBQUNiLElBQVUsR0FBRyxDQXVCWjtBQXZCRCxXQUFVLEdBQUc7SUFBQyxJQUFBLFNBQVMsQ0F1QnRCO0lBdkJhLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQXVCN0I7UUF2QnVCLFdBQUEsTUFBTSxFQUFDLENBQUM7WUFNOUI7Z0JBQWdDLDhCQUFNO2dCQUVwQyxvQkFBWSxJQUFhO29CQUN2QixrQkFBTSxXQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUVNLDBCQUFLLEdBQVosVUFBYSxNQUFrQjtvQkFDN0IsSUFBSSxJQUFJLEdBQUcsYUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUUsQ0FBQztvQkFDakQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFTSw4QkFBUyxHQUFoQjtvQkFDRSxNQUFNLENBQUMsYUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RELENBQUM7Z0JBQ0gsaUJBQUM7WUFBRCxDQWhCQSxBQWdCQyxDQWhCK0IsYUFBTSxHQWdCckM7WUFoQlksaUJBQVUsYUFnQnRCLENBQUE7UUFDSCxDQUFDLEVBdkJ1QixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQXVCN0I7SUFBRCxDQUFDLEVBdkJhLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXVCdEI7QUFBRCxDQUFDLEVBdkJTLEdBQUcsS0FBSCxHQUFHLFFBdUJaIiwiZmlsZSI6ImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVI4Qml0Qnl0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJRUkRhdGEudHNcIiAvPlxuJ3VzZSBzdHJpY3QnO1xubmFtZXNwYWNlIGNvbS5kX3Byb2plY3QucXJjb2RlIHtcblxuICAvKipcbiAgICogUVI4Qml0Qnl0ZVxuICAgKiBAYXV0aG9yIEthenVoaWtvIEFyYXNlXG4gICAqL1xuICBleHBvcnQgY2xhc3MgUVI4Qml0Qnl0ZSBleHRlbmRzIFFSRGF0YSB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhIDogc3RyaW5nKSB7XG4gICAgICBzdXBlcihNb2RlLk1PREVfOEJJVF9CWVRFLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGUoYnVmZmVyIDogQml0QnVmZmVyKSA6IHZvaWQge1xuICAgICAgdmFyIGRhdGEgPSBRUkNvZGUuc3RyaW5nVG9CeXRlcyh0aGlzLmdldERhdGEoKSApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoZGF0YVtpXSwgOCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldExlbmd0aCgpIDogbnVtYmVyIHtcbiAgICAgIHJldHVybiBRUkNvZGUuc3RyaW5nVG9CeXRlcyh0aGlzLmdldERhdGEoKSApLmxlbmd0aDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
