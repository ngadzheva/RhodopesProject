import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripPlannerComponent } from './trip-planner/trip-planner.component';

import { ConfirmDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TripPlannerComponent,
    canDeactivate: [
      ConfirmDeactivateGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripPlannerRoutingModule { }
