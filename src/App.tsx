import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './components/AppRoutes';
import { Header } from './components/Header';
import { PageWrapper } from './components/PageWrapper';
import { GlobalStyle } from './components/GlobalStyle';
import { ServiceWorker } from './components/ServiceWorker';
import { useOneSignal } from './hooks/useOneSignal';
import { Footer } from './components/Footer';

const history = createBrowserHistory();

export const App = () => {
  useOneSignal();

  return (
    <Router history={history}>
      <GlobalStyle />
      <ServiceWorker />

      <Header />

      <PageWrapper>
        <AppRoutes />
      </PageWrapper>

      <Footer />

      <ToastContainer />
    </Router>
  );
};
