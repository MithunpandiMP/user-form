import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserHttpInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authreq = request.clone({
      setHeaders:{
        ApiKey: 'pgH7QzFHJx4w46fI',
      },
    });
    return next.handle(authreq);
  }
}
