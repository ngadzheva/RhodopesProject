import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from '../../shared/services/upload.service';
import { LandmarksService } from '../../../landscapes/shared/services/landmarks.service';
import { Router } from '@angular/router';
import { ILandmark } from '../../../landscapes/shared/interfaces/landmark.interface';
import { Subscription } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-landscapes',
  templateUrl: './edit-landscapes.component.html',
  styleUrls: ['./edit-landscapes.component.css']
})
export class EditLandscapesComponent implements OnInit, OnDestroy {

  landmarks: ILandmark[];
  selectedFile: File;
  selectedLandscape: string;
  errorMessage: string;
  landmarkSubscription: Subscription;
  removeSubscription: Subscription;
  uploadSubscription: Subscription;

  constructor(private landmarksService: LandmarksService, private uploadService: UploadService, private router: Router) { }

  ngOnInit() {
    this.loadLandscapes();
  }

  ngOnDestroy() {
    this.landmarkSubscription.unsubscribe();

    if(this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }

  onFileSelected(event, landscape: string) {
    this.selectedFile = <File>event.target.files[0];
    this.selectedLandscape = landscape;
  }

  onUpload(landscape: string, rhodopesPart: string) {
    this.uploadSubscription = this.uploadService.uploadLandscapeInfoImage(rhodopesPart, landscape, this.selectedFile).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(percentDone);
      } else if (event instanceof HttpResponse) {
        if(event.body.success) {
          this.errorMessage = '';
          this.landmarks = event.body.data;
          this.selectedFile = null;
        }
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  loadLandscapes() {
    this.landmarkSubscription = this.landmarksService.getLandmarks('')
        .subscribe(landmarks => {
          this.errorMessage = '';
          this.landmarks = landmarks
        }, error => {
          this.errorMessage = error.error.message;
        });
  }

  editLandscape(landscape: string, rhodopesPart: string){
    this.router.navigateByUrl(`/user/admin/editLandscapes/${rhodopesPart}/${landscape}`);
  }

  deleteLandscape(landscape: string, rhodopesPart: string){
    this.removeSubscription = this.landmarksService.removeLandscape(rhodopesPart, landscape).subscribe(response => {
      if(response.success){
        this.errorMessage = '';
        
        this.landmarks.forEach((landmark, index) => {
          if(landmark.name === landscape){
            landmark.active = false;
          }
        });
      } 
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}
