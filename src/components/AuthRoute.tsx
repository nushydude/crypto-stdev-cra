import { Redirect, Route, RouteProps } from 'react-router-dom';
import { routes } from '../config/routes';
import useUser from '../hooks/useUser';

const AuthRoute = (props: RouteProps) => {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Redirect to={routes.LOGIN} />;
  }

  return <Route {...props} />;
};

export default AuthRoute;
