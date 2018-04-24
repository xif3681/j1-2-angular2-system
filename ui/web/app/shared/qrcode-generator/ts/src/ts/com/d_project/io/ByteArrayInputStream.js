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
            var ByteArrayInputStream = (function (_super) {
                __extends(ByteArrayInputStream, _super);
                function ByteArrayInputStream(bytes) {
                    _super.call(this);
                    this.bytes = bytes;
                    this.pos = 0;
                }
                ByteArrayInputStream.prototype.readByte = function () {
                    if (this.pos < this.bytes.length) {
                        var b = this.bytes[this.pos];
                        this.pos += 1;
                        return b;
                    }
                    return -1;
                };
                return ByteArrayInputStream;
            }(io.InputStream));
            io.ByteArrayInputStream = ByteArrayInputStream;
        })(io = d_project.io || (d_project.io = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pby9CeXRlQXJyYXlJbnB1dFN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZLENBQUM7Ozs7OztBQUNiLElBQVUsR0FBRyxDQXVCWjtBQXZCRCxXQUFVLEdBQUc7SUFBQyxJQUFBLFNBQVMsQ0F1QnRCO0lBdkJhLFdBQUEsU0FBUztRQUFDLElBQUEsRUFBRSxDQXVCekI7UUF2QnVCLFdBQUEsRUFBRSxFQUFDLENBQUM7WUFNMUI7Z0JBQTBDLHdDQUFXO2dCQUluRCw4QkFBb0IsS0FBZ0I7b0JBQ2xDLGlCQUFPLENBQUM7b0JBRFUsVUFBSyxHQUFMLEtBQUssQ0FBVztvQkFGNUIsUUFBRyxHQUFHLENBQUMsQ0FBQztnQkFJaEIsQ0FBQztnQkFFTSx1Q0FBUSxHQUFmO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWixDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsQ0FoQnlDLGNBQVcsR0FnQnBEO1lBaEJZLHVCQUFvQix1QkFnQmhDLENBQUE7UUFDSCxDQUFDLEVBdkJ1QixFQUFFLEdBQUYsWUFBRSxLQUFGLFlBQUUsUUF1QnpCO0lBQUQsQ0FBQyxFQXZCYSxTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF1QnRCO0FBQUQsQ0FBQyxFQXZCUyxHQUFHLEtBQUgsR0FBRyxRQXVCWiIsImZpbGUiOiJhcHAvc2hhcmVkL3FyY29kZS1nZW5lcmF0b3IvdHMvc3JjL3RzL2NvbS9kX3Byb2plY3QvaW8vQnl0ZUFycmF5SW5wdXRTdHJlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiSW5wdXRTdHJlYW0udHNcIiAvPlxuJ3VzZSBzdHJpY3QnO1xubmFtZXNwYWNlIGNvbS5kX3Byb2plY3QuaW8ge1xuXG4gIC8qKlxuICAgKiBCeXRlQXJyYXlJbnB1dFN0cmVhbVxuICAgKiBAYXV0aG9yIEthenVoaWtvIEFyYXNlXG4gICAqL1xuICBleHBvcnQgY2xhc3MgQnl0ZUFycmF5SW5wdXRTdHJlYW0gZXh0ZW5kcyBJbnB1dFN0cmVhbSB7XG5cbiAgICBwcml2YXRlIHBvcyA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ5dGVzIDogbnVtYmVyW10pIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYWRCeXRlKCkgOiBudW1iZXIge1xuICAgICAgaWYgKHRoaXMucG9zIDwgdGhpcy5ieXRlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGIgPSB0aGlzLmJ5dGVzW3RoaXMucG9zXTtcbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG59XG4iXX0=
