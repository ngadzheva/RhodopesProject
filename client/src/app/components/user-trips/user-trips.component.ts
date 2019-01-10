import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {

  trips: Trip[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getTrips().subscribe(response => {
      if(response.success){
        this.trips = response.data;
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

}
