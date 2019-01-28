import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import 'firebase/storage';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { 
    firebase.initializeApp(environment.firebase);
  }

  getImage(rhodopesPart: string, landscape: string, image: string) {
    return firebase.storage().ref().child(`rhodopes/${rhodopesPart}/${landscape}/${image}`).getDownloadURL();
  }

  getHomeImage() {
    return firebase.storage().ref().child('rhodopes/DSC06377.JPG').getDownloadURL();
  }

  getWestRhodopesImage() {
    return firebase.storage().ref().child('rhodopes/west/DSC06462.JPG').getDownloadURL();
  }

  getEastRhodopesImage() {
    return firebase.storage().ref().child('rhodopes/east/DSC02439.JPG').getDownloadURL();
  }
}
