import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ILandmark } from '../interfaces/landmark.interface';
import { IComments } from '../interfaces/comments.interface';
import { environment } from '../../../../environments/environment';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LandmarksService implements OnDestroy {

  private socket;

  userFavoriteLandmarks: string[];
  userVisitedLandmarks: string[];
  userWantToVisitLandmarks: string[];

  private favoriteLandmarksSubscription: Subscription;
  private visitedLandmarksSubscription: Subscription;
  private wantToVisitLandmarksSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router) {
    this.userFavoriteLandmarks = [];
    this.userVisitedLandmarks = [];
    this.userWantToVisitLandmarks = [];
  }

  ngOnDestroy() {
    if(this.favoriteLandmarksSubscription) {
      this.favoriteLandmarksSubscription.unsubscribe();
    }

    if(this.visitedLandmarksSubscription) {
      this.visitedLandmarksSubscription.unsubscribe();
    }
    
    if(this.wantToVisitLandmarksSubscription) {
      this.wantToVisitLandmarksSubscription.unsubscribe();
    }

    this.userFavoriteLandmarks = [];
    this.userVisitedLandmarks = [];
    this.userWantToVisitLandmarks = [];
  }

  getLandmarks(rhodopesPart: string) {
    if(rhodopesPart === '') {
      return this.http.get<ILandmark[]>(`${environment.server}/landscapes`);
    } else {
      return this.http.get<ILandmark[]>(`${environment.server}/landscapes/${rhodopesPart}`);
    }
  }

  editLandmark(rhodopesPart: string, landscape: string, newData: { [key: string]: any }) {
    return this.http.put<{ [key: string]: any }>(`${environment.server}/landscapes/${rhodopesPart}/${landscape}`, newData);
  }

  getUserFavoriteLandmarks() {
    this.favoriteLandmarksSubscription = this.http.get<{ [key: string]: any }>(`${environment.server}/user/favorite`).subscribe(landmarks => {
      if(landmarks.success) {
        this.userFavoriteLandmarks = landmarks.data;
      }
    });
  }

  getUserVisitedLandmarks() {
    this.visitedLandmarksSubscription = this.http.get<{ [key: string]: any }>(`${environment.server}/user/visited`).subscribe(landmarks => {
      if(landmarks.success) {
        this.userVisitedLandmarks = landmarks.data;
      }
    });
  }

  getUserWantToVisitLandmarks() {
    this.wantToVisitLandmarksSubscription = this.http.get<{ [key: string]: any }>(`${environment.server}/user/wantToVisit`).subscribe(landmarks => {
      if(landmarks.success) {
        this.userWantToVisitLandmarks = landmarks.data;
      }
    });
  }

  removeUserLandmark(landscape: string, listType: string) {
    return this.http.delete<{ [key: string]: any }>(`${environment.server}/user/removeLandscape/${listType}/${landscape}`);
  }

  getLandmarkInfo(rhodopesPart: string, landscape: string){
    return this.http.get<ILandmark>(`${environment.server}/landscapes/${rhodopesPart}/${landscape}`);
  }

  addLandscape(landscape: string, listType: string){
    const body = {
      listType, 
      landscape
    }
    
    return this.http.post<{ [key: string]: any }>(`${environment.server}/user/addLandscape`, JSON.stringify(body));
  }

  createLandscape(landscapeInfo: { [key: string]: any }) {
    return this.http.post<{ [key: string]: any }>(`${environment.server}/landscapes/createLandscape`, landscapeInfo);
  }

  removeLandscape(rhodopesPart: string, landscape: string){    
    return this.http.delete<{ [key: string]: any }>(`${environment.server}/landscapes/${rhodopesPart}/${landscape}`);
  }

  getComments(rhodopesPart: string, landscape: string){
    return this.http.get<IComments[]>(`${environment.server}/landscapes/${rhodopesPart}/${landscape}/comments`);
  }

  postComment(content: string){
    const data = {
      content,
      datePublished: new Date().toDateString(),
    };

    this.socket.emit('comment', data);
  }

  commentReceived(){
    let observable = new Observable<{ success: boolean, data: { content: string, datePublished: Date, user: string } }>(observer => {
      this.socket = io(environment.socket);

      this.socket.on('landscape comment', (data) => {
          observer.next(data);
      });

      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  vote(vote: string) { 
    this.socket.emit('vote', { data: vote });
  }

  voteReceived(){
    let observable = new Observable<{ success: boolean, data: number }>(observer => {
      this.socket = io(environment.socket);

      this.socket.on('landscape vote', (data) => {
          observer.next(data);
      });

      return () => { this.socket.disconnect(); }
    });

    return observable;
  }
}
