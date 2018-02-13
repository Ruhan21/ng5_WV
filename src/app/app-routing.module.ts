import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { VenueComponent } from './venue/venue.component';
import { GuestsComponent } from './guests/guests.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
