import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { VenueComponent } from './venue/venue.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent
  },
  {
    path: 'venue',
    component: VenueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
