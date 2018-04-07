import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { VenueComponent } from './venue/venue.component';
import { GuestsComponent } from './guests/guests.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeComponent } from './income/income.component';
import {ExpensesDetailComponent} from "./expenses-detail/expenses-detail.component";
import { GuestDetailComponent } from "./guest-detail/guest-detail.component"
import { LoginComponent } from './login/login.component';
import { LoginAuthService } from './login-auth.service';


const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'venue',
    component: VenueComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'guests',
    component: GuestsComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'income',
    component: IncomeComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'expenses',
    component: ExpensesDetailComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'guest-detail',
    component: GuestDetailComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
