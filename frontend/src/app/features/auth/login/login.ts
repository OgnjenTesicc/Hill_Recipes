import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/services/auth';
import { errorMessage } from '../error-message';
import { shouldShowError } from '../form-messages';

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  selector: 'app-login',
  styleUrls: ['../auth-layout.css', './login.css'],
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly submitting = signal(false);
  readonly serverError = signal('');
  readonly hidePassword = signal(true);

  readonly form = new FormGroup({
    usernameOrEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  showError(field: 'usernameOrEmail' | 'password'): boolean {
    return shouldShowError(this.form.controls[field]);
  }

  togglePassword(): void {
    this.hidePassword.update(hidden => !hidden);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.serverError.set('');
    this.submitting.set(true);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigateByUrl(this.targetUrl());
      },
      error: error => {
        this.submitting.set(false);
        this.serverError.set(errorMessage(error, this.fallbackMessage(error)));
      }
    });
  }

  private targetUrl(): string {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const isLocal = !!returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//');
    return isLocal ? returnUrl : '/search';
  }

  private fallbackMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 403) {
      return 'Nalog još nije aktiviran. Proverite mejl i potvrdite nalog.';
    }
    return 'Pogrešno korisničko ime ili lozinka.';
  }
}
