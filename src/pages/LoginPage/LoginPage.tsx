import { useContext } from 'react';
import LoginForm, { FieldValues } from '../../components/LoginForm';
import { appConfig } from '../../config';
import { routes } from '../../config/routes';
import useRedirectOnLogin from '../../hooks/useRedirectOnLogin';
import { UserContext } from '../../context/user';

const LoginPage = () => {
  const { login } = useContext(UserContext);

  useRedirectOnLogin(routes.BEST_DCA);

  const onSubmit = (fieldValues: FieldValues) =>
    fetch(`${appConfig.API_URI}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldValues),
    })
      .then((response) => response.json())
      .then(({ accessToken, refreshToken }) =>
        login(refreshToken, accessToken),
      );

  return (
    <div className="w-full sm:w-80 sm:pt-40 mx-auto flex justify-center items-center ">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
