import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { StationDetailsComponent } from './station-details/station-details.component';

import { StationService } from './station.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StationDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ StationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
