import { CanDeactivate } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { RegistrationComponent } from '../../auth/registration/registration.component';
import { TripPlannerComponent } from '../../trip-planner/trip-planner/trip-planner.component';
import { EditProfileComponent } from '../../users/edit-profile/edit-profile.component';

export class ConfirmDeactivateGuard implements CanDeactivate<LoginComponent | RegistrationComponent | TripPlannerComponent | EditProfileComponent> {

  canDeactivate(target: LoginComponent | RegistrationComponent | TripPlannerComponent | EditProfileComponent) {
    if(target.form.dirty && !target.isSubmitted){
        return window.confirm('Напускане на страницата?');
    }
    return true;
  }
}