import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities. Error 404 page</title>
      </Helmet>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
