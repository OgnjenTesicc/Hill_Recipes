import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { API_URL } from '../api';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../shared/models/auth';

const TOKEN_KEY = 'token';

@Service()
export class AuthService {
  private http = inject(HttpClient);

  register(data: RegisterRequest): Observable<void> {
    return this.http
      .post(`${API_URL}/auth/register`, data, { responseType: 'text' })
      .pipe(map(() => undefined));
  }

  isUsernameAvailable(username: string): Observable<boolean> {
    const params = new HttpParams().set('username', username);
    return this.http.get<boolean>(`${API_URL}/auth/check-username`, { params });
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(`${API_URL}/auth/check-email`, { params });
  }

  activate(token: string): Observable<void> {
    const params = new HttpParams().set('token', token);
    return this.http
      .get(`${API_URL}/auth/activate`, { params, responseType: 'text' })
      .pipe(map(() => undefined));
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, data)
      .pipe(tap(response => this.saveToken(response.token)));
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // storage not available
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const expiry = this.readExpiry(token);
    return expiry === undefined || expiry * 1000 > Date.now();
  }

  private saveToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // storage not available
    }
  }

  // Returns the "exp" claim in seconds, undefined if the token has none.
  private readExpiry(token: string): number | undefined {
    try {
      const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const exp = JSON.parse(atob(payload)).exp;
      return typeof exp === 'number' ? exp : undefined;
    } catch {
      return 0;
    }
  }
}
