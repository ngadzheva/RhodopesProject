import { Component, OnInit, DoCheck } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  logCookie: Boolean;

  constructor(private cookieService: CookieService, private userService: UserService, private router: Router) {  }

  ngOnInit() {
    this.logCookie = this.cookieService.check('Log-Cookie');
  }

  ngDoCheck() {
    if(this.logCookie != this.cookieService.check('Log-Cookie')) {
      this.logCookie = this.cookieService.check('Log-Cookie');
    }
  }

  logOut() {
    this.cookieService.delete('Log-Cookie');

    this.userService.logOut().subscribe(response => {
      if(response.success) {
        this.cookieService.delete('Log-Cookie');
        this.router.navigateByUrl('/');
      }
    });
  }
}
