import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, RouterStateSnapshot, UrlTree } from '@angular/router';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const route = {} as ActivatedRouteSnapshot;
  const state = { url: '/profile' } as RouterStateSnapshot;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])]
    });
  });

  it('redirects to login without a token', () => {
    const result = executeGuard(route, state);
    expect(result instanceof UrlTree).toBe(true);
    expect((result as UrlTree).toString()).toContain('/auth/login');
  });

  it('lets a logged in user through', () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    localStorage.setItem('token', `h.${btoa(JSON.stringify({ exp }))}.s`);
    expect(executeGuard(route, state)).toBe(true);
  });
});
