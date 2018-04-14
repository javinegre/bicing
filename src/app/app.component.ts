import { Component } from '@angular/core';
import { StationService } from './station.service';

import MAPCONFIG from './map/map.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  mapCenter: Object = {};
  stationSelected: String = null;
  resourceMode: String = 'bikes'; // 'bikes' || 'slots'
  resourceFilter: String = null; // null || 'BIKE' || 'BIKE-ELECTRIC'
  lastFullUpdate: any = 0;
  updateTtl: any = 6 * 60 * 60 * 1000; // 6 hour

  constructor (
      private stationService: StationService
  ) {
    this.mapCenter = {
      lat: MAPCONFIG.lat,
      lng: MAPCONFIG.lng
    };
  }

  selectStation (id): void {
    this.stationSelected = id;
    this.stationService.getStation(this.stationSelected).then(station => {
      setTimeout(() => {
        this.mapCenter = {
          lat: station.latitude,
          lng: station.longitude
        };
      }, 400); // Wait for animation to finish
    });
  }

  changeResourceType (type): void {
    this.resourceMode = type;
  }

  changeBikeTypeFilter (type): void {
    this.resourceFilter = type;
  }

  dismissStationDetails (): void {
    this.stationSelected = null;
  }

  refreshStationList (): void {
    const now = +new Date();
    let partialUpdate = true;

    if ( this.lastFullUpdate + this.updateTtl < now ) {
      partialUpdate = false;
      this.lastFullUpdate = now;
    }

    this.stationService.getStations(partialUpdate).then(stations => {
      // TODO: Update icon maps
    });
  }

  centerMap (): void {
    if ( 'geolocation' in navigator ) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setTimeout(() => { // https://stackoverflow.com/questions/47918502/expressionchangedafterithasbeencheck-error-in-using-angular-component
          this.mapCenter = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
        });
      },(error) => {
        console.log(error);
      }, {
        timeout : 5000,
        maximumAge: 60000
      });
    }
  }
}

