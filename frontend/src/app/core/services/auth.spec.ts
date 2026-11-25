import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth';

function makeToken(payload: object): string {
  return `header.${btoa(JSON.stringify(payload))}.signature`;
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('is not logged in without a token', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('is logged in with a token that has not expired', () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    localStorage.setItem('token', makeToken({ exp }));
    expect(service.isLoggedIn()).toBe(true);
  });

  it('is not logged in with an expired token', () => {
    const exp = Math.floor(Date.now() / 1000) - 60;
    localStorage.setItem('token', makeToken({ exp }));
    expect(service.isLoggedIn()).toBe(false);
  });
});
