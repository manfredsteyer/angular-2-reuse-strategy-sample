import { Component } from '@angular/core';

@Component({
    template: `
        <h1>{{title}}</h1>
        
        <div class="control-group">
            <label>Your Passenger Number</label>
            <input class="form-control" [(ngModel)]="passengerNumber">
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div>This use case is under construction ...</div>
    `
})
export class BookingsComponent {
    title = 'Bookings';
    passengerNumber: string;
}
