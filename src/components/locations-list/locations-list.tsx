import cn from 'classnames';
import { Cities, CityMap } from '../../const';
import { City } from '../../types/city';

type TLocationsListProps = {
  currentCity: keyof typeof Cities;
  onSelectedCityClick: (city: City) => void;
}

function LocationsList({currentCity, onSelectedCityClick}: TLocationsListProps): JSX.Element {
  const cities = Object.values(CityMap);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((item) => (
              <li key={item.name} className="locations__item">
                <div
                  className={cn(
                    'locations__item-link',
                    'tabs__item',
                    {'tabs__item--active': item.name === currentCity}
                  )}
                  onClick={() => onSelectedCityClick(item)}
                >
                  <span>{item.name}</span>
                </div>
              </li>))
          }
        </ul>
      </section>
    </div>
  );
}

export default LocationsList;
