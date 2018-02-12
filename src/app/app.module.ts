import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HeaderComponent,
    VenueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxCarouselModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
