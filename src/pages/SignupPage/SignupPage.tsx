import SignupForm, { SubmitValues } from '../../components/SignupForm';
import { config } from '../../config';

const SignupPage = () => {
  const onSubmit = (fieldValues: SubmitValues) => {
    fetch(`${config.API_URI}/api/user`, {
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
      <SignupForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignupPage;
