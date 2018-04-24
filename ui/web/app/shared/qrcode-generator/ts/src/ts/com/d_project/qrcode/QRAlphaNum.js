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
            var QRAlphaNum = (function (_super) {
                __extends(QRAlphaNum, _super);
                function QRAlphaNum(data) {
                    _super.call(this, qrcode.Mode.MODE_ALPHA_NUM, data);
                }
                QRAlphaNum.prototype.write = function (buffer) {
                    var s = this.getData();
                    var i = 0;
                    while (i + 1 < s.length) {
                        buffer.put(QRAlphaNum.getCode(s.charAt(i)) * 45 +
                            QRAlphaNum.getCode(s.charAt(i + 1)), 11);
                        i += 2;
                    }
                    if (i < s.length) {
                        buffer.put(QRAlphaNum.getCode(s.charAt(i)), 6);
                    }
                };
                QRAlphaNum.prototype.getLength = function () {
                    return this.getData().length;
                };
                QRAlphaNum.getCode = function (c) {
                    if ('0' <= c && c <= '9') {
                        return c.charCodeAt(0) - '0'.charCodeAt(0);
                    }
                    else if ('A' <= c && c <= 'Z') {
                        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
                    }
                    else {
                        switch (c) {
                            case ' ': return 36;
                            case '$': return 37;
                            case '%': return 38;
                            case '*': return 39;
                            case '+': return 40;
                            case '-': return 41;
                            case '.': return 42;
                            case '/': return 43;
                            case ':': return 44;
                            default:
                                throw 'illegal char :' + c;
                        }
                    }
                };
                return QRAlphaNum;
            }(qrcode.QRData));
            qrcode.QRAlphaNum = QRAlphaNum;
        })(qrcode = d_project.qrcode || (d_project.qrcode = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVJBbHBoYU51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZLENBQUM7Ozs7OztBQUNiLElBQVUsR0FBRyxDQXlEWjtBQXpERCxXQUFVLEdBQUc7SUFBQyxJQUFBLFNBQVMsQ0F5RHRCO0lBekRhLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQXlEN0I7UUF6RHVCLFdBQUEsTUFBTSxFQUFDLENBQUM7WUFNOUI7Z0JBQWdDLDhCQUFNO2dCQUVwQyxvQkFBWSxJQUFhO29CQUN2QixrQkFBTSxXQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUVNLDBCQUFLLEdBQVosVUFBYSxNQUFrQjtvQkFFN0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRVYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FDUixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUUsR0FBRyxFQUFFOzRCQUNyQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzVDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1QsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELENBQUM7Z0JBQ0gsQ0FBQztnQkFFTSw4QkFBUyxHQUFoQjtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDL0IsQ0FBQztnQkFFYyxrQkFBTyxHQUF0QixVQUF1QixDQUFVO29CQUUvQixFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDbEQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNaLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCLEtBQUssR0FBRyxFQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7NEJBQ3JCO2dDQUNFLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxpQkFBQztZQUFELENBbERBLEFBa0RDLENBbEQrQixhQUFNLEdBa0RyQztZQWxEWSxpQkFBVSxhQWtEdEIsQ0FBQTtRQUNILENBQUMsRUF6RHVCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBeUQ3QjtJQUFELENBQUMsRUF6RGEsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeUR0QjtBQUFELENBQUMsRUF6RFMsR0FBRyxLQUFILEdBQUcsUUF5RFoiLCJmaWxlIjoiYXBwL3NoYXJlZC9xcmNvZGUtZ2VuZXJhdG9yL3RzL3NyYy90cy9jb20vZF9wcm9qZWN0L3FyY29kZS9RUkFscGhhTnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlFSRGF0YS50c1wiIC8+XG4ndXNlIHN0cmljdCc7XG5uYW1lc3BhY2UgY29tLmRfcHJvamVjdC5xcmNvZGUge1xuXG4gIC8qKlxuICAgKiBRUkFscGhhTnVtXG4gICAqIEBhdXRob3IgS2F6dWhpa28gQXJhc2VcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBRUkFscGhhTnVtIGV4dGVuZHMgUVJEYXRhIHtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGEgOiBzdHJpbmcpIHtcbiAgICAgIHN1cGVyKE1vZGUuTU9ERV9BTFBIQV9OVU0sIGRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZShidWZmZXIgOiBCaXRCdWZmZXIpIDogdm9pZCB7XG5cbiAgICAgIHZhciBzID0gdGhpcy5nZXREYXRhKCk7XG5cbiAgICAgIHZhciBpID0gMDtcblxuICAgICAgd2hpbGUgKGkgKyAxIDwgcy5sZW5ndGgpIHtcbiAgICAgICAgYnVmZmVyLnB1dChcbiAgICAgICAgICBRUkFscGhhTnVtLmdldENvZGUocy5jaGFyQXQoaSkgKSAqIDQ1ICtcbiAgICAgICAgICBRUkFscGhhTnVtLmdldENvZGUocy5jaGFyQXQoaSArIDEpICksIDExKTtcbiAgICAgICAgaSArPSAyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSA8IHMubGVuZ3RoKSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoUVJBbHBoYU51bS5nZXRDb2RlKHMuY2hhckF0KGkpICksIDYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMZW5ndGgoKSA6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREYXRhKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENvZGUoYyA6IHN0cmluZykgOiBudW1iZXIge1xuXG4gICAgICBpZiAoJzAnIDw9IGMgJiYgYyA8PSAnOScpIHtcbiAgICAgICAgcmV0dXJuIGMuY2hhckNvZGVBdCgwKSAtICcwJy5jaGFyQ29kZUF0KDApO1xuICAgICAgfSBlbHNlIGlmICgnQScgPD0gYyAmJiBjIDw9ICdaJykge1xuICAgICAgICByZXR1cm4gYy5jaGFyQ29kZUF0KDApIC0gJ0EnLmNoYXJDb2RlQXQoMCkgKyAxMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICBjYXNlICcgJyA6IHJldHVybiAzNjtcbiAgICAgICAgY2FzZSAnJCcgOiByZXR1cm4gMzc7XG4gICAgICAgIGNhc2UgJyUnIDogcmV0dXJuIDM4O1xuICAgICAgICBjYXNlICcqJyA6IHJldHVybiAzOTtcbiAgICAgICAgY2FzZSAnKycgOiByZXR1cm4gNDA7XG4gICAgICAgIGNhc2UgJy0nIDogcmV0dXJuIDQxO1xuICAgICAgICBjYXNlICcuJyA6IHJldHVybiA0MjtcbiAgICAgICAgY2FzZSAnLycgOiByZXR1cm4gNDM7XG4gICAgICAgIGNhc2UgJzonIDogcmV0dXJuIDQ0O1xuICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICB0aHJvdyAnaWxsZWdhbCBjaGFyIDonICsgYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
