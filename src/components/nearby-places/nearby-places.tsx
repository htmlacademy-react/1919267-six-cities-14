import NearbyPlaceItem from '../nearby-place-item/nearby-place-item';
import { Offer } from '../../types/offer';

type NearbyPlacesProps = {
  nearbyPlaces: Offer[];
  setChosenCard: (id: number | null) => void;
}

function NearbyPlaces({nearbyPlaces, setChosenCard}: NearbyPlacesProps): JSX.Element {
  return(
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighborhood</h2>
        <div className="near-places__list places__list">
          {nearbyPlaces.map((place)=> (<NearbyPlaceItem key={place.id} place={place} onCardHover={() => setChosenCard(place.id)} onCardLeave={()=> setChosenCard(null)}/>))}
        </div>
      </section>
    </div>
  );
}

export default NearbyPlaces;
