import { CanDeactivate } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { RegistrationComponent } from '../../auth/registration/registration.component';
import { TripPlannerComponent } from '../../trip-planner/trip-planner/trip-planner.component';
import { EditProfileComponent } from '../../users/edit-profile/edit-profile.component';
import { EditLandscapeComponent } from '../../users/admin/edit-landscape/edit-landscape.component';
import { CreateAlbumComponent } from '../../users/admin/create-album/create-album.component';

export class ConfirmDeactivateGuard implements CanDeactivate<LoginComponent | RegistrationComponent | TripPlannerComponent | EditProfileComponent | EditLandscapeComponent | CreateAlbumComponent> {

  canDeactivate(target: LoginComponent | RegistrationComponent | TripPlannerComponent | EditProfileComponent | EditLandscapeComponent | CreateAlbumComponent) {
    if(target.form.dirty && !target.isSubmitted){
        return window.confirm('Напускане на страницата?');
    }
    return true;
  }
}