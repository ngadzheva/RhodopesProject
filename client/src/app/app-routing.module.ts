import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandmarksComponent } from './components/landmarks/landmarks.component';
import { LandmarkComponent } from './components/landmark/landmark.component';
import { RhodopesComponent } from './components/rhodopes/rhodopes.component';
import { UserComponent } from './components/user/user.component';
import { UserLandscapesListComponent } from './components/user-landscapes-list/user-landscapes-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { LandmarkGalleryComponent } from './components/landmarkgallery/landmarkgallery.component';
import { TripPlannerComponent } from './components/trip-planner/trip-planner.component';
import { UserTripsComponent } from './components/user-trips/user-trips.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'landscapes',
    component: RhodopesComponent
  },
  {
    path: 'landscapes/:rhodopesPart',
    component: LandmarksComponent
  },
  {
    path: 'landscapes/:rhodopesPart/:landscape',
    component: LandmarkComponent
  },
  {
    path: 'gallery/:rhodopesPart',
    component: GalleryComponent
  },
  {
    path: 'gallery/:rhodopesPart/:landscape',
    component: LandmarkGalleryComponent
  },
  {
    path: 'gallery/:rhodopesPart/:landscape/:image',
    component: ImageDetailComponent
  },
  {
    path: 'tripplan',
    component: TripPlannerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'user/info',
    component: UserComponent
  }, 
  {
    path: 'user/edit',
    component: EditProfileComponent
  },
  {
    path: 'user/plannedTrips',
    component: UserTripsComponent
  }
  , 
  {
    path: 'user/:listType',
    component: UserLandscapesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
