import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { DEFAULT_CITY } from '../../const';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { SyntheticEvent, useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import NoOffers from '../../components/no-offers/no-offers';

type MainPageProps = {
  offers: Offer[];
  locations: City[];
}

function MainPage({offers, locations}: MainPageProps): JSX.Element {
  const [currentLocation, setCurrentLocation] = useState<City>(DEFAULT_CITY);
  const currentOffers = offers.filter((offer) => offer.city.name === currentLocation.name);
  const isActive = (item: City) => item.name === currentLocation.name ? 'tabs__item--active' : '';

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities. Main page</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                locations.map((item) => (
                  <li key={item.name} className="locations__item">
                    <NavLink
                      className={`locations__item-link tabs__item ${isActive(item)}`}
                      to={AppRoute.Root}
                      onClick={(evt: SyntheticEvent) => {
                        evt.preventDefault();
                        setCurrentLocation(item);
                      }}
                    >
                      <span>{item.name}</span>
                    </NavLink>
                  </li>))
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          {
            currentOffers.length
              ? <OffersList currentLocation={currentLocation} currentOffers={currentOffers}/>
              : <NoOffers currentLocation={currentLocation}/>
          }
        </div>
      </main>
    </div>
  );
}

export default MainPage;
