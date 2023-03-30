import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserHttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private toastrservice: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authreq = request.clone({
      setHeaders: {
        ApiKey: 'pgH7QzFHJx4w46fI',
      },
    });
    return next.handle(authreq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        this.toastrservice.error("Something went wrong; Please try again.");
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
