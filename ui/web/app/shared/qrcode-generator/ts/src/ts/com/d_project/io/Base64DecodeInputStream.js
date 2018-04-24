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
            var Base64DecodeInputStream = (function (_super) {
                __extends(Base64DecodeInputStream, _super);
                function Base64DecodeInputStream(istream) {
                    _super.call(this);
                    this.istream = istream;
                    this.buffer = 0;
                    this.buflen = 0;
                }
                Base64DecodeInputStream.prototype.readByte = function () {
                    while (this.buflen < 8) {
                        var c = this.istream.readByte();
                        if (c == -1) {
                            if (this.buflen == 0) {
                                return -1;
                            }
                            throw 'unexpected end of file./' + this.buflen;
                        }
                        else if (c == '='.charCodeAt(0)) {
                            this.buflen = 0;
                            return -1;
                        }
                        else if (Base64DecodeInputStream.isWhitespace(c)) {
                            continue;
                        }
                        this.buffer = (this.buffer << 6) |
                            Base64DecodeInputStream.decode(c);
                        this.buflen += 6;
                    }
                    var n = (this.buffer >>> (this.buflen - 8)) & 0xff;
                    this.buflen -= 8;
                    return n;
                };
                Base64DecodeInputStream.isWhitespace = function (c) {
                    return c == '\v'.charCodeAt(0) ||
                        c == '\t'.charCodeAt(0) ||
                        c == '\r'.charCodeAt(0) ||
                        c == '\n'.charCodeAt(0);
                };
                Base64DecodeInputStream.decode = function (c) {
                    if ('A'.charCodeAt(0) <= c && c <= 'Z'.charCodeAt(0)) {
                        return c - 'A'.charCodeAt(0);
                    }
                    else if ('a'.charCodeAt(0) <= c && c <= 'z'.charCodeAt(0)) {
                        return c - 'a'.charCodeAt(0) + 26;
                    }
                    else if ('0'.charCodeAt(0) <= c && c <= '9'.charCodeAt(0)) {
                        return c - '0'.charCodeAt(0) + 52;
                    }
                    else if (c == '+'.charCodeAt(0)) {
                        return 62;
                    }
                    else if (c == '/'.charCodeAt(0)) {
                        return 63;
                    }
                    else {
                        throw 'c:' + c;
                    }
                };
                return Base64DecodeInputStream;
            }(io.InputStream));
            io.Base64DecodeInputStream = Base64DecodeInputStream;
        })(io = d_project.io || (d_project.io = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pby9CYXNlNjREZWNvZGVJbnB1dFN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZLENBQUM7Ozs7OztBQUNiLElBQVUsR0FBRyxDQXdFWjtBQXhFRCxXQUFVLEdBQUc7SUFBQyxJQUFBLFNBQVMsQ0F3RXRCO0lBeEVhLFdBQUEsU0FBUztRQUFDLElBQUEsRUFBRSxDQXdFekI7UUF4RXVCLFdBQUEsRUFBRSxFQUFDLENBQUM7WUFNMUI7Z0JBQTZDLDJDQUFXO2dCQUt0RCxpQ0FBb0IsT0FBcUI7b0JBQ3ZDLGlCQUFPLENBQUM7b0JBRFUsWUFBTyxHQUFQLE9BQU8sQ0FBYztvQkFIakMsV0FBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxXQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUluQixDQUFDO2dCQUVNLDBDQUFRLEdBQWY7b0JBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUV2QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUVoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUVaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNaLENBQUM7NEJBRUQsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUVqRCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUM7NEJBRW5DLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzRCQUNoQixNQUFNLENBQUMs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UUF3RXpCO0lBQUQsQ0FBQyxFQXhFYSxTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF3RXRCO0FBQUQsQ0FBQyxFQXhFUyxHQUFHLEtBQUgsR0FBRyxRQXdFWiIsImZpbGUiOiJhcHAvc2hhcmVkL3FyY29kZS1nZW5lcmF0b3IvdHMvc3JjL3RzL2NvbS9kX3Byb2plY3QvaW8vQmFzZTY0RGVjb2RlSW5wdXRTdHJlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiSW5wdXRTdHJlYW0udHNcIi8+XG4ndXNlIHN0cmljdCc7XG5uYW1lc3BhY2UgY29tLmRfcHJvamVjdC5pbyB7XG5cbiAgLyoqXG4gICAqIEJhc2U2NERlY29kZUlucHV0U3RyZWFtXG4gICAqIEBhdXRob3IgS2F6dWhpa28gQXJhc2VcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBCYXNlNjREZWNvZGVJbnB1dFN0cmVhbSBleHRlbmRzIElucHV0U3RyZWFtIHtcblxuICAgIHByaXZhdGUgYnVmZmVyID0gMDtcbiAgICBwcml2YXRlIGJ1ZmxlbiA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlzdHJlYW0gOiBJbnB1dFN0cmVhbSkge1xuICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVhZEJ5dGUoKSA6IG51bWJlciB7XG5cbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmxlbiA8IDgpIHtcblxuICAgICAgICB2YXIgYyA9IHRoaXMuaXN0cmVhbS5yZWFkQnl0ZSgpO1xuXG4gICAgICAgIGlmIChjID09IC0xKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5idWZsZW4gPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRocm93ICd1bmV4cGVjdGVkIGVuZCBvZiBmaWxlLi8nICsgdGhpcy5idWZsZW47XG5cbiAgICAgICAgfSBlbHNlIGlmIChjID09ICc9Jy5jaGFyQ29kZUF0KDApICkge1xuXG4gICAgICAgICAgdGhpcy5idWZsZW4gPSAwO1xuICAgICAgICAgIHJldHVybiAtMTtcblxuICAgICAgICB9IGVsc2UgaWYgKEJhc2U2NERlY29kZUlucHV0U3RyZWFtLmlzV2hpdGVzcGFjZShjKSApIHtcbiAgICAgICAgICAvLyBpZ25vcmUgaWYgd2hpdGVzcGFjZS5cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnVmZmVyID0gKHRoaXMuYnVmZmVyIDw8IDYpIHxcbiAgICAgICAgICBCYXNlNjREZWNvZGVJbnB1dFN0cmVhbS5kZWNvZGUoYyk7XG4gICAgICAgIHRoaXMuYnVmbGVuICs9IDY7XG4gICAgICB9XG5cbiAgICAgIHZhciBuID0gKHRoaXMuYnVmZmVyID4+PiAodGhpcy5idWZsZW4gLSA4KSApICYgMHhmZjtcbiAgICAgIHRoaXMuYnVmbGVuIC09IDg7XG4gICAgICByZXR1cm4gbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc1doaXRlc3BhY2UoYyA6IG51bWJlcikgOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBjID09ICdcXHYnLmNoYXJDb2RlQXQoMCkgfHxcbiAgICAgICAgYyA9PSAnXFx0Jy5jaGFyQ29kZUF0KDApIHx8XG4gICAgICAgIGMgPT0gJ1xccicuY2hhckNvZGVBdCgwKSB8fFxuICAgICAgICBjID09ICdcXG4nLmNoYXJDb2RlQXQoMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGVjb2RlKGMgOiBudW1iZXIpIDogbnVtYmVyIHtcbiAgICAgIGlmICgnQScuY2hhckNvZGVBdCgwKSA8PSBjICYmIGMgPD0gJ1onLmNoYXJDb2RlQXQoMCkgKSB7XG4gICAgICAgIHJldHVybiBjIC0gJ0EnLmNoYXJDb2RlQXQoMCk7XG4gICAgICB9IGVsc2UgaWYgKCdhJy5jaGFyQ29kZUF0KDApIDw9IGMgJiYgYyA8PSAneicuY2hhckNvZGVBdCgwKSApIHtcbiAgICAgICAgcmV0dXJuIGMgLSAnYScuY2hhckNvZGVBdCgwKSArIDI2O1xuICAgICAgfSBlbHNlIGlmICgnMCcuY2hhckNvZGVBdCgwKSA8PSBjICYmIGMgPD0gJzknLmNoYXJDb2RlQXQoMCkgKSB7XG4gICAgICAgIHJldHVybiBjIC0gJzAnLmNoYXJDb2RlQXQoMCkgKyA1MjtcbiAgICAgIH0gZWxzZSBpZiAoYyA9PSAnKycuY2hhckNvZGVBdCgwKSApIHtcbiAgICAgICAgcmV0dXJuIDYyO1xuICAgICAgfSBlbHNlIGlmIChjID09ICcvJy5jaGFyQ29kZUF0KDApICkge1xuICAgICAgICByZXR1cm4gNjM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnYzonICsgYztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
