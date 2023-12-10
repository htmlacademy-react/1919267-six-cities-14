import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/common';
import { logout } from '../../store/api-actions';
import { selectAuthorizationStatus, selectUserData } from '../../store/user-data/selectors';
import { memo } from 'react';

function Header_(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  //const favorites = useAppSelector((state) => state.favoriteOffers);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const user = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  function onLogoutClickHandler() {
    dispatch(logout());
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {isLogged
                  ?
                  <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile" >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img
                        className="header__avatar user__avatar"
                        src={user?.avatarUrl}
                        alt="avatar"
                      />
                    </div>
                    <span className="header__user-name user__name">{user?.email}</span>
                    <span className="header__favorite-count">1000</span>
                  </Link>
                  :
                  <Link className="header__navlink header__nav-link--profile" to={AppRoute.Login} style={{display: 'flex'}}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>}
              </li>
              {isLogged
                &&
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={'/'}
                    onClick={onLogoutClickHandler}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(Header_);
