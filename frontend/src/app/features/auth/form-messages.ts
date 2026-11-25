import { AbstractControl } from '@angular/forms';

export function shouldShowError(control: AbstractControl): boolean {
  return control.invalid && (control.dirty || control.touched);
}

export function firstMessage(
  control: AbstractControl,
  messages: Record<string, string>
): string {
  const errors = control.errors ?? {};
  const key = Object.keys(messages).find(name => name in errors);
  return key ? messages[key] : '';
}
