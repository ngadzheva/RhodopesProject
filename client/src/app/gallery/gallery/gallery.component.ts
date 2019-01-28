import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { GalleryService } from '../shared/services/gallery.service';
import { Router } from '@angular/router';
import { IGallery } from '../shared/interfaces/gallery.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, DoCheck, OnDestroy {

  gallery: IGallery[];
  rhodopesPart: string;
  gallerySubscription: Subscription;

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {
    this.loadGallery();
  }

  ngDoCheck() {
    if(this.rhodopesPart != this.router.url.split('/')[2]) {
      this.loadGallery();
    }
  }

  ngOnDestroy() {
    this.gallerySubscription.unsubscribe();
  }

  loadGallery() {
    this.rhodopesPart = this.router.url.split('/')[2];

    this.gallerySubscription = this.galleryService.getLandscapesAlbums(this.rhodopesPart)
      .subscribe(gallery => this.gallery = gallery);
  }
}
