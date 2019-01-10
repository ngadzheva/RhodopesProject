import { Component, OnInit } from '@angular/core';
import { LandmarksService } from '../../services/landmarks.service';
import { Router } from '@angular/router';
import { Landmark } from '../../models/landmark.model';
import { Comments } from '../../models/comments.model';

@Component({
  selector: 'app-landmark',
  templateUrl: './landmark.component.html',
  styleUrls: ['./landmark.component.css']
})
export class LandmarkComponent implements OnInit {
  landscapeInfo: Landmark;
  rhodopesPart: string;
  landscape: string;
  comments: Comments[];
  commentsOpened: boolean;
  favorite: boolean;
  visited: boolean;
  wantToVisit: boolean;
  like: boolean;
  comment: string;

  constructor(private landmarksService: LandmarksService, private router: Router) { 
    this.commentsOpened = false;
    this.favorite = false;
    this.visited = false;
    this.wantToVisit = false;
    this.like = false;

    this.landmarksService.voteReceived().subscribe(vote => this.landscapeInfo.rating = vote.data );
    this.landmarksService.commentReceived().subscribe(comment => this.comments.push(comment.data));
  }

  ngOnInit() {
    this.rhodopesPart = this.router.url.includes('west') ? 'west' : 'east';
    this.landscape = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);

     this.landmarksService.getLandmarkInfo(this.rhodopesPart, this.landscape)
      .subscribe(landscapeInfo => this.landscapeInfo = landscapeInfo);
  }

  openComments() {
    this.landmarksService.getComments(this.rhodopesPart, this.landscape)
        .subscribe(comments => this.comments = comments);

    this.commentsOpened = true;
  }

  closeComments() {
    this.commentsOpened = false;
  }

  postComment() {
    this.landmarksService.postComment(this.comment);
  }

  addLandscape(landscape:string, listType: string){
    this.landmarksService.addLandscape(this.rhodopesPart, landscape, listType).subscribe(response => {
      if(response.success){
        if(listType === 'favorite'){
          this.favorite = true;
        } else if(listType === 'visited'){
          this.visited = true;
        } else if(listType === 'wantToVisit'){
          this.wantToVisit = true;
        }
      } else {
        this.router.navigateByUrl('/login');
      }
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
