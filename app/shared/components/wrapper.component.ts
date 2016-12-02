import {Component, Input, Attribute} from '@angular/core'
import {
    FormControl,
    FormGroup,
    ControlValueAccessor,
    NgForm,
    NG_VALUE_ACCESSOR
} from '@angular/forms';


@Component({
    selector: 'my-child',
    template: `
  
  <h1>Child</h1>
  <input  [formControl]="childControl" (input)="fn($event.target.value)">
  
  <p>Child valid*: {{childControl?.valid}}</p>
  <p>*Da wir auf dieser Ebene keinen Validator haben, kommt hier immer true</p>
  <p>??</p>
  <p>Errors: {{ errors | json }}</p>
  
  `,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: ChildComponent, multi: true}
    ]
})
export class ChildComponent implements ControlValueAccessor {
    childControl = new FormControl();
    fn: (value: any) => void;

    constructor(private ngForm: NgForm, @Attribute('name') private name: string) {
    }

    get errors() {
        let ctrl = this.ngForm.controls[this.name];
        if (ctrl) return ctrl.errors;
    }

    writeValue(value: any) {
        this.childControl.setValue(value);
    }

    registerOnChange(fn: (value: any) => void) {
        this.fn = fn;

        // Der Callback fn muss aufgerufen werden, um
        // Angular über einen neuen Wert zu informieren
        // Danach führt Angular die Validatoren aus
        // und setzt die Validierungs-Zustände

        // Wir können dazu fn in diesem Fall einfach an
        // die Kind-Komponente weiterreichen:
        // this.childControl.registerOnChange(fn);

        // Alternative
        this.childControl.valueChanges.subscribe(value => {
            console.debug('new value', value);
            fn(value);
        })

        // Bei nutzung von template-driven-Forms in der
        // Kindokomponente müsste man z. B. das change-Event
        // oder ngModelChange-Event behandeln. Dieses könnte
        // dann an fn delegieren
    }

    registerOnTouched() {}
}


@Component({
    selector: 'wrapper-test',
    template: `
    <div>
      <h4>Hello {{person.name}}</h4>
      <form #myform="ngForm">
       <input name="name" [(ngModel)]="person.name"><br>
       <input required name="email" [ngModel]="person.email"><br>
       <my-child required name="username" [ngModel]="person.username">
       </my-child>
       <button type="submit">Register</button>
      </form>
      {{ myform.value | json }}
      <p>Email valid: {{ myform.controls?.email?.valid }}</p>
      <p>Username valid: {{ myform.controls?.username?.valid }}</p>
      
    </div>
  `
})
export class WrapperTestComponent {
    person = {
        name: 'name',
        email: 'email',
        username: 'username'
    };

}