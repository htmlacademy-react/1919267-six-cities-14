import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TFavoritesData } from '../../types/state';
import { fetchFavoriteOffers } from '../api-actions';

const initialState: TFavoritesData = {
  favorites: [],
  favoritesFetchingStatus: RequestStatus.Idle,
};

export const favoritesData = createSlice({
  name: NameSpace.FavoritesData,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.favoritesFetchingStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesFetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.favoritesFetchingStatus = RequestStatus.Error;
      });
  }
});
