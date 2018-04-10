import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import { Station } from './station';
import { BicingApiResponse } from './bicing-api-response';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

let STATIONS = [];

@Injectable()

export class StationService {
    server: string = environment.bicingApiUrl;
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

            this.http.get(`${this.server}${this.api}${endpoint}`).toPromise().then((info: BicingApiResponse) => {
                if ( !simplifiedData ) {
                    STATIONS = info.stations;
                }
                else {
                    STATIONS.forEach((st) => {
                        const newStationData = info.stations.find((it) => it.id == st.id);
                        if ( newStationData ) {
                            st.slots = newStationData.slots;
                            st.bikes = newStationData.bikes;
                            st.status = newStationData.status;
                        }
                    });
                }
                resolve(info.stations);
            });
        })
    }

    getStationsById(IDs): Promise<Station[]> {
        return Promise.resolve(STATIONS.filter( station => IDs.indexOf(station.id) >= 0 ));
    }
}
