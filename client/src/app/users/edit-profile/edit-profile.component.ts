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
  errorMessage: string;
  userInfoSubscription: Subscription;
  userEditInfoSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
    this.isSubmitted = false;
   }

  ngOnInit() {
    this.userInfoSubscription = this.userService.getUserInfo().subscribe(userInfo => this.user = userInfo.data);
  }

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();

    if(this.userEditInfoSubscription) {
      this.userEditInfoSubscription.unsubscribe();
    }
  }

  onSubmit(){
    this.userEditInfoSubscription = this.userService.editProfile(this.user.userName, this.user.email, this.user.oldPassword, this.user.newPassword)
      .subscribe(response => {
        if(response.success){
          this.isSubmitted = true;
          this.router.navigateByUrl('/user/info');
        } 
      }, error => {
        this.errorMessage = error.error.message;
      });
  }
}
