import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: { [key: string]: string };
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(userInfo => this.user = userInfo);
  }

  onSubmit(){
    this.userService.editProfile(this.user.userName, this.user.email, this.user.oldPassword, this.user.newPassword)
      .subscribe(response => {
        if(response.success){
          this.router.navigateByUrl('/user/info');
        } else {
          this.errorMessage = response.message;
        }
      });
  }
}
