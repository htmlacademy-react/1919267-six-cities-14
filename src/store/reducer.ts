import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import { setCurrentCity, setOffers, setFavoriteOffers, requireAuthorization, setLoadingStatus, setUserData, setActiveOffer, setReviews, setReview } from './action';

const initialState: OffersDataType = {
  offers: [],
  activeOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  reviews: [],
  currentCity: DEFAULT_CITY,
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReview, (state, action) => {
      state.reviews.push(action.payload);
    });
});
