import { CSSProperties } from 'react';
import { Spinner } from '../../components/spinner/spinner';
import { Header } from '../../components/header/header';

const override: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default function LoadingPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <Header />
        <div className="container" style={{ textAlign: 'center' }}>
          <Spinner
            color="#4481c3"
            width={10}
            height={200}
            cssOverride={override}
            margin={10}
          />
        </div>
      </main>
    </div>
  );
}
