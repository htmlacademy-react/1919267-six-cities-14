import {useRef, useEffect} from 'react';
import {Icon, layerGroup, marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../../types/location';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
  location: Location;
  offers: Offer[];
  hoveredOfferId: Offer['id'] | null;
  className: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({location, offers, hoveredOfferId, className}: MapProps): JSX.Element {

  const mapRef = useRef<HTMLElement>(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        marker([offer.location.latitude, offer.location.longitude])
          .setIcon(offer.id === hoveredOfferId ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      map.flyTo(
        [
          location.latitude,
          location.longitude,
        ],
        location.zoom
      );

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location, offers, hoveredOfferId]);

  return (
    <section
      className={`${className} map`}
      style={{
        height: '100%',
        minHeight: '500px',
        width: '100%',
        maxWidth: '1144px',
        margin: '0 auto',
      }}
      ref={mapRef}
    />
  );
}

export default Map;
