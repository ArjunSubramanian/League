/*
* Directive to validate if self control field is equal to target control field
*/

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual][formControlName],[appValidateEqual][formControl],[appValidateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
  ]
})
export class EqualValidatorDirective implements Validator {
  constructor( @Attribute('appValidateEqual') public validateEqual: string) { }

  validate(control: AbstractControl): { [key: string]: any } {
    // self value (e.g. confirm password)
    const self = control;

    // target value (e.g. password)
    const target = control.root.get(this.validateEqual);

    // value not equal
    if (target && self.value !== target.value) {
      return {
        appValidateEqual: false
      };
    }
    return null;
  }
}
