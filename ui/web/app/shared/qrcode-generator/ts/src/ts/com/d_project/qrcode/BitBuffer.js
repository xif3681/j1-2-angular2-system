'use strict';
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var qrcode;
        (function (qrcode) {
            var BitBuffer = (function () {
                function BitBuffer() {
                    this.buffer = [];
                    this.length = 0;
                }
                BitBuffer.prototype.getBuffer = function () {
                    return this.buffer;
                };
                BitBuffer.prototype.getLengthInBits = function () {
                    return this.length;
                };
                BitBuffer.prototype.toString = function () {
                    var buffer = '';
                    for (var i = 0; i < this.getLengthInBits(); i += 1) {
                        buffer += this.getBit(i) ? '1' : '0';
                    }
                    return buffer;
                };
                BitBuffer.prototype.getBit = function (index) {
                    return ((this.buffer[~~(index / 8)] >>> (7 - index % 8)) & 1) == 1;
                };
                BitBuffer.prototype.put = function (num, length) {
                    for (var i = 0; i < length; i += 1) {
                        this.putBit(((num >>> (length - i - 1)) & 1) == 1);
                    }
                };
                BitBuffer.prototype.putBit = function (bit) {
                    if (this.length == this.buffer.length * 8) {
                        this.buffer.push(0);
                    }
                    if (bit) {
                        this.buffer[~~(this.length / 8)] |= (0x80 >>> (this.length % 8));
                    }
                    this.length += 1;
                };
                return BitBuffer;
            }());
            qrcode.BitBuffer = BitBuffer;
        })(qrcode = d_project.qrcode || (d_project.qrcode = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvQml0QnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiLElBQVUsR0FBRyxDQW9EWjtBQXBERCxXQUFVLEdBQUc7SUFBQyxJQUFBLFNBQVMsQ0FvRHRCO0lBcERhLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQW9EN0I7UUFwRHVCLFdBQUEsTUFBTSxFQUFDLENBQUM7WUFNOUI7Z0JBS0U7b0JBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLDZCQUFTLEdBQWhCO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixDQUFDO2dCQUVNLG1DQUFlLEdBQXRCO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixDQUFDO2dCQUVNLDRCQUFRLEdBQWY7b0JBQ0UsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ25ELE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQ3RDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFFTywwQkFBTSxHQUFkLFVBQWUsS0FBYztvQkFDM0IsTUFBTSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztnQkFFTSx1QkFBRyxHQUFWLFVBQVcsR0FBWSxFQUFFLE1BQWU7b0JBQ3RDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxDQUFDO2dCQUNILENBQUM7Z0JBRU0sMEJBQU0sR0FBYixVQUFjLEdBQWE7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUUsQ0FBQztvQkFDcEUsQ0FBQztvQkFDRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztnQkFDSCxnQkFBQztZQUFELENBN0NBLEFBNkNDLElBQUE7WUE3Q1ksZ0JBQVMsWUE2Q3JCLENBQUE7UUFDSCxDQUFDLEVBcER1QixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQW9EN0I7SUFBRCxDQUFDLEVBcERhLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW9EdEI7QUFBRCxDQUFDLEVBcERTLEdBQUcsS0FBSCxHQUFHLFFBb0RaIiwiZmlsZSI6ImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvQml0QnVmZmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubmFtZXNwYWNlIGNvbS5kX3Byb2plY3QucXJjb2RlIHtcblxuICAvKipcbiAgICogQml0QnVmZmVyXG4gICAqIEBhdXRob3IgS2F6dWhpa28gQXJhc2VcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBCaXRCdWZmZXIge1xuXG4gICAgcHJpdmF0ZSBidWZmZXIgOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGxlbmd0aCA6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEJ1ZmZlcigpIDogbnVtYmVyW10ge1xuICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMZW5ndGhJbkJpdHMoKSA6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCkgOiBzdHJpbmcge1xuICAgICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldExlbmd0aEluQml0cygpOyBpICs9IDEpIHtcbiAgICAgICAgYnVmZmVyICs9IHRoaXMuZ2V0Qml0KGkpPyAnMScgOiAnMCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVmZmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Qml0KGluZGV4IDogbnVtYmVyKSA6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuICggKHRoaXMuYnVmZmVyW35+KGluZGV4IC8gOCldID4+PiAoNyAtIGluZGV4ICUgOCkgKSAmIDEpID09IDE7XG4gICAgfVxuXG4gICAgcHVibGljIHB1dChudW0gOiBudW1iZXIsIGxlbmd0aCA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5wdXRCaXQoICggKG51bSA+Pj4gKGxlbmd0aCAtIGkgLSAxKSApICYgMSkgPT0gMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHB1dEJpdChiaXQgOiBib29sZWFuKSA6IHZvaWQge1xuICAgICAgaWYgKHRoaXMubGVuZ3RoID09IHRoaXMuYnVmZmVyLmxlbmd0aCAqIDgpIHtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaCgwKTtcbiAgICAgIH1cbiAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgdGhpcy5idWZmZXJbfn4odGhpcy5sZW5ndGggLyA4KV0gfD0gKDB4ODAgPj4+ICh0aGlzLmxlbmd0aCAlIDgpICk7XG4gICAgICB9XG4gICAgICB0aGlzLmxlbmd0aCArPSAxO1xuICAgIH1cbiAgfVxufVxuIl19
