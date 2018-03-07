import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ChartsModule } from 'ng2-charts';
import {DataService} from './data.service'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NgxCarouselModule } from 'ngx-carousel';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';
import { VenueComponent } from './venue/venue.component';
import { GuestsComponent } from './guests/guests.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeComponent } from './income/income.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const firebaseConfig = {
  apiKey: "AIzaSyCn7sK1OE6sSSDS0nL-aYEwa-E1et3j-_Q",
  authDomain: "weddingvibes-f4398.firebaseapp.com",
  databaseURL: "https://weddingvibes-f4398.firebaseio.com",
  storageBucket: "weddingvibes-f4398.appspot.com",
  messagingSenderId: "91203406031"
};

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HeaderComponent,
    VenueComponent,
    GuestsComponent,
    MessagesComponent,
    DashboardComponent,
    IncomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxCarouselModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
