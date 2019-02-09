import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IGallery } from '../interfaces/gallery.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

   getLandscapesAlbums(rhodopesPart: string){
    if(rhodopesPart === '') {
      return this.http.get<IGallery[]>(`${environment.server}/gallery`);
    } else {
      return this.http.get<IGallery[]>(`${environment.server}/gallery/${rhodopesPart}`);
    }
   }

   getLandscapeGallery(rhodopesPart: string, landscape: String){
    return this.http.get<{[key: string]: any}>(`${environment.server}/gallery/${rhodopesPart}/${landscape}`);
  }

  deleteImage(rhodopesPart: string, landscape: string, image: string) {
    return this.http.delete<{ [key: string]: any }>(`${environment.server}/gallery/${rhodopesPart}/${landscape}/${image}`);
  }

  removeAlbum(landscape: string, rhodopesPart: string) {
    return this.http.delete<{ [key: string]: any }>(`${environment.server}/gallery/${rhodopesPart}/${landscape}`);
  }
}
