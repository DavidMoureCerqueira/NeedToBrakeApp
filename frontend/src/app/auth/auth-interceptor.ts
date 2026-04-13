import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth.token()}`,
    },
  });

  return next(authRequest);
};
