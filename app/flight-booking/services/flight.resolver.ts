import { Flight } from '../../entities/flight';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FlightService } from './flight.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FlightResolver implements Resolve<Flight> {
    constructor(private flightService: FlightService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
        let id = route.params['id'];
        console.debug('FlightResolver', id);
        return this.flightService.findById(id);
    }
}
