import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';
import { TUser } from '../types/user';
import { Review } from '../types/review';

export const setOffers = createAction('offers/setOffers', (offers: Offer[]) => ({
  payload: offers
}));

export const setActiveOffer = createAction('offer/setActiveOffer', (offer: Offer) => ({
  payload: offer
}));

export const setFavoriteOffers = createAction('offers/setFavoriteOffers', (favoriteOffers: Offer[]) => ({
  payload: favoriteOffers
}));

export const requireAuthorization = createAction('user/checkAuth', (authStatus: AuthorizationStatus) => ({
  payload: authStatus
}));

export const setLoadingStatus = createAction('app/setLoadingStatus', (loadingStatus: boolean) => ({
  payload: loadingStatus
}));

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setUserData = createAction('user/setData', (userData: TUser) => ({
  payload: userData
}));

export const setReviews = createAction('offer/setReviews', (reviews: Review[]) => ({
  payload: reviews
}));

export const setReview = createAction('offer/setReview', (review: Review) => ({
  payload: review
}));
