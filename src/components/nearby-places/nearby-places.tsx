import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type NearbyPlacesProps = {
  nearbyPlaces: Offer[];
  setChosenCard: (id: string | null) => void;
}

function NearbyPlaces({nearbyPlaces, setChosenCard}: NearbyPlacesProps): JSX.Element {
  return(
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighborhood</h2>
        <div className="near-places__list places__list">
          {nearbyPlaces.map((place)=> (<OfferCard key={place.id} block={'near-places'} offer={place} onCardHover={() => setChosenCard(place.id)} />))}
        </div>
      </section>
    </div>
  );
}

export default NearbyPlaces;
