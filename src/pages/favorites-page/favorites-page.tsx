import {Header} from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { selectFavorites, selectFetchingFavoritesStatus } from '../../store/favorites-data/selectors';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { FavoritesEmptyPage } from '../favorites-empty-page/favorites-empty-page';
import { RequestStatus } from '../../const';
import cn from 'classnames';

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
  const favorites = useAppSelector(selectFavorites);
  const favoritesByLocation = getFavoritesByLocation(favorites);
  const favoritesFetchingStatus = useAppSelector(selectFetchingFavoritesStatus);
  const hasFavorites = Boolean(favorites?.length);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites page</title>
      </Helmet>
      <Header />

      <main className={cn('page__main page__main--favorites', {
        'page__main--favorites-empty': !hasFavorites
      })}
      >
        <div className="page__favorites-container container">
          {
            hasFavorites
              ? (
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  {
                    favoritesFetchingStatus === RequestStatus.Success
                    && <FavoritesList favoritesByLocation={favoritesByLocation}/>
                  }
                </section>
              )
              : (<FavoritesEmptyPage />)
          }
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
