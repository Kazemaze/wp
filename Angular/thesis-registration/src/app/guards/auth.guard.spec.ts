import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') }; // Mockolt router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }, // Mock router beállítása
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token'); // Mockolt token
    const canActivate = guard.canActivate({} as any, {} as any); // Aktiválás tesztelése
    expect(canActivate).toBeTrue();
  });

  it('should deny access and redirect to login if token is missing', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mockolt üres token
    const canActivate = guard.canActivate({} as any, {} as any); // Aktiválás tesztelése
    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); // Ellenőrzi a visszairányítást
  });
});
