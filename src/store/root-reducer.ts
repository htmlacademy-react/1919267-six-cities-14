import { combineReducers } from 'redux';
import { NameSpace } from '../const';
import { reviewsData } from './reviews-data/reviews-data';
import { userData } from './user-data/user-data';
import { offersData } from './offers-data/offers-data';

export const rootReducer = combineReducers({
  [NameSpace.ReviewData]: reviewsData.reducer,
  [NameSpace.UserData]: userData.reducer,
  [NameSpace.OffersData]: offersData.reducer
});
