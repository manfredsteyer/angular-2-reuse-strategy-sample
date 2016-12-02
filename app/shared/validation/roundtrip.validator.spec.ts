import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgForm, FormsModule } from '@angular/forms';

import { RoundTrip } from './roundtrip.validator';

@Component({
    template: `
<form #f="ngForm" round-trip>
        <input [(ngModel)]="from" name="from">
        <input [(ngModel)]="to" name="to">
</form>
`
})
class TestComponent {
}

let fixture: ComponentFixture<TestComponent>;
let rootFormGroup: NgForm;
let fromInput: HTMLInputElement;
let toInput: HTMLInputElement;
let compInstance: TestComponent;


describe('RoundTrip', () => {

    beforeEach(async(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RoundTrip, TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges();

        let inputs: Array<DebugElement> = fixture.debugElement.queryAll(By.css('input'));
        fromInput = inputs[0].nativeElement;
        toInput = inputs[1].nativeElement;

        compInstance = fixture.componentInstance;

        let form: DebugElement = fixture.debugElement.query(By.directive(RoundTrip));

        // Zugang zur lokalen Variable #f welche die oberste FormGroup wiederspiegelt
        rootFormGroup = form.references['f'];

    }));

    it('should raise error if from and to city are the same location', () => {

        // Initial sind beide Input Felder leer weshalb round-trip einen Fehler wirft
        expect(rootFormGroup.control.hasError('round-trip')).toBe(true);
        expect(rootFormGroup.control.valid).toBe(false);

        fromInput.value = 'Graz';
        fromInput.dispatchEvent(new Event('input'));
        expect(rootFormGroup.control.hasError('round-trip')).toBe(false);
        expect(rootFormGroup.control.valid).toBe(true);

        toInput.value = 'Graz';
        toInput.dispatchEvent(new Event('input'));
        expect(rootFormGroup.control.hasError('round-trip')).toBe(true);
        expect(rootFormGroup.control.valid).toBe(false);

    });

    it('should get error object', () => {

        fromInput.value = 'Graz';
        fromInput.dispatchEvent(new Event('input'));
        expect(rootFormGroup.control.hasError('round-trip')).toBe(false);
        expect(rootFormGroup.control.valid).toBe(true);
        expect(rootFormGroup.control.errors).toBe(null);

        toInput.value = 'Graz';
        toInput.dispatchEvent(new Event('input'));
        expect(rootFormGroup.control.hasError('round-trip')).toBe(true);
        expect(rootFormGroup.control.valid).toBe(false);
        expect(rootFormGroup.control.errors).toEqual({
            'round-trip': {
                city: 'Graz'
            }
        });

    });


});
