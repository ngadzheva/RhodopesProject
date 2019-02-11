import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get<{ [key: string]: string }>('https://ipapi.co/json/');
  }
}
