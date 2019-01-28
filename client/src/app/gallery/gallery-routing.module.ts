import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { LandmarkGalleryComponent } from './landmarkgallery/landmarkgallery.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [
      'NeverActivateGuard'
    ]
  },
  {
    path: ':rhodopesPart',
    component: GalleryComponent
  },
  {
    path: ':rhodopesPart/:landscape',
    component: LandmarkGalleryComponent
  },
  {
    path: ':rhodopesPart/:landscape/:image',
    component: ImageDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
