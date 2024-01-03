import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { validateEmail } from '../validators/email-validator';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true
    }
  ],
  standalone: true
})
export class EmailDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return validateEmail()(control)
  }

  constructor() { }

}
