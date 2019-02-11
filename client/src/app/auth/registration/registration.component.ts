import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  @ViewChild('f') public form: NgForm;
  isSubmitted: boolean;
  user: { [key: string]: string} = {};
  notMatch: boolean;
  errorMessage: string;
  signupSubsrciption: Subscription;

  constructor(private authService: AuthService, private router: Router) { 
    this.notMatch = false;
    this.isSubmitted = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.signupSubsrciption){
      this.signupSubsrciption.unsubscribe();
    }
  }

  mustMatch(){
    if(this.user.password === this.user.confirmPassword){
      this.notMatch = false;
    } else {
      this.notMatch = true;
    }
  }

  onSubmit(){
    this.signupSubsrciption = this.authService.signup(this.user.userName, this.user.password, this.user.email).subscribe(response => {
      if(response.success){
        this.errorMessage = '';
        this.isSubmitted = true;
        this.router.navigateByUrl('/auth/login');
      } 
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

}
