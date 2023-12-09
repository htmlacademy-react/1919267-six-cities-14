import { AuthorizationStatus } from '../const';

function capitalizeFirstLetter (word: string | undefined) {
  return word ? word.slice(0, 1).toUpperCase() + word.slice(1) : '';
}

function addPluralEnding (itemsCount: number | undefined) {
  if (itemsCount) {
    return itemsCount > 1 ? 's' : '';
  }
  return 0;
}

function checkAuthorizationStatus(status: AuthorizationStatus) {
  return status === AuthorizationStatus.Auth;
}

export {capitalizeFirstLetter, addPluralEnding, checkAuthorizationStatus};
