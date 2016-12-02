import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightBookingComponent } from './flight-booking.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { AuthChildGuard } from '../shared/auth/auth.child.guard';
import { FlightResolver } from './services/flight.resolver';
import { FlightHistoryComponent } from '../flight-history/flight-history.component';
import { ChatComponent } from './chat/chat.component';
import {LeaveComponentGuard} from "../shared/deactivation/leave-component-guard";

let FLIGHT_BOOKING_ROUTES: Routes = [
    {
        path: '',
        component: FlightBookingComponent,
        // canActivateChild: [AuthChildGuard],
        children: [
            {
                path: '',
                redirectTo: 'flight-search',
                pathMatch: 'full'
            },
            {
                path: 'flight-search',
                component: FlightSearchComponent
            },
            {
                path: 'passenger-search',
                component: PassengerSearchComponent
            },

            {
                path: 'flight-edit/:id',
                component: FlightEditComponent,
                // canActivate: [AuthGuard],
                canDeactivate: [LeaveComponentGuard],
                data: {
                    // restricted: true // Custom Property
                },
                resolve: {
                    flight: FlightResolver
                }
            }

        ]
    }
];

export let FlightBookingRouterModule = RouterModule.forChild(FLIGHT_BOOKING_ROUTES);