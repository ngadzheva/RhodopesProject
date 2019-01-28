import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { LandmarksService } from '../shared/services/landmarks.service';
import { Router } from '@angular/router';
import { ILandmark } from '../shared/interfaces/landmark.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.css']
})
export class LandmarksComponent implements OnInit, DoCheck, OnDestroy {
  landmarks: ILandmark[];
  rhodopesPart: string;
  favorite: boolean;
  visited: boolean;
  wantToVisit: boolean;
  searchText: string;
  landmarkSubscription: Subscription;
  addLandscapeSubscription: Subscription;
  errorMessage: string;

  constructor(private landmarksService: LandmarksService, private router: Router) { 
    this.favorite = false;
    this.visited = false;
    this.wantToVisit = false;
    this.errorMessage = '';
  }

  ngOnInit() {
    this.loadLandscapes();
  }

  ngDoCheck() {
    if(this.rhodopesPart != this.router.url.split('/')[2]){
      this.loadLandscapes();
    }
  }

  ngOnDestroy() {
    this.landmarkSubscription.unsubscribe();

    if(this.addLandscapeSubscription) {
      this.addLandscapeSubscription.unsubscribe();
    }
  }

  loadLandscapes() {
    this.rhodopesPart = this.router.url.split('/')[2];

    this.landmarkSubscription = this.landmarksService.getLandmarks(this.rhodopesPart)
        .subscribe(landmarks => this.landmarks = landmarks);
  }

  addLandscape(landscape: string, listType: string){
    this.addLandscapeSubscription = this.landmarksService.addLandscape(this.rhodopesPart, landscape, listType).subscribe(response => {
      if(response.success){
        this.errorMessage = '';

        if(listType === 'favorite'){
          this.favorite = true;
        } else if(listType === 'visited'){
          this.visited = true;
        } else if(listType === 'wantToVisit'){
          this.wantToVisit = true;
        }
      } else {
        this.router.navigateByUrl('/auth/login');
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  viewLandscape(landscape: string){
    this.router.navigateByUrl(`landscapes/${this.rhodopesPart}/${landscape}`);
  }
}
