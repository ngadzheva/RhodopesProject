import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../auth/shared/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck, OnDestroy {

  logCookie: Boolean;
  logoutSubscription: Subscription;

  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) {  }

  ngOnInit() {
    this.logCookie = this.cookieService.check('Log-Cookie');
  }

  ngDoCheck() {
    if(this.logCookie != this.cookieService.check('Log-Cookie')) {
      this.logCookie = this.cookieService.check('Log-Cookie');
    }
  }

  ngOnDestroy() {
    if(this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    } 
  }

  logOut() {
    this.logoutSubscription = this.authService.logOut().subscribe(response => {
      if(response.success) {
        this.cookieService.delete('Log-Cookie');
        this.cookieService.delete('Role-Cookie');
        this.router.navigateByUrl('/');
      }
    });
  }
}
