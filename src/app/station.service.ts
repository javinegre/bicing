import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import { Station } from './station';
import { BicingApiResponse } from './bicing-api-response';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class StationService {
    server: string = environment.bicingApiUrl;
    api: string = 'bicing/api/v1.0/';

    stationList: Station[] = [];
    updateTime: number;

    constructor(
        private http: HttpClient
    ) {}

    getStation (id): Promise<Station> {
        return Promise.resolve(this.stationList.find( station => station.id === id ) || null);
    }

    getStations(simplifiedData: boolean = false): Promise<Station[]> {
        return new Promise<Station[]>((resolve, reject) => {
            const endpoint = simplifiedData
                ? 'stations-simplified'
                : 'stations';

            this.http.get(`${this.server}${this.api}${endpoint}`).toPromise().then((info: BicingApiResponse) => {
                if ( simplifiedData ) {
                    info.stations = this.fillSimplifiedData(info.stations);
                }
                this.stationList = info.stations;
                this.updateTime = info.updateTime;

                resolve(this.stationList);
            }).catch((err) => {
                console.error(err);
                reject(this.stationList);
            });
        })
    }

    getStationsById(IDs): Promise<Station[]> {
        return Promise.resolve(this.stationList.filter( station => IDs.indexOf(station.id) >= 0 ));
    }

    fillSimplifiedData(stations): Station[] {
        return this.stationList.map((st) => {
            const newStationData = stations.find((it) => it.id == st.id);
            if (newStationData) {
                st.slots = newStationData.slots;
                st.bikes = newStationData.bikes;
                st.status = newStationData.status;
            }

            return st;
        });
    }
}
