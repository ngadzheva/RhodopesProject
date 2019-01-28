import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders()
                  .set('Authorization', 'my-auth-token')
                  .set('Content-Type', 'application/json; charset=utf-8');
  }

  uploadImage(image: File) {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);

    const req = new HttpRequest('POST', `${environment.server}/user/uploadImage`, formData, {
      reportProgress: true
    });
 
    return this.http.request<{ [key: string]: any }>(req);
  }
}
