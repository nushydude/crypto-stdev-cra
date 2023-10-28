import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './components/AppRoutes';
import { Header } from './components/Header';
import { ServiceWorker } from './components/ServiceWorker';
import { useOneSignal } from './hooks/useOneSignal';
import { Footer } from './components/Footer';

const history = createBrowserHistory();

export const App = () => {
  useOneSignal();

  return (
    <Router history={history}>
      <ServiceWorker />

      <Header />

      <div className="w-100 max-w-7xl mx-auto px-2 flex flex-col flex-grow pt-18 sm:pt-12">
        <AppRoutes />
      </div>

      <Footer />

      <ToastContainer />
    </Router>
  );
};
