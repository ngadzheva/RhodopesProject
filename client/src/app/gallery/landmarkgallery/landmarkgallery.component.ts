import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../shared/services/gallery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landmarkgallery',
  templateUrl: './landmarkgallery.component.html',
  styleUrls: ['./landmarkgallery.component.css']
})
export class LandmarkGalleryComponent implements OnInit, OnDestroy {

  landscapeGallery: String[];
  rhodopesPart: string;
  landscape: String;
  gallerySubscription: Subscription;

  constructor(private galleryService: GalleryService, private router: Router) { }

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
  }
}
