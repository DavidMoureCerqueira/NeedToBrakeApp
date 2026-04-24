import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { REQUIRES_AUTH } from '../auth/auth.context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.info('Request intercepted, adding auth...');
  const auth = inject(AuthService);
  const router = inject(Router);
  if (req.context.get(REQUIRES_AUTH) && auth.token()) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.token()}`,
      },
    });

    return next(authRequest);
  }
  return next(req);
};
