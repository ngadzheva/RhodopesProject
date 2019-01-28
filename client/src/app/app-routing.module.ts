import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { CanActivateAuthGuard } from './shared/guards/can-activate-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'landscapes',
    loadChildren: './landscapes/landscapes.module#LandscapesModule'
  },
  {
    path: 'gallery',
    loadChildren: './gallery/gallery.module#GalleryModule'
  },
  {
    path: 'tripplan',
    loadChildren: './trip-planner/trip-planner.module#TripPlannerModule',
    canActivate: [
      CanActivateAuthGuard
    ]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'user',
    loadChildren: './users/users.module#UsersModule'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
