import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user: { [key: string]: string } = {};
  errorMessage: string;

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.login(this.user.userName, this.user.password).subscribe(response => {
      if(response.success){
        this.cookieService.set('Log-Cookie', 'loggedin');
        this.router.navigateByUrl('/');
      } else {
        this.errorMessage = response.message;
      }
    });
      
  }
}
