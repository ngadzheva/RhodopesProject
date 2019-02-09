import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { UploadService } from '../shared/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  user: { [key: string]: string };
  selectedFile: File;
  userInfoSubscription: Subscription;
  uploadSubscription: Subscription;

  constructor(private userService: UserService, private uploadService: UploadService, private router: Router) { 
    this.user = {};
  }

  ngOnInit() {
    this.userInfoSubscription = this.userService.getUserInfo().subscribe(response => {
      if(response.success){
        this.user = response.data;
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();

    if(this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.uploadSubscription = this.uploadService.uploadUserImage(this.selectedFile).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(percentDone);
      } else if (event instanceof HttpResponse) {
        if(event.body.success) {
          this.user.image = event.body.data;
          this.selectedFile = null;
        }
      }
    });
  }
}
