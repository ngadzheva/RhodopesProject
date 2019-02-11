import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITrip } from '../shared/interfaces/trip.interface';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit, OnDestroy {

  trips: ITrip[];
  errorMessage: string;
  tripsSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.tripsSubscription = this.userService.getTrips().subscribe(response => {
      if(response.success){
        this.errorMessage = '';
        this.trips = response.data;
      } 
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  ngOnDestroy() {
    this.tripsSubscription.unsubscribe();
    this.trips = null;
  }
}
