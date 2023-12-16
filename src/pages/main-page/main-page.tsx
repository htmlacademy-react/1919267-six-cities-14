import { useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {Header} from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import OffersList from '../../components/offers-list/offers-list';
import NoOffers from '../../components/no-offers/no-offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffers } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { selectCurrentCity, selectOffers, selectOffersFetchingStatus } from '../../store/offers-data/selectors';
import { City } from '../../types/city';
import { setCurrentCity } from '../../store/offers-data/offers-data';
import LoadingPage from '../loading-page/loading-page';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentLocation = useAppSelector(selectCurrentCity);
  const offers = useAppSelector(selectOffers);
  const currentOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === currentLocation.name),
    [currentLocation.name, offers]);
  const fetchingStatus = useAppSelector(selectOffersFetchingStatus);

  const handleSelectedCity = useCallback(
    (city: City) => {
      dispatch(setCurrentCity(city));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch, currentLocation]);

  if (fetchingStatus === RequestStatus.Loading) {
    return <LoadingPage />;
  }

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
            <LocationsList
              currentCity={currentLocation.name}
              onSelectedCityClick={handleSelectedCity}
            />
          </section>
        </div>
        <div className="cities">
          {
            fetchingStatus === RequestStatus.Success && currentOffers.length
              ? <OffersList currentLocation={currentLocation.name} currentOffers={currentOffers}/>
              : <NoOffers currentLocation={currentLocation.name}/>
          }
        </div>
      </main>
    </div>
  );
}

export default MainPage;
