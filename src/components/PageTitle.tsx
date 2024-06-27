import { useLocation } from 'react-router-dom';
import { routes } from '../config/routes';

const pageTitles = {
  [routes.BEST_BUY]: 'Best Buy',
  [routes.BEST_DCA]: 'Best DCA',
  [routes.SETTINGS]: 'Settings',
  [routes.SINGLE]: 'Single Token',
  [routes.PROFILE]: 'Profile',
  [routes.CFAGI]: 'Fear and Greed Index',

};

export const PageTitle = () => {
  const location = useLocation();

  return (
    <h1 className="text-white inline-block font-bold">
      {pageTitles[location.pathname]}
    </h1>
  );
};
