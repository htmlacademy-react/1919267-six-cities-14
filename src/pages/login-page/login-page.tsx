import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { AppRoute } from '../../const';

function LoginPage(): JSX.Element {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const checkPassword = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d).+$/.test(password);
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const currentCity = useAppSelector((state) => state.currentCity);

  function handleSubmit (evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    dispatch(loginAction({
      login: email,
      password: password
    }));
    navigate(AppRoute.Root);
  }

  function onChangeEmailHandler (evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target instanceof HTMLInputElement) {
      const value = evt.target.value;
      setEmail(value);
    }
  }

  function onChangePasswordlHandler (evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target instanceof HTMLInputElement) {
      const value = evt.target.value;
      setPassword(value);
    }
  }

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login page</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={onChangeEmailHandler}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={onChangePasswordlHandler}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={!checkPassword || !checkEmail}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Root} className="locations__item-link">
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
