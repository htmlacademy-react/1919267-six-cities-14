import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';
import { getRatingWidth } from '../../utils/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { memo } from 'react';


type Size = 'small' | 'large';

type OfferCardProps = {
  offer: Offer;
  block: string;
  size?: Size;
  onCardHover?: (offerId: Offer['id'] | null) => void;
}

function getImageSize (size: Size) {
  return size === 'small' ? {width: '150', height: '110'} : {width: '260', height: '200'};
}

function OfferCard({offer, block, size = 'large', onCardHover}: OfferCardProps): JSX.Element {
  function handleMouseEnter () {
    onCardHover?.(offer.id);
  }

  function handleMouseLeave () {
    onCardHover?.(null);
  }

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={offer.isPremium ? 'place-card__mark' : 'visually-hidden'}>
        <span>{offer.isPremium ? 'Premium' : null}</span>
      </div>
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            {...getImageSize(size)}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton id={offer.id} isFavorite={offer.isFavorite}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemoizedCard = memo(OfferCard);
export default MemoizedCard;
