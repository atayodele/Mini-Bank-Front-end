import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable({
  providedIn: 'root'
})

export class JwtInterceptor implements HttpInterceptor {

  constructor(private acct: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentuser = this.acct.isLoggesIn;
    let token = localStorage.getItem('jwt');

    if (currentuser && token !== undefined) {
      request = request.clone({
        setHeaders:
        {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
