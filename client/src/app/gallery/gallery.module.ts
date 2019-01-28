import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';

import { GalleryComponent } from './gallery/gallery.component';
import { LandmarkGalleryComponent } from './landmarkgallery/landmarkgallery.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';

import { GalleryService } from './shared/services/gallery.service';

@NgModule({
  declarations: [
    GalleryComponent,
    LandmarkGalleryComponent,
    ImageDetailComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule
  ],
  providers: [
    GalleryService
  ]
})
export class GalleryModule { }
