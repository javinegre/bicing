import { Station } from './station';

export const STATIONS: Station[] = [
    {
        'id': '1',
        'type':'BIKE',
        // 'latitude':'41.397952',
        'latitude':'40',
        // 'longitude':'2.180042',
        'longitude':'32',
        'streetName':'Gran Via Corts Catalanes',
        'streetNumber':'760',
        'altitude':'21',
        'slots':'21',
        'bikes':'1',
        'nearbyStations':'2, 3, 4, 101',
        'status':'OPN'
    },
    {
        'id': '2',
        'type':'BIKE',
        // 'latitude':'41.39553',
        'latitude':'240',
        // 'longitude':'2.17706',
        'longitude':'60',
        'streetName':'Roger de Flor\/ Gran V\u00eda',
        'streetNumber':'126',
        'altitude':'21',
        'slots':'25',
        'bikes':'0',
        'nearbyStations':'1, 3, 4, 101',
        'status':'OPN'
    },
    {
        'id': '3',
        'type':'BIKE',
        // 'latitude':'41.393699',
        'latitude':'50',
        // 'longitude':'2.181137',
        'longitude':'150',
        'streetName':'Ali Bei',
        'streetNumber':'44',
        'altitude':'21',
        'slots':'23',
        'bikes':'0',
        'nearbyStations':'1, 2, 4, 101',
        'status':'CLS'
    },
    {
        'id': '4',
        'type':'BIKE',
        // 'latitude':'41.39347',
        'latitude':'160',
        // 'longitude':'2.18149',
        'longitude':'160',
        'streetName':'Ribes',
        'streetNumber':'13',
        'altitude':'21',
        'slots':'13',
        'bikes':'7',
        'nearbyStations':'1, 2, 3, 101',
        'status':'OPN'
    },
    {
        'id': '101',
        'type':'BIKE',
        'latitude':'90',
        'longitude':'100',
        'streetName':'Tetuan',
        'streetNumber': '2',
        'altitude':'21',
        'slots':'20',
        'bikes':'2',
        'nearbyStations':'1, 2, 3, 4',
        'status':'OPN'
    },
    {
        'id': '102',
        'type':'BIKE',
        'latitude':'400',
        'longitude':'300',
        'streetName':'Bonavista',
        'streetNumber':'30',
        'altitude':'21',
        'slots':'1',
        'bikes':'24',
        'nearbyStations':'103, 104',
        'status':'OPN'
    },
    {
        'id': '103',
        'type':'BIKE',
        'latitude':'329',
        'longitude':'210',
        'streetName':'Travessera Gracia',
        'streetNumber':'203',
        'altitude':'21',
        'slots':'3',
        'bikes':'20',
        'nearbyStations':'102, 104',
        'status':'OPN'
    },
    {
        'id': '104',
        'type':'BIKE',
        'latitude':'290',
        'longitude':'320',
        'streetName':'Pg Llu\u00eds Companys',
        'streetNumber':'13',
        'altitude':'21',
        'slots':'0',
        'bikes':'20',
        'nearbyStations':'102, 103',
        'status':'OPN'
    }
];

