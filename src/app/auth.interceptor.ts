import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = request.clone({
      headers: request.headers.append('Auth', 'xyz')
    });
    return next.handle(modifiedReq).pipe(tap(event => {
      if(event.type === HttpEventType.Response) {
        console.log('Response received');
      }
    }));
  }
}
