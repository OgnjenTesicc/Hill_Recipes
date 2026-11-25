import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { API_URL } from '../api';
import { RegisterRequest } from '../../shared/models/auth';

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
}
