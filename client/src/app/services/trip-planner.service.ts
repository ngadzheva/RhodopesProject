import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripPlannerService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders()
                  .set('Authorization', 'my-auth-token')
                  .set('Content-Type', 'application/json; charset=utf-8');
  }

  planTrip(startPoint: string, name: string, plan: Array<Object>){
    const body = {
      startPoint,
      name,
      plan
    };

    return this.http.post<{ [key: string]: any }>(`${environment.server}/tripplan`, body, { headers: this.headers, withCredentials: true });
  }
}
