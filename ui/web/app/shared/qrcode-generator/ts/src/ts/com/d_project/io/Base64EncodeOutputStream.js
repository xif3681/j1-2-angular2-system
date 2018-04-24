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
            var Base64EncodeOutputStream = (function (_super) {
                __extends(Base64EncodeOutputStream, _super);
                function Base64EncodeOutputStream(ostream) {
                    _super.call(this);
                    this.ostream = ostream;
                    this.buffer = 0;
                    this.buflen = 0;
                    this.length = 0;
                }
                Base64EncodeOutputStream.prototype.writeByte = function (n) {
                    this.buffer = (this.buffer << 8) | (n & 0xff);
                    this.buflen += 8;
                    this.length += 1;
                    while (this.buflen >= 6) {
                        this.writeEncoded(this.buffer >>> (this.buflen - 6));
                        this.buflen -= 6;
                    }
                };
                Base64EncodeOutputStream.prototype.flush = function () {
                    if (this.buflen > 0) {
                        this.writeEncoded(this.buffer << (6 - this.buflen));
                        this.buffer = 0;
                        this.buflen = 0;
                    }
                    if (this.length % 3 != 0) {
                        var padlen = 3 - this.length % 3;
                        for (var i = 0; i < padlen; i += 1) {
                            this.ostream.writeByte('='.charCodeAt(0));
                        }
                    }
                };
                Base64EncodeOutputStream.prototype.writeEncoded = function (b) {
                    this.ostream.writeByte(Base64EncodeOutputStream.encode(b & 0x3f));
                };
                Base64EncodeOutputStream.encode = function (n) {
                    if (n < 0) {
                    }
                    else if (n < 26) {
                        return 'A'.charCodeAt(0) + n;
                    }
                    else if (n < 52) {
                        return 'a'.charCodeAt(0) + (n - 26);
                    }
                    else if (n < 62) {
                        return '0'.charCodeAt(0) + (n - 52);
                    }
                    else if (n == 62) {
                        return '+'.charCodeAt(0);
                    }
                    else if (n == 63) {
                        return '/'.charCodeAt(0);
                    }
                    throw 'n:' + n;
                };
                return Base64EncodeOutputStream;
            }(io.OutputStream));
            io.Base64EncodeOutputStream = Base64EncodeOutputStream;
        })(io = d_project.io || (d_project.io = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pby9CYXNlNjRFbmNvZGVPdXRwdXRTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWSxDQUFDOzs7Ozs7QUFDYixJQUFVLEdBQUcsQ0FpRVo7QUFqRUQsV0FBVSxHQUFHO0lBQUMsSUFBQSxTQUFTLENBaUV0QjtJQWpFYSxXQUFBLFNBQVM7UUFBQyxJQUFBLEVBQUUsQ0FpRXpCO1FBakV1QixXQUFBLEVBQUUsRUFBQyxDQUFDO1lBTTFCO2dCQUE4Qyw0Q0FBWTtnQkFNeEQsa0NBQW9CLE9BQXNCO29CQUN4QyxpQkFBTyxDQUFDO29CQURVLFlBQU8sR0FBUCxPQUFPLENBQWU7b0JBSmxDLFdBQU0sR0FBRyxDQUFDLENBQUM7b0JBQ1gsV0FBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxXQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUluQixDQUFDO2dCQUVNLDRDQUFTLEdBQWhCLFVBQWlCLENBQVU7b0JBRXpCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7b0JBRWpCLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBRSxDQUFDO3dCQUN0RCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztvQkFDbkIsQ0FBQztnQkFDSCxDQUFDO2dCQUVNLHdDQUFLLEdBQVo7b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUM7d0JBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUV2QixJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7d0JBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzs0QkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO3dCQUMvQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQztnQkFFTywrQ0FBWSxHQUFwQixVQUFxQixDQUFVO29CQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFFLENBQUM7Z0JBQ3JFLENBQUM7Z0JBRWMsK0JBQU0sR0FBckIsVUFBc0IsQ0FBVTtvQkFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRVosQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUN0QyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3RDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixDQUFDO29CQUNELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDakIsQ0FBQztnQkFDSCwrQkFBQztZQUFELENBMURBLEFBMERDLENBMUQ2QyxlQUFZLEdBMER6RDtZQTFEWSwyQkFBd0IsMkJBMERwQyxDQUFBO1FBQ0gsQ0FBQyxFQWpFdUIsRUFBRSxHQUFGLFlBQUUsS0FBRixZQUFFLFFBaUV6QjtJQUFELENBQUMsRUFqRWEsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBaUV0QjtBQUFELENBQUMsRUFqRVMsR0FBRyxLQUFILEdBQUcsUUFpRVoiLCJmaWxlIjoiYXBwL3NoYXJlZC9xcmNvZGUtZ2VuZXJhdG9yL3RzL3NyYy90cy9jb20vZF9wcm9qZWN0L2lvL0Jhc2U2NEVuY29kZU91dHB1dFN0cmVhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJPdXRwdXRTdHJlYW0udHNcIiAvPlxuJ3VzZSBzdHJpY3QnO1xubmFtZXNwYWNlIGNvbS5kX3Byb2plY3QuaW8ge1xuXG4gIC8qKlxuICAgKiBCYXNlNjRFbmNvZGVPdXRwdXRTdHJlYW1cbiAgICogQGF1dGhvciBLYXp1aGlrbyBBcmFzZVxuICAgKi9cbiAgZXhwb3J0IGNsYXNzIEJhc2U2NEVuY29kZU91dHB1dFN0cmVhbSBleHRlbmRzIE91dHB1dFN0cmVhbSB7XG5cbiAgICBwcml2YXRlIGJ1ZmZlciA9IDA7XG4gICAgcHJpdmF0ZSBidWZsZW4gPSAwO1xuICAgIHByaXZhdGUgbGVuZ3RoID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3N0cmVhbSA6IE91dHB1dFN0cmVhbSkge1xuICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVCeXRlKG4gOiBudW1iZXIpIDogdm9pZCB7XG5cbiAgICAgIHRoaXMuYnVmZmVyID0gKHRoaXMuYnVmZmVyIDw8IDgpIHwgKG4gJiAweGZmKTtcbiAgICAgIHRoaXMuYnVmbGVuICs9IDg7XG4gICAgICB0aGlzLmxlbmd0aCArPSAxO1xuXG4gICAgICB3aGlsZSAodGhpcy5idWZsZW4gPj0gNikge1xuICAgICAgICB0aGlzLndyaXRlRW5jb2RlZCh0aGlzLmJ1ZmZlciA+Pj4gKHRoaXMuYnVmbGVuIC0gNikgKTtcbiAgICAgICAgdGhpcy5idWZsZW4gLT0gNjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZmx1c2goKSA6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuYnVmbGVuID4gMCkge1xuICAgICAgICAgIHRoaXMud3JpdGVFbmNvZGVkKHRoaXMuYnVmZmVyIDw8ICg2IC0gdGhpcy5idWZsZW4pICk7XG4gICAgICAgICAgdGhpcy5idWZmZXIgPSAwO1xuICAgICAgICAgIHRoaXMuYnVmbGVuID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGVuZ3RoICUgMyAhPSAwKSB7XG4gICAgICAgICAgLy8gcGFkZGluZ1xuICAgICAgICAgIHZhciBwYWRsZW4gPSAzIC0gdGhpcy5sZW5ndGggJSAzO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFkbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5vc3RyZWFtLndyaXRlQnl0ZSgnPScuY2hhckNvZGVBdCgwKSApO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHdyaXRlRW5jb2RlZChiIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgdGhpcy5vc3RyZWFtLndyaXRlQnl0ZShCYXNlNjRFbmNvZGVPdXRwdXRTdHJlYW0uZW5jb2RlKGIgJiAweDNmKSApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGVuY29kZShuIDogbnVtYmVyKSA6IG51bWJlciB7XG4gICAgICBpZiAobiA8IDApIHtcbiAgICAgICAgLy8gZXJyb3IuXG4gICAgICB9IGVsc2UgaWYgKG4gPCAyNikge1xuICAgICAgICByZXR1cm4gJ0EnLmNoYXJDb2RlQXQoMCkgKyBuO1xuICAgICAgfSBlbHNlIGlmIChuIDwgNTIpIHtcbiAgICAgICAgcmV0dXJuICdhJy5jaGFyQ29kZUF0KDApICsgKG4gLSAyNik7XG4gICAgICB9IGVsc2UgaWYgKG4gPCA2Mikge1xuICAgICAgICByZXR1cm4gJzAnLmNoYXJDb2RlQXQoMCkgKyAobiAtIDUyKTtcbiAgICAgIH0gZWxzZSBpZiAobiA9PSA2Mikge1xuICAgICAgICByZXR1cm4gJysnLmNoYXJDb2RlQXQoMCk7XG4gICAgICB9IGVsc2UgaWYgKG4gPT0gNjMpIHtcbiAgICAgICAgcmV0dXJuICcvJy5jaGFyQ29kZUF0KDApO1xuICAgICAgfVxuICAgICAgdGhyb3cgJ246JyArIG47XG4gICAgfVxuICB9XG59XG4iXX0=
