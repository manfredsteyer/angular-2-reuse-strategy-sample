import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookingsComponent } from './bookings.component';

let fixture: ComponentFixture<BookingsComponent>;
let componentTitle: HTMLElement;
let componentInstance: BookingsComponent;

describe('BookingsComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BookingsComponent]
        });
        fixture = TestBed.createComponent(BookingsComponent);
        componentTitle = fixture.debugElement.query(By.css('h1')).nativeElement;
        componentInstance = fixture.componentInstance;
    });

    it('should display Bookings title', () => {
        expect(componentTitle.textContent).toBe('');
        fixture.detectChanges();
        expect(componentTitle.textContent).toBe('Bookings');
    });

    it('should change Bookings title', () => {
        componentInstance.title = 'changed title';
        fixture.detectChanges();
        expect(componentTitle.textContent).toBe('changed title');
    });

});