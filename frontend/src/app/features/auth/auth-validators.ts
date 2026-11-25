import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';

const DEBOUNCE_MS = 400;

export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value) {
      return null;
    }
    const valid =
      value.length >= 8 &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /\d/.test(value);
    return valid ? null : { passwordWeak: true };
  };
}

export function matchesPassword(passwordField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get(passwordField)?.value;
    return control.value === password ? null : { passwordsMismatch: true };
  };
}

export function isAvailable(
  check: (value: string) => Observable<boolean>,
  errorKey: string,
  onFree?: (value: string) => void
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value: string = control.value ?? '';
    if (!value) {
      return of(null);
    }
    return timer(DEBOUNCE_MS).pipe(
      switchMap(() => check(value)),
      map(available => {
        if (available) {
          onFree?.(value);
          return null;
        }
        return { [errorKey]: true };
      }),
      catchError(() => of(null))
    );
  };
}
