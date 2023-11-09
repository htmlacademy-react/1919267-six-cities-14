import { City } from './types/city';

const Settings = {
  PlacesCount: 5
} as const;

enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8567801,
      longitude: 2.3315211,
      zoom: 10,
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9461149,
      longitude: 6.9415238,
      zoom: 10,
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8552034,
      longitude: 4.2930173,
      zoom: 10,
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3547607,
      longitude: 4.7391566,
      zoom: 10,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5586627,
      longitude: 9.7630179,
      zoom: 10,
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.238554,
      longitude: 6.6495462,
      zoom: 10,
    }
  },
];

const DEFAULT_CITY = CITIES[3];

export{Settings, AppRoute, AuthorizationStatus, CITIES, DEFAULT_CITY};
