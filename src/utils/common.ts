import { AuthorizationStatus, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../const';

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

function checkReviewValidation (comment: string, rating: number): boolean {
  return (comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== 0);

}

export {
  capitalizeFirstLetter,
  addPluralEnding,
  checkAuthorizationStatus,
  checkReviewValidation
};
