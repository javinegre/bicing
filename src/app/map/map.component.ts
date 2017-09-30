import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Station } from '../station';
import { StationService } from '../station.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit{

  @Output() clickStation: EventEmitter<String> = new EventEmitter<String>();
  stations: Station[] = [];

  constructor (
      private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.stationService.getStations().then(stations => this.stations = stations);
  }

  selectStation(event, id){
    this.clickStation.emit(id);
  }
}
