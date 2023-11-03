import LoginForm, { FieldValues } from '../../components/LoginForm';
import { config } from '../../config';

const LoginPage = () => {
  const onSubmit = (fieldValues: FieldValues) => {
    fetch(`${config.API_URI}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldValues),
    })
      .then((response) => response.json())
      // TODO: store tokens in React context and persist in local storage
      .then((data) => console.log(data));
  };

  return (
    <div className="w-full sm:w-80 sm:pt-40 mx-auto flex justify-center items-center ">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
