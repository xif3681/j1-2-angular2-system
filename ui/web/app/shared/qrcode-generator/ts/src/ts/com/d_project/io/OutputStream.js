'use strict';
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var io;
        (function (io) {
            var OutputStream = (function () {
                function OutputStream() {
                }
                OutputStream.prototype.writeBytes = function (bytes) {
                    for (var i = 0; i < bytes.length; i += 1) {
                        this.writeByte(bytes[i]);
                    }
                };
                OutputStream.prototype.flush = function () {
                };
                OutputStream.prototype.close = function () {
                    this.flush();
                };
                return OutputStream;
            }());
            io.OutputStream = OutputStream;
        })(io = d_project.io || (d_project.io = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pby9PdXRwdXRTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IsSUFBVSxHQUFHLENBb0JaO0FBcEJELFdBQVUsR0FBRztJQUFDLElBQUEsU0FBUyxDQW9CdEI7SUFwQmEsV0FBQSxTQUFTO1FBQUMsSUFBQSxFQUFFLENBb0J6QjtRQXBCdUIsV0FBQSxFQUFFLEVBQUMsQ0FBQztZQU0xQjtnQkFDRTtnQkFBZSxDQUFDO2dCQUVULGlDQUFVLEdBQWpCLFVBQWtCLEtBQWdCO29CQUNoQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixDQUFDO2dCQUNILENBQUM7Z0JBQ00sNEJBQUssR0FBWjtnQkFDQSxDQUFDO2dCQUNNLDRCQUFLLEdBQVo7b0JBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLENBQUM7Z0JBQ0gsbUJBQUM7WUFBRCxDQWJBLEFBYUMsSUFBQTtZQWJxQixlQUFZLGVBYWpDLENBQUE7UUFDSCxDQUFDLEVBcEJ1QixFQUFFLEdBQUYsWUFBRSxLQUFGLFlBQUUsUUFvQnpCO0lBQUQsQ0FBQyxFQXBCYSxTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvQnRCO0FBQUQsQ0FBQyxFQXBCUyxHQUFHLEtBQUgsR0FBRyxRQW9CWiIsImZpbGUiOiJhcHAvc2hhcmVkL3FyY29kZS1nZW5lcmF0b3IvdHMvc3JjL3RzL2NvbS9kX3Byb2plY3QvaW8vT3V0cHV0U3RyZWFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubmFtZXNwYWNlIGNvbS5kX3Byb2plY3QuaW8ge1xuXG4gIC8qKlxuICAgKiBPdXRwdXRTdHJlYW1cbiAgICogQGF1dGhvciBLYXp1aGlrbyBBcmFzZVxuICAgKi9cbiAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIE91dHB1dFN0cmVhbSB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuICAgIHB1YmxpYyBhYnN0cmFjdCB3cml0ZUJ5dGUoYiA6IG51bWJlcikgOiB2b2lkO1xuICAgIHB1YmxpYyB3cml0ZUJ5dGVzKGJ5dGVzIDogbnVtYmVyW10pIDogdm9pZCB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMud3JpdGVCeXRlKGJ5dGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGZsdXNoKCkgOiB2b2lkIHtcbiAgICB9XG4gICAgcHVibGljIGNsb3NlKCkgOiB2b2lkIHtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
