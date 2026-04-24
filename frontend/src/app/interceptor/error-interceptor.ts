import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        snackBar.open(err.error.error || err.message, 'close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 0 || error.status >= 500) {
        // router.navigate(['/maintenance']);
      } else if (error.status === 401) {
        // router.navigate(['/sign-in']);
      }
      return throwError(() => error);
    }),
  );
};
