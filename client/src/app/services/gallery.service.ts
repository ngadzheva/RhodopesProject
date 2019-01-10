import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Gallery } from '../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

   getLandscapesAlbums(rhodopesPart: string){
    return this.http.get<Gallery[]>(`${environment.server}/gallery/${rhodopesPart}`);
   }

   getLandscapeGallery(rhodopesPart: string, landscape: String){
    return this.http.get<{[key: string]: any}>(`${environment.server}/gallery/${rhodopesPart}/${landscape}`);
  }
}
