import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  stationSelected: String = null;
  resourceMode: String = 'bikes'; // 'bikes' || 'slots'

  selectStation (id): void {
    this.stationSelected = id;
  }

  changeResourceType (type): void {
    this.resourceMode = type;
  }

  dismissStationDetails (): void {
    this.stationSelected = null;
  }
}

