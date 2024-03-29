import { useForm, SubmitHandler } from 'react-hook-form';

export type FieldValues = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: SubmitHandler<FieldValues>;
};

const LoginForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="w-full p-4 bg-gray-50 border border-gray-300 rounded-md">
      <h1 className="text-center text-xl font-bold mb-4">Log in</h1>
      <div className="w-32 mx-auto mb-4 h-px bg-gray-300" />
      <form
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
        data-testid="form-login"
        className="grid gap-2 grid-cols-1 "
      >
        <div className="w-full  mb-2 md:mb-4">
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
          <input
            data-testid="input-email"
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('email', { required: 'Email is required' })}
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
            })}
          />
          <p className="text-red-400 text-sm">{errors.password?.message}</p>
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

export default LoginForm;
