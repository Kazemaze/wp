import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Token frissítése
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              this.authService.saveToken(response.token);
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
                },
              });
              return next.handle(req);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
