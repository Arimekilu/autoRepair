import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './auth/registration/registration.component';
import {MatButtonModule} from "@angular/material/button";
import { NavComponent } from './shared/nav/nav.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { JobComponent } from './jobs/job/job.component';
import { AllJobsComponent } from './jobs/all-jobs/all-jobs.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CreateClientComponent } from './clients/components/create-client/create-client.component';
import { ClientComponent } from './clients/components/client/client.component';
import { AllClientsComponent } from './clients/components/all-clients/all-clients.component';
import { CreateCarComponent } from './clients/components/car/create-car/create-car.component';
import { CarComponent } from './clients/components/car/car/car.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavComponent,
    LoginComponent,
    CreateJobComponent,
    JobComponent,
    AllJobsComponent,
    CreateClientComponent,
    ClientComponent,
    AllClientsComponent,
    CreateCarComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [HttpClient, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
