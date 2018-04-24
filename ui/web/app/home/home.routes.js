"use strict";
var index_1 = require('./index');
var index_2 = require('./../guards/index');
var index_3 = require('./config/index');
var index_4 = require('./manage/index');
exports.HomeRoutes = [
    { path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'home',
        component: index_1.HomeComponent,
        canActivate: [index_2.AuthGuard],
        children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' }
        ].concat(index_4.ManageRoutes, index_3.ConfigRoutes)
    },
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxzQkFBOEIsU0FBUyxDQUFDLENBQUE7QUFDeEMsc0JBQTBCLG1CQUFtQixDQUFDLENBQUE7QUFDOUMsc0JBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFDOUMsc0JBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFDakMsa0JBQVUsR0FBWTtJQUNqQyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLE1BQU07UUFDbEIsU0FBUyxFQUFFLE1BQU07S0FDbEI7SUFDRCxFQUFFLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLHFCQUFhO1FBQ3hCLFdBQVcsRUFBRSxDQUFDLGlCQUFTLENBQUM7UUFDeEIsUUFBUSxFQUFFO1lBQ1IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtpQkFDbEQsb0JBQVksRUFDWixvQkFBWSxDQUNoQjtLQUNGO0NBQ0YsQ0FBQyIsImZpbGUiOiJhcHAvaG9tZS9ob21lLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vLi4vZ3VhcmRzL2luZGV4JztcbmltcG9ydCB7IENvbmZpZ1JvdXRlcyB9IGZyb20gJy4vY29uZmlnL2luZGV4JztcbmltcG9ydCB7IE1hbmFnZVJvdXRlcyB9IGZyb20gJy4vbWFuYWdlL2luZGV4JztcbmV4cG9ydCBjb25zdCBIb21lUm91dGVzOiBSb3V0ZVtdID0gW1xuICB7IHBhdGg6ICcnLFxuICAgIHJlZGlyZWN0VG86ICdob21lJyxcbiAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xuICB9LFxuICB7IHBhdGg6ICdob21lJyxcbiAgICBjb21wb25lbnQ6IEhvbWVDb21wb25lbnQsXG4gICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnbWFuYWdlJywgcGF0aE1hdGNoOiAnZnVsbCcgfSxcbiAgICAgIC4uLk1hbmFnZVJvdXRlcyxcbiAgICAgIC4uLkNvbmZpZ1JvdXRlc1xuICAgIF1cbiAgfSxcbl07XG4iXX0=
