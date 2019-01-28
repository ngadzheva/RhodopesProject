import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: { [key: string]: string} = {};
  notMatch: boolean;
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { 
    this.notMatch = false;
  }

  ngOnInit() {
  }

  mustMatch(){
    if(this.user.password === this.user.confirmPassword){
      this.notMatch = false;
    } else {
      this.notMatch = true;
    }
  }

  onSubmit(){
    this.userService.signup(this.user.userName, this.user.password, this.user.email).subscribe(response => {
      if(response.success){
        this.router.navigateByUrl('login');
      } else {
        this.errorMessage = response.message;
      }
    });
  }

}
