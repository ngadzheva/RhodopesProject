import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(userName: string, password: string, email: string) {
    const body = {
      userName,
      password,
      email
    };

    return this.http.post<{ [key: string]: string }>(`${environment.server}/register`, body);
  }

  login(userName: string, password: string) {
    const body = {
      userName,
      password
    };

    return this.http.post<{ [key: string]: string }>(`${environment.server}/login`, body);

  }

  logOut() {
    const body = {
      logOut: 'logOut'
    };

    return this.http.post<{ [key: string]: string }>(`${environment.server}/logout`, body);
  }
}
