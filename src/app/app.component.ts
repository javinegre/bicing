import { Component, OnInit } from '@angular/core';

import { Station } from './station';
import { StationService } from './station.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';
  stations: Station[] = [];

  constructor (
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.stationService.getStations().then(stations => this.stations = stations);
  }
}
