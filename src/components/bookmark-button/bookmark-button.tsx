import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteOffers, updateFavoriteStatus } from '../../store/api-actions';
import { Offer } from '../../types/offer';
import { selectAuthorizationStatus } from '../../store/user-data/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useState } from 'react';

type BookmarkButtonProps = {
  id: Offer['id'];
  isFavorite: boolean;
}

function BookmarkButton ({isFavorite, id}: BookmarkButtonProps):JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);

  function onButtonClickHandler() {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }
    setFavoriteStatus((prevState) => !prevState);

    dispatch(updateFavoriteStatus({
      id,
      status: Number(!favoriteStatus)
    })).then(() => dispatch(fetchFavoriteOffers()));
  }

  return (
    <button
      className={cn('place-card__bookmark-button', 'button', {
        'place-card__bookmark-button--active': favoriteStatus && isAuthorized,
      })}
      type="button"
      onClick={onButtonClickHandler}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
