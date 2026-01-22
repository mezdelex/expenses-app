import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    ).test(control.value);

    return isValid ? null : { validEmail: { value: control.value } };
  };
}
