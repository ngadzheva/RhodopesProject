import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Landmark } from '../../models/landmark.model';
import { TripPlannerService } from '../../services/trip-planner.service';
import { LandmarksService } from '../../services/landmarks.service'; 
import { MapsService }from '../../services/maps.service';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})
export class TripPlannerComponent implements OnInit {

  landmarks: Landmark[];
  tripName: string;
  hotels: Array<String>;
  startPoint: string;
  date: NgbDateStruct;
  selectedLandscapes: Array<String>;
  selectedHotel: string;
  plan: Array<Object>;

  constructor(private mapsService: MapsService, private tripPlannerService: TripPlannerService, private landmarksService: LandmarksService, private calendar: NgbCalendar, private router: Router) {
    this.selectedLandscapes = new Array();
    this.hotels = new Array();
    this.plan = new Array();
   }

  ngOnInit() {
    this.mapsService.getLocation().subscribe(location => this.startPoint = location.city);
  }

  loadLandscapes(rhodopesPart: string){
    this.landmarksService.getLandmarks(rhodopesPart).subscribe(landmarks => this.landmarks = landmarks);
  }

  loadLandscape(landscape: string){
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
  }

  addHotel(hotel: string){
    this.selectedHotel = hotel;
  }

  addNewDay(){
    this.landmarks = null;
    this.hotels = new Array();

    const plan = {
      date: new Date(this.date.year, this.date.month, this.date.day),
      hotel: this.selectedHotel,
      landscapes: this.selectedLandscapes
    };

    this.plan.push(plan);

    this.selectedHotel = '';
    this.selectedLandscapes = new Array();
  }

  makePlan(){
    this.addNewDay();

    this.tripPlannerService.planTrip(this.startPoint, this.tripName, this.plan).subscribe(response => {
      if(response.success){
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
  
}
