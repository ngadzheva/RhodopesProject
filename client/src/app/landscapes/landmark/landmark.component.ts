import { Component, OnInit, OnDestroy} from '@angular/core';
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
export class LandmarkComponent implements OnInit, OnDestroy {
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
  errorMessage: string;

  constructor(private landmarksService: LandmarksService, private router: Router) { 
    this.commentsOpened = false;
    this.favorite = false;
    this.visited = false;
    this.wantToVisit = false;
    this.like = false;
    this.errorMessage = '';
  }

  ngOnInit() {
    this.voteSubscription = this.landmarksService.voteReceived().subscribe(vote => this.landscapeInfo.rating = vote.data );
    this.postCommentSubscription = this.landmarksService.commentReceived().subscribe(comment => this.comments.push(comment.data));

    this.rhodopesPart = this.router.url.includes('west') ? 'west' : 'east';
    this.landscape = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);

    this.landmarkSubscription = this.landmarksService.getLandmarkInfo(this.rhodopesPart, this.landscape)
      .subscribe(landscapeInfo => this.landscapeInfo = landscapeInfo);
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
  }

  openComments() {
    this.commentsSubscription = this.landmarksService.getComments(this.rhodopesPart, this.landscape)
        .subscribe(comments => this.comments = comments);

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

  vote(vote: string){
    this.landmarksService.vote(vote);

    this.like = vote === 'like' ? true : false;
  }

  viewGallery() {
    this.router.navigateByUrl(`gallery/${this.rhodopesPart}/${this.landscape}`);
  }
}
