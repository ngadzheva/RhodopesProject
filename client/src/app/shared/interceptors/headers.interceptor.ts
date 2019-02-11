import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  token: string;

  constructor(private cookieService: CookieService) {
    this.token = '';
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.cookieService.check('Log-Cookie') ? this.cookieService.get('Log-Cookie') : '';

    request = request.clone({
      setHeaders: {
        'Access-Token': this.token
      }
    });
    
    return next.handle(request);
  }
}