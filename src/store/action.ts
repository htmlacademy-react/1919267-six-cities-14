import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/city-name';
import { Offer } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data';

export const setOffers = createAction('offers/setOffers', (offers: Offer[]) => ({
  payload: offers
}));

export const setActiveOffer = createAction('offer/setActiveOffer', (offer: Offer) => ({
  payload: offer
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

export const setLoadingStatus = createAction('app/setLoadingStatus', (loadingStatus: boolean) => ({
  payload: loadingStatus
}));

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setUserData = createAction('user/setData', (userData: UserData) => ({
  payload: userData
}));
