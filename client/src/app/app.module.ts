import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AgmCoreModule } from '@agm/core';
import { ServiceWorkerModule } from '@angular/service-worker';
 
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';

import { GalleryService } from './services/gallery.service';
import { ImageService } from './services/image.service';
import { LandmarksService } from './services/landmarks.service';
import { UserService } from './services/user.service';
import { TripPlannerService } from './services/trip-planner.service';
import { UploadService } from './services/upload.service';

import { CookieService } from 'ngx-cookie-service';

import { LandmarksComponent } from './components/landmarks/landmarks.component';
import { RhodopesComponent } from './components/rhodopes/rhodopes.component';
import { LandmarkComponent } from './components/landmark/landmark.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LandmarkGalleryComponent } from './components/landmarkgallery/landmarkgallery.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { UserLandscapesListComponent } from './components/user-landscapes-list/user-landscapes-list.component';
import { TripPlannerComponent } from './components/trip-planner/trip-planner.component';
import { UserTripsComponent } from './components/user-trips/user-trips.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LandmarksComponent,
    RhodopesComponent,
    LandmarkComponent,
    SidebarComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    GalleryComponent,
    LandmarkGalleryComponent,
    ImageDetailComponent,
    UserLandscapesListComponent,
    TripPlannerComponent,
    UserTripsComponent,
    EditProfileComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    NgbModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CookieService,
    GalleryService,
    ImageService,
    LandmarksService,
    UserService,
    TripPlannerService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
