import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './shared/interceptors/headers.interceptor';
 
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './shared/components/home/home.component';

import { ImageService } from './shared/services/image.service';
import { CookieService } from 'ngx-cookie-service';

import { CanActivateAuthGuard } from './shared/guards/can-activate-auth-guard.service';
import { ConfirmDeactivateGuard } from './shared/guards/can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CookieService,
    ImageService,
    CanActivateAuthGuard,
    ConfirmDeactivateGuard,
    {
      provide: 'NeverActivateGuard',
      useValue: () => {
        return false;
      }
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HeadersInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
