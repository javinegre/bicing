import { Component } from '@angular/core';
import { StationService } from './station.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  stationSelected: String = null;
  resourceMode: String = 'bikes'; // 'bikes' || 'slots'
  resourceFilter: String = null; // null || 'BIKE' || 'BIKE-ELECTRIC'
  lastFullUpdate: any = 0;
  updateTtl: any = 6 * 60 * 60 * 1000; // 6 hour

  constructor (
      private stationService: StationService
  ) { }

  selectStation (id): void {
    this.stationSelected = id;
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
}

