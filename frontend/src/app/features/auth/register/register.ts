import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth';
import { isAvailable, matchesPassword, passwordStrength } from '../auth-validators';
import { errorMessage } from '../error-message';
import { firstMessage, shouldShowError } from '../form-messages';

type Field = 'username' | 'email' | 'password' | 'confirmPassword';

const MESSAGES: Record<Field, Record<string, string>> = {
  username: {
    required: 'Korisničko ime je obavezno.',
    minlength: 'Korisničko ime mora imati najmanje 3 znaka.',
    maxlength: 'Korisničko ime može imati najviše 30 znakova.',
    pattern: 'Dozvoljena su slova, brojevi, tačka i donja crta.',
    usernameTaken: 'Korisničko ime je već zauzeto.'
  },
  email: {
    required: 'Email je obavezan.',
    pattern: 'Unesite ispravnu email adresu.',
    emailTaken: 'Za ovaj email već postoji nalog.'
  },
  password: {
    required: 'Lozinka je obavezna.',
    passwordWeak: 'Lozinka mora imati najmanje 8 znakova, veliko i malo slovo i broj.'
  },
  confirmPassword: {
    required: 'Ponovite lozinku.',
    passwordsMismatch: 'Lozinke se ne poklapaju.'
  }
};

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  selector: 'app-register',
  styleUrls: ['../auth-layout.css', './register.css'],
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(AuthService);

  readonly submitting = signal(false);
  readonly registered = signal(false);
  readonly serverError = signal('');
  readonly hidePassword = signal(true);
  readonly strengthBars = [0, 1, 2, 3];
  private readonly confirmedFree = signal({ username: '', email: '' });

  readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[A-Za-z0-9._]+$/)
      ],
      asyncValidators: [
        isAvailable(
          value => this.auth.isUsernameAvailable(value),
          'usernameTaken',
          value => this.markFree('username', value)
        )
      ]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ],
      asyncValidators: [
        isAvailable(
          value => this.auth.isEmailAvailable(value),
          'emailTaken',
          value => this.markFree('email', value)
        )
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, passwordStrength()]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, matchesPassword('password')]
    })
  });

  constructor() {
    this.form.controls.password.valueChanges.subscribe(() =>
      this.form.controls.confirmPassword.updateValueAndValidity()
    );
  }

  showError(field: Field): boolean {
    return shouldShowError(this.form.controls[field]);
  }

  errorFor(field: Field): string {
    return firstMessage(this.form.controls[field], MESSAGES[field]);
  }

  isConfirmedFree(field: 'username' | 'email'): boolean {
    const control = this.form.controls[field];
    return control.valid && control.value.length > 0 && this.confirmedFree()[field] === control.value;
  }

  private markFree(field: 'username' | 'email', value: string): void {
    this.confirmedFree.update(current => ({ ...current, [field]: value }));
  }

  passwordScore(): number {
    const value = this.form.controls.password.value;
    return [value.length >= 8, /[a-z]/.test(value), /[A-Z]/.test(value), /\d/.test(value)]
      .filter(Boolean).length;
  }

  barClass(index: number): string {
    const score = this.passwordScore();
    if (index >= score) {
      return '';
    }
    return score === 4 || index < score - 1 ? 'strong' : 'medium';
  }

  togglePassword(): void {
    this.hidePassword.update(hidden => !hidden);
  }

  submit(): void {
    if (this.form.pending) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, email, password } = this.form.getRawValue();
    this.serverError.set('');
    this.submitting.set(true);

    this.auth.register({ username, email, password }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.registered.set(true);
      },
      error: error => {
        this.submitting.set(false);
        const fallback =
          error?.status === 409
            ? 'Korisničko ime ili email su već zauzeti.'
            : 'Registracija nije uspela. Proverite podatke i pokušajte ponovo.';
        this.serverError.set(errorMessage(error, fallback));
      }
    });
  }
}
