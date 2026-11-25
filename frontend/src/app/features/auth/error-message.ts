import { HttpErrorResponse } from '@angular/common/http';

export function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'Server trenutno nije dostupan. Pokušajte ponovo kasnije.';
    }
    const message = error.error?.message;
    if (typeof message === 'string' && message.length > 0) {
      return message;
    }
  }
  return fallback;
}
