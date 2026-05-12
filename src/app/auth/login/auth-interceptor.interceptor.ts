import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, tap, throwError } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  // const authRequest = req.clone({
  //   setHeaders: {
  //     Authorization: "Test",
  //     Brandon: "Me"
  //   }
  // })

  // return next(authRequest);
  // return next(req).pipe(retry({count:3, delay: 1000}), tap(() => console.log("RETRY!")), catchError((error: HttpErrorResponse) => throwError(() => error)));
  return next(req);
};
