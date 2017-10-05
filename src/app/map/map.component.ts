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
  @Input() resourceMode: String;
  @Input() stationSelected: String;

  mapConfig = MAPCONFIG;

  mapCenter = {
    lat: 0,
    lng: 0
  }

  mapUpdateTimer: any = null;

  constructor (
      private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.stationService.getStations().then(stations => {
      this.mapCenter.lat = this.mapConfig.lat;
      this.mapCenter.lng = this.mapConfig.lng;

      stations.map(st => {
        st.latitude = +st.latitude;
        st.longitude = +st.longitude;
      });
      this.stations = stations;
      this.filterStations();
    });
  }

  filterStations(): void {
    this.shownStations = <ShownStation[]>this.stations.filter((item) => {
      let shownStation: ShownStation = <ShownStation>Object.assign({}, item);
      const lat = +shownStation.latitude;
      const lng = +shownStation.longitude;
      const centerLat = this.mapCenter.lat;
      const centerLng = this.mapCenter.lng;

      const filter = lat > centerLat - 0.009 && lat < centerLat + 0.009
        && lng > centerLng - 0.012 && lng < centerLng + 0.012;

      if ( filter ) {
        shownStation._radio = lat > centerLat - 0.0045 && lat < centerLat + 0.0045
          && lng > centerLng - 0.006 && lng < centerLng + 0.006
          ? 'inner'
          : 'outer';

        shownStation._distance = this.getStationDistance(lat, lng, centerLat, centerLng);

        return shownStation;
      }
    });
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

  // getResourceClass(station: Station): String {
  //   const resources = this.resourceMode === 'bikes'
  //     ? +station.bikes
  //     : +station.slots;
  //
  //   let resourceClass = '';
  //
  //   if ( station.status !== 'OPN' ) {
  //     resourceClass = 'map-marker-resource--grey';
  //   }
  //   else if ( resources === 0 ) {
  //     resourceClass = 'map-marker-resource--black';
  //   }
  //   else if ( resources === 1 ) {
  //     resourceClass = 'map-marker-resource--red';
  //   }
  //   else if ( resources < 4 ) {
  //     resourceClass = 'map-marker-resource--orange';
  //   }
  //   else if ( resources >= 4 ) {
  //     resourceClass = 'map-marker-resource--green';
  //   }
  //
  //   return resourceClass;
  // }
}
