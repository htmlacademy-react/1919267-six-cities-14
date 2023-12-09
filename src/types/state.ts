import { store } from '../store';
import { Offer } from './offer';
import { CityName } from './city-name';
import { AuthorizationStatus } from '../const';
import { UserData } from './user-data';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type OffersDataType = {
  offers: Offer[];
  activeOffer: null | Offer;
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  reviews: Review[];
  currentCity: CityName;
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userData: null | UserData;
};
