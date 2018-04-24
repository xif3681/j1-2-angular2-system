"use strict";
var index_1 = require('./index');
var index_2 = require('./disk/index');
var index_3 = require('./raid/index');
var index_4 = require('./roll/index');
exports.StorageRoutes = [
    {
        path: 'storage',
        component: index_1.StorageComponent,
        children: [
            { path: '', redirectTo: 'disk', pathMatch: 'full' },
            { path: 'disk', component: index_2.DiskComponent },
            { path: 'raid', component: index_3.RaidComponent },
            { path: 'roll', component: index_4.RollComponent },
        ]
    }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL3N0b3JhZ2Uucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxzQkFBaUMsU0FBUyxDQUFDLENBQUE7QUFDM0Msc0JBQThCLGNBQWMsQ0FBQyxDQUFBO0FBQzdDLHNCQUE4QixjQUFjLENBQUMsQ0FBQTtBQUM3QyxzQkFBOEIsY0FBYyxDQUFDLENBQUE7QUFDaEMscUJBQWEsR0FBWTtJQUNwQztRQUNFLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLHdCQUFnQjtRQUMzQixRQUFRLEVBQUU7WUFDUixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQ25ELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUscUJBQWEsRUFBRTtZQUMxQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLHFCQUFhLEVBQUU7WUFDMUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxxQkFBYSxFQUFFO1NBQzNDO0tBQ0Y7Q0FDRixDQUFDIiwiZmlsZSI6ImFwcC9ob21lL21hbmFnZS9zdG9yYWdlL3N0b3JhZ2Uucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3RvcmFnZUNvbXBvbmVudCB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgRGlza0NvbXBvbmVudCB9IGZyb20gJy4vZGlzay9pbmRleCc7XG5pbXBvcnQgeyBSYWlkQ29tcG9uZW50IH0gZnJvbSAnLi9yYWlkL2luZGV4JztcbmltcG9ydCB7IFJvbGxDb21wb25lbnQgfSBmcm9tICcuL3JvbGwvaW5kZXgnO1xuZXhwb3J0IGNvbnN0IFN0b3JhZ2VSb3V0ZXM6IFJvdXRlW10gPSBbXG4gIHtcbiAgICBwYXRoOiAnc3RvcmFnZScsXG4gICAgY29tcG9uZW50OiBTdG9yYWdlQ29tcG9uZW50LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnZGlzaycsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXG4gICAgICB7IHBhdGg6ICdkaXNrJywgY29tcG9uZW50OiBEaXNrQ29tcG9uZW50IH0sXG4gICAgICB7IHBhdGg6ICdyYWlkJywgY29tcG9uZW50OiBSYWlkQ29tcG9uZW50IH0sXG4gICAgICB7IHBhdGg6ICdyb2xsJywgY29tcG9uZW50OiBSb2xsQ29tcG9uZW50IH0sXG4gICAgXVxuICB9XG5dO1xuIl19
