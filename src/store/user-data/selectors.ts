import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectAuthorizationStatus = (state: State) => state[NameSpace.UserData].authorizationStatus;
export const selectSendingStatus = (state: State) => state[NameSpace.UserData].sendingStatus;
export const selectUserData = (state: State) => state[NameSpace.UserData].user;
