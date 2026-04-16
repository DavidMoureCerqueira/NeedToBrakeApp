import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.info('Request intercepted, adding auth...');
  const auth = inject(AuthService);
  const router = inject(Router);
  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth.token()}`,
    },
  });

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Captured on interceptor:Invalid or expired Token ');
        auth.logout();
        router.navigate(['/register']);
        // TODO: añadir snackbar del video
      }
      return throwError(() => error);
    }),
  );
};
