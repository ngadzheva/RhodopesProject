import { Component, OnInit, OnDestroy, DoCheck, ViewChild } from '@angular/core';
import { LandmarksService } from '../../../landscapes/shared/services/landmarks.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-landscape',
  templateUrl: './edit-landscape.component.html',
  styleUrls: ['./edit-landscape.component.css']
})
export class EditLandscapeComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild('f') public form: NgForm;
  isSubmitted: boolean;
  landscapeInfo: { [key: string]: any };
  landmarkSubscription: Subscription;
  editSubscription: Subscription;
  addSubscription: Subscription;
  rhodopesPart: string;
  landscape: string;
  addHotel: boolean;
  isEditLandscape: boolean;
  newHotel: { [key: string]: any };
  errorMessage: string;

  constructor(private landmarksService: LandmarksService, private router: Router) { 
    this.isSubmitted = false;
    this.addHotel = false;
    this.isEditLandscape = false;
    this.newHotel = {};
    this.errorMessage = '';
    this.landscapeInfo = {};
  }

  ngOnInit() {
    if(!this.router.url.includes('addLandscape')){
      this.isEditLandscape = true;
      
      this.rhodopesPart = this.router.url.includes('west') ? 'west' : 'east';
      this.landscape = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);

      this.landmarkSubscription = this.landmarksService.getLandmarkInfo(this.rhodopesPart, this.landscape)
        .subscribe(landscapeInfo => this.landscapeInfo = landscapeInfo);
    }
  }

  ngOnDestroy() {
    if(this.landmarkSubscription) {
      this.landmarkSubscription.unsubscribe();
    }

    if(this.editSubscription) {
      this.editSubscription.unsubscribe();
    }

    if(this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }

  ngDoCheck() {
    if(this.newHotel.name && this.newHotel.location && this.newHotel.distance && this.newHotel.price && this.newHotel.rooms && this.newHotel.webSite ||
      this.newHotel.name && this.newHotel.location && this.newHotel.distance && this.newHotel.price && this.newHotel.rooms) {
      this.landscapeInfo.hotels.push(this.newHotel);

      this.newHotel = {};
      this.addHotel = false;
    }
  }

  addNewHotel() {
    this.addHotel = true; 
  }

  editLandscape() {
    const newData = {
      description: this.landscapeInfo.description,
      entranceFee: this.landscapeInfo.entranceFee,
      hotels: this.landscapeInfo.hotels,
      image: this.landscapeInfo.image,
      latitude: this.landscapeInfo.latitude,
      location: this.landscapeInfo.location,
      longitude: this.landscapeInfo.longitude,
      name: this.landscapeInfo.name,
      rating: this.landscapeInfo.rating,
      rhodopesPart: this.landscapeInfo.rhodopesPart,
      shortInfo: this.landscapeInfo.shortInfo,
      transitionTime: this.landscapeInfo.transitionTime,
      workTime: this.landscapeInfo.workTime
    };

    this.editSubscription = this.landmarksService.editLandmark(this.rhodopesPart, this.landscape, newData).subscribe(response => {
      if(response.success) {
        this.isSubmitted = true;
        this.errorMessage = '';
        this.router.navigateByUrl('/user/admin/editLandscapes');
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  addLandscape() {
    this.addSubscription = this.landmarksService.createLandscape(this.landscapeInfo).subscribe(response => {
      if(response.success) {
        this.isSubmitted = true;
        this.errorMessage = '';
        this.router.navigateByUrl('/user/admin/editLandscapes');
      }
    }, error => {
      this.errorMessage = error.error.message;
    })
  }
}
