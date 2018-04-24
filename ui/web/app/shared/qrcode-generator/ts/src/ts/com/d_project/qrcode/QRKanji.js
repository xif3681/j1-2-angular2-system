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
            var QRKanji = (function (_super) {
                __extends(QRKanji, _super);
                function QRKanji(data) {
                    _super.call(this, qrcode.Mode.MODE_KANJI, data);
                }
                QRKanji.prototype.write = function (buffer) {
                    var data = qrcode.QRCode.stringToBytes(this.getData());
                    var i = 0;
                    while (i + 1 < data.length) {
                        var c = ((0xff & data[i]) << 8) | (0xff & data[i + 1]);
                        if (0x8140 <= c && c <= 0x9FFC) {
                            c -= 0x8140;
                        }
                        else if (0xE040 <= c && c <= 0xEBBF) {
                            c -= 0xC140;
                        }
                        else {
                            throw 'illegal char at ' + (i + 1) + '/' + c;
                        }
                        c = ((c >>> 8) & 0xff) * 0xC0 + (c & 0xff);
                        buffer.put(c, 13);
                        i += 2;
                    }
                    if (i < data.length) {
                        throw 'illegal char at ' + (i + 1);
                    }
                };
                QRKanji.prototype.getLength = function () {
                    return qrcode.QRCode.stringToBytes(this.getData()).length / 2;
                };
                return QRKanji;
            }(qrcode.QRData));
            qrcode.QRKanji = QRKanji;
        })(qrcode = d_project.qrcode || (d_project.qrcode = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVJLYW5qaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZLENBQUM7Ozs7OztBQUNiLElBQVUsR0FBRyxDQThDWjtBQTlDRCxXQUFVLEdBQUc7SUFBQyxJQUFBLFNBQVMsQ0E4Q3RCO0lBOUNhLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQThDN0I7UUE5Q3VCLFdBQUEsTUFBTSxFQUFDLENBQUM7WUFNOUI7Z0JBQTZCLDJCQUFNO2dCQUVqQyxpQkFBWSxJQUFhO29CQUN2QixrQkFBTSxXQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMvQixDQUFDO2dCQUVNLHVCQUFLLEdBQVosVUFBYSxNQUFrQjtvQkFFN0IsSUFBSSxJQUFJLEdBQUcsYUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUUsQ0FBQztvQkFFakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBRTNCLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUV4RCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixDQUFDLElBQUksTUFBTSxDQUFDO3dCQUNkLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ3RDLENBQUMsSUFBSSxNQUFNLENBQUM7d0JBQ2QsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixNQUFNLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBQy9DLENBQUM7d0JBRUQsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUU1QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFFbEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDVCxDQUFDO29CQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDckMsQ0FBQztnQkFDSCxDQUFDO2dCQUVNLDJCQUFTLEdBQWhCO29CQUNFLE1BQU0sQ0FBQyxhQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzFELENBQUM7Z0JBQ0gsY0FBQztZQUFELENBdkNBLEFBdUNDLENBdkM0QixhQUFNLEdBdUNsQztZQXZDWSxjQUFPLFVBdUNuQixDQUFBO1FBQ0gsQ0FBQyxFQTlDdUIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUE4QzdCO0lBQUQsQ0FBQyxFQTlDYSxTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4Q3RCO0FBQUQsQ0FBQyxFQTlDUyxHQUFHLEtBQUgsR0FBRyxRQThDWiIsImZpbGUiOiJhcHAvc2hhcmVkL3FyY29kZS1nZW5lcmF0b3IvdHMvc3JjL3RzL2NvbS9kX3Byb2plY3QvcXJjb2RlL1FSS2FuamkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiUVJEYXRhLnRzXCIgLz5cbid1c2Ugc3RyaWN0Jztcbm5hbWVzcGFjZSBjb20uZF9wcm9qZWN0LnFyY29kZSB7XG5cbiAgLyoqXG4gICAqIFFSS2FuamkoU0pJUyBvbmx5KVxuICAgKiBAYXV0aG9yIEthenVoaWtvIEFyYXNlXG4gICAqL1xuICBleHBvcnQgY2xhc3MgUVJLYW5qaSBleHRlbmRzIFFSRGF0YSB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhIDogc3RyaW5nKSB7XG4gICAgICBzdXBlcihNb2RlLk1PREVfS0FOSkksIGRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZShidWZmZXIgOiBCaXRCdWZmZXIpIDogdm9pZCB7XG5cbiAgICAgIHZhciBkYXRhID0gUVJDb2RlLnN0cmluZ1RvQnl0ZXModGhpcy5nZXREYXRhKCkgKTtcblxuICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICB3aGlsZSAoaSArIDEgPCBkYXRhLmxlbmd0aCkge1xuXG4gICAgICAgIHZhciBjID0gKCAoMHhmZiAmIGRhdGFbaV0pIDw8IDgpIHwgKDB4ZmYgJiBkYXRhW2kgKyAxXSk7XG5cbiAgICAgICAgaWYgKDB4ODE0MCA8PSBjICYmIGMgPD0gMHg5RkZDKSB7XG4gICAgICAgICAgYyAtPSAweDgxNDA7XG4gICAgICAgIH0gZWxzZSBpZiAoMHhFMDQwIDw9IGMgJiYgYyA8PSAweEVCQkYpIHtcbiAgICAgICAgICBjIC09IDB4QzE0MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAnaWxsZWdhbCBjaGFyIGF0ICcgKyAoaSArIDEpICsgJy8nICsgYztcbiAgICAgICAgfVxuXG4gICAgICAgIGMgPSAoIChjID4+PiA4KSAmIDB4ZmYpICogMHhDMCArIChjICYgMHhmZik7XG5cbiAgICAgICAgYnVmZmVyLnB1dChjLCAxMyk7XG5cbiAgICAgICAgaSArPSAyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHRocm93ICdpbGxlZ2FsIGNoYXIgYXQgJyArIChpICsgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldExlbmd0aCgpIDogbnVtYmVyIHtcbiAgICAgIHJldHVybiBRUkNvZGUuc3RyaW5nVG9CeXRlcyh0aGlzLmdldERhdGEoKSApLmxlbmd0aCAvIDI7XG4gICAgfVxuICB9XG59XG4iXX0=
