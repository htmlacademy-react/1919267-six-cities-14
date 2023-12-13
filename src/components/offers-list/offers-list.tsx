import { useMemo, useState } from 'react';
import { Offer } from '../../types/offer';
import { TSorting } from '../../types/sorting';
import { addPluralEnding } from '../../utils/common';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import {Sorting} from '../sorting/sorting';
import { DEFAULT_SORTING_OPTION, RequestStatus } from '../../const';
import { sorting } from '../../utils/offer';
import { CityName } from '../../types/city-name';
import { useAppSelector } from '../../hooks';
import { selectOffersFetchingStatus } from '../../store/offers-data/selectors';
import LoadingPage from '../../pages/loading-page/loading-page';

type OffersListProps = {
  currentLocation: CityName;
  currentOffers: Offer[];
}

function OffersList ({currentOffers, currentLocation}: OffersListProps): JSX.Element {
  const [selectedOfferCardId, setSelectedOfferCardId] = useState<string | null>(null);
  const [activeSorting, setActiveSorting] = useState<TSorting>(DEFAULT_SORTING_OPTION);
  const locationForMap = currentOffers[0].city;
  const fetchingStatus = useAppSelector(selectOffersFetchingStatus);

  function handleCardHover (offerId: string | null) {
    setSelectedOfferCardId(offerId);
  }

  function handleSortingChange(option: TSorting) {
    setActiveSorting(option);
  }

  const sortedOffers = useMemo(
    () => sorting[activeSorting](currentOffers),
    [activeSorting, currentOffers]);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} place{addPluralEnding(currentOffers.length)} to stay in {currentLocation}</b>
        <Sorting activeSorting={activeSorting} onSortingOptionClick={handleSortingChange}/>
        <div className="cities__places-list places__list tabs__content">
          {fetchingStatus === RequestStatus.Loading && <LoadingPage />}
          {sortedOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              block="cities"
              onCardHover={handleCardHover}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map offers={currentOffers} city={locationForMap} hoveredOfferId={selectedOfferCardId} className={'cities__map'} />
      </div>
    </div>
  );
}

export default OffersList;
