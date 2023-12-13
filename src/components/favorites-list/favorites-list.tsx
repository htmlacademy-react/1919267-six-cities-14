import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type FavoritesListProps = {
  favoritesByLocation: {[key: string]: Offer[]};
}

function FavoritesList ({favoritesByLocation}: FavoritesListProps): JSX.Element {
  return (
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
                <OfferCard
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
  );
}

export default FavoritesList;
