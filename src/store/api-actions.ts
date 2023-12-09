import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { setFavoriteOffers, setOffers, requireAuthorization, setLoadingStatus, redirectToRoute, setUserData, setActiveOffer, setReviews, setReview } from './action';
import { setToken, dropToken } from '../services/token';
import { ReviewData, Review } from '../types/review';

type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffers = createAsyncThunk<void, undefined, Extra>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setLoadingStatus(false));
    dispatch(setOffers(data));
  }
);

export const fetchActiveOffer = createAsyncThunk<Offer, Offer['id'], Extra>(
  'offer/fetchActiveOffer',
  async (offerId, {extra: api, dispatch}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    dispatch(setActiveOffer(data));
    return data;
  }
);

export const fetchReviews = createAsyncThunk<Review[], Offer['id'], Extra>(
  'offer/fetchReviews',
  async (offerId, {extra: api, dispatch}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
    dispatch(setReviews(data));
    return data;
  }
);

export const sendReview = createAsyncThunk<void, ReviewData, Extra>(
  'offer/sendReview',
  async ({comment, rating, id}, {extra: api, dispatch}) => {
    const {data} = await api.post<Review>(
      `${APIRoute.Reviews}/${id}`,
      {comment, rating}
    );
    dispatch(setReview(data));
  }
);

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(setFavoriteOffers(data));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    setToken(data.token);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
    dispatch(fetchFavoriteOffers());
    dispatch(fetchOffers());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
