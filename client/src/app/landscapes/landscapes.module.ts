import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { LandscapesRoutingModule } from './landscapes-routing.module';

import { LandmarksComponent } from './landmarks/landmarks.component';
import { RhodopesComponent } from './rhodopes/rhodopes.component';
import { LandmarkComponent } from './landmark/landmark.component';

import { LandmarksService } from './shared/services/landmarks.service';
import { MapsService } from './shared/services/maps.service';

import { FilterPipe } from './shared/filters/filter.pipe';

import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    LandmarksComponent,
    RhodopesComponent,
    LandmarkComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    LandscapesRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  providers: [
    LandmarksService,
    MapsService
  ]
})
export class LandscapesModule { }
