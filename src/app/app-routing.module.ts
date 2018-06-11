import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IntroComponent} from './intro/intro.component';
import {VenueComponent} from './venue/venue.component';
import {GuestsComponent} from './guests/guests.component';
import {MessagesComponent} from './messages/messages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {IncomeComponent} from './income/income.component';
import {ExpensesDetailComponent} from './expenses-detail/expenses-detail.component';
import {GuestDetailComponent} from './guest-detail/guest-detail.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login.guard';


const routes: Routes = [
  {
    path: 'home',
    component: IntroComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'venue',
    component: VenueComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'guests',
    component: GuestsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'income',
    component: IncomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'expenses',
    component: ExpensesDetailComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'guest-detail',
    component: GuestDetailComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
