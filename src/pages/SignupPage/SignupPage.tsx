import { useContext } from 'react';
import SignupForm, { SubmitValues } from '../../components/SignupForm';
import { appConfig } from '../../config';
import { UserContext } from '../../context/user';
import useRedirectOnLogin from '../../hooks/useRedirectOnLogin';
import { routes } from '../../config/routes';

const SignupPage = () => {
  const { login } = useContext(UserContext);
  useRedirectOnLogin(routes.BEST_DCA);

  const onSubmit = (fieldValues: SubmitValues) =>
    fetch(`${appConfig.API_URI}/api/user`, {
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
      <SignupForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignupPage;
