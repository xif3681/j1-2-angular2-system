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
            var QRNumber = (function (_super) {
                __extends(QRNumber, _super);
                function QRNumber(data) {
                    _super.call(this, qrcode.Mode.MODE_NUMBER, data);
                }
                QRNumber.prototype.write = function (buffer) {
                    var data = this.getData();
                    var i = 0;
                    while (i + 2 < data.length) {
                        buffer.put(QRNumber.strToNum(data.substring(i, i + 3)), 10);
                        i += 3;
                    }
                    if (i < data.length) {
                        if (data.length - i == 1) {
                            buffer.put(QRNumber.strToNum(data.substring(i, i + 1)), 4);
                        }
                        else if (data.length - i == 2) {
                            buffer.put(QRNumber.strToNum(data.substring(i, i + 2)), 7);
                        }
                    }
                };
                QRNumber.prototype.getLength = function () {
                    return this.getData().length;
                };
                QRNumber.strToNum = function (s) {
                    var num = 0;
                    for (var i = 0; i < s.length; i += 1) {
                        num = num * 10 + QRNumber.chatToNum(s.charAt(i));
                    }
                    return num;
                };
                QRNumber.chatToNum = function (c) {
                    if ('0' <= c && c <= '9') {
                        return c.charCodeAt(0) - '0'.charCodeAt(0);
                    }
                    throw 'illegal char :' + c;
                };
                return QRNumber;
            }(qrcode.QRData));
            qrcode.QRNumber = QRNumber;
        })(qrcode = d_project.qrcode || (d_project.qrcode = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVJOdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWSxDQUFDOzs7Ozs7QUFDYixJQUFVLEdBQUcsQ0FtRFo7QUFuREQsV0FBVSxHQUFHO0lBQUMsSUFBQSxTQUFTLENBbUR0QjtJQW5EYSxXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FtRDdCO1FBbkR1QixXQUFBLE1BQU0sRUFBQyxDQUFDO1lBTTlCO2dCQUE4Qiw0QkFBTTtnQkFFbEMsa0JBQVksSUFBYTtvQkFDdkIsa0JBQU0sV0FBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFFTSx3QkFBSyxHQUFaLFVBQWEsTUFBa0I7b0JBRTdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDVCxDQUFDO29CQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM5RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzlELENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVNLDRCQUFTLEdBQWhCO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUMvQixDQUFDO2dCQUVjLGlCQUFRLEdBQXZCLFVBQXdCLENBQVU7b0JBQ2hDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDWixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNyQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztvQkFDcEQsQ0FBQztvQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNiLENBQUM7Z0JBRWMsa0JBQVMsR0FBeEIsVUFBeUIsQ0FBVTtvQkFDakMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsQ0FBQztvQkFDRCxNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFDSCxlQUFDO1lBQUQsQ0E1Q0EsQUE0Q0MsQ0E1QzZCLGFBQU0sR0E0Q25DO1lBNUNZLGVBQVEsV0E0Q3BCLENBQUE7UUFDSCxDQUFDLEVBbkR1QixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQW1EN0I7SUFBRCxDQUFDLEVBbkRhLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW1EdEI7QUFBRCxDQUFDLEVBbkRTLEdBQUcsS0FBSCxHQUFHLFFBbURaIiwiZmlsZSI6ImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVJOdW1iZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiUVJEYXRhLnRzXCIgLz5cbid1c2Ugc3RyaWN0Jztcbm5hbWVzcGFjZSBjb20uZF9wcm9qZWN0LnFyY29kZSB7XG5cbiAgLyoqXG4gICAqIFFSTnVtYmVyXG4gICAqIEBhdXRob3IgS2F6dWhpa28gQXJhc2VcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBRUk51bWJlciBleHRlbmRzIFFSRGF0YSB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhIDogc3RyaW5nKSB7XG4gICAgICBzdXBlcihNb2RlLk1PREVfTlVNQkVSLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGUoYnVmZmVyIDogQml0QnVmZmVyKSA6IHZvaWQge1xuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xuXG4gICAgICB2YXIgaSA9IDA7XG5cbiAgICAgIHdoaWxlIChpICsgMiA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoUVJOdW1iZXIuc3RyVG9OdW0oZGF0YS5zdWJzdHJpbmcoaSwgaSArIDMpICksIDEwKTtcbiAgICAgICAgaSArPSAzO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCAtIGkgPT0gMSkge1xuICAgICAgICAgIGJ1ZmZlci5wdXQoUVJOdW1iZXIuc3RyVG9OdW0oZGF0YS5zdWJzdHJpbmcoaSwgaSArIDEpICksIDQpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoIC0gaSA9PSAyKSB7XG4gICAgICAgICAgYnVmZmVyLnB1dChRUk51bWJlci5zdHJUb051bShkYXRhLnN1YnN0cmluZyhpLCBpICsgMikgKSwgNyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGVuZ3RoKCkgOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzdHJUb051bShzIDogc3RyaW5nKSA6IG51bWJlciB7XG4gICAgICB2YXIgbnVtID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBudW0gPSBudW0gKiAxMCArIFFSTnVtYmVyLmNoYXRUb051bShzLmNoYXJBdChpKSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjaGF0VG9OdW0oYyA6IHN0cmluZykgOiBudW1iZXIge1xuICAgICAgaWYgKCcwJyA8PSBjICYmIGMgPD0gJzknKSB7XG4gICAgICAgIHJldHVybiBjLmNoYXJDb2RlQXQoMCkgLSAnMCcuY2hhckNvZGVBdCgwKTtcbiAgICAgIH1cbiAgICAgIHRocm93ICdpbGxlZ2FsIGNoYXIgOicgKyBjO1xuICAgIH1cbiAgfVxufVxuIl19
