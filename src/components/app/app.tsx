import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '../../store';
import { fetchFavoriteOffers, fetchOffers } from '../../store/api-actions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user-data/selectors';

store.dispatch(fetchOffers());

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
          >
            <Route index element={<MainPage />}/>
            <Route
              path={AppRoute.Login}
              element={<LoginPage/>}
            />
            <Route
              path={`${AppRoute.Offer}/:offerId`}
              element={<OfferPage />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
