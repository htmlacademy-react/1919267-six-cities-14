import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteOffers, updateFavoriteStatus } from '../../store/api-actions';
import { Offer } from '../../types/offer';
import { selectAuthorizationStatus } from '../../store/user-data/selectors';
import { AppRoute, AuthorizationStatus, BookmarkSizeMap } from '../../const';
import { useState } from 'react';
import { TSizeMap } from '../../types/size';

type BookmarkButtonProps = {
  id: Offer['id'];
  isFavorite: boolean;
  block: string;
  size?: keyof TSizeMap;
}

function BookmarkButton ({isFavorite, id, block, size = 'small'}: BookmarkButtonProps):JSX.Element {
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
      className={cn(`${block}__bookmark-button`, 'button', {
        [`${block}__bookmark-button--active`]: favoriteStatus && isAuthorized,
      })}
      type="button"
      onClick={onButtonClickHandler}
    >
      <svg
        className={`${block}__bookmark-icon`}
        {...BookmarkSizeMap[size]}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
