import { TSizeMap } from './types/size';

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

enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

const CityMap = {
  Paris: { name: Cities.Paris, location: { latitude: 48.8566, longitude: 2.3522, zoom: 10} },
  Cologne: { name: Cities.Cologne, location: { latitude: 50.935173, longitude: 6.953101, zoom: 10 }},
  Brussels: { name: Cities.Brussels, location: { latitude: 50.8476, longitude: 4.3572, zoom: 10 } },
  Amsterdam: { name: Cities.Amsterdam, location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 } },
  Hamburg: { name: Cities.Hamburg, location: { latitude: 53.5488, longitude: 9.9872, zoom: 10 } },
  Dusseldorf: { name: Cities.Dusseldorf, location: { latitude: 51.2277, longitude: 6.7735, zoom: 10 } },
} as const;

const DEFAULT_CITY = Cities.Paris;

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';

const SortingMap = {
  Popular: 'Popular',
  LowToHigh: 'Price: low to high',
  HighToLow: 'Price: high to low',
  TopRating: 'Top rated first'
} as const;

const DEFAULT_SORTING_OPTION = SortingMap['Popular'];
const MAX_NEARBY_OFFERS_COUNT = 3;
const MAX_SHOWN_REVIEWS = 10;

enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  NearbyOffers = '/nearby',
  Favorite = '/favorite'
}

const BACKEND_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

enum RequestStatus {
  Loading ='Loading',
  Idle = 'Idle',
  Error = 'Error',
  Success = 'Success'
}

enum NameSpace {
  OffersData = 'OFFERS_DATA',
  OfferData = 'OFFER_DATA',
  ReviewData = 'REVIEW_DATA',
  UserData = 'USER_DATA',
  FavoritesData = 'FAVORITES_DATA',
  NearbyOffersData = 'NEARBY_OFFERS_DATA'
}

const HttpStatus = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
} as const;

const enum FavoriteStatus {
  Added = 1,
  Deleted = 0
}

const BookmarkSizeMap: TSizeMap = {
  small: {width: '18', height: '19'},
  large: {width: '31', height: '33'}
} as const;

const ImageSizeMap: TSizeMap = {
  small: { width: '150', height: '110'},
  large: { width: '260', height: '200'},
} as const;

export{
  Settings,
  AppRoute,
  AuthorizationStatus,
  Cities,
  DEFAULT_CITY,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
  SortingMap,
  DEFAULT_SORTING_OPTION,
  APIRoute,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  MAX_NEARBY_OFFERS_COUNT,
  MAX_SHOWN_REVIEWS,
  RequestStatus,
  NameSpace,
  HttpStatus,
  CityMap,
  FavoriteStatus,
  BookmarkSizeMap,
  ImageSizeMap
};
