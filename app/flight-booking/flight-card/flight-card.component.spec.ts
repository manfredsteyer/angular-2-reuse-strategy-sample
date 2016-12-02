import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FlightCardComponent } from './flight.card.component';
import { DateComponent } from '../../shared/date/date.component';
import { Flight } from '../../entities/flight';
import { DebugElement } from '@angular/core';

let fixture: ComponentFixture<FlightCardComponent>;
let componentInstance: FlightCardComponent;
let flightElement: DebugElement;

describe('FlightCardComponent', () => {

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         declarations: [FlightCardComponent, DateComponent]
    //     })
    //         //Lädt css und html Dateien welche über styleUrls oder templateUrl angegeben werden
    //         .compileComponents();
    // }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FlightCardComponent, DateComponent]
        });
        fixture = TestBed.createComponent(FlightCardComponent);
        componentInstance = fixture.componentInstance;
        flightElement = fixture.debugElement.query(By.css('div'));

        let flightItem: Flight = {
            id: 1,
            from: 'Graz',
            to: 'Hamburg',
            date: new Date().toISOString()
        };

        componentInstance.item = flightItem;
        fixture.detectChanges();

    });

    it('should display title', () => {
        // Parent => Child scope
        let title: HTMLElement = flightElement.query(By.css('h2')).nativeElement;

        expect(title.textContent).toBe('Graz - Hamburg');
    });

    it('should change background color if flight item is selected', () => {

        expect(flightElement.styles['background-color']).toBe('lightsteelblue');

        componentInstance.selectedItem = componentInstance.item;
        fixture.detectChanges();

        expect(flightElement.styles['background-color']).toBe('orange');

    });

    it('should select flight item', () => {

        let button: DebugElement = flightElement.query(By.css('input'));
        let selectedFlight: Flight;

        componentInstance.selectedItemChange.subscribe(flight => selectedFlight = flight);

        button.triggerEventHandler('click', null);
        expect(selectedFlight).toBe(componentInstance.item);

    });

});