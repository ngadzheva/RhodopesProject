import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Landmark } from '../models/landmark.model';
import { Comments } from '../models/comments.model';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LandmarksService {

  headers: HttpHeaders;
  private socket = io(environment.socket);

  constructor(private http: HttpClient, private router: Router) { 
    this.headers = new HttpHeaders()
                  .set('Authorization', 'my-auth-token')
                  .set('Content-Type', 'application/json; charset=utf-8');
  }

  getLandmarks(rhodopesPart: string) {
    return this.http.get<Landmark[]>(`${environment.server}/landscapes/${rhodopesPart}`);
  }

  getLandmarkInfo(rhodopesPart: string, landscape: string){
    return this.http.get<Landmark>(`${environment.server}/landscapes/${rhodopesPart}/${landscape}`);
  }

  addLandscape(rhodopesPart: string, landscape: string, listType: string){
    const body = {
      listType, 
      landscape, 
      rhodopesPart
    }
    
    return this.http.put<{ [key: string]: any }>(`${environment.server}/user/addLandscape`, JSON.stringify(body), {headers: this.headers, withCredentials: true});
  }

  getComments(rhodopesPart: string, landscape: string){
    return this.http.get<Comments[]>(`${environment.server}/landscapes/${rhodopesPart}/${landscape}/comments`);
  }

  postComment(content: string){
    const data = {
      content,
      datePublished: new Date().toDateString(),
    };

    this.socket.emit('comment', data);
  }

  commentReceived(){
    let observable = new Observable<{ success: boolean, data: { content: string, datePublished: Date, user: string } }>(observer=>{
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
    let observable = new Observable<{ success: boolean, data: number }>(observer=>{
        this.socket.on('landscape vote', (data) => {
            observer.next(data);
        });

        return () => { this.socket.disconnect(); }
    });

    return observable;
  }
}
