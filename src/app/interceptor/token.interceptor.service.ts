import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQURPUiIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyOTAzMDMzNCwiZXhwIjoxNzI5MjkzMjgwfQ.Ypfd81-2ItSa_MZ8dWI4rb224p0_LxZ4ehvcSAr2Cs4";

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.accessToken){
      return next.handle(req);
    }

    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    return next.handle(modifiedRequest);
  }
}
