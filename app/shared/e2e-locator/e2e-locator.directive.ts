import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({selector: '[flightE2eLocator]'})
export class E2eLocatorDirective {

    @Input() set flightE2eLocator(flightE2eLocator: string) {
        this.renderer.setElementAttribute(this.el.nativeElement, 'flightE2eLocator', flightE2eLocator);
    }

    constructor(private el: ElementRef, private renderer: Renderer) {
    }
}
