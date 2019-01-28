import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILandmark } from '../interfaces/landmark.interface';
import { IComments } from '../interfaces/comments.interface';
import { environment } from '../../../../environments/environment';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LandmarksService {

  private socket;

  constructor(private http: HttpClient, private router: Router) { }

  getLandmarks(rhodopesPart: string) {
    return this.http.get<ILandmark[]>(`${environment.server}/landscapes/${rhodopesPart}`);
  }

  getLandmarkInfo(rhodopesPart: string, landscape: string){
    return this.http.get<ILandmark>(`${environment.server}/landscapes/${rhodopesPart}/${landscape}`);
  }

  addLandscape(rhodopesPart: string, landscape: string, listType: string){
    const body = {
      listType, 
      landscape, 
      rhodopesPart
    }
    
    return this.http.post<{ [key: string]: any }>(`${environment.server}/user/addLandscape`, JSON.stringify(body));
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
