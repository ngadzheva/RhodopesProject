import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersModule } from '../users.module';

import { EditLandscapesComponent } from './edit-landscapes/edit-landscapes.component';
import { EditGalleryComponent } from './edit-gallery/edit-gallery.component';
import { EditLandscapeComponent } from './edit-landscape/edit-landscape.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';

@NgModule({
  declarations: [
    EditLandscapesComponent, 
    EditGalleryComponent, 
    EditLandscapeComponent, 
    EditAlbumComponent, 
    CreateAlbumComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    UsersModule
  ]
})
export class AdminModule { }
