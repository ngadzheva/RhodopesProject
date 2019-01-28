import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(private cookieService: CookieService) {}

  canActivate() {
    return this.cookieService.check('Log-Cookie');
  }
}