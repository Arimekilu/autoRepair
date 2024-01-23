import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {CreateJobComponent} from "./jobs/create-job/create-job.component";
import {CreateClientComponent} from "./clients/components/create-client/create-client.component";
import {AllJobsComponent} from "./jobs/all-jobs/all-jobs.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {AllClientsComponent} from "./clients/components/all-clients/all-clients.component";
import {CreateOrderComponent} from "./orders/components/create-order/create-order.component";
import {ClientComponent} from "./clients/components/client/client.component";
import {Guard} from "./guard.service";



const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'createJob', component: CreateJobComponent, canActivate: [Guard]},
  {path: 'createClient', component: CreateClientComponent, canActivate: [Guard]},
  {path: 'jobs', component: AllJobsComponent, canActivate: [Guard]},
  {path: 'clients', component: AllClientsComponent, canActivate: [Guard]},
  {path: 'client/:id', component: ClientComponent, canActivate: [Guard]},
  {path: 'createOrder', component: CreateOrderComponent, canActivate: [Guard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
