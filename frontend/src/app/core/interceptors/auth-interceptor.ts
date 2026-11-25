import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { API_URL } from '../api';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();

  if (!token || !req.url.startsWith(API_URL)) {
    return next(req);
  }

  const request = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  const isAuthCall = req.url.startsWith(`${API_URL}/auth/`);

  return next(request).pipe(
    catchError(error => {
      if (error.status === 401 && !isAuthCall) {
        auth.clearToken();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
