import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Station } from '../station';
import { StationService } from '../station.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit{
  @Output() clickStation: EventEmitter<String> = new EventEmitter<String>();
  stations: Station[] = [];
  @Input() resourceMode: String;

  constructor (
      private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.stationService.getStations().then(stations => this.stations = stations);
  }

  selectStation(event, id){
    this.clickStation.emit(id);
  }

  getResourceClass(station: Station): String {
    const resources = this.resourceMode === 'bikes'
      ? +station.bikes
      : +station.slots;

    let resourceClass = '';

    if ( station.status !== 'OPN' ) {
      resourceClass = 'map-marker-resource--grey';
    }
    else if ( resources === 0 ) {
      resourceClass = 'map-marker-resource--black';
    }
    else if ( resources === 1 ) {
      resourceClass = 'map-marker-resource--red';
    }
    else if ( resources < 4 ) {
      resourceClass = 'map-marker-resource--orange';
    }
    else if ( resources >= 4 ) {
      resourceClass = 'map-marker-resource--green';
    }

    return resourceClass;
  }
}
