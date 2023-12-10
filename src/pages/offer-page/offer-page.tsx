import { useState } from 'react';
import {Header} from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { addPluralEnding, capitalizeFirstLetter } from '../../utils/common';
import { getRatingWidth } from '../../utils/offer';
import Map from '../../components/map/map';
import ReviewsList from '../../components/reviews-list/reviews-list';
import NearbyPlaces from '../../components/nearby-places/nearby-places';
import { useLoadOfferInfo } from '../../hooks/use-load-offer-info';
import Loading from '../../components/loading/loading';
import { useLoadNearbyOffers } from '../../hooks/use-load-nearby-offers';
import { MAX_NEARBY_OFFERS_COUNT } from '../../const';
import { useParams } from 'react-router';

function OfferPage(): JSX.Element {
  const offerId = useParams()?.offerId;
  const [chosenCard, setChosenCard] = useState<string| null>(null);
  const {offerInfo, isOfferInfoLoading} = useLoadOfferInfo();
  const {nearbyOffers, isNearbyDataLoading} = useLoadNearbyOffers();
  const nearbyOffersToRender = nearbyOffers.slice(0, MAX_NEARBY_OFFERS_COUNT);

  if (isOfferInfoLoading || isNearbyDataLoading) {
    return (<Loading />);
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer page</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                offerInfo?.images.map((image) => (
                  <div key={image} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt={offerInfo.description} />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                offerInfo?.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )
              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerInfo?.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: getRatingWidth(offerInfo?.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerInfo?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(offerInfo?.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerInfo?.bedrooms} Bedroom{addPluralEnding(offerInfo?.bedrooms)}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerInfo?.maxAdults} adult{addPluralEnding(offerInfo?.maxAdults)}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerInfo?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerInfo?.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offerInfo?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offerInfo?.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offerInfo?.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerInfo?.description}
                  </p>
                </div>
              </div>
              <ReviewsList offerId={offerId}/>
            </div>
          </div>
          <Map city={offerInfo?.city} offers={nearbyOffers} hoveredOfferId={chosenCard} className='offer__map'/>
        </section>
        <NearbyPlaces nearbyPlaces={nearbyOffersToRender} setChosenCard={setChosenCard}/>
      </main>
    </div>
  );
}

export default OfferPage;
