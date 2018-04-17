const fetch = require('node-fetch');
const cache = require('memory-cache');

class Api {

  constructor() {
    this.cacheKey = 'stations-info';
    this.ttl = 60 * 1000; // 60s
  }

  async getSimplifiedStationList () {
    const info = await this.getCompleteStationList();
    const simplifiedStations = info.stations.map((station) => {
      return {
        id:     station.id,
        slots:  station.slots,
        bikes:  station.bikes,
        status: station.status
      };
    });

    return {
      stations: simplifiedStations,
      updateTime: info.updateTime
    };
  }

  async getCompleteStationList () {
    let info = cache.get(this.cacheKey);

    if ( !info ) {
      info = await fetch('http://wservice.viabicing.cat/v2/stations')
        .then(res => res.json())
        .catch(err => {
          console.error(err);
          return {
            'stations': [],
            'updateTime': -1
          };
        });

      cache.put(this.cacheKey, info, this.ttl);
    }

    return info;
  }
}

module.exports = Api;