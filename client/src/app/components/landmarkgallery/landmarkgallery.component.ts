import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-landmarkgallery',
  templateUrl: './landmarkgallery.component.html',
  styleUrls: ['./landmarkgallery.component.css']
})
export class LandmarkGalleryComponent implements OnInit {

  landscapeGallery: String[];
  rhodopesPart: string;
  landscape: String;

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {
    this.rhodopesPart = this.router.url.includes('west') ? 'west' : 'east';
    this.landscape = this.router.url.slice(this.router.url.lastIndexOf('/') + 1).normalize();

     this.galleryService.getLandscapeGallery(this.rhodopesPart, this.landscape)
      .subscribe(landscapeGallery => {
        this.landscape = landscapeGallery.landscape;
        this.landscapeGallery = landscapeGallery.images;
      });
  }

}
