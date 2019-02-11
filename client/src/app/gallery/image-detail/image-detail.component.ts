import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../../shared/services/image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  image: string;
  rhodopesPart: string;
  landscape: string;
  imageURL: string;
  errorMessage: string;

  constructor(private imageService: ImageService, private router: Router) { }

  ngOnInit() {
    const url = this.router.url.split('/');
    this.rhodopesPart = url[2];
    this.landscape = decodeURIComponent(url[3]);
    const regex = /DSC.*\.JPG/;
    this.image = regex.exec(url[4]).toString();

    this.imageService.getImage(this.rhodopesPart, this.landscape, this.image).then(url => {
      this.errorMessage = '';
      this.imageURL = url
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}
