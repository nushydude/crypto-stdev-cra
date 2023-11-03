import { useContext } from 'react';
import SignupForm, { SubmitValues } from '../../components/SignupForm';
import { config } from '../../config';
import { UserContext } from '../../context/user';

const SignupPage = () => {
  const { login } = useContext(UserContext);

  const onSubmit = (fieldValues: SubmitValues) =>
    fetch(`${config.API_URI}/api/user`, {
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
