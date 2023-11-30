import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import { setCurrentCity, setOffers, setFavoriteOffers, requireAuthorization } from './action';
import { OffersDataType } from '../types/state';

const initialState: OffersDataType = {
  offers: [],
  nearbyOffers: [],
  favoriteOffers: [],
  currentCity: DEFAULT_CITY,
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
