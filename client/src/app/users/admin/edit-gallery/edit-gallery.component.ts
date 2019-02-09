import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleryService } from '../../../gallery/shared/services/gallery.service';
import { Router } from '@angular/router';
import { IGallery } from '../../../gallery/shared/interfaces/gallery.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit, OnDestroy {

  gallery: IGallery[];
  gallerySubscription: Subscription;
  deleteSubscription: Subscription;
  rhodopesPart: string;

  constructor(private galleryService: GalleryService, private router: Router) { 
    this.gallery = new Array();
  }

  ngOnInit() {
    this.loadGallery();
  }

  ngOnDestroy() {
    this.gallerySubscription.unsubscribe();

    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  loadGallery() {
    this.gallerySubscription = this.galleryService.getLandscapesAlbums('')
      .subscribe(gallery => this.gallery = gallery);
  }

  deleteAlbum(landscape: string, rhodopesPart: string) {
    this.deleteSubscription = this.galleryService.removeAlbum(landscape, rhodopesPart).subscribe(response => {
      if(response.success) {
        this.gallery = response.data;
      }
    });
  }

}
