import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('f') public form: NgForm;
  isSubmitted: boolean;
  user: { [key: string]: string } = {};
  errorMessage: string;
  loginSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.isSubmitted = false;
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit(){
    this.loginSubscription = this.authService.login(this.user.userName, this.user.password).subscribe(response => {
      if(response.success){
        this.isSubmitted = true;
        this.cookieService.set('Log-Cookie', 'loggedin');
        this.router.navigateByUrl('/');
      } 
    }, error => {
      this.errorMessage = error.error.message;
    });      
  }
}
