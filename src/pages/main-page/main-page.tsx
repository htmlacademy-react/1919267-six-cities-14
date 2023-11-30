import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import OffersList from '../../components/offers-list/offers-list';
import NoOffers from '../../components/no-offers/no-offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffers } from '../../store/api-actions';


function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const currentLocation = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);
  const currentOffers = offers.filter((offer) => offer.city.name === currentLocation);

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
            <LocationsList />
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
