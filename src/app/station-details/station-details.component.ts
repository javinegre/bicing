import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { Station } from '../station';
import { StationService } from '../station.service';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css']
})

export class StationDetailsComponent implements OnInit {
  @Output() clickBackdrop: EventEmitter<String> = new EventEmitter<String>();
  @Output() clickStation: EventEmitter<String> = new EventEmitter<String>();
  @Input() stationId: String;
  @Input() resourceMode: String;
  station: Station = null;
  nearbyStationList: Station[] = [];

  constructor (
      private stationService: StationService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.updateStationInfo();
  }

  updateStationInfo () {
    const id = this.stationId || '0';
    this.stationService.getStation(id)
      .then(station => {
        this.station = station;
        this.station && this.getNearbyStationList(this.station.nearbyStations);
      });
  }

  getNearbyStationList(NearbyStationIDs): void {
    const sIDs = NearbyStationIDs.split(',').map( item => item.trim() );
    this.stationService.getStationsById(sIDs).then(list => { this.nearbyStationList = list });
  }

  showStationDetails(event, id): void {
    event.preventDefault();
    this.clickStation.emit(id);
  }

  dialogIn(): Boolean {
    return !!(this.stationId !== null && this.stationId.length);
  }

  hideDialog(): void {
    this.clickBackdrop.emit();
  }

}
