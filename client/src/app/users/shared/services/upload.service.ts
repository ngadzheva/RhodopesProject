import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadImage(image: File) {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);

    const req = new HttpRequest('POST', `${environment.server}/user/uploadImage`, formData, {
      reportProgress: true,
      withCredentials: true
    });
 
    return this.http.request<{ [key: string]: any }>(req);
  }
}
