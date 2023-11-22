import { useState } from 'react';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { TSorting } from '../../types/sorting';
import { addPluralEnding } from '../../utils/common';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import Sorting from '../sorting/sorting';
import { DEFAULT_SORTING_OPTION } from '../../const';
import { sorting } from '../../utils/offer';

type OffersListProps = {
  currentLocation: City;
  currentOffers: Offer[];
}

function OffersList ({currentOffers, currentLocation}: OffersListProps): JSX.Element {
  const [selectedOfferCardId, setSelectedOfferCardId] = useState<number | null>(null);
  const [activeSorting, setActiveSorting] = useState<TSorting>(DEFAULT_SORTING_OPTION);

  function handleCardHover (offerId: number | null) {
    setSelectedOfferCardId(offerId);
  }

  function handleSortingChange(option: TSorting) {
    setActiveSorting(option);
  }

  const sortedOffers = sorting[activeSorting](currentOffers);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} place{addPluralEnding(currentOffers.length)} to stay in {currentLocation.name}</b>
        <Sorting activeSorting={activeSorting} onSortingOptionClick={handleSortingChange}/>
        <div className="cities__places-list places__list tabs__content">
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
        <Map offers={currentOffers} city={currentLocation} hoveredOfferId={selectedOfferCardId} className={'cities__map'} />
      </div>
    </div>
  );
}

export default OffersList;
