import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.context.get(IS_AUTH_REQUST)) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.authToken();

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  })

  return next(authRequest);
};

export const IS_AUTH_REQUST = new HttpContextToken<boolean>(() => false);