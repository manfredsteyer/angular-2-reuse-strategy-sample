import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { FlightService } from '../services/flight.service';
import { Flight } from '../../entities/flight';

@Component({
    selector: 'flight-search',
    templateUrl: './flight-search.component.html',
    styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {

    public from: string = 'Hamburg';
    public to: string = 'Graz';
    public selectedFlight: Flight;

    public flights: Array<Flight> = [];

    constructor(private flightService: FlightService, route: ActivatedRoute) {

        route.queryParams.subscribe((p) => {
            console.debug('queryParams', p);
        });
    }

    public select(f: Flight): void {
        this.selectedFlight = f;
    }

    public search(): void {

        this.flightService
            .find(this.from, this.to)
            .subscribe(
                (flights) => { this.flights = flights; },
                (err) => { console.warn(err); }
            );
    }
}
