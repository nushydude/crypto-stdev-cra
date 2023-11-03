import { useForm, SubmitHandler } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

const isNotEmpty = (value: string): boolean | string =>
  isEmpty(value, { ignore_whitespace: true }) ? 'This field is required' : true;

const validateEmail = (value: string): boolean | string =>
  !isEmail(value) ? 'Please enter a valid email address.' : true;

const validateConfirmPassword = (
  value: string,
  fieldValues: { password?: string },
): boolean | string =>
  fieldValues.password !== value
    ? 'Password and confirm password do not match'
    : true;

export type SubmitValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type FieldValues = {
  confirmPassword: string;
} & SubmitValues;

type Props = {
  onSubmit: SubmitHandler<SubmitValues>;
};

const SignupForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      confirmPassword: '',
    },
  });

  return (
    <div className="w-full p-4 bg-gray-50 border border-gray-300 rounded-md">
      <h1 className="text-center text-xl font-bold mb-4">Sign up</h1>
      <div className="w-32 mx-auto mb-4 h-px bg-gray-300" />
      <form
        onSubmit={handleSubmit(
          async (data) =>
            await onSubmit({
              firstname: data.firstname.trim(),
              lastname: data.lastname.trim(),
              email: data.email.trim(),
              // intentionally not trimmed
              password: data.password,
            }),
        )}
        data-testid="form-signup"
        className="grid gap-2 grid-cols-1 "
      >
        <div className="w-full  mb-2 md:mb-4">
          <label htmlFor="firstname" className="mb-1 block">
            First Name
          </label>
          <input
            data-testid="input-first-name"
            id="first-name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('firstname', {
              required: 'First name is required',
              validate: isNotEmpty,
            })}
          />

          <p className="text-red-400 text-sm">{errors.firstname?.message}</p>
        </div>

        <div className="w-full  mb-2 md:mb-4">
          <label htmlFor="lastname" className="mb-1 block">
            Last Name
          </label>
          <input
            data-testid="input-last-name"
            id="last-name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('lastname', {
              required: 'Last name is required',
              validate: isNotEmpty,
            })}
          />
          <p className="text-red-400 text-sm">{errors.lastname?.message}</p>
        </div>

        <div className="w-full  mb-2 md:mb-4">
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
          <input
            data-testid="input-email"
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('email', {
              required: 'Email is required',
              validate: validateEmail,
            })}
          />
          <p className="text-red-400 text-sm">{errors.email?.message}</p>
        </div>

        <div className="w-full mb-2 md:mb-4">
          <label htmlFor="password" className="mb-1 block">
            Password
          </label>
          <input
            data-testid="input-password"
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
          />
          <p className="text-red-400 text-sm">{errors.password?.message}</p>
        </div>

        <div className="w-full mb-2 md:mb-4">
          <label htmlFor="confirmPassword" className="mb-1 block">
            Confirm Password
          </label>
          <input
            data-testid="input-confirm-password"
            id="confirmPassword"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: validateConfirmPassword,
            })}
          />
          <p className="text-red-400 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          data-testid="submit-button"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
