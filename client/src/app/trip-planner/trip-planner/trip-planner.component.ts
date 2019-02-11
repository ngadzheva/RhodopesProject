import { Component, OnInit, OnDestroy, DoCheck, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ILandmark } from '../../landscapes/shared/interfaces/landmark.interface';
import { TripPlannerService } from '../shared/trip-planner.service';
import { LandmarksService } from '../../landscapes/shared/services/landmarks.service'; 
import { MapsService }from '../../landscapes/shared/services/maps.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})
export class TripPlannerComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild('f') public form: NgForm;
  isSubmitted: boolean;
  landmarks: ILandmark[];
  tripName: string;
  hotels: Array<String>;
  startPoint: string;
  date: NgbDateStruct;
  selectedLandscapes: Array<String>;
  selectedHotel: string;
  plan: Array<Object>;
  mapSubscription: Subscription;
  landmarksSubscription: Subscription;
  tripSubscription: Subscription;
  planError: string;
  errorMessage: string;

  constructor(private mapsService: MapsService, private tripPlannerService: TripPlannerService, private landmarksService: LandmarksService, private calendar: NgbCalendar, private router: Router) {
    this.selectedLandscapes = new Array();
    this.hotels = new Array();
    this.plan = new Array();
    this.isSubmitted = false;
   }

  ngOnInit() {
    this.mapSubscription = this.mapsService.getLocation().subscribe(location => {
      this.errorMessage = '';
      this.startPoint = location.city
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  ngDoCheck() {
    if(this.date) {
      let now = new Date();
      let selectedDate = new Date(this.date.year, this.date.month - 1, this.date.day);

      if(selectedDate < now) {
        this.planError = 'Моля изберете коректна дата.';
      } else {
        this.planError = '';
      }
    }
  }

  ngOnDestroy() {
    this.mapSubscription.unsubscribe();

    if(this.landmarksSubscription) {
      this.landmarksSubscription.unsubscribe();
    }
    
    if(this.tripSubscription){
      this.tripSubscription.unsubscribe();
    }
  }

  loadLandscapes(rhodopesPart: string){
    this.landmarksSubscription = this.landmarksService.getLandmarks(rhodopesPart).subscribe(landmarks => {
      this.errorMessage = '';
      this.landmarks = landmarks
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  loadLandscape(landscape: string){
    if(!this.selectedLandscapes.includes(landscape)) {
      this.selectedLandscapes.push(landscape);

      this.landmarks.forEach(landmark => {
        if(landmark.name === landscape) {
          if(landmark.hotels){
            landmark.hotels.forEach(hotel => {
              this.hotels.push(hotel.name);
            });
          }
        }
      });
    } else {
      let landscapeIndex = this.selectedLandscapes.indexOf(landscape);
      this.selectedLandscapes.splice(landscapeIndex, 1);

      this.landmarks.forEach(landmark => {
        if(landmark.name === landscape) {
          if(landmark.hotels){
            landmark.hotels.forEach(hotel => {
              let hotelIndex = this.hotels.indexOf(hotel.name);
              this.hotels.splice(hotelIndex, 1);
            });
          }
        }
      });
    }
  }

  addHotel(hotel: string){
    this.selectedHotel = hotel;
  }

  addNewDay(){
    if(this.selectedLandscapes.length === 0 || !this.date) {
      this.planError = 'Моля попълнете всички задължителни полета.';
      return;
    }

    this.landmarks = null;
    this.hotels = new Array();

    if(this.planError) {
      this.planError = '';
    }

    const plan = {
      date: new Date(this.date.year, this.date.month - 1, this.date.day),
      hotel: this.selectedHotel,
      landscapes: this.selectedLandscapes
    };

    this.plan.push(plan);
    this.selectedHotel = '';
    this.selectedLandscapes = new Array();
  }

  makePlan(){    
    this.tripSubscription = this.tripPlannerService.planTrip(this.startPoint, this.tripName, this.plan).subscribe(response => {
      if(response.success){
        this.errorMessage = '';
        this.isSubmitted = true;
        this.router.navigateByUrl('/user/plannedTrips');
      } 
    }, error => {
      this.errorMessage = error.error.message;
      this.router.navigateByUrl('/auth/login');
    });
  }
  
}
