import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandmarksComponent } from './landmarks/landmarks.component';
import { LandmarkComponent } from './landmark/landmark.component';
import { RhodopesComponent } from './rhodopes/rhodopes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RhodopesComponent
  },
  {
    path: ':rhodopesPart',
    component: LandmarksComponent
  },
  {
    path: ':rhodopesPart/:landscape',
    component: LandmarkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandscapesRoutingModule { }
