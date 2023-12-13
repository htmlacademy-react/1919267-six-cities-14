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

function formatTime(date: Date){
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year}, ${h}:${m}`;
}

function getRandomArrayElement<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export {
  capitalizeFirstLetter,
  addPluralEnding,
  checkAuthorizationStatus,
  checkReviewValidation,
  formatTime,
  getRandomArrayElement
};
