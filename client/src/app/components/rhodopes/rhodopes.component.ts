import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-rhodopes',
  templateUrl: './rhodopes.component.html',
  styleUrls: ['./rhodopes.component.css']
})
export class RhodopesComponent implements OnInit {
  westImage: string;
  eastImage: string;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getWestRhodopesImage().then(imageURL => this.westImage = imageURL);

    this.imageService.getEastRhodopesImage().then(imageURL => this.eastImage = imageURL);
  }

}
