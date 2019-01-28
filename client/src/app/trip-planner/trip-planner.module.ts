import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TripPlannerRoutingModule } from './trip-planner-routing.module';

import { TripPlannerComponent } from './trip-planner/trip-planner.component';

import { TripPlannerService } from './shared/trip-planner.service';

@NgModule({
  declarations: [
    TripPlannerComponent
  ],
  imports: [
    CommonModule,
    TripPlannerRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    TripPlannerService
  ]
})
export class TripPlannerModule { }
