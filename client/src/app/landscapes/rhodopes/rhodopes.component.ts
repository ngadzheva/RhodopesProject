import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/services/image.service';

@Component({
  selector: 'app-rhodopes',
  templateUrl: './rhodopes.component.html',
  styleUrls: ['./rhodopes.component.css']
})
export class RhodopesComponent implements OnInit {
  westImage: string;
  eastImage: string;
  errorMessage:string;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getWestRhodopesImage()
        .then(imageURL => {
          this.errorMessage = '';
          this.westImage = imageURL
        })
        .catch(error => {
          this.errorMessage = error;
        });

    this.imageService.getEastRhodopesImage()
        .then(imageURL => {
          this.errorMessage = '';
          this.eastImage = imageURL
        })
        .catch(error => {
          this.errorMessage = error;
        });
  }

}
