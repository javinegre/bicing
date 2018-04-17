import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Station } from '../station';
import { ShownStation } from '../shownStation.interface';
import { StationService } from '../station.service';

import MAPCONFIG from './map.config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit{
  @Output() clickStation: EventEmitter<String> = new EventEmitter<String>();
  stations: Station[] = [];
  shownStations: ShownStation[] = [];
  @Input() mapCenter: any;
  @Input() resourceMode: String;
  @Input() resourceFilter: String;
  @Input() stationSelected: String;

  mapConfig = MAPCONFIG;

  mapUpdateTimer: any = null;

  constructor (
      private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.stationService.getStations(false).then(stations => {
      stations.map(st => {
        st.latitude = +st.latitude;
        st.longitude = +st.longitude;
      });

      this.stations = stations;
      this.filterStations();
    }).catch(err => console.log(err));
  }

  filterStations(): void {
    this.shownStations = this.stations.reduce((filtered, item) => {
      let shownStation: ShownStation = <ShownStation>Object.assign({}, item);
      const lat = +shownStation.latitude;
      const lng = +shownStation.longitude;
      const centerLat = this.mapCenter.lat;
      const centerLng = this.mapCenter.lng;

      const isNearby = lat > centerLat - 0.009 && lat < centerLat + 0.009
        && lng > centerLng - 0.012 && lng < centerLng + 0.012;

      const isBikeType = this.resourceFilter === null || this.resourceFilter === shownStation.type;

      if ( isNearby && isBikeType ) {
        shownStation._radio = lat > centerLat - 0.0045 && lat < centerLat + 0.0045
          && lng > centerLng - 0.006 && lng < centerLng + 0.006
          ? 'inner'
          : 'outer';

        shownStation._distance = this.getStationDistance(lat, lng, centerLat, centerLng);

        filtered.push(shownStation);
      }

      return filtered;
    }, <ShownStation[]>[]);
  }

  getStationDistance(lat, lng, centerLat, centerLng): number {
    return Math.sqrt( Math.pow(centerLat - lat, 2) + Math.pow(centerLng - lng, 2) );
  }

  selectStation(event, id){
    this.clickStation.emit(id);
  }

  debounceMapUpdate(cb, ms = 0) {
    clearTimeout(this.mapUpdateTimer);
    this.mapUpdateTimer = setTimeout(() => {
      let result = cb();
    }, ms);
  }

  mapDragEnd($event) {
    const mapComp = this;

    this.shownStations = []; // Temporarily clear markers

    this.mapCenter.lat = $event.lat;
    this.mapCenter.lng = $event.lng;

    this.debounceMapUpdate(function () {
      mapComp.filterStations();
    }, 480);
  }

  getResourceIcon(station: ShownStation): string {
    const resources = this.resourceMode === 'bikes'
      ? +station.bikes
      : +station.slots;

    const resourceType = this.resourceMode === 'bikes'
      ? 'bikes'
      : 'slots';

    const stationType = station.type === 'BIKE-ELECTRIC'
      ? 'elec'
      : 'mech';

    const iconSize = station._radio === 'outer'
      ? 'small'
      : 'big';

    let resourceColor = '';

    if ( station.status !== 'OPN' ) {
      resourceColor = 'gray';
    }
    else if ( resources === 0 ) {
      resourceColor = 'black';
    }
    else if ( resources <= 2 ) {
      resourceColor = 'red';
    }
    else if ( resources <= 5 ) {
      resourceColor = 'orange';
    }
    else if ( resources > 5 ) {
      resourceColor = 'green';
    }

    return `${resourceType}-${stationType}-${resourceColor}-${iconSize}`;
  }

  getIconUrl(station: ShownStation): string {
    return `assets/icon-rsrc/${this.getResourceIcon(station)}.svg`
  }

  ngOnChanges() {
    this.filterStations();
  }
}
