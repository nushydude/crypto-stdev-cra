import { useLocation } from 'react-router-dom';
import { routes } from '../config/routes';

const pageTitles = {
  [routes.BEST_BUY]: 'Best Buy',
  [routes.BEST_DCA]: 'Best DCA',
  [routes.SETTINGS]: 'Settings',
  [routes.SINGLE]: 'Single token',
};

export const PageTitle = () => {
  const location = useLocation();

  return (
    <span className="text-white inline-block ml-5 font-bold">
      {pageTitles[location.pathname]}
    </span>
  );
};
