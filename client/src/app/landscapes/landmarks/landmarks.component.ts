import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
  userFavoriteLandmarks: string[];
  userVisitedLandmarks: string[];
  userWantToVisitLandmarks: string[];
  rhodopesPart: string;
  searchText: string;
  landmarkSubscription: Subscription;
  addLandscapeSubscription: Subscription;
  removeLandscapeSubscription: Subscription;
  favoriteLandmarksSubscription: Subscription;
  visitedLandmarksSubscription: Subscription;
  wantToVisitLandmarksSubscription: Subscription;
  errorMessage: string;
  landscapeActionError: string;

  constructor(private landmarksService: LandmarksService, private router: Router, private cookieService: CookieService) { 
    this.errorMessage = '';
    this.landmarks = [];
  }

  ngOnInit() {
    if(this.cookieService.check('Log-Cookie')){
      this.landmarksService.getUserFavoriteLandmarks();
      this.landmarksService.getUserVisitedLandmarks();
      this.landmarksService.getUserWantToVisitLandmarks();
    }

    this.loadLandscapes();
  }

  ngDoCheck() {
    if(this.rhodopesPart != this.router.url.split('/')[2]){
      this.loadLandscapes();
    }

    if(this.landmarks.length > 0) {
      this.setUserLandmarks();
    }
  }

  ngOnDestroy() {
    this.landmarkSubscription.unsubscribe();

    if(this.addLandscapeSubscription) {
      this.addLandscapeSubscription.unsubscribe();
    }

    if(this.removeLandscapeSubscription) {
      this.removeLandscapeSubscription.unsubscribe();
    }
  }

  loadLandscapes() {
    this.rhodopesPart = this.router.url.split('/')[2];

    this.landmarkSubscription = this.landmarksService.getLandmarks(this.rhodopesPart)
        .subscribe(landmarks => {
          this.errorMessage = '';
          this.landmarks = landmarks
        }, error => {
          this.errorMessage = error.error.message;
        });
  }

  setUserLandmarks() {
    this.landmarks.forEach((landmark, index) => {
      if(this.landmarksService.userFavoriteLandmarks.includes(landmark.name)){
        landmark.isFavorite = true;
      }

      if(this.landmarksService.userVisitedLandmarks.includes(landmark.name)){
        landmark.isVisited = true;
      }

      if(this.landmarksService.userWantToVisitLandmarks.includes(landmark.name)){
        landmark.isWantToVisit = true;
      }
    });
  }

  addLandscape(landscape: string, listType: string){
    this.addLandscapeSubscription = this.landmarksService.addLandscape(landscape, listType).subscribe(response => {
      if(response.success){
        this.landscapeActionError = '';

        this.landmarks.forEach((landmark, index) => {
          if(landscape === landmark.name) {
            if(listType === 'favorite'){
              this.landmarksService.userFavoriteLandmarks.push(landscape);
              landmark.isFavorite = true;
            } else if(listType === 'visited'){
              this.landmarksService.userVisitedLandmarks.push(landscape);
              landmark.isVisited = true;
            } else if(listType === 'wantToVisit'){
              this.landmarksService.userWantToVisitLandmarks.push(landscape);
              landmark.isWantToVisit = true;
            }
          }
        });
      } 
    }, error => {
      this.landscapeActionError = error.error.message;
    });
  }

  removeLandscape(landscape: string, listType: string){
    this.removeLandscapeSubscription = this.landmarksService.removeUserLandmark(landscape, listType).subscribe(response => {
      if(response.success){
        this.landscapeActionError = '';

        this.landmarks.forEach((landmark, index) => {
          if(landscape === landmark.name) {
            if(listType === 'favorite'){
              this.landmarksService.userFavoriteLandmarks = response.data;
              landmark.isFavorite = false;
            } else if(listType === 'visited'){
              this.landmarksService.userVisitedLandmarks = response.data;
              landmark.isVisited = false;
            } else if(listType === 'wantToVisit'){
              this.landmarksService.userWantToVisitLandmarks = response.data;
              landmark.isWantToVisit = false;
            }
          }
        });
      } 
    }, error => {
      this.landscapeActionError = error.error.message;
    });
  }

  viewLandscape(landscape: string){
    this.router.navigateByUrl(`landscapes/${this.rhodopesPart}/${landscape}`);
  }
}
