import { AppRoute } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { reviews } from '../../mocks/reviews';
import { nearbyOffers } from '../../mocks/nearby-offers';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
              element={<OfferPage reviews={reviews} nearbyOffers={nearbyOffers}/>}
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
