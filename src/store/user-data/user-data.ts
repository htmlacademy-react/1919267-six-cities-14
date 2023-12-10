import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, RequestStatus } from '../../const';
import { TUserData } from '../../types/state';
import { checkAuth, login, logout} from '../api-actions';

const initialState: TUserData = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  sendingStatus: RequestStatus.Idle
};


export const userData = createSlice({
  name: NameSpace.UserData,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.pending, (state) => {
        state.sendingStatus = RequestStatus.Loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.sendingStatus = RequestStatus.Success;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.sendingStatus = RequestStatus.Error;
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.pending, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
