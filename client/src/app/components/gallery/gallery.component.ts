import { Component, OnInit, DoCheck } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { Router } from '@angular/router';
import { Gallery } from '../../models/gallery.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, DoCheck {

  gallery: Gallery[];
  rhodopesPart: string;

  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {
    this.loadGallery();
  }

  ngDoCheck() {
    if(this.rhodopesPart != this.router.url.split('/')[2]) {
      this.loadGallery();
    }
  }

  loadGallery() {
    this.rhodopesPart = this.router.url.split('/')[2];

     this.galleryService.getLandscapesAlbums(this.rhodopesPart)
      .subscribe(gallery => this.gallery = gallery);
  }
}
