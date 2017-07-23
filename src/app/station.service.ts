import { Injectable } from '@angular/core';

import { Station } from './station';
import { STATIONS } from './mock-stations';

@Injectable()

export class StationService {
    getStations(): Promise<Station[]> {
        return Promise.resolve(STATIONS);
    }
}
