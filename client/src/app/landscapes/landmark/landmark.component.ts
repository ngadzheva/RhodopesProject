import { Component, OnInit, OnDestroy, DoCheck} from '@angular/core';
import { LandmarksService } from '../shared/services/landmarks.service';
import { Router } from '@angular/router';
import { ILandmark } from '../shared/interfaces/landmark.interface';
import { IComments } from '../shared/interfaces/comments.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landmark',
  templateUrl: './landmark.component.html',
  styleUrls: ['./landmark.component.css']
})
export class LandmarkComponent implements OnInit, OnDestroy, DoCheck {
  landscapeInfo: ILandmark;
  rhodopesPart: string;
  landscape: string;
  comments: IComments[];
  commentsOpened: boolean;
  favorite: boolean;
  visited: boolean;
  wantToVisit: boolean;
  like: boolean;
  comment: string;
  voteSubscription: Subscription;
  commentsSubscription: Subscription;
  postCommentSubscription: Subscription;
  landmarkSubscription: Subscription;
  addLandscapeSubscription: Subscription;
  removeLandscapeSubscription: Subscription;
  errorMessage: string;
  landscapeActionError: string;

  constructor(private landmarksService: LandmarksService, private router: Router) { 
    this.commentsOpened = false;
    this.favorite = false;
    this.visited = false;
    this.wantToVisit = false;
    this.like = false;
    this.errorMessage = '';
  }

  ngOnInit() {
    this.voteSubscription = this.landmarksService.voteReceived().subscribe(vote => {
      this.errorMessage = '';
      this.landscapeInfo.rating = vote.data
     }, error => {
       this.errorMessage = error.error.message;
     });

    this.postCommentSubscription = this.landmarksService.commentReceived().subscribe(comment => {
      this.errorMessage = '';
      this.comments.push(comment.data)
    }, error => {
      this.errorMessage = error.error.message;
    });

    this.rhodopesPart = this.router.url.includes('west') ? 'west' : 'east';
    this.landscape = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);

    this.landmarkSubscription = this.landmarksService.getLandmarkInfo(this.rhodopesPart, this.landscape)
      .subscribe(landscapeInfo => {
        this.errorMessage = '';
        this.landscapeInfo = landscapeInfo
      }, error => {
        this.errorMessage = error.error.message;
      });
  }

  ngDoCheck() {
    if(this.landscapeInfo) {
      if(this.landmarksService.userFavoriteLandmarks.includes(this.landscapeInfo.name)) {
        this.favorite = true;
      }

      if(this.landmarksService.userVisitedLandmarks.includes(this.landscapeInfo.name)) {
        this.visited = true;
      }

      if(this.landmarksService.userWantToVisitLandmarks.includes(this.landscapeInfo.name)) {
        this.wantToVisit = true;
      }
    }
  }

  ngOnDestroy() {
    if(this.voteSubscription) {
      this.voteSubscription.unsubscribe();
    }
    
    if(this.postCommentSubscription) {
      this.postCommentSubscription.unsubscribe();
    }
    
    this.landmarkSubscription.unsubscribe();

    if(this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
    
    if(this.addLandscapeSubscription) {
      this.addLandscapeSubscription.unsubscribe();
    }

    if(this.removeLandscapeSubscription) {
      this.removeLandscapeSubscription.unsubscribe();
    }
  }

  openComments() {
    this.commentsSubscription = this.landmarksService.getComments(this.rhodopesPart, this.landscape)
        .subscribe(comments => {
          this.errorMessage = '';
          this.comments = comments
        }, error => {
          this.errorMessage = error.error.message;
        });

    this.commentsOpened = true;
  }

  closeComments() {
    this.commentsOpened = false;
  }

  postComment() {
    this.landmarksService.postComment(this.comment);
    this.comment = '';
  }

  addLandscape(landscape:string, listType: string){
    this.addLandscapeSubscription = this.landmarksService.addLandscape(landscape, listType).subscribe(response => {
      if(response.success){
        this.landscapeActionError = '';

        if(listType === 'favorite'){
          this.favorite = true;
          this.landmarksService.userFavoriteLandmarks.push(landscape);
        } else if(listType === 'visited'){
          this.visited = true;
          this.landmarksService.userVisitedLandmarks.push(landscape);
        } else if(listType === 'wantToVisit'){
          this.wantToVisit = true;
          this.landmarksService.userWantToVisitLandmarks.push(landscape);
        }
      } 
    }, error => {
      this.landscapeActionError = error.error.message;
    });
  }

  removeLandscape(landscape:string, listType: string){
    this.removeLandscapeSubscription = this.landmarksService.removeUserLandmark(landscape, listType).subscribe(response => {
      if(response.success){
        this.landscapeActionError = '';

        if(listType === 'favorite'){
          this.favorite = false;
          this.landmarksService.userFavoriteLandmarks = response.data;
        } else if(listType === 'visited'){
          this.visited = false;
          this.landmarksService.userVisitedLandmarks = response.data;
        } else if(listType === 'wantToVisit'){
          this.wantToVisit = false;
          this.landmarksService.userWantToVisitLandmarks = response.data;
        }
      } 
    }, error => {
      this.landscapeActionError = error.error.message;
    });
  }

  vote(vote: string){
    this.landmarksService.vote(vote);

    this.like = vote === 'like' ? true : false;
  }

  viewGallery() {
    this.router.navigateByUrl(`gallery/${this.rhodopesPart}/${this.landscape}`);
  }
}
