import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from '../../shared/services/upload.service';
import { GalleryService } from '../../../gallery/shared/services/gallery.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit, OnDestroy {

  @ViewChild('f') public form: NgForm;
  isSubmitted: boolean;
  landscape: string;
  rhodopesPart: any;
  images: File;
  createSubscription: Subscription;

  constructor(private galleryService: GalleryService, private uploadService: UploadService, private router: Router) { 
    this.isSubmitted = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
  }

  onFileSelected(event) {
    this.images = <File>event.target.files[0];
  }

  createAlbum() {
    this.createSubscription = this.uploadService.uploadLandscapeImage(this.rhodopesPart, this.landscape, this.images).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(percentDone);
      } else if (event instanceof HttpResponse) {
        if(event.body.success) {
          this.isSubmitted = true;
          this.router.navigateByUrl('user/admin/editGallery');
        }
      }
    });
  }

}
