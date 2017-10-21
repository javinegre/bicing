import { Injectable } from '@angular/core';

import { Station } from './station';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

let STATIONS = [];

@Injectable()

export class StationService {
    server: string = 'http://negre.co/';
    api: string = 'bicing/api/v1.0/';

    constructor(
        private http: HttpClient
    ) {}

    getStation (id): Promise<Station> {
        return Promise.resolve(STATIONS.find( station => station.id === id ) || null);
    }

    getStations(simplifiedData: boolean = false): Promise<Station[]> {
        return new Promise<Station[]>((resolve, reject) => {
            const endpoint = simplifiedData
                ? 'stations-simplified'
                : 'stations';
            this.http.get(`${this.server}${this.api}${endpoint}`).toPromise().then((stations: Station[]) => {
                STATIONS = stations;
                resolve(stations);
            });
        })
    }

    getStationsById(IDs): Promise<Station[]> {
        return Promise.resolve(STATIONS.filter( station => IDs.indexOf(station.id) >= 0 ));
    }
}
