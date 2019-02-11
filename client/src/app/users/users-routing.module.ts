import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { UserLandscapesListComponent } from './user-landscapes-list/user-landscapes-list.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { ConfirmDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';
import { CanActivateAdminGuard } from './shared/guards/can-activate-admin-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info'
  },
  {
    path: 'info',
    component: UserComponent
  },
  {
    path: 'edit',
    component: EditProfileComponent,
    canDeactivate: [
      ConfirmDeactivateGuard
    ]
  },
  {
    path: 'plannedTrips',
    component: UserTripsComponent
  }, 
  {
    path: ':listType',
    component: UserLandscapesListComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [
      CanActivateAdminGuard
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
