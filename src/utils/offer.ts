import { Offer } from '../types/offer';

function getRatingWidth (rating: number) {
  return `${rating / 0.05}%`;
}

function sortByRating(itemA: Offer, itemB: Offer) {
  return itemB.rating - itemA.rating;
}

function sortFromLowToHigh(itemA: Offer, itemB: Offer) {
  return itemA.price - itemB.price;
}

function sortFromHighToLow(itemA: Offer, itemB: Offer) {
  return itemB.price - itemA.price;
}

const sorting = {
  Popular: (offers: Offer[]) => offers.slice(),
  HighToLow: (offers: Offer[]) => offers.toSorted(sortFromHighToLow),
  LowToHigh: (offers: Offer[]) => offers.toSorted(sortFromLowToHigh),
  TopRating: (offers: Offer[]) => offers.toSorted(sortByRating),
};

export {getRatingWidth, sorting};
