"use strict";
var index_1 = require('./index');
var index_2 = require('./container/index');
var storage_routes_1 = require('./storage/storage.routes');
exports.ManageRoutes = [
    {
        path: 'manage',
        component: index_1.ManageComponent,
        children: [
            { path: '', redirectTo: 'storage', pathMatch: 'full' }
        ].concat(storage_routes_1.StorageRoutes, [
            { path: 'container', component: index_2.ContainerComponent },
        ])
    }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9tYW5hZ2Uucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxzQkFBZ0MsU0FBUyxDQUFDLENBQUE7QUFDMUMsc0JBQW1DLG1CQUFtQixDQUFDLENBQUE7QUFDdkQsK0JBQTZCLDBCQUEwQixDQUFDLENBQUE7QUFFM0Msb0JBQVksR0FBWTtJQUNuQztRQUNFLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBUyxFQUFFLHVCQUFlO1FBQzFCLFFBQVEsRUFBRTtZQUNSLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7aUJBQ25ELDhCQUFhO1lBQ2hCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsMEJBQWtCLEVBQUU7VUFDckQ7S0FDRjtDQUNGLENBQUMiLCJmaWxlIjoiYXBwL2hvbWUvbWFuYWdlL21hbmFnZS5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVyL2luZGV4JztcbmltcG9ydCB7IFN0b3JhZ2VSb3V0ZXN9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLnJvdXRlcyc7XG5pbXBvcnQgeyBDb250YWluZXJSb3V0ZXN9IGZyb20gJy4vY29udGFpbmVyL2NvbnRhaW5lci5yb3V0ZXMnO1xuZXhwb3J0IGNvbnN0IE1hbmFnZVJvdXRlczogUm91dGVbXSA9IFtcbiAge1xuICAgIHBhdGg6ICdtYW5hZ2UnLFxuICAgIGNvbXBvbmVudDogTWFuYWdlQ29tcG9uZW50LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnc3RvcmFnZScsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXG4gICAgICAuLi5TdG9yYWdlUm91dGVzLFxuICAgICAgeyBwYXRoOiAnY29udGFpbmVyJywgY29tcG9uZW50OiBDb250YWluZXJDb21wb25lbnQgfSxcbiAgICBdXG4gIH1cbl07XG4iXX0=
