import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../../shared/services/upload.service';
import { GalleryService } from '../../../gallery/shared/services/gallery.service';
import { Subscription } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {

  landscapeGallery: String[];
  rhodopesPart: string;
  landscape: string;
  selectedFile: File;
  gallerySubscription: Subscription;
  deleteImageSubscription: Subscription;
  uploadSubscription: Subscription;

  constructor(private galleryService: GalleryService, private uploadService: UploadService, private router: Router) { }

  ngOnInit() {
    this.rhodopesPart = this.router.url.includes('west') ? 'west' : 'east';
    this.landscape = this.router.url.slice(this.router.url.lastIndexOf('/') + 1).normalize();

    this.gallerySubscription = this.galleryService.getLandscapeGallery(this.rhodopesPart, this.landscape)
      .subscribe(landscapeGallery => {
        this.landscape = landscapeGallery.landscape;
        this.landscapeGallery = landscapeGallery.images;
      });
  }

  ngOnDestroy() {
    this.gallerySubscription.unsubscribe();

    if(this.deleteImageSubscription) {
      this.deleteImageSubscription.unsubscribe();
    }
  }

  deleteImage(image: string) {
    this.deleteImageSubscription = this.galleryService.deleteImage(this.rhodopesPart, this.landscape, image.split('=')[2]).subscribe(response => {
      if(response.success) {
        this.landscapeGallery = response.data.images;
      }
    }, error => {
      this.router.navigateByUrl('/login');
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.uploadSubscription = this.uploadService.uploadLandscapeImage(this.rhodopesPart, this.landscape, this.selectedFile).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(percentDone);
      } else if (event instanceof HttpResponse) {
        if(event.body.success) {
          this.landscapeGallery = event.body.data;
          this.selectedFile = null;
        }
      }
    });
  }
}
