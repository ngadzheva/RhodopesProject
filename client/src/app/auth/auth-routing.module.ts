import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { ConfirmDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canDeactivate: [
      ConfirmDeactivateGuard
    ]
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canDeactivate: [
      ConfirmDeactivateGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
