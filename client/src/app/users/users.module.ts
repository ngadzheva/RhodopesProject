import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';

import { UserComponent } from './user/user.component';
import { UserLandscapesListComponent } from './user-landscapes-list/user-landscapes-list.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

import { UserService } from './shared/services/user.service';
import { UploadService } from './shared/services/upload.service';
import { AdminSidebarComponent } from './shared/components/admin-sidebar/admin-sidebar.component';

import { CanActivateAdminGuard } from './shared/guards/can-activate-admin-guard.service';

@NgModule({
  declarations: [
    UserComponent,
    UserLandscapesListComponent,
    UserTripsComponent,
    EditProfileComponent,
    SidebarComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    UploadService,
    CanActivateAdminGuard
  ],
  exports: [
    AdminSidebarComponent
  ]
})
export class UsersModule { }
