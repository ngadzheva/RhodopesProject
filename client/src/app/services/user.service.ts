import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders()
                  .set('Authorization', 'my-auth-token')
                  .set('Content-Type', 'application/json; charset=utf-8');
  }

  signup(userName: string, password: string, email: string) {
    const body = {
      userName,
      password,
      email
    };

    return this.http.put<{ [key: string]: string }>(`${environment.server}/register`, body, { headers: this.headers, withCredentials: true });
  }

  login(userName: string, password: string) {
    const body = {
      userName,
      password
    };

    return this.http.post<{ [key: string]: string }>(`${environment.server}/login`, body, { headers: this.headers, withCredentials: true });

  }

  logOut() {
    const body = {
      logOut: 'logOut'
    };

    return this.http.post<{ [key: string]: string }>(`${environment.server}/logout`, body, { headers: this.headers, withCredentials: true });
  }
  
  getUserInfo(){
    return this.http.get<{ [key: string]: any }>(`${environment.server}/user/info`);
  }

  editProfile(userName: string, email: string, password: string, newPassword: string){
    const body = {
      userName, 
      email,
      password,
      newPassword
    };

    return this.http.post<{ [key: string]: string }>(`${environment.server}/user/edit`, body, { headers: this.headers, withCredentials: true });
  }

  getLandscapes(listType: string) {
    return this.http.get<{ [key: string]: any }>(`${environment.server}/user/${listType}`);
  }

  removeLandscape(listType: string, landscape: string){
    const body = {
      listType, 
      landscape
    }
    
    return this.http.put<{ [key: string]: any }>(`${environment.server}/user/removeLandscape`, JSON.stringify(body), {headers: this.headers});
  }

  getTrips(){
    return this.http.get<{ [key: string]: any }>(`${environment.server}/user/tripplans`);
  }
}
