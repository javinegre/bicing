import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { StationDetailsComponent } from './station-details/station-details.component';

import { StationService } from './station.service';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    HttpClientModule
  ],
  providers: [ StationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
