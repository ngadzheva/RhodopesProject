import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLandscapesComponent } from './edit-landscapes/edit-landscapes.component';
import { EditLandscapeComponent } from './edit-landscape/edit-landscape.component';
import { EditGalleryComponent } from './edit-gallery/edit-gallery.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';

import { ConfirmDeactivateGuard } from '../../shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [
      'NeverActivateGuard'
    ]
  },
  {
    path: 'editLandscapes',
    component: EditLandscapesComponent
  }, 
  {
    path: 'editLandscapes/addLandscape',
    component: EditLandscapeComponent,
    canDeactivate: [
      ConfirmDeactivateGuard
    ]
  }, 
  {
    path: 'editLandscapes/:rhodopesPart/:landscape',
    component: EditLandscapeComponent,
    canDeactivate: [
      ConfirmDeactivateGuard
    ]
  }, 
  {
    path: 'editGallery',
    component: EditGalleryComponent
  }, 
  {
    path: 'editGallery/createAlbum',
    component: CreateAlbumComponent,
    canDeactivate: [
      ConfirmDeactivateGuard
    ]
  },
  {
    path: 'editGallery/:rhodopesPart/:landscape',
    component: EditAlbumComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
