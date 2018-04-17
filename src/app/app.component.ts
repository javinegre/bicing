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

  toggleResourceType (): void {
    this.resourceMode = this.resourceMode === 'bikes' ? 'slots' : 'bikes';
  }

  toggleFilter (type): void {
    if ( type == 'BIKE' ) {
      this.resourceFilter = this.resourceFilter === null || this.resourceFilter === 'BIKE'
         ? 'BIKE-ELECTRIC'
         : null;
    }
    else {
      this.resourceFilter = this.resourceFilter === null || this.resourceFilter === 'BIKE-ELECTRIC'
         ? 'BIKE'
         : null;
    }
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

  centerMap (center: String): void {
    switch (center) {
      case 'geo':
        this.geoLocate();
        break;
      case 'home':
        this.mapCenter = {
          lat: 41.398269,
          lng: 2.150632
        };
      // case 'fav1':
      // case 'fav2':
      //   break;
    }
  }

  geoLocate (): void {
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
        timeout : 10000,
        maximumAge: 60000
      });
    }
  }
}

