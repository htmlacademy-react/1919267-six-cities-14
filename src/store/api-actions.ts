import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosError, AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { TLoginData } from '../types/login-data';
import { TUser } from '../types/user';
import { APIRoute, AuthorizationStatus, HttpStatus } from '../const';
import { setFavoriteOffers, setOffers, requireAuthorization, setLoadingStatus, setActiveOffer, setReviews } from './action';
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

export const sendReview = createAsyncThunk<Review, ReviewData, Extra>(
  'offer/sendReview',
  async ({comment, rating, id}, {extra: api}) => {
    const {data} = await api.post<Review>(
      `${APIRoute.Reviews}/${id}`,
      {comment, rating}
    );
    return data;
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

export const checkAuth = createAsyncThunk<TUser, undefined, Extra>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TUser>(APIRoute.Login);
    return data;
  }
);

export const login = createAsyncThunk<TUser, TLoginData, Extra>(
  'user/login',
  async ({email, password}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<TUser>(APIRoute.Login, {email, password});
      setToken(data.token);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === HttpStatus.BadRequest) {
          return rejectWithValue('Bad Request: Some data is missing or invalid.');
        } else {
          return rejectWithValue('An error accured while logging in');
        }
      } else {
        return rejectWithValue('Unknown error during login.');
      }
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {
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
