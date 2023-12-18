import faker from 'faker';
import { CityName } from '../types/city-name';
import { Location } from '../types/location';
import { CityMap } from '../const';
import { getRandomArrayElement } from '../utils/common';
import { OfferPreview } from '../types/offer-preview';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { Review } from '../types/review';
import { Host } from '../types/host';
import { TUser } from '../types/user';

const Location: Location = {
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number({min: 10, max: 15})
};

export const makeFakeCity = (): City => ({
  name: getRandomArrayElement(Object.values(CityMap)).name,
  location: Location
});

export const makeFakeHost = (): Host => ({
  name: `${faker.name.findName()} ${faker.name.lastName()}`,
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
});

export const makeFakeOfferPreview = (defaultCity?: CityName): OfferPreview => ({
  id: faker.random.alphaNumeric(20),
  city: {
    name: defaultCity ? defaultCity : getRandomArrayElement(Object.values(CityMap)).name,
    location: Location
  },
  type: faker.lorem.word(),
  price: faker.datatype.number(500),
  location: Location,
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({min: 1, max: 5}),
  previewImage: faker.image.city(),
} as OfferPreview);

export const makeFakeFullOffer = ():Offer => ({
  id: faker.random.alphaNumeric(20),
  city: makeFakeCity(),
  type: faker.lorem.word(),
  price: faker.datatype.number(500),
  location: Location,
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({min: 1, max: 5}),
  previewImage: faker.image.city(),
  bedrooms: faker.datatype.number({min: 1, max: 5}),
  goods: [faker.lorem.word()],
  host: makeFakeHost(),
  images: [
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
  ],
  maxAdults: faker.datatype.number({min: 1, max: 10})
} as Offer);

export const makeFakeReview = (): Review => ({
  id: faker.random.alphaNumeric(20),
  user: makeFakeHost(),
  rating: faker.datatype.number({min: 1, max: 5}),
  comment: faker.lorem.text(60),
  date: String(new Date())
} as Review);

export const makeFakeUser = (): TUser => ({
  id: faker.random.alphaNumeric(20),
  email: faker.internet.email(),
  token: faker.random.alphaNumeric(20),
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean()
} as TUser);
