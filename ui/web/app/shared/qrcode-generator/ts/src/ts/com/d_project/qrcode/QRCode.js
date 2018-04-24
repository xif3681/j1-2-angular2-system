'use strict';
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var qrcode;
        (function (qrcode) {
            var stringToBytes_SJIS = com.d_project.text.stringToBytes_SJIS;
            var QRCode = (function () {
                function QRCode() {
                    this.typeNumber = 1;
                    this.errorCorrectLevel = qrcode.ErrorCorrectLevel.L;
                    this.qrDataList = [];
                }
                QRCode.prototype.getTypeNumber = function () {
                    return this.typeNumber;
                };
                QRCode.prototype.setTypeNumber = function (typeNumber) {
                    this.typeNumber = typeNumber;
                };
                QRCode.prototype.getErrorCorrectLevel = function () {
                    return this.errorCorrectLevel;
                };
                QRCode.prototype.setErrorCorrectLevel = function (errorCorrectLevel) {
                    this.errorCorrectLevel = errorCorrectLevel;
                };
                QRCode.prototype.clearData = function () {
                    this.qrDataList = [];
                };
                QRCode.prototype.addData = function (qrData) {
                    if (qrData instanceof qrcode.QRData) {
                        this.qrDataList.push(qrData);
                    }
                    else if (typeof qrData === 'string') {
                        this.qrDataList.push(new qrcode.QR8BitByte(qrData));
                    }
                    else {
                        throw typeof qrData;
                    }
                };
                QRCode.prototype.getDataCount = function () {
                    return this.qrDataList.length;
                };
                QRCode.prototype.getData = function (index) {
                    return this.qrDataList[index];
                };
                QRCode.prototype.isDark = function (row, col) {
                    if (this.modules[row][col] != null) {
                        return this.modules[row][col];
                    }
                    else {
                        return false;
                    }
                };
                QRCode.prototype.getModuleCount = function () {
                    return this.moduleCount;
                };
                QRCode.prototype.make = function () {
                    this.makeImpl(false, this.getBestMaskPattern());
                };
                QRCode.prototype.getBestMaskPattern = function () {
                    var minLostPoint = 0;
                    var pattern = 0;
                    for (var i = 0; i < 8; i += 1) {
                        this.makeImpl(true, i);
                        var lostPoint = qrcode.QRUtil.getLostPoint(this);
                        if (i == 0 || minLostPoint > lostPoint) {
                            minLostPoint = lostPoint;
                            pattern = i;
                        }
                    }
                    return pattern;
                };
                QRCode.prototype.makeImpl = function (test, maskPattern) {
                    this.moduleCount = this.typeNumber * 4 + 17;
                    this.modules = [];
                    for (var i = 0; i < this.moduleCount; i += 1) {
                        this.modules.push([]);
                        for (var j = 0; j < this.moduleCount; j += 1) {
                            this.modules[i].push(null);
                        }
                    }
                    this.setupPositionProbePattern(0, 0);
                    this.setupPositionProbePattern(this.moduleCount - 7, 0);
                    this.setupPositionProbePattern(0, this.moduleCount - 7);
                    this.setupPositionAdjustPattern();
                    this.setupTimingPattern();
                    this.setupTypeInfo(test, maskPattern);
                    if (this.typeNumber >= 7) {
                        this.setupTypeNumber(test);
                    }
                    var data = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.qrDataList);
                    this.mapData(data, maskPattern);
                };
                QRCode.prototype.mapData = function (data, maskPattern) {
                    var inc = -1;
                    var row = this.moduleCount - 1;
                    var bitIndex = 7;
                    var byteIndex = 0;
                    var maskFunc = qrcode.QRUtil.getMaskFunc(maskPattern);
                    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
                        if (col == 6) {
                            col -= 1;
                        }
                        while (true) {
                            for (var c = 0; c < 2; c += 1) {
                                if (this.modules[row][col - c] == null) {
                                    var dark = false;
                                    if (byteIndex < data.length) {
                                        dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                                    }
                                    var mask = maskFunc(row, col - c);
                                    if (mask) {
                                        dark = !dark;
                                    }
                                    this.modules[row][col - c] = dark;
                                    bitIndex -= 1;
                                    if (bitIndex == -1) {
                                        byteIndex += 1;
                                        bitIndex = 7;
                                    }
                                }
                            }
                            row += inc;
                            if (row < 0 || this.moduleCount <= row) {
                                row -= inc;
                                inc = -inc;
                                break;
                            }
                        }
                    }
                };
                QRCode.prototype.setupPositionAdjustPattern = function () {
                    var pos = qrcode.QRUtil.getPatternPosition(this.typeNumber);
                    for (var i = 0; i < pos.length; i += 1) {
                        for (var j = 0; j < pos.length; j += 1) {
                            var row = pos[i];
                            var col = pos[j];
                            if (this.modules[row][col] != null) {
                                continue;
                            }
                            for (var r = -2; r <= 2; r += 1) {
                                for (var c = -2; c <= 2; c += 1) {
                                    if (r == -2 || r == 2 || c == -2 || c == 2
                                        || (r == 0 && c == 0)) {
                                        this.modules[row + r][col + c] = true;
                                    }
                                    else {
                                        this.modules[row + r][col + c] = false;
                                    }
                                }
                            }
                        }
                    }
                };
                QRCode.prototype.setupPositionProbePattern = function (row, col) {
                    for (var r = -1; r <= 7; r += 1) {
                        for (var c = -1; c <= 7; c += 1) {
                            if (row + r <= -1 || this.moduleCount <= row + r
                                || col + c <= -1 || this.moduleCount <= col + c) {
                                continue;
                            }
                            if ((0 <= r && r <= 6 && (c == 0 || c == 6))
                                || (0 <= c && c <= 6 && (r == 0 || r == 6))
                                || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                                this.modules[row + r][col + c] = true;
                            }
                            else {
                                this.modules[row + r][col + c] = false;
                            }
                        }
                    }
                };
                QRCode.prototype.setupTimingPattern = function () {
                    for (var r = 8; r < this.moduleCount - 8; r += 1) {
                        if (this.modules[r][6] != null) {
                            continue;
                        }
                        this.modules[r][6] = r % 2 == 0;
                    }
                    for (var c = 8; c < this.moduleCount - 8; c += 1) {
                        if (this.modules[6][c] != null) {
                            continue;
                        }
                        this.modules[6][c] = c % 2 == 0;
                    }
                };
                QRCode.prototype.setupTypeNumber = function (test) {
                    var bits = qrcode.QRUtil.getBCHTypeNumber(this.typeNumber);
                    for (var i = 0; i < 18; i += 1) {
                        this.modules[~~(i / 3)][i % 3 + this.moduleCount - 8 - 3] =
                            !test && ((bits >> i) & 1) == 1;
                    }
                    for (var i = 0; i < 18; i += 1) {
                        this.modules[i % 3 + this.moduleCount - 8 - 3][~~(i / 3)] =
                            !test && ((bits >> i) & 1) == 1;
                    }
                };
                QRCode.prototype.setupTypeInfo = function (test, maskPattern) {
                    var data = (this.errorCorrectLevel << 3) | maskPattern;
                    var bits = qrcode.QRUtil.getBCHTypeInfo(data);
                    for (var i = 0; i < 15; i += 1) {
                        var mod = !test && ((bits >> i) & 1) == 1;
                        if (i < 6) {
                            this.modules[i][8] = mod;
                        }
                        else if (i < 8) {
                            this.modules[i + 1][8] = mod;
                        }
                        else {
                            this.modules[this.moduleCount - 15 + i][8] = mod;
                        }
                    }
                    for (var i = 0; i < 15; i += 1) {
                        var mod = !test && ((bits >> i) & 1) == 1;
                        if (i < 8) {
                            this.modules[8][this.moduleCount - i - 1] = mod;
                        }
                        else if (i < 9) {
                            this.modules[8][15 - i - 1 + 1] = mod;
                        }
                        else {
                            this.modules[8][15 - i - 1] = mod;
                        }
                    }
                    this.modules[this.moduleCount - 8][8] = !test;
                };
                QRCode.createData = function (typeNumber, errorCorrectLevel, dataArray) {
                    var rsBlocks = qrcode.RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
                    var buffer = new qrcode.BitBuffer();
                    for (var i = 0; i < dataArray.length; i += 1) {
                        var data = dataArray[i];
                        buffer.put(data.getMode(), 4);
                        buffer.put(data.getLength(), data.getLengthInBits(typeNumber));
                        data.write(buffer);
                    }
                    var totalDataCount = 0;
                    for (var i = 0; i < rsBlocks.length; i += 1) {
                        totalDataCount += rsBlocks[i].getDataCount();
                    }
                    if (buffer.getLengthInBits() > totalDataCount * 8) {
                        throw 'code length overflow. ('
                            + buffer.getLengthInBits()
                            + '>'
                            + totalDataCount * 8
                            + ')';
                    }
                    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
                        buffer.put(0, 4);
                    }
                    while (buffer.getLengthInBits() % 8 != 0) {
                        buffer.putBit(false);
                    }
                    while (true) {
                        if (buffer.getLengthInBits() >= totalDataCount * 8) {
                            break;
                        }
                        buffer.put(QRCode.PAD0, 8);
                        if (buffer.getLengthInBits() >= totalDataCount * 8) {
                            break;
                        }
                        buffer.put(QRCode.PAD1, 8);
                    }
                    return QRCode.createBytes(buffer, rsBlocks);
                };
                QRCode.createBytes = function (buffer, rsBlocks) {
                    var offset = 0;
                    var maxDcCount = 0;
                    var maxEcCount = 0;
                    var dcdata = [];
                    var ecdata = [];
                    for (var r = 0; r < rsBlocks.length; r += 1) {
                        dcdata.push([]);
                        ecdata.push([]);
                    }
                    function createNumArray(len) {
                        var a = [];
                        for (var i = 0; i < len; i += 1) {
                            a.push(0);
                        }
                        return a;
                    }
                    for (var r = 0; r < rsBlocks.length; r += 1) {
                        var dcCount = rsBlocks[r].getDataCount();
                        var ecCount = rsBlocks[r].getTotalCount() - dcCount;
                        maxDcCount = Math.max(maxDcCount, dcCount);
                        maxEcCount = Math.max(maxEcCount, ecCount);
                        dcdata[r] = createNumArray(dcCount);
                        for (var i = 0; i < dcdata[r].length; i += 1) {
                            dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
                        }
                        offset += dcCount;
                        var rsPoly = qrcode.QRUtil.getErrorCorrectPolynomial(ecCount);
                        var rawPoly = new qrcode.Polynomial(dcdata[r], rsPoly.getLength() - 1);
                        var modPoly = rawPoly.mod(rsPoly);
                        ecdata[r] = createNumArray(rsPoly.getLength() - 1);
                        for (var i = 0; i < ecdata[r].length; i += 1) {
                            var modIndex = i + modPoly.getLength() - ecdata[r].length;
                            ecdata[r][i] = (modIndex >= 0) ? modPoly.getAt(modIndex) : 0;
                        }
                    }
                    var totalCodeCount = 0;
                    for (var i = 0; i < rsBlocks.length; i += 1) {
                        totalCodeCount += rsBlocks[i].getTotalCount();
                    }
                    var data = createNumArray(totalCodeCount);
                    var index = 0;
                    for (var i = 0; i < maxDcCount; i += 1) {
                        for (var r = 0; r < rsBlocks.length; r += 1) {
                            if (i < dcdata[r].length) {
                                data[index] = dcdata[r][i];
                                index += 1;
                            }
                        }
                    }
                    for (var i = 0; i < maxEcCount; i += 1) {
                        for (var r = 0; r < rsBlocks.length; r += 1) {
                            if (i < ecdata[r].length) {
                                data[index] = ecdata[r][i];
                                index += 1;
                            }
                        }
                    }
                    return data;
                };
                QRCode.prototype.toDataURL = function (cellSize, margin) {
                    if (cellSize === void 0) { cellSize = 2; }
                    if (margin === void 0) { margin = cellSize * 4; }
                    var mods = this.getModuleCount();
                    var size = cellSize * mods + margin * 2;
                    var gif = new com.d_project.image.GIFImage(size, size);
                    for (var y = 0; y < size; y += 1) {
                        for (var x = 0; x < size; x += 1) {
                            if (margin <= x && x < size - margin &&
                                margin <= y && y < size - margin &&
                                this.isDark(~~((y - margin) / cellSize), ~~((x - margin) / cellSize))) {
                                gif.setPixel(x, y, 0);
                            }
                            else {
                                gif.setPixel(x, y, 1);
                            }
                        }
                    }
                    return gif.toDataURL();
                };
                QRCode.PAD0 = 0xEC;
                QRCode.PAD1 = 0x11;
                QRCode.stringToBytes = stringToBytes_SJIS;
                return QRCode;
            }());
            qrcode.QRCode = QRCode;
        })(qrcode = d_project.qrcode || (d_project.qrcode = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVJDb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQSxZQUFZLENBQUM7QUFDYixJQUFVLEdBQUcsQ0FvZFo7QUFwZEQsV0FBVSxHQUFHO0lBQUMsSUFBQSxTQUFTLENBb2R0QjtJQXBkYSxXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FvZDdCO1FBcGR1QixXQUFBLE1BQU0sRUFBQyxDQUFDO1lBRTlCLElBQU8sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFNbEU7Z0JBZ0JFO29CQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsd0JBQWlCLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQztnQkFFTSw4QkFBYSxHQUFwQjtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDekIsQ0FBQztnQkFFTSw4QkFBYSxHQUFwQixVQUFxQixVQUFtQjtvQkFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBQy9CLENBQUM7Z0JBRU0scUNBQW9CLEdBQTNCO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRU0scUNBQW9CLEdBQTNCLFVBQTRCLGlCQUFxQztvQkFDL0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO2dCQUM3QyxDQUFDO2dCQUVNLDBCQUFTLEdBQWhCO29CQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixDQUFDO2dCQUVNLHdCQUFPLEdBQWQsVUFBZSxNQUF3QjtvQkFDckMsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLGFB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QUFHLElBQUksR0FBRyxNQUFNO2dDQUNoQyxJQUFJLENBQUMsTUFBTSxDQUNULENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUM1QixDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDdEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNOLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7b0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztnQkFyY2MsV0FBSSxHQUFHLElBQUksQ0FBQztnQkFFWixXQUFJLEdBQUcsSUFBSSxDQUFDO2dCQXNjYixvQkFBYSxHQUFHLGtCQUFrQixDQUFDO2dCQUNuRCxhQUFDO1lBQUQsQ0EzY0EsQUEyY0MsSUFBQTtZQTNjWSxhQUFNLFNBMmNsQixDQUFBO1FBQ0gsQ0FBQyxFQXBkdUIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUFvZDdCO0lBQUQsQ0FBQyxFQXBkYSxTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvZHRCO0FBQUQsQ0FBQyxFQXBkUyxHQUFHLEtBQUgsR0FBRyxRQW9kWiIsImZpbGUiOiJhcHAvc2hhcmVkL3FyY29kZS1nZW5lcmF0b3IvdHMvc3JjL3RzL2NvbS9kX3Byb2plY3QvcXJjb2RlL1FSQ29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vL1xuLy8gUVIgQ29kZSBHZW5lcmF0b3IgZm9yIFR5cGVTY3JpcHRcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUgS2F6dWhpa28gQXJhc2Vcbi8vXG4vLyBVUkw6IGh0dHA6Ly93d3cuZC1wcm9qZWN0LmNvbS9cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4vLyAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbi8vXG4vLyBUaGUgd29yZCAnUVIgQ29kZScgaXMgcmVnaXN0ZXJlZCB0cmFkZW1hcmsgb2Zcbi8vIERFTlNPIFdBVkUgSU5DT1JQT1JBVEVEXG4vLyAgaHR0cDovL3d3dy5kZW5zby13YXZlLmNvbS9xcmNvZGUvZmFxcGF0ZW50LWUuaHRtbFxuLy9cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90ZXh0L3N0cmluZ1RvQnl0ZXNfU0pJUy50c1wiIC8+XG4ndXNlIHN0cmljdCc7XG5uYW1lc3BhY2UgY29tLmRfcHJvamVjdC5xcmNvZGUge1xuXG4gIGltcG9ydCBzdHJpbmdUb0J5dGVzX1NKSVMgPSBjb20uZF9wcm9qZWN0LnRleHQuc3RyaW5nVG9CeXRlc19TSklTO1xuXG4gIC8qKlxuICAgKiBRUkNvZGVcbiAgICogQGF1dGhvciBLYXp1aGlrbyBBcmFzZVxuICAgKi9cbiAgZXhwb3J0IGNsYXNzIFFSQ29kZSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBQQUQwID0gMHhFQztcblxuICAgIHByaXZhdGUgc3RhdGljIFBBRDEgPSAweDExO1xuXG4gICAgcHJpdmF0ZSB0eXBlTnVtYmVyIDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBlcnJvckNvcnJlY3RMZXZlbCA6IEVycm9yQ29ycmVjdExldmVsO1xuXG4gICAgcHJpdmF0ZSBxckRhdGFMaXN0IDogUVJEYXRhW107XG5cbiAgICBwcml2YXRlIG1vZHVsZXMgOiBib29sZWFuW11bXTtcblxuICAgIHByaXZhdGUgbW9kdWxlQ291bnQgOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLnR5cGVOdW1iZXIgPSAxO1xuICAgICAgdGhpcy5lcnJvckNvcnJlY3RMZXZlbCA9IEVycm9yQ29ycmVjdExldmVsLkw7XG4gICAgICB0aGlzLnFyRGF0YUxpc3QgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VHlwZU51bWJlcigpIDogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLnR5cGVOdW1iZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFR5cGVOdW1iZXIodHlwZU51bWJlciA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgIHRoaXMudHlwZU51bWJlciA9IHR5cGVOdW1iZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEVycm9yQ29ycmVjdExldmVsKCkgOiBFcnJvckNvcnJlY3RMZXZlbCB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvckNvcnJlY3RMZXZlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RXJyb3JDb3JyZWN0TGV2ZWwoZXJyb3JDb3JyZWN0TGV2ZWwgOiBFcnJvckNvcnJlY3RMZXZlbCkge1xuICAgICAgdGhpcy5lcnJvckNvcnJlY3RMZXZlbCA9IGVycm9yQ29ycmVjdExldmVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckRhdGEoKSA6IHZvaWQge1xuICAgICAgdGhpcy5xckRhdGFMaXN0ID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIGFkZERhdGEocXJEYXRhIDogUVJEYXRhIHwgc3RyaW5nKSA6IHZvaWQge1xuICAgICAgaWYgKHFyRGF0YSBpbnN0YW5jZW9mIFFSRGF0YSkge1xuICAgICAgICB0aGlzLnFyRGF0YUxpc3QucHVzaChxckRhdGEpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXJEYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLnFyRGF0YUxpc3QucHVzaChuZXcgUVI4Qml0Qnl0ZShxckRhdGEpICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyB0eXBlb2YgcXJEYXRhO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YUNvdW50KCkgOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMucXJEYXRhTGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKGluZGV4IDogbnVtYmVyKSA6IFFSRGF0YSB7XG4gICAgICByZXR1cm4gdGhpcy5xckRhdGFMaXN0W2luZGV4XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEYXJrKHJvdyA6IG51bWJlciwgY29sIDogbnVtYmVyKSA6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMubW9kdWxlc1tyb3ddW2NvbF0gIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzW3Jvd11bY29sXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9kdWxlQ291bnQoKSA6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5tb2R1bGVDb3VudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZSgpIDogdm9pZCB7XG4gICAgICB0aGlzLm1ha2VJbXBsKGZhbHNlLCB0aGlzLmdldEJlc3RNYXNrUGF0dGVybigpICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCZXN0TWFza1BhdHRlcm4oKSA6IG51bWJlciB7XG5cbiAgICAgIHZhciBtaW5Mb3N0UG9pbnQgPSAwO1xuICAgICAgdmFyIHBhdHRlcm4gPSAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkgKz0gMSkge1xuXG4gICAgICAgIHRoaXMubWFrZUltcGwodHJ1ZSwgaSk7XG5cbiAgICAgICAgdmFyIGxvc3RQb2ludCA9IFFSVXRpbC5nZXRMb3N0UG9pbnQodGhpcyk7XG5cbiAgICAgICAgaWYgKGkgPT0gMCB8fCBtaW5Mb3N0UG9pbnQgPiAgbG9zdFBvaW50KSB7XG4gICAgICAgICAgbWluTG9zdFBvaW50ID0gbG9zdFBvaW50O1xuICAgICAgICAgIHBhdHRlcm4gPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFrZUltcGwodGVzdCA6IGJvb2xlYW4sIG1hc2tQYXR0ZXJuIDogbnVtYmVyKSA6IHZvaWQge1xuXG4gICAgICAvLyBpbml0aWFsaXplIG1vZHVsZXNcbiAgICAgIHRoaXMubW9kdWxlQ291bnQgPSB0aGlzLnR5cGVOdW1iZXIgKiA0ICsgMTc7XG4gICAgICB0aGlzLm1vZHVsZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2R1bGVDb3VudDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMubW9kdWxlcy5wdXNoKFtdKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLm1vZHVsZUNvdW50OyBqICs9IDEpIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbaV0ucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwgMCk7XG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4odGhpcy5tb2R1bGVDb3VudCAtIDcsIDApO1xuICAgICAgdGhpcy5zZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuKDAsIHRoaXMubW9kdWxlQ291bnQgLSA3KTtcblxuICAgICAgdGhpcy5zZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybigpO1xuICAgICAgdGhpcy5zZXR1cFRpbWluZ1BhdHRlcm4oKTtcblxuICAgICAgdGhpcy5zZXR1cFR5cGVJbmZvKHRlc3QsIG1hc2tQYXR0ZXJuKTtcblxuICAgICAgaWYgKHRoaXMudHlwZU51bWJlciA+PSA3KSB7XG4gICAgICAgIHRoaXMuc2V0dXBUeXBlTnVtYmVyKHRlc3QpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0YSA9IFFSQ29kZS5jcmVhdGVEYXRhKFxuICAgICAgICB0aGlzLnR5cGVOdW1iZXIsIHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwsIHRoaXMucXJEYXRhTGlzdCk7XG4gICAgICB0aGlzLm1hcERhdGEoZGF0YSwgbWFza1BhdHRlcm4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFwRGF0YShkYXRhIDogbnVtYmVyW10sIG1hc2tQYXR0ZXJuIDogbnVtYmVyKSA6IHZvaWQge1xuXG4gICAgICB2YXIgaW5jID0gLTE7XG4gICAgICB2YXIgcm93ID0gdGhpcy5tb2R1bGVDb3VudCAtIDE7XG4gICAgICB2YXIgYml0SW5kZXggPSA3O1xuICAgICAgdmFyIGJ5dGVJbmRleCA9IDA7XG4gICAgICB2YXIgbWFza0Z1bmMgPSBRUlV0aWwuZ2V0TWFza0Z1bmMobWFza1BhdHRlcm4pO1xuXG4gICAgICBmb3IgKHZhciBjb2wgPSB0aGlzLm1vZHVsZUNvdW50IC0gMTsgY29sID4gMDsgY29sIC09IDIpIHtcblxuICAgICAgICBpZiAoY29sID09IDYpIHtcbiAgICAgICAgICBjb2wgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG5cbiAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IDI7IGMgKz0gMSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzW3Jvd11bY29sIC0gY10gPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgIHZhciBkYXJrID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgaWYgKGJ5dGVJbmRleCA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGFyayA9ICggKCAoZGF0YVtieXRlSW5kZXhdID4+PiBiaXRJbmRleCkgJiAxKSA9PSAxKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBtYXNrID0gbWFza0Z1bmMocm93LCBjb2wgLSBjKTtcblxuICAgICAgICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgICAgIGRhcmsgPSAhZGFyaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3ddW2NvbCAtIGNdID0gZGFyaztcbiAgICAgICAgICAgICAgYml0SW5kZXggLT0gMTtcblxuICAgICAgICAgICAgICBpZiAoYml0SW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBieXRlSW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICBiaXRJbmRleCA9IDc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3cgKz0gaW5jO1xuXG4gICAgICAgICAgaWYgKHJvdyA8IDAgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSByb3cpIHtcbiAgICAgICAgICAgIHJvdyAtPSBpbmM7XG4gICAgICAgICAgICBpbmMgPSAtaW5jO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybigpIDogdm9pZCB7XG5cbiAgICAgIHZhciBwb3MgPSBRUlV0aWwuZ2V0UGF0dGVyblBvc2l0aW9uKHRoaXMudHlwZU51bWJlcik7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSArPSAxKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwb3MubGVuZ3RoOyBqICs9IDEpIHtcblxuICAgICAgICAgIHZhciByb3cgPSBwb3NbaV07XG4gICAgICAgICAgdmFyIGNvbCA9IHBvc1tqXTtcblxuICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2xdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAodmFyIHIgPSAtMjsgciA8PSAyOyByICs9IDEpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IC0yOyBjIDw9IDI7IGMgKz0gMSkge1xuXG4gICAgICAgICAgICAgIGlmIChyID09IC0yIHx8IHIgPT0gMiB8fCBjID09IC0yIHx8IGMgPT0gMlxuICAgICAgICAgICAgICAgICAgfHwgKHIgPT0gMCAmJiBjID09IDApICkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXSA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4ocm93IDogbnVtYmVyLCBjb2wgOiBudW1iZXIpIDogdm9pZCB7XG5cbiAgICAgIGZvciAodmFyIHIgPSAtMTsgciA8PSA3OyByICs9IDEpIHtcblxuICAgICAgICBmb3IgKHZhciBjID0gLTE7IGMgPD0gNzsgYyArPSAxKSB7XG5cbiAgICAgICAgICBpZiAocm93ICsgciA8PSAtMSB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IHJvdyArIHJcbiAgICAgICAgICAgICAgfHwgY29sICsgYyA8PSAtMSB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IGNvbCArIGMpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggKDAgPD0gciAmJiByIDw9IDYgJiYgKGMgPT0gMCB8fCBjID09IDYpIClcbiAgICAgICAgICAgICAgfHwgKDAgPD0gYyAmJiBjIDw9IDYgJiYgKHIgPT0gMCB8fCByID09IDYpIClcbiAgICAgICAgICAgICAgfHwgKDIgPD0gciAmJiByIDw9IDQgJiYgMiA8PSBjICYmIGMgPD0gNCkgKSB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwVGltaW5nUGF0dGVybigpIDogdm9pZCB7XG4gICAgICBmb3IgKHZhciByID0gODsgciA8IHRoaXMubW9kdWxlQ291bnQgLSA4OyByICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kdWxlc1tyXVs2XSAhPSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2R1bGVzW3JdWzZdID0gciAlIDIgPT0gMDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGMgPSA4OyBjIDwgdGhpcy5tb2R1bGVDb3VudCAtIDg7IGMgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5tb2R1bGVzWzZdW2NdICE9IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZHVsZXNbNl1bY10gPSBjICUgMiA9PSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBUeXBlTnVtYmVyKHRlc3QgOiBib29sZWFuKSA6IHZvaWQge1xuXG4gICAgICB2YXIgYml0cyA9IFFSVXRpbC5nZXRCQ0hUeXBlTnVtYmVyKHRoaXMudHlwZU51bWJlcik7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLm1vZHVsZXNbfn4oaSAvIDMpXVtpICUgMyArIHRoaXMubW9kdWxlQ291bnQgLSA4IC0gM10gPVxuICAgICAgICAgICF0ZXN0ICYmICggKGJpdHMgPj4gaSkgJiAxKSA9PSAxO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE4OyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5tb2R1bGVzW2kgJSAzICsgdGhpcy5tb2R1bGVDb3VudCAtIDggLSAzXVt+fihpIC8gMyldID1cbiAgICAgICAgICAhdGVzdCAmJiAoIChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwVHlwZUluZm8odGVzdCA6IGJvb2xlYW4sIG1hc2tQYXR0ZXJuIDogbnVtYmVyKSA6IHZvaWQge1xuXG4gICAgICB2YXIgZGF0YSA9ICh0aGlzLmVycm9yQ29ycmVjdExldmVsIDw8IDMpIHwgbWFza1BhdHRlcm47XG4gICAgICB2YXIgYml0cyA9IFFSVXRpbC5nZXRCQ0hUeXBlSW5mbyhkYXRhKTtcblxuICAgICAgLy8gdmVydGljYWxcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkgKz0gMSkge1xuXG4gICAgICAgIHZhciBtb2QgPSAhdGVzdCAmJiAoIChiaXRzID4+IGkpICYgMSkgPT0gMTtcblxuICAgICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbaV1bOF0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IDgpIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbaSArIDFdWzhdID0gbW9kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1t0aGlzLm1vZHVsZUNvdW50IC0gMTUgKyBpXVs4XSA9IG1vZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBob3Jpem9udGFsXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpICs9IDEpIHtcblxuICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKCAoYml0cyA+PiBpKSAmIDEpID09IDE7XG5cbiAgICAgICAgaWYgKGkgPCA4KSB7XG4gICAgICAgICAgdGhpcy5tb2R1bGVzWzhdW3RoaXMubW9kdWxlQ291bnQgLSBpIC0gMV0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IDkpIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbOF1bMTUgLSBpIC0gMSArIDFdID0gbW9kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1s4XVsxNSAtIGkgLSAxXSA9IG1vZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBmaXhlZFxuICAgICAgdGhpcy5tb2R1bGVzW3RoaXMubW9kdWxlQ291bnQgLSA4XVs4XSA9ICF0ZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlRGF0YShcbiAgICAgIHR5cGVOdW1iZXIgOiBudW1iZXIsXG4gICAgICBlcnJvckNvcnJlY3RMZXZlbCA6IEVycm9yQ29ycmVjdExldmVsLFxuICAgICAgZGF0YUFycmF5IDogUVJEYXRhW11cbiAgICApIDogbnVtYmVyW10ge1xuXG4gICAgICB2YXIgcnNCbG9ja3MgOiBSU0Jsb2NrW10gPSBSU0Jsb2NrLmdldFJTQmxvY2tzKFxuICAgICAgICB0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCk7XG5cbiAgICAgIHZhciBidWZmZXIgPSBuZXcgQml0QnVmZmVyKCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHZhciBkYXRhID0gZGF0YUFycmF5W2ldO1xuICAgICAgICBidWZmZXIucHV0KGRhdGEuZ2V0TW9kZSgpLCA0KTtcbiAgICAgICAgYnVmZmVyLnB1dChkYXRhLmdldExlbmd0aCgpLCBkYXRhLmdldExlbmd0aEluQml0cyh0eXBlTnVtYmVyKSApO1xuICAgICAgICBkYXRhLndyaXRlKGJ1ZmZlcik7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGMgbWF4IGRhdGEgY291bnRcbiAgICAgIHZhciB0b3RhbERhdGFDb3VudCA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRvdGFsRGF0YUNvdW50ICs9IHJzQmxvY2tzW2ldLmdldERhdGFDb3VudCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID4gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICAgIHRocm93ICdjb2RlIGxlbmd0aCBvdmVyZmxvdy4gKCdcbiAgICAgICAgICArIGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKVxuICAgICAgICAgICsgJz4nXG4gICAgICAgICAgKyAgdG90YWxEYXRhQ291bnQgKiA4XG4gICAgICAgICAgKyAnKSc7XG4gICAgICB9XG5cbiAgICAgIC8vIGVuZFxuICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSArIDQgPD0gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoMCwgNCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHBhZGRpbmdcbiAgICAgIHdoaWxlIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgJSA4ICE9IDApIHtcbiAgICAgICAgYnVmZmVyLnB1dEJpdChmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHBhZGRpbmdcbiAgICAgIHdoaWxlICh0cnVlKSB7XG5cbiAgICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+PSB0b3RhbERhdGFDb3VudCAqIDgpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBidWZmZXIucHV0KFFSQ29kZS5QQUQwLCA4KTtcblxuICAgICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlci5wdXQoUVJDb2RlLlBBRDEsIDgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUVJDb2RlLmNyZWF0ZUJ5dGVzKGJ1ZmZlciwgcnNCbG9ja3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUJ5dGVzKFxuICAgICAgYnVmZmVyIDogQml0QnVmZmVyLFxuICAgICAgcnNCbG9ja3MgOiBSU0Jsb2NrW11cbiAgICApIDogbnVtYmVyW10ge1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gMDtcblxuICAgICAgdmFyIG1heERjQ291bnQgPSAwO1xuICAgICAgdmFyIG1heEVjQ291bnQgPSAwO1xuXG4gICAgICB2YXIgZGNkYXRhIDogbnVtYmVyW11bXSA9IFtdO1xuICAgICAgdmFyIGVjZGF0YSA6IG51bWJlcltdW10gPSBbXTtcblxuICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCByc0Jsb2Nrcy5sZW5ndGg7IHIgKz0gMSkge1xuICAgICAgICBkY2RhdGEucHVzaChbXSk7XG4gICAgICAgIGVjZGF0YS5wdXNoKFtdKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY3JlYXRlTnVtQXJyYXkobGVuIDogbnVtYmVyKSA6IG51bWJlcltdIHtcbiAgICAgICAgdmFyIGEgOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgYS5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgciArPSAxKSB7XG5cbiAgICAgICAgdmFyIGRjQ291bnQgPSByc0Jsb2Nrc1tyXS5nZXREYXRhQ291bnQoKTtcbiAgICAgICAgdmFyIGVjQ291bnQgPSByc0Jsb2Nrc1tyXS5nZXRUb3RhbENvdW50KCkgLSBkY0NvdW50O1xuXG4gICAgICAgIG1heERjQ291bnQgPSBNYXRoLm1heChtYXhEY0NvdW50LCBkY0NvdW50KTtcbiAgICAgICAgbWF4RWNDb3VudCA9IE1hdGgubWF4KG1heEVjQ291bnQsIGVjQ291bnQpO1xuXG4gICAgICAgIGRjZGF0YVtyXSA9IGNyZWF0ZU51bUFycmF5KGRjQ291bnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRjZGF0YVtyXS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGRjZGF0YVtyXVtpXSA9IDB4ZmYgJiBidWZmZXIuZ2V0QnVmZmVyKClbaSArIG9mZnNldF07XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ICs9IGRjQ291bnQ7XG5cbiAgICAgICAgdmFyIHJzUG9seSA9IFFSVXRpbC5nZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsKGVjQ291bnQpO1xuICAgICAgICB2YXIgcmF3UG9seSA9IG5ldyBQb2x5bm9taWFsKGRjZGF0YVtyXSwgcnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG5cbiAgICAgICAgdmFyIG1vZFBvbHkgPSByYXdQb2x5Lm1vZChyc1BvbHkpO1xuICAgICAgICBlY2RhdGFbcl0gPSBjcmVhdGVOdW1BcnJheShyc1BvbHkuZ2V0TGVuZ3RoKCkgLSAxKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlY2RhdGFbcl0ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICB2YXIgbW9kSW5kZXggPSBpICsgbW9kUG9seS5nZXRMZW5ndGgoKSAtIGVjZGF0YVtyXS5sZW5ndGg7XG4gICAgICAgICAgZWNkYXRhW3JdW2ldID0gKG1vZEluZGV4ID49IDApPyBtb2RQb2x5LmdldEF0KG1vZEluZGV4KSA6IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHRvdGFsQ29kZUNvdW50ID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnNCbG9ja3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdG90YWxDb2RlQ291bnQgKz0gcnNCbG9ja3NbaV0uZ2V0VG90YWxDb3VudCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0YSA9IGNyZWF0ZU51bUFycmF5KHRvdGFsQ29kZUNvdW50KTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RGNDb3VudDsgaSArPSAxKSB7XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByICs9IDEpIHtcbiAgICAgICAgICBpZiAoaSA8IGRjZGF0YVtyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGFbaW5kZXhdID0gZGNkYXRhW3JdW2ldO1xuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhFY0NvdW50OyBpICs9IDEpIHtcbiAgICAgICAgZm9yICh2YXIgciAgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByICs9IDEpIHtcbiAgICAgICAgICBpZiAoaSA8IGVjZGF0YVtyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGFbaW5kZXhdID0gZWNkYXRhW3JdW2ldO1xuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0RhdGFVUkwoY2VsbFNpemUgPSAyLCBtYXJnaW4gPSBjZWxsU2l6ZSAqIDQpIDogc3RyaW5nIHtcbiAgICAgIHZhciBtb2RzID0gdGhpcy5nZXRNb2R1bGVDb3VudCgpO1xuICAgICAgdmFyIHNpemUgPSBjZWxsU2l6ZSAqIG1vZHMgKyBtYXJnaW4gKiAyO1xuICAgICAgdmFyIGdpZiA9IG5ldyBjb20uZF9wcm9qZWN0LmltYWdlLkdJRkltYWdlKHNpemUsIHNpemUpO1xuICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplOyB5ICs9IDEpIHtcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplOyB4ICs9IDEpIHtcbiAgICAgICAgICBpZiAobWFyZ2luIDw9IHggJiYgeCA8IHNpemUgLSBtYXJnaW4gJiZcbiAgICAgICAgICAgICAgbWFyZ2luIDw9IHkgJiYgeSA8IHNpemUgLSBtYXJnaW4gJiZcbiAgICAgICAgICAgICAgdGhpcy5pc0RhcmsoXG4gICAgICAgICAgICAgICAgfn4oICh5IC0gbWFyZ2luKSAvIGNlbGxTaXplKSxcbiAgICAgICAgICAgICAgICB+figgKHggLSBtYXJnaW4pIC8gY2VsbFNpemUpICkgKSB7XG4gICAgICAgICAgICBnaWYuc2V0UGl4ZWwoeCwgeSwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdpZi5zZXRQaXhlbCh4LCB5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBnaWYudG9EYXRhVVJMKCk7XG4gICAgfVxuXG4gICAgLy8gYnkgZGVmYXVsdCwgU0pJUyBlbmNvZGluZyBpcyBhcHBsaWVkLlxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nVG9CeXRlcyA9IHN0cmluZ1RvQnl0ZXNfU0pJUztcbiAgfVxufVxuIl19
