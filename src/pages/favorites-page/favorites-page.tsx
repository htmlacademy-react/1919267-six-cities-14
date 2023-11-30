import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import PlaceCard from '../../components/offer-card/offer-card';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoriteOffers } from '../../store/api-actions';

function getFavoritesByLocation (items: Offer[]) {
  return items.reduce<{ [key: string]: Offer[] }>((acc, current) => {
    const location = current.city.name;
    if (!(location in acc)) {
      acc[location] = [];
    }
    acc[location].push(current);

    return acc;
  }, {});
}

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favoriteOffers);
  const favoritesByLocation = getFavoritesByLocation(favorites);

  useEffect(() => {
    if(favorites.length === 0) {
      dispatch(fetchFavoriteOffers());
    }
  },
  [dispatch, favorites]);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites page</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByLocation).map(
                ([location, groupedFavorites]) => (
                  <li className="favorites__locations-items" key={location}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{location}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedFavorites.map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          offer={offer}
                          block="favorites"
                          size="small"
                        />
                      )
                      )}
                    </div>
                  </li>
                )
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
