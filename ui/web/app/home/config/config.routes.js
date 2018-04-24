"use strict";
var index_1 = require('./license-system/index');
var index_2 = require('./user-system/index');
var index_3 = require('./smtp-config/index');
var index_4 = require('./index');
exports.ConfigRoutes = [
    {
        path: 'config',
        component: index_4.ConfigComponent,
        children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            { path: 'user', component: index_2.UserSystemComponent },
            { path: 'licence', component: index_1.LicenseSystemComponent },
            { path: 'smtp', component: index_3.SMTPConfigComponent },
        ]
    }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NvbmZpZy9jb25maWcucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxzQkFBdUMsd0JBQXdCLENBQUMsQ0FBQTtBQUNoRSxzQkFBb0MscUJBQXFCLENBQUMsQ0FBQTtBQUMxRCxzQkFBb0MscUJBQXFCLENBQUMsQ0FBQTtBQUMxRCxzQkFBZ0MsU0FBUyxDQUFDLENBQUE7QUFFN0Isb0JBQVksR0FBWTtJQUNuQztRQUNFLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBUyxFQUFFLHVCQUFlO1FBQzFCLFFBQVEsRUFBRTtZQUNSLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDbkQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSwyQkFBbUIsRUFBRTtZQUNoRCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLDhCQUFzQixFQUFFO1lBQ3RELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsMkJBQW1CLEVBQUU7U0FDakQ7S0FDRjtDQUNGLENBQUMiLCJmaWxlIjoiYXBwL2hvbWUvY29uZmlnL2NvbmZpZy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMaWNlbnNlU3lzdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9saWNlbnNlLXN5c3RlbS9pbmRleCc7XG5pbXBvcnQgeyBVc2VyU3lzdGVtQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLXN5c3RlbS9pbmRleCc7XG5pbXBvcnQgeyBTTVRQQ29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi9zbXRwLWNvbmZpZy9pbmRleCc7XG5pbXBvcnQgeyBDb25maWdDb21wb25lbnQgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IENvbmZpZ1JvdXRlczogUm91dGVbXSA9IFtcbiAge1xuICAgIHBhdGg6ICdjb25maWcnLFxuICAgIGNvbXBvbmVudDogQ29uZmlnQ29tcG9uZW50LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAndXNlcicsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXG4gICAgICB7IHBhdGg6ICd1c2VyJywgY29tcG9uZW50OiBVc2VyU3lzdGVtQ29tcG9uZW50IH0sXG4gICAgICB7IHBhdGg6ICdsaWNlbmNlJywgY29tcG9uZW50OiBMaWNlbnNlU3lzdGVtQ29tcG9uZW50IH0sXG4gICAgICB7IHBhdGg6ICdzbXRwJywgY29tcG9uZW50OiBTTVRQQ29uZmlnQ29tcG9uZW50IH0sXG4gICAgXVxuICB9XG5dO1xuIl19
