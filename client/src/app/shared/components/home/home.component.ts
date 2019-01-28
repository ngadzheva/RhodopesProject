import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeImage: any;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getHomeImage().then(imageURL => this.homeImage = imageURL);
  }
}
