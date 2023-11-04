import { useHistory } from 'react-router-dom';
import { routes } from '../config/routes';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/user';

const useRedirectOnLogin = (redirectTo: string) => {
  const { isLoggedIn } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.replace(routes.SINGLE);
    }
  }, [isLoggedIn, history]);
};

export default useRedirectOnLogin;
