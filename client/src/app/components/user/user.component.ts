import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: { [key: string]: string };
  selectedFile: File;

  constructor(private userService: UserService, private uploadService: UploadService, private router: Router) { 
    this.user = {};
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(response => {
      if(response.success){
        this.user = response.data;
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.uploadService.uploadImage(this.selectedFile).subscribe(event => {
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
