import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  private uploadImage(path: string, image: File) {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);

    const req = new HttpRequest('POST', path, formData, {
      reportProgress: true,
      withCredentials: true
    });
 
    return this.http.request<{ [key: string]: any }>(req);
  }

  uploadLandscapeImage(rhodopesPart: string, landscape: string, image: File) {
    const path = `${environment.server}/gallery/uploadImage/${rhodopesPart}/${landscape}`;
    return this.uploadImage(path, image);
  }

  uploadLandscapeInfoImage(rhodopesPart: string, landscape: string, image: File) {
    const path = `${environment.server}/landscapes/uploadImage/${rhodopesPart}/${landscape}`;
    return this.uploadImage(path, image);
  }

  uploadUserImage(image: File) {
    const path = `${environment.server}/user/uploadImage`;
    return this.uploadImage(path, image);
  }
}
