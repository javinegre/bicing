import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  stationSelected: String = null;

  selectStation (id): void {
    this.stationSelected = id;
  }

  dismissStationDetails (): void {
    this.stationSelected = null;
  }
}

