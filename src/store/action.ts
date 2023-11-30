import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/city-name';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const setOffers = createAction('offers/setOffers', (offers: Offer[]) => ({
  payload: offers
}));

export const setFavoriteOffers = createAction('offers/setFavoriteOffers', (favoriteOffers: Offer[]) => ({
  payload: favoriteOffers
}));

export const setCurrentCity = createAction('offers/setCurrentCity', (currentCityName: CityName) => ({
  payload: currentCityName
}));

export const requireAuthorization = createAction('user/checkAuth', (authStatus: AuthorizationStatus) => ({
  payload: authStatus
}));
