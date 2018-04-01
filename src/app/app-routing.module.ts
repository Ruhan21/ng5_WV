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


const routes: Routes = [
  {
    path: '',
    component: IntroComponent
  },
  {
    path: 'venue',
    component: VenueComponent
  },
  {
    path: 'guests',
    component: GuestsComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'income',
    component: IncomeComponent
  },
  {
    path: 'expenses',
    component: ExpensesDetailComponent
  },
  {
    path: 'guest-detail',
    component: GuestDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
