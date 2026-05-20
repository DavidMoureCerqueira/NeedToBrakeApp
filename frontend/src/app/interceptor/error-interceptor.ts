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
        router.navigate(['/maintenance']);
      } else if (error.status === 401) {
        router.navigate(['/sign-in']);
      } else if (error.status === 404) {
        const browserUrl = router.url;
        const apiUrl = req.url;
        const isProfile = browserUrl.includes('/profile/') || apiUrl.includes('user/profile/');
        const isComparison = browserUrl.includes('/disc-comparison/') || apiUrl.includes('/disc/');
        const isPost = browserUrl.includes('/forum/post/') || apiUrl.includes('/post/');
        if (isPost || isComparison || isProfile) {
          router.navigate(['/404']);
        }
      } else if (error.status === 403) {
        router.navigate(['/forbidden']);
      }

      return throwError(() => error);
    }),
  );
};
