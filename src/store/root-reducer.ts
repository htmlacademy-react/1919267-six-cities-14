import { combineReducers } from 'redux';
import { NameSpace } from '../const';
import { reviewsData } from './reviews-data/reviews-data';
import { userData } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.ReviewData]: reviewsData.reducer,
  [NameSpace.UserData]: userData.reducer,
});
