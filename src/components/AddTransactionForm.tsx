import { SubmitHandler, useForm } from 'react-hook-form';
import isEmpty from 'validator/lib/isEmpty';
import { toast } from 'react-toastify';

export type SubmitValues = {
  timestamp: string; // ISO 8601 date string
  type: 'buy' | 'sell'; // Assuming only 'buy' and 'sell' are valid
  coin: string; // The type of coin, represented as a string
  numCoins: number; // Number of coins, can be a decimal
  currency: string; // Currency type, represented as a string
  totalAmountPaid: number; // Total amount paid, as a number
  fee: number; // Fee amount, as a number
  notes?: string; // Notes, as a string
  exchange: string; // Exchange name, as a string
};

const isNotEmpty = (value: string): boolean | string =>
  isEmpty(value, { ignore_whitespace: true }) ? 'This field is required' : true;

// const isPositive = (value: number): boolean | string =>
//   value > 0 && Number.isFinite(value) ? true : 'This field must be positive';

// const isNonNegative = (value: number): boolean | string =>
//   value >= 0 && Number.isFinite(value)
//     ? true
//     : 'This field must be non-negative';

interface Props {
  onSubmit: SubmitHandler<SubmitValues>;
}

const AddTransactionForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubmitValues>({
    defaultValues: {
      type: 'buy',
      currency: 'AUD',
      fee: 0,
    },
  });

  return (
    <div className="w-full p-4 bg-gray-50 border border-gray-300 rounded-md">
      <h1 className="text-center text-xl font-bold mb-4">Add transaction</h1>
      <div className="w-32 mx-auto mb-4 h-px bg-gray-300" />
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await onSubmit(data);
            reset();
          } catch (error) {
            toast('Error adding transaction');
          }
        })}
        data-testid="form-signup"
      >
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="w-full  mb-2 md:mb-4">
            <label htmlFor="timestamp" className="mb-1 block">
              Timestamp
            </label>
            <input
              data-testid="input-timestamp"
              id="timestamp"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('timestamp', {
                required: 'Timestamp is required',
                validate: isNotEmpty,
              })}
            />

            <p className="text-red-400 text-sm">{errors.timestamp?.message}</p>
          </div>

          <div className="w-full mb-2 md:mb-4">
            <label htmlFor="type" className="mb-1 block">
              Type
            </label>
            <input
              data-testid="input-type"
              id="type"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('type', {
                required: 'Type is required',
                validate: isNotEmpty,
              })}
            />
            <p className="text-red-400 text-sm">{errors.type?.message}</p>
          </div>

          <div className="w-full  mb-2 md:mb-4">
            <label htmlFor="coin" className="mb-1 block">
              Coin
            </label>
            <input
              data-testid="input-coin"
              id="coin"
              type="string"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('coin', {
                required: 'Coin is required',
                validate: isNotEmpty,
              })}
            />
            <p className="text-red-400 text-sm">{errors.coin?.message}</p>
          </div>

          <div className="w-full mb-2 md:mb-4">
            <label htmlFor="num-coins" className="mb-1 block">
              Number of coins
            </label>
            <input
              data-testid="input-num-coins"
              id="num-coins"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('numCoins', {
                required: 'Number of coins is required',
                // validate: isPositive,
              })}
            />
            <p className="text-red-400 text-sm">{errors.numCoins?.message}</p>
          </div>

          <div className="w-full mb-2 md:mb-4">
            <label htmlFor="currency" className="mb-1 block">
              Currency
            </label>
            <input
              data-testid="input-currency"
              id="currency"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('currency', {
                required: 'Currency is required',
                validate: isNotEmpty,
              })}
            />
            <p className="text-red-400 text-sm">{errors.currency?.message}</p>
          </div>

          <div className="w-full mb-2 md:mb-4">
            <label htmlFor="total-amount-paid" className="mb-1 block">
              Total Amount Paid
            </label>
            <input
              data-testid="input-total-amount-paid"
              id="totalAmountPaid"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('totalAmountPaid', {
                required: 'Total Amount Paid is required',
                // validate: isPositive,
              })}
            />
            <p className="text-red-400 text-sm">
              {errors.totalAmountPaid?.message}
            </p>
          </div>

          <div className="w-full mb-2 md:mb-4">
            <label htmlFor="fee" className="mb-1 block">
              Fee
            </label>
            <input
              data-testid="input-fee"
              id="fee"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('fee', {
                // validate: isNonNegative,
              })}
            />
            <p className="text-red-400 text-sm">{errors.fee?.message}</p>
          </div>

          <div className="w-full mb-2 md:mb-4">
            <label htmlFor="exchange" className="mb-1 block">
              Exchange
            </label>
            <input
              data-testid="input-exchange"
              id="exchange"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('exchange', {
                // validate: isNotEmpty,
              })}
            />
            <p className="text-red-400 text-sm">{errors.fee?.message}</p>
          </div>

          <div className="w-full mb-2 md:mb-4 col-span-1 md:col-span-2 lg:col-span-4">
            <label htmlFor="notes" className="mb-1 block">
              Notes
            </label>
            <textarea
              data-testid="input-notes"
              id="notes"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('notes', {})}
            />
            <p className="text-red-400 text-sm">{errors.notes?.message}</p>
          </div>
        </div>

        <button
          data-testid="submit-button"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
