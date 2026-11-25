import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { API_URL } from '../api';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends registration data to the server', () => {
    const data = { username: 'marko', email: 'marko@example.com', password: 'Lozinka1' };
    service.register(data).subscribe();

    const req = http.expectOne(`${API_URL}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush('ok');
  });

  it('checks if a username is free', () => {
    let result: boolean | undefined;
    service.isUsernameAvailable('marko').subscribe(value => (result = value));

    const req = http.expectOne(`${API_URL}/auth/check-username?username=marko`);
    req.flush(true);
    expect(result).toBe(true);
  });

  it('checks if an email is free', () => {
    let result: boolean | undefined;
    service.isEmailAvailable('a@b.rs').subscribe(value => (result = value));

    const req = http.expectOne(`${API_URL}/auth/check-email?email=a@b.rs`);
    req.flush(false);
    expect(result).toBe(false);
  });

  it('sends the activation token', () => {
    service.activate('abc').subscribe();

    const req = http.expectOne(`${API_URL}/auth/activate?token=abc`);
    expect(req.request.method).toBe('GET');
    req.flush('ok');
  });
});
