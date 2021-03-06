import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  @ViewChild('f') public form: NgForm;
  isSubmitted: boolean;
  user: { [key: string]: string };
  notMatch: boolean;
  errorMessage: string;
  userInfoSubscription: Subscription;
  userEditInfoSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
    this.isSubmitted = false;
    this.user = {};
    this.errorMessage = '';
   }

  ngOnInit() {
    this.userInfoSubscription = this.userService.getUserInfo().subscribe(userInfo => {
      this.errorMessage = '';
      this.user = userInfo.data;
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();

    if(this.userEditInfoSubscription) {
      this.userEditInfoSubscription.unsubscribe();
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
    this.userEditInfoSubscription = this.userService.editProfile(this.user.userName, this.user.email, this.user.oldPassword, this.user.newPassword)
      .subscribe(response => {
        if(response.success){
          this.errorMessage = '';
          this.isSubmitted = true;
          this.router.navigateByUrl('/user/info');
        } 
      }, error => {
        this.errorMessage = error.error.message;
      });
  }
}
