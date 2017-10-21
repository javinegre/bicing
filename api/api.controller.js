const STATIONS = require('./mock-stations');

class Api {

  constructor() {
  }

  getSimplifiedStationList () {
    return STATIONS.map((station) => {
      return {
        id:     station.id,
        slots:  station.slots,
        bikes:  station.bikes,
        status: station.status
      };
    });
  }

  getCompleteStationList () {
    return STATIONS;
  }
}

module.exports = Api;