import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
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

    return this.http.put<{ [key: string]: string }>(`${environment.server}/user/edit`, body);
  }

  getLandscapes(listType: string) {
    return this.http.get<{ [key: string]: any }>(`${environment.server}/user/${listType}`);
  }

  removeLandscape(listType: string, landscape: string){  
    return this.http.delete<{ [key: string]: any }>(`${environment.server}/user/removeLandscape/${listType}/${landscape}`);
  }

  getTrips(){
    return this.http.get<{ [key: string]: any }>(`${environment.server}/user/tripplans`);
  }
}
