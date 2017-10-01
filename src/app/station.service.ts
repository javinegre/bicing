import { Injectable } from '@angular/core';

import { Station } from './station';
import { STATIONS } from './mock-stations';

@Injectable()

export class StationService {
    getStation (id): Promise<Station> {
        return Promise.resolve(STATIONS.find( station => station.id === id ) || null);
    }

    getStations(): Promise<Station[]> {
        return Promise.resolve(STATIONS);
    }

    getStationsById(IDs): Promise<Station[]> {
        return Promise.resolve(STATIONS.filter( station => IDs.indexOf(station.id) >= 0 ));
    }
}
