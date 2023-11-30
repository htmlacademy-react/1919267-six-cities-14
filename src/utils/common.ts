import { AuthorizationStatus } from '../const';

function capitalizeFirstLetter (word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

function addPluralEnding (itemsCount: number) {
  return itemsCount > 1 ? 's' : '';
}

function checkAuthorizationStatus(status: AuthorizationStatus) {
  return status === AuthorizationStatus.Auth;
}

export {capitalizeFirstLetter, addPluralEnding, checkAuthorizationStatus};
