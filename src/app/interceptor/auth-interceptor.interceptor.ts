import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  tenantID = 'fe_0222a';
  bearerToken = environment.tokenAdmin;

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newReq = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${this.bearerToken}`)
        .set('X-TENANT-ID', this.tenantID),
    });
    return next.handle(newReq);
  }
}
