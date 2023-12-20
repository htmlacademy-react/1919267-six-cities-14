import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {Action} from 'redux';
import { AppThunkDispatch, extractActionTypes } from '../test-mocks/test-mocks';
import { checkAuth } from './api-actions';
import { APIRoute } from '../const';

describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator =
    configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS_DATA: {
        offers: []
      }
    });
  });

  describe('CheckAuth', () => {
    it('should dispatch "checkAuth.pending" and "checkAuth.fulfilled" with thunk "checkAuth"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuth());
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type
      ]);
    });

    it('should dispatch "checkAuth.pending" and "checkAuth.rejected" when server response is400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuth());
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type
      ]);
    });
  });
});
