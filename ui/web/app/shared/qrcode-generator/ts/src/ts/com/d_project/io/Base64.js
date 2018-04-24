'use strict';
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var io;
        (function (io) {
            var Base64 = (function () {
                function Base64() {
                    throw 'error';
                }
                Base64.encode = function (data) {
                    var bout = new io.ByteArrayOutputStream();
                    try {
                        var ostream = new io.Base64EncodeOutputStream(bout);
                        try {
                            ostream.writeBytes(data);
                        }
                        finally {
                            ostream.close();
                        }
                    }
                    finally {
                        bout.close();
                    }
                    return bout.toByteArray();
                };
                Base64.decode = function (data) {
                    var bout = new io.ByteArrayOutputStream();
                    try {
                        var istream = new io.Base64DecodeInputStream(new io.ByteArrayInputStream(data));
                        try {
                            var b;
                            while ((b = istream.readByte()) != -1) {
                                bout.writeByte(b);
                            }
                        }
                        finally {
                            istream.close();
                        }
                    }
                    finally {
                        bout.close();
                    }
                    return bout.toByteArray();
                };
                return Base64;
            }());
            io.Base64 = Base64;
        })(io = d_project.io || (d_project.io = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pby9CYXNlNjQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IsSUFBVSxHQUFHLENBOENaO0FBOUNELFdBQVUsR0FBRztJQUFDLElBQUEsU0FBUyxDQThDdEI7SUE5Q2EsV0FBQSxTQUFTO1FBQUMsSUFBQSxFQUFFLENBOEN6QjtRQTlDdUIsV0FBQSxFQUFFLEVBQUMsQ0FBQztZQU0xQjtnQkFFRTtvQkFDRSxNQUFNLE9BQU8sQ0FBQztnQkFDaEIsQ0FBQztnQkFFYSxhQUFNLEdBQXBCLFVBQXFCLElBQWU7b0JBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksd0JBQXFCLEVBQUUsQ0FBQztvQkFDdkMsSUFBSSxDQUFDO3dCQUNILElBQUksT0FBTyxHQUFHLElBQUksMkJBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2pELElBQUksQ0FBQzs0QkFDSCxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMzQixDQUFDO2dDQUFTLENBQUM7NEJBQ1QsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNsQixDQUFDO29CQUNILENBQUM7NEJBQVMsQ0FBQzt3QkFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2YsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVhLGFBQU0sR0FBcEIsVUFBcUIsSUFBZTtvQkFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSx3QkFBcUIsRUFBRSxDQUFDO29CQUN2QyxJQUFJLENBQUM7d0JBQ0gsSUFBSSxPQUFPLEdBQUcsSUFBSSwwQkFBdUIsQ0FDdkMsSUFBSSx1QkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO3dCQUNuQyxJQUFJLENBQUM7NEJBQ0QsSUFBSSxDQUFVLENBQUM7NEJBQ2YsT0FBUSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO2dDQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixDQUFDO3dCQUNMLENBQUM7Z0NBQVMsQ0FBQzs0QkFDUCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3BCLENBQUM7b0JBQ0gsQ0FBQzs0QkFBUyxDQUFDO3dCQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDZixDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBQ0gsYUFBQztZQUFELENBdkNBLEFBdUNDLElBQUE7WUF2Q1ksU0FBTSxTQXVDbEIsQ0FBQTtRQUNILENBQUMsRUE5Q3VCLEVBQUUsR0FBRixZQUFFLEtBQUYsWUFBRSxRQThDekI7SUFBRCxDQUFDLEVBOUNhLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQThDdEI7QUFBRCxDQUFDLEVBOUNTLEdBQUcsS0FBSCxHQUFHLFFBOENaIiwiZmlsZSI6ImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pby9CYXNlNjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5uYW1lc3BhY2UgY29tLmRfcHJvamVjdC5pbyB7XG5cbiAgLyoqXG4gICAqIEJhc2U2NFxuICAgKiBAYXV0aG9yIEthenVoaWtvIEFyYXNlXG4gICAqL1xuICBleHBvcnQgY2xhc3MgQmFzZTY0IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhyb3cgJ2Vycm9yJztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZShkYXRhIDogbnVtYmVyW10pIDogbnVtYmVyW10ge1xuICAgICAgdmFyIGJvdXQgPSBuZXcgQnl0ZUFycmF5T3V0cHV0U3RyZWFtKCk7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgb3N0cmVhbSA9IG5ldyBCYXNlNjRFbmNvZGVPdXRwdXRTdHJlYW0oYm91dCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgb3N0cmVhbS53cml0ZUJ5dGVzKGRhdGEpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIG9zdHJlYW0uY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgYm91dC5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJvdXQudG9CeXRlQXJyYXkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlY29kZShkYXRhIDogbnVtYmVyW10pIDogbnVtYmVyW10ge1xuICAgICAgdmFyIGJvdXQgPSBuZXcgQnl0ZUFycmF5T3V0cHV0U3RyZWFtKCk7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgaXN0cmVhbSA9IG5ldyBCYXNlNjREZWNvZGVJbnB1dFN0cmVhbShcbiAgICAgICAgICBuZXcgQnl0ZUFycmF5SW5wdXRTdHJlYW0oZGF0YSkgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBiIDogbnVtYmVyO1xuICAgICAgICAgICAgd2hpbGUgKCAoYiA9IGlzdHJlYW0ucmVhZEJ5dGUoKSApICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgYm91dC53cml0ZUJ5dGUoYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpc3RyZWFtLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGJvdXQuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBib3V0LnRvQnl0ZUFycmF5KCk7XG4gICAgfVxuICB9XG59XG4iXX0=
