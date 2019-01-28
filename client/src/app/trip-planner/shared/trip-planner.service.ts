import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripPlannerService {

  constructor(private http: HttpClient) { }

  planTrip(startPoint: string, name: string, plan: Array<Object>){
    const body = {
      startPoint,
      name,
      plan
    };

    return this.http.post<{ [key: string]: any }>(`${environment.server}/tripplan`, body);
  }
}
