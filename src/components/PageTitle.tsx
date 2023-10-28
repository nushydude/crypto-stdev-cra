import { useLocation } from 'react-router-dom';
import { routes } from '../config/routes';
import { Span } from './PageTitle.styles';

const pageTitles = {
  [routes.BEST_BUY]: 'Best Buy',
  [routes.BEST_DCA]: 'Best DCA',
  [routes.SETTINGS]: 'Settings',
  [routes.SINGLE]: 'Single token',
};

export const PageTitle = () => {
  const location = useLocation();

  return <Span>{pageTitles[location.pathname]}</Span>;
};
