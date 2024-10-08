import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQURPUiIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyODQxNTY5MywiZXhwIjoxNzI4Njc4NjM5fQ.dBrH_voUgTedJqHJQW_9YvPtYSFNEKxoTYgbQ2ckltY";

    if(!accessToken){
      return next.handle(req);
    }

    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return next.handle(modifiedRequest);
  }
}
