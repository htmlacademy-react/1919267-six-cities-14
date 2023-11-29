import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import LocationsList from '../../components/locations-list/locations-list';
import OffersList from '../../components/offers-list/offers-list';
import NoOffers from '../../components/no-offers/no-offers';
import { useAppSelector } from '../../hooks';

type MainPageProps = {
  offers: Offer[];
}

function MainPage({offers}: MainPageProps): JSX.Element {
  const currentLocation = useAppSelector((state) => state.currentCity);
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
